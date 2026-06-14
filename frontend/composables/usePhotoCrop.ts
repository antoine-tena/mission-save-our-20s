import { ref, onBeforeUnmount, watch } from 'vue';
import { useAlbumEditorStore } from './useAlbumEditorStore';
import { croppingPhotoId, tempCropScale } from './useAlbumEditorState';

export function usePhotoCrop() {
  const { updatePhotoCrop } = useAlbumEditorStore();
  const tempCropX = ref(0); const tempCropY = ref(0);
  const tempWidth = ref(200); const tempHeight = ref(180);
  const isDraggingCrop = ref(false); const dragStartX = ref(0); const dragStartY = ref(0); const initialCropX = ref(0); const initialCropY = ref(0);
  const isResizingWidth = ref(false); const isResizingHeight = ref(false); const isResizingBoth = ref(false);
  const resizeStartWidth = ref(0); const resizeStartHeight = ref(0); const resizeStartX = ref(0); const resizeStartY = ref(0);
  let activePhotoRef: any = null;

  const clampTranslation = (x: number, y: number, scale: number) => {
    const maxW = Math.max(0, tempWidth.value * (scale - 1) / 2);
    const maxH = Math.max(0, tempHeight.value * (scale - 1) / 2);
    return { x: Math.max(-maxW, Math.min(maxW, x)), y: Math.max(-maxH, Math.min(maxH, y)) };
  };

  watch(tempCropScale, (newScale) => {
    if (croppingPhotoId.value !== null) {
      const clamped = clampTranslation(tempCropX.value, tempCropY.value, newScale);
      tempCropX.value = clamped.x; tempCropY.value = clamped.y;
    }
  });

  const startCropping = (photo: any, selector: string) => {
    activePhotoRef = photo; croppingPhotoId.value = photo.id;
    tempCropX.value = photo.crop_x ?? 0; tempCropY.value = photo.crop_y ?? 0;
    const rawScale = photo.crop_scale ?? 1.0;
    tempCropScale.value = rawScale > 0.1 ? rawScale : 1.0;
    const frameEl = document.querySelector(selector);
    let finalW = 200, finalH = 180;
    if (photo.custom_width && photo.custom_width > 50) finalW = photo.custom_width;
    else if (frameEl && frameEl.clientWidth > 50) finalW = frameEl.clientWidth;
    if (photo.custom_height && photo.custom_height > 50) finalH = photo.custom_height;
    else if (frameEl && frameEl.clientHeight > 50) finalH = frameEl.clientHeight;
    tempWidth.value = finalW; tempHeight.value = finalH;
    const clamped = clampTranslation(tempCropX.value, tempCropY.value, tempCropScale.value);
    tempCropX.value = clamped.x; tempCropY.value = clamped.y;
    setTimeout(() => {
      window.addEventListener('click', onGlobalClick); window.addEventListener('keydown', onKeyDown);
    }, 300);
  };

  const onGlobalClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement; const activeFrame = document.querySelector('.cropping-active');
    if (activeFrame && !activeFrame.contains(target)) saveCrop();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (croppingPhotoId.value === null) return;
    if (e.key === 'Enter') { e.preventDefault(); saveCrop(); }
    if (e.key === 'Escape') { e.preventDefault(); cancelCrop(); }
  };

  const onCropMouseDown = (e: MouseEvent) => {
    e.preventDefault(); isDraggingCrop.value = true;
    dragStartX.value = e.clientX; dragStartY.value = e.clientY;
    initialCropX.value = tempCropX.value; initialCropY.value = tempCropY.value;
    window.addEventListener('mousemove', onCropMouseMove); window.addEventListener('mouseup', onCropMouseUp);
  };

  const onCropMouseMove = (e: MouseEvent) => {
    if (!isDraggingCrop.value) return;
    const dx = e.clientX - dragStartX.value; const dy = e.clientY - dragStartY.value;
    const clamped = clampTranslation(initialCropX.value + dx, initialCropY.value + dy, tempCropScale.value);
    tempCropX.value = clamped.x; tempCropY.value = clamped.y;
  };

  const onCropMouseUp = () => {
    isDraggingCrop.value = false;
    window.removeEventListener('mousemove', onCropMouseMove); window.removeEventListener('mouseup', onCropMouseUp);
  };

  const onCropWheel = (e: WheelEvent) => {
    if (croppingPhotoId.value === null) return;
    const zoomSpeed = 0.05;
    const delta = e.deltaY < 0 ? zoomSpeed : -zoomSpeed;
    const nextScale = Math.max(1.0, Math.min(3.0, tempCropScale.value + delta));
    tempCropScale.value = parseFloat(nextScale.toFixed(2));
  };

  const startResizing = (e: MouseEvent, direction: 'r' | 'b' | 'se') => {
    e.preventDefault(); e.stopPropagation();
    isResizingWidth.value = direction === 'r'; isResizingHeight.value = direction === 'b'; isResizingBoth.value = direction === 'se';
    resizeStartX.value = e.clientX; resizeStartY.value = e.clientY;
    resizeStartWidth.value = tempWidth.value; resizeStartHeight.value = tempHeight.value;
    window.addEventListener('mousemove', onResizeMouseMove); window.addEventListener('mouseup', onResizeMouseUp);
  };

  const onResizeMouseMove = (e: MouseEvent) => {
    const dx = e.clientX - resizeStartX.value; const dy = e.clientY - resizeStartY.value;
    if (isResizingWidth.value || isResizingBoth.value) tempWidth.value = Math.max(80, Math.min(800, resizeStartWidth.value + dx));
    if (isResizingHeight.value || isResizingBoth.value) tempHeight.value = Math.max(80, Math.min(800, resizeStartHeight.value + dy));
  };

  const onResizeMouseUp = () => {
    isResizingWidth.value = isResizingHeight.value = isResizingBoth.value = false;
    window.removeEventListener('mousemove', onResizeMouseMove); window.removeEventListener('mouseup', onResizeMouseUp);
  };

  const saveCrop = async () => {
    if (!activePhotoRef) return;
    const photoId = activePhotoRef.id; croppingPhotoId.value = null;
    cleanup();
    if (activePhotoRef.is_cover) {
      const { activeAlbum, updateAlbumField } = useAlbumEditorStore();
      if (activeAlbum.value) {
        const prefix = activePhotoRef.cover_type === 'front' ? 'cover' : 'back_cover';
        await updateAlbumField(activeAlbum.value.id, `${prefix}_crop_x`, tempCropX.value);
        await updateAlbumField(activeAlbum.value.id, `${prefix}_crop_y`, tempCropY.value);
        await updateAlbumField(activeAlbum.value.id, `${prefix}_crop_scale`, tempCropScale.value);
      }
    } else {
      await updatePhotoCrop(photoId, tempCropX.value, tempCropY.value, tempCropScale.value, null, null);
    }
    activePhotoRef = null;
  };

  const cancelCrop = () => {
    croppingPhotoId.value = null; cleanup(); activePhotoRef = null;
  };

  const getImageStyle = (photo: any) => {
    const isCurrentlyCropping = croppingPhotoId.value === photo.id;
    const x = isCurrentlyCropping ? tempCropX.value : (photo.crop_x ?? 0);
    const y = isCurrentlyCropping ? tempCropY.value : (photo.crop_y ?? 0);
    let scale = isCurrentlyCropping ? tempCropScale.value : (photo.crop_scale ?? 1.0);
    if (scale < 0.1) scale = 1.0;
    return {
      transform: `translate(${x}px, ${y}px) scale(${scale})`, transformOrigin: 'center center',
      cursor: isCurrentlyCropping ? (isDraggingCrop.value ? 'grabbing' : 'grab') : 'default',
      transition: isCurrentlyCropping ? 'none' : 'transform 0.25s'
    };
  };

  const cleanup = () => {
    window.removeEventListener('click', onGlobalClick); window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('mousemove', onCropMouseMove); window.removeEventListener('mouseup', onCropMouseUp);
    window.removeEventListener('mousemove', onResizeMouseMove); window.removeEventListener('mouseup', onResizeMouseUp);
  };

  onBeforeUnmount(cleanup);

  return {
    croppingPhotoId, tempCropScale, tempWidth, tempHeight,
    startCropping, onCropMouseDown, onCropWheel, startResizing, getImageStyle, saveCrop, cancelCrop
  };
}