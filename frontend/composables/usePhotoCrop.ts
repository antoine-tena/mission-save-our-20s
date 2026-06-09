import { ref, onBeforeUnmount } from 'vue';
import { useAlbumEditorStore } from './useAlbumEditorStore';

export function usePhotoCrop() {
  const { updatePhotoCrop } = useAlbumEditorStore();
  
  const croppingPhotoId = ref<number | null>(null);
  const tempCropX = ref(0); const tempCropY = ref(0); const tempCropScale = ref(1.0);
  const tempWidth = ref(200); const tempHeight = ref(180);

  const isDraggingCrop = ref(false);
  const dragStartX = ref(0); const dragStartY = ref(0);
  const initialCropX = ref(0); const initialCropY = ref(0);

  const isResizingWidth = ref(false); const isResizingHeight = ref(false); const isResizingBoth = ref(false);
  const resizeStartWidth = ref(0); const resizeStartHeight = ref(0);
  const resizeStartX = ref(0); const resizeStartY = ref(0);

  let activePhotoRef: any = null;

  const startCropping = (photo: any, selector: string) => {
    activePhotoRef = photo;
    croppingPhotoId.value = photo.id;
    tempCropX.value = photo.crop_x ?? 0;
    tempCropY.value = photo.crop_y ?? 0;
    tempCropScale.value = photo.crop_scale ?? 1.0;
    
    const frameEl = document.querySelector(selector);
    if (frameEl) {
      tempWidth.value = photo.custom_width ?? frameEl.clientWidth;
      tempHeight.value = photo.custom_height ?? frameEl.clientHeight;
    } else {
      tempWidth.value = photo.custom_width ?? 200;
      tempHeight.value = photo.custom_height ?? 180;
    }
    setTimeout(() => window.addEventListener('click', onGlobalClick), 50);
  };

  const onGlobalClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const activeFrame = document.querySelector('.cropping-active');
    if (activeFrame && !activeFrame.contains(target)) {
      saveCrop();
    }
  };

  const onCropMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    isDraggingCrop.value = true;
    dragStartX.value = e.clientX; dragStartY.value = e.clientY;
    initialCropX.value = tempCropX.value; initialCropY.value = tempCropY.value;
    window.addEventListener('mousemove', onCropMouseMove);
    window.addEventListener('mouseup', onCropMouseUp);
  };

  const onCropMouseMove = (e: MouseEvent) => {
    if (!isDraggingCrop.value) return;
    const dx = e.clientX - dragStartX.value;
    const dy = e.clientY - dragStartY.value;
    tempCropX.value = initialCropX.value + (dx / tempCropScale.value);
    tempCropY.value = initialCropY.value + (dy / tempCropScale.value);
  };

  const onCropMouseUp = () => {
    isDraggingCrop.value = false;
    window.removeEventListener('mousemove', onCropMouseMove);
    window.removeEventListener('mouseup', onCropMouseUp);
  };

  const startResizing = (e: MouseEvent, direction: 'r' | 'b' | 'se') => {
    e.preventDefault(); e.stopPropagation();
    if (direction === 'r') isResizingWidth.value = true;
    if (direction === 'b') isResizingHeight.value = true;
    if (direction === 'se') isResizingBoth.value = true;
    resizeStartX.value = e.clientX; resizeStartY.value = e.clientY;
    resizeStartWidth.value = tempWidth.value; resizeStartHeight.value = tempHeight.value;
    window.addEventListener('mousemove', onResizeMouseMove);
    window.addEventListener('mouseup', onResizeMouseUp);
  };

  const onResizeMouseMove = (e: MouseEvent) => {
    const dx = e.clientX - resizeStartX.value; const dy = e.clientY - resizeStartY.value;
    if (isResizingWidth.value || isResizingBoth.value) tempWidth.value = Math.max(80, Math.min(800, resizeStartWidth.value + dx));
    if (isResizingHeight.value || isResizingBoth.value) tempHeight.value = Math.max(80, Math.min(800, resizeStartHeight.value + dy));
  };

  const onResizeMouseUp = () => {
    isResizingWidth.value = isResizingHeight.value = isResizingBoth.value = false;
    window.removeEventListener('mousemove', onResizeMouseMove);
    window.removeEventListener('mouseup', onResizeMouseUp);
  };

  const saveCrop = async () => {
    if (!activePhotoRef) return;
    const photoId = activePhotoRef.id;
    croppingPhotoId.value = null;
    window.removeEventListener('click', onGlobalClick);
    
    if (activePhotoRef.is_cover) {
      const { activeAlbum, updateAlbumField } = useAlbumEditorStore();
      if (activeAlbum.value) {
        const prefix = activePhotoRef.cover_type === 'front' ? 'cover' : 'back_cover';
        await updateAlbumField(activeAlbum.value.id, `${prefix}_crop_x`, tempCropX.value);
        await updateAlbumField(activeAlbum.value.id, `${prefix}_crop_y`, tempCropY.value);
        await updateAlbumField(activeAlbum.value.id, `${prefix}_crop_scale`, tempCropScale.value);
      }
    } else {
      await updatePhotoCrop(photoId, tempCropX.value, tempCropY.value, tempCropScale.value, tempWidth.value, tempHeight.value);
    }
    activePhotoRef = null;
  };

  const getImageStyle = (photo: any) => {
    const isCurrentlyCropping = croppingPhotoId.value === photo.id;
    const x = isCurrentlyCropping ? tempCropX.value : (photo.crop_x ?? 0);
    const y = isCurrentlyCropping ? tempCropY.value : (photo.crop_y ?? 0);
    const scale = isCurrentlyCropping ? tempCropScale.value : (photo.crop_scale ?? 1.0);
    return {
      transform: `scale(${scale}) translate(${x}px, ${y}px)`,
      transformOrigin: 'center center',
      cursor: isCurrentlyCropping ? (isDraggingCrop.value ? 'grabbing' : 'grab') : 'default',
      transition: isCurrentlyCropping ? 'none' : 'transform 0.25s'
    };
  };

  const cleanup = () => {
    window.removeEventListener('click', onGlobalClick);
    window.removeEventListener('mousemove', onCropMouseMove);
    window.removeEventListener('mouseup', onCropMouseUp);
    window.removeEventListener('mousemove', onResizeMouseMove);
    window.removeEventListener('mouseup', onResizeMouseUp);
  };

  onBeforeUnmount(cleanup);

  return {
    croppingPhotoId,
    tempCropScale,
    tempWidth,
    tempHeight,
    startCropping,
    onCropMouseDown,
    startResizing,
    getImageStyle,
    saveCrop
  };
}