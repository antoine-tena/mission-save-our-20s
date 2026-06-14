import { useAlbumEditorStore } from './useAlbumEditorStore';
import { getDefaultPhotoSlot } from '~/utils/photoSlots';

export function usePolaroidDragResize(
  props: { photo: any; readonly?: boolean; },
  GRID_COLS: number = 24, GRID_ROWS: number = 18
) {
  const { updatePhotoPosition, activeAlbum, fetchAlbumDetail, focusedPhotoId } = useAlbumEditorStore();

  const onMousedown = (e: MouseEvent, startCropping: () => void) => {
    if (props.readonly) return;
    if (e.target.closest('button, .resize-handle, .crop-toolbar, .grid-resize-handle')) return;

    focusedPhotoId.value = props.photo.id;
    const startX = e.clientX; const startY = e.clientY;
    const frameEl = e.currentTarget as HTMLElement;
    const wrapperEl = frameEl.closest('.grid-canvas') as HTMLElement;
    if (!wrapperEl) return;

    const wrapperRect = wrapperEl.getBoundingClientRect();
    const cellWidth = wrapperRect.width / GRID_COLS; const cellHeight = wrapperRect.height / GRID_ROWS;

    let colStart = props.photo.custom_x; let rowStart = props.photo.custom_y;
    let spanW = props.photo.custom_width; let spanH = props.photo.custom_height;
    if (colStart === null || rowStart === null) {
      const slot = getDefaultPhotoSlot(props.photo.order ?? 0);
      colStart = slot.x; rowStart = slot.y;
      if (spanW === null) spanW = slot.w;
      if (spanH === null) spanH = slot.h;
    }
    spanW = spanW ?? 8; spanH = spanH ?? 8;

    const initialPixelX = (colStart - 1) * cellWidth; const initialPixelY = (rowStart - 1) * cellHeight;
    let hasMoved = false;

    const onMousemove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX; const dy = moveEvent.clientY - startY;
      if (!hasMoved && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) hasMoved = true;

      if (hasMoved) {
        moveEvent.preventDefault();
        const currentPixelX = initialPixelX + dx; const currentPixelY = initialPixelY + dy;
        let col = Math.round(currentPixelX / cellWidth) + 1;
        let row = Math.round(currentPixelY / cellHeight) + 1;
        col = Math.max(1, Math.min(GRID_COLS - spanW + 1, col));
        row = Math.max(1, Math.min(GRID_ROWS - spanH + 1, row));

        frameEl.style.gridColumnStart = `${col}`; frameEl.style.gridColumnEnd = `${col + spanW}`;
        frameEl.style.gridRowStart = `${row}`; frameEl.style.gridRowEnd = `${row + spanH}`;
        frameEl.style.zIndex = '100';
      }
    };

    const onMouseup = async (upEvent: MouseEvent) => {
      window.removeEventListener('mousemove', onMousemove); window.removeEventListener('mouseup', onMouseup);
      if (hasMoved) {
        const originalDisplay = frameEl.style.display;
        frameEl.style.display = 'none';
        const elementUnderMouse = document.elementFromPoint(upEvent.clientX, upEvent.clientY);
        frameEl.style.display = originalDisplay;

        const targetCanvas = elementUnderMouse?.closest('.grid-canvas') as HTMLElement;
        let col = props.photo.custom_x; let row = props.photo.custom_y;
        let targetPageId: number | null = null;

        if (targetCanvas) {
          targetPageId = parseInt(targetCanvas.getAttribute('data-page-id') || '', 10) || null;
          const targetRect = targetCanvas.getBoundingClientRect();
          const dropX = upEvent.clientX - targetRect.left; const dropY = upEvent.clientY - targetRect.top;
          const cellWidthTarget = targetRect.width / GRID_COLS; const cellHeightTarget = targetRect.height / GRID_ROWS;

          col = Math.floor(dropX / cellWidthTarget) + 1 - Math.floor(spanW / 2);
          row = Math.floor(dropY / cellHeightTarget) + 1 - Math.floor(spanH / 2);
          col = Math.max(1, Math.min(GRID_COLS - spanW + 1, col));
          row = Math.max(1, Math.min(GRID_ROWS - spanH + 1, row));
        } else {
          const dx = upEvent.clientX - startX; const dy = upEvent.clientY - startY;
          const currentPixelX = initialPixelX + dx; const currentPixelY = initialPixelY + dy;
          col = Math.round(currentPixelX / cellWidth) + 1; col = Math.max(1, Math.min(GRID_COLS - spanW + 1, col));
          row = Math.round(currentPixelY / cellHeight) + 1; row = Math.max(1, Math.min(GRID_ROWS - spanH + 1, row));
        }

        const originPageId = props.photo.page;
        const pageChanged = targetPageId !== null && targetPageId !== originPageId;

        await updatePhotoPosition(props.photo.id, col, row, spanW, spanH, pageChanged ? targetPageId : null);
        if (activeAlbum.value) await fetchAlbumDetail(activeAlbum.value.id, true);
      }
    };
    window.addEventListener('mousemove', onMousemove); window.addEventListener('mouseup', onMouseup);
  };

  const onResizeMousedown = (e: MouseEvent) => {
    if (props.readonly) return;
    const startX = e.clientX; const startY = e.clientY;
    const frameEl = e.currentTarget.closest('.polaroid-frame') as HTMLElement;
    const wrapperEl = frameEl.closest('.grid-canvas') as HTMLElement;
    if (!wrapperEl) return;

    const wrapperRect = wrapperEl.getBoundingClientRect();
    const cellWidth = wrapperRect.width / GRID_COLS; const cellHeight = wrapperRect.height / GRID_ROWS;

    let colStart = props.photo.custom_x; let rowStart = props.photo.custom_y;
    let spanW = props.photo.custom_width; let spanH = props.photo.custom_height;
    if (colStart === null || rowStart === null) {
      const slot = getDefaultPhotoSlot(props.photo.order ?? 0);
      colStart = slot.x; rowStart = slot.y;
      if (spanW === null) spanW = slot.w;
      if (spanH === null) spanH = slot.h;
    }
    spanW = spanW ?? 8; spanH = spanH ?? 8;
    let finalSpanW = spanW; let finalSpanH = spanH;

    const onMousemove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      const dx = moveEvent.clientX - startX; const dy = moveEvent.clientY - startY;
      const deltaCellsW = Math.round(dx / cellWidth); const deltaCellsH = Math.round(dy / cellHeight);
      finalSpanW = Math.max(2, Math.min(GRID_COLS - colStart + 1, spanW + deltaCellsW));
      finalSpanH = Math.max(2, Math.min(GRID_ROWS - rowStart + 1, spanH + deltaCellsH));

      frameEl.style.gridColumnEnd = `${colStart + finalSpanW}`;
      frameEl.style.gridRowEnd = `${rowStart + finalSpanH}`;
      frameEl.style.zIndex = '100';
    };

    const onMouseup = async () => {
      window.removeEventListener('mousemove', onMousemove); window.removeEventListener('mouseup', onMouseup);
      await updatePhotoPosition(props.photo.id, colStart, rowStart, finalSpanW, finalSpanH);
      if (activeAlbum.value) await fetchAlbumDetail(activeAlbum.value.id, true);
    };
    window.addEventListener('mousemove', onMousemove); window.addEventListener('mouseup', onMouseup);
  };

  return { onMousedown, onResizeMousedown };
}
