import { useAlbumEditorStore } from './useAlbumEditorStore';
import { parseTextBoxes, serializeTextBoxes } from '~/utils/textBoxes';

export function useMovableTextDragResize(
  props: { box: any; page: any; readonly: boolean; },
  isFocused: any,
  GRID_COLS: number = 24, GRID_ROWS: number = 18
) {
  const { updatePageField, fetchAlbumDetail } = useAlbumEditorStore();

  const onMousedown = (e: MouseEvent) => {
    if (props.readonly) return;
    if (e.target.closest('button, .resize-handle')) return;

    isFocused.value = true;
    const startX = e.clientX; const startY = e.clientY;
    const frameEl = e.currentTarget as HTMLElement;
    const wrapperEl = frameEl.closest('.grid-canvas') as HTMLElement;
    if (!wrapperEl) return;

    const wrapperRect = wrapperEl.getBoundingClientRect();
    const cellWidth = wrapperRect.width / GRID_COLS; const cellHeight = wrapperRect.height / GRID_ROWS;
    const initialPixelX = (props.box.x - 1) * cellWidth; const initialPixelY = (props.box.y - 1) * cellHeight;
    let hasMoved = false;

    const onMousemove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX; const dy = moveEvent.clientY - startY;
      if (!hasMoved && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) hasMoved = true;

      if (hasMoved) {
        moveEvent.preventDefault();
        const currentPixelX = initialPixelX + dx; const currentPixelY = initialPixelY + dy;
        let col = Math.round(currentPixelX / cellWidth) + 1;
        let row = Math.round(currentPixelY / cellHeight) + 1;
        col = Math.max(1, Math.min(GRID_COLS - props.box.w + 1, col));
        row = Math.max(1, Math.min(GRID_ROWS - props.box.h + 1, row));

        frameEl.style.gridColumnStart = `${col}`; frameEl.style.gridColumnEnd = `${col + props.box.w}`;
        frameEl.style.gridRowStart = `${row}`; frameEl.style.gridRowEnd = `${row + props.box.h}`;
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
        let col = props.box.x; let row = props.box.y;
        let targetPageId: number | null = null;

        if (targetCanvas) {
          targetPageId = parseInt(targetCanvas.getAttribute('data-page-id') || '', 10) || null;
          const targetRect = targetCanvas.getBoundingClientRect();
          const dropX = upEvent.clientX - targetRect.left; const dropY = upEvent.clientY - targetRect.top;
          const cellWidthTarget = targetRect.width / GRID_COLS; const cellHeightTarget = targetRect.height / GRID_ROWS;

          col = Math.floor(dropX / cellWidthTarget) + 1 - Math.floor(props.box.w / 2);
          row = Math.floor(dropY / cellHeightTarget) + 1 - Math.floor(props.box.h / 2);
          col = Math.max(1, Math.min(GRID_COLS - props.box.w + 1, col));
          row = Math.max(1, Math.min(GRID_ROWS - props.box.h + 1, row));
        } else {
          const dx = upEvent.clientX - startX; const dy = upEvent.clientY - startY;
          const currentPixelX = initialPixelX + dx; const currentPixelY = initialPixelY + dy;
          col = Math.round(currentPixelX / cellWidth) + 1; col = Math.max(1, Math.min(GRID_COLS - props.box.w + 1, col));
          row = Math.round(currentPixelY / cellHeight) + 1; row = Math.max(1, Math.min(GRID_ROWS - props.box.h + 1, row));
        }

        const originPageId = props.page.id;
        const pageChanged = targetPageId !== null && targetPageId !== originPageId;

        if (pageChanged) {
          const originBoxes = parseTextBoxes(props.page.description);
          const filtered = originBoxes.filter(b => b.id !== props.box.id);
          await updatePageField(originPageId, 'description', serializeTextBoxes(filtered));

          const { activeAlbum: storeAlbum } = useAlbumEditorStore();
          const targetPage = storeAlbum.value?.pages.find(p => p.id === targetPageId);
          if (targetPage) {
            const targetBoxes = parseTextBoxes(targetPage.description);
            targetBoxes.push({ id: props.box.id, text: props.box.text, x: col, y: row, w: props.box.w, h: props.box.h });
            await updatePageField(targetPageId, 'description', serializeTextBoxes(targetBoxes));
          }
        } else {
          const boxes = parseTextBoxes(props.page.description);
          const index = boxes.findIndex(b => b.id === props.box.id);
          if (index !== -1) {
            boxes[index].x = col; boxes[index].y = row;
            await updatePageField(props.page.id, 'description', serializeTextBoxes(boxes));
          }
        }
        await fetchAlbumDetail(props.page.album, true);
      }
    };
    window.addEventListener('mousemove', onMousemove); window.addEventListener('mouseup', onMouseup);
  };

  const onResizeMousedown = (e: MouseEvent) => {
    if (props.readonly) return;
    const startX = e.clientX; const startY = e.clientY;
    const frameEl = e.currentTarget.closest('.movable-text-box') as HTMLElement;
    const wrapperEl = frameEl.closest('.grid-canvas') as HTMLElement;
    if (!wrapperEl) return;

    const wrapperRect = wrapperEl.getBoundingClientRect();
    const cellWidth = wrapperRect.width / GRID_COLS; const cellHeight = wrapperRect.height / GRID_ROWS;
    let finalSpanW = props.box.w; let finalSpanH = props.box.h;

    const onMousemove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      const dx = moveEvent.clientX - startX; const dy = moveEvent.clientY - startY;
      const deltaCellsW = Math.round(dx / cellWidth); const deltaCellsH = Math.round(dy / cellHeight);
      finalSpanW = Math.max(2, Math.min(GRID_COLS - props.box.x + 1, props.box.w + deltaCellsW));
      finalSpanH = Math.max(2, Math.min(GRID_ROWS - props.box.y + 1, props.box.h + deltaCellsH));

      frameEl.style.gridColumnEnd = `${props.box.x + finalSpanW}`;
      frameEl.style.gridRowEnd = `${props.box.y + finalSpanH}`;
      frameEl.style.zIndex = '100';
    };

    const onMouseup = async () => {
      window.removeEventListener('mousemove', onMousemove); window.removeEventListener('mouseup', onMouseup);
      const boxes = parseTextBoxes(props.page.description);
      const index = boxes.findIndex(b => b.id === props.box.id);
      if (index !== -1) {
        boxes[index].w = finalSpanW; boxes[index].h = finalSpanH;
        await updatePageField(props.page.id, 'description', serializeTextBoxes(boxes));
        await fetchAlbumDetail(props.page.album, true);
      }
    };
    window.addEventListener('mousemove', onMousemove); window.addEventListener('mouseup', onMouseup);
  };

  return { onMousedown, onResizeMousedown };
}
