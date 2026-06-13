import { useAlbumEditorStore } from './useAlbumEditorStore';

export function usePolaroidDragResize(
  props: { photo: any; readonly?: boolean; },
  GRID_COLS: number = 24, GRID_ROWS: number = 18
) {
  const { updatePhotoPosition, activeAlbum, fetchAlbumDetail, focusedPhotoId } = useAlbumEditorStore();

  const onMousedown = (e: MouseEvent, startCropping: () => void) => {
    if (props.readonly) return;
    if (e.detail === 2) {
      e.preventDefault(); e.stopPropagation(); startCropping(); return;
    }
    if (e.target.closest('button, .resize-handle, .crop-toolbar, .grid-resize-handle')) return;

    focusedPhotoId.value = props.photo.id;
    const startX = e.clientX; const startY = e.clientY;
    const frameEl = e.currentTarget as HTMLElement;
    const wrapperEl = frameEl.closest('.grid-canvas') as HTMLElement;
    if (!wrapperEl) return;

    const wrapperRect = wrapperEl.getBoundingClientRect();
    const cellWidth = wrapperRect.width / GRID_COLS;
    const cellHeight = wrapperRect.height / GRID_ROWS;

    let colStart = props.photo.custom_x; let rowStart = props.photo.custom_y;
    let spanW = props.photo.custom_width ?? 8; let spanH = props.photo.custom_height ?? 8;

    if (colStart === null || rowStart === null) {
      const order = props.photo.order ?? 0;
      if (order === 0) { colStart = 2; rowStart = 2; spanW = 10; spanH = 8; }
      else if (order === 1) { colStart = 13; rowStart = 2; spanW = 10; spanH = 8; }
      else if (order === 2) { colStart = 2; rowStart = 11; spanW = 10; spanH = 8; }
      else if (order === 3) { colStart = 13; rowStart = 11; spanW = 10; spanH = 8; }
      else { colStart = 2 + (order % 4) * 4; rowStart = 2 + Math.floor(order / 4) * 4; }
    }

    const initialPixelX = (colStart - 1) * cellWidth;
    const initialPixelY = (rowStart - 1) * cellHeight;
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
      window.removeEventListener('mousemove', onMousemove);
      window.removeEventListener('mouseup', onMouseup);

      if (hasMoved) {
        const dx = upEvent.clientX - startX; const dy = upEvent.clientY - startY;
        const currentPixelX = initialPixelX + dx; const currentPixelY = initialPixelY + dy;
        let col = Math.round(currentPixelX / cellWidth) + 1;
        let row = Math.round(currentPixelY / cellHeight) + 1;
        col = Math.max(1, Math.min(GRID_COLS - spanW + 1, col));
        row = Math.max(1, Math.min(GRID_ROWS - spanH + 1, row));

        await updatePhotoPosition(props.photo.id, col, row, spanW, spanH);
        if (activeAlbum.value) await fetchAlbumDetail(activeAlbum.value.id, true);
      }
    };

    window.addEventListener('mousemove', onMousemove);
    window.addEventListener('mouseup', onMouseup);
  };

  const onResizeMousedown = (e: MouseEvent) => {
    if (props.readonly) return;
    const startX = e.clientX; const startY = e.clientY;
    const frameEl = e.currentTarget.closest('.polaroid-frame') as HTMLElement;
    const wrapperEl = frameEl.closest('.grid-canvas') as HTMLElement;
    if (!wrapperEl) return;

    const wrapperRect = wrapperEl.getBoundingClientRect();
    const cellWidth = wrapperRect.width / GRID_COLS;
    const cellHeight = wrapperRect.height / GRID_ROWS;

    let colStart = props.photo.custom_x; let rowStart = props.photo.custom_y;
    let initialSpanW = props.photo.custom_width; let initialSpanH = props.photo.custom_height;

    if (colStart === null || rowStart === null) {
      const order = props.photo.order ?? 0;
      if (order === 0) { colStart = 2; rowStart = 2; initialSpanW = 10; initialSpanH = 8; }
      else if (order === 1) { colStart = 13; rowStart = 2; initialSpanW = 10; initialSpanH = 8; }
      else if (order === 2) { colStart = 2; rowStart = 11; initialSpanW = 10; initialSpanH = 8; }
      else if (order === 3) { colStart = 13; rowStart = 11; initialSpanW = 10; initialSpanH = 8; }
      else {
        colStart = 2 + (order % 4) * 4; rowStart = 2 + Math.floor(order / 4) * 4;
        initialSpanW = 8; initialSpanH = 8;
      }
    }

    initialSpanW = initialSpanW ?? 8; initialSpanH = initialSpanH ?? 8;
    let finalSpanW = initialSpanW; let finalSpanH = initialSpanH;

    const onMousemove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      const dx = moveEvent.clientX - startX; const dy = moveEvent.clientY - startY;
      const deltaCellsW = Math.round(dx / cellWidth); const deltaCellsH = Math.round(dy / cellHeight);
      finalSpanW = Math.max(2, Math.min(GRID_COLS - colStart + 1, initialSpanW + deltaCellsW));
      finalSpanH = Math.max(2, Math.min(GRID_ROWS - rowStart + 1, initialSpanH + deltaCellsH));

      frameEl.style.gridColumnEnd = `${colStart + finalSpanW}`;
      frameEl.style.gridRowEnd = `${rowStart + finalSpanH}`;
      frameEl.style.zIndex = '100';
    };

    const onMouseup = async () => {
      window.removeEventListener('mousemove', onMousemove);
      window.removeEventListener('mouseup', onMouseup);
      await updatePhotoPosition(props.photo.id, colStart, rowStart, finalSpanW, finalSpanH);
      if (activeAlbum.value) await fetchAlbumDetail(activeAlbum.value.id, true);
    };

    window.addEventListener('mousemove', onMousemove);
    window.addEventListener('mouseup', onMouseup);
  };

  return {
    onMousedown,
    onResizeMousedown
  };
}
