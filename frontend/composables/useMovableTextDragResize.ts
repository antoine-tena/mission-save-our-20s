import { useAlbumEditorStore } from './useAlbumEditorStore';
import { parseTextBoxes, serializeTextBoxes } from '~/utils/textBoxes';
import { useGridDragResize } from './useGridDragResize';

export function useMovableTextDragResize(
  props: { box: any; page: any; readonly: boolean; },
  isFocused: any,
  GRID_COLS: number = 24, GRID_ROWS: number = 18
) {
  const { updatePageField, fetchAlbumDetail } = useAlbumEditorStore();

  const dragResize = useGridDragResize({
    readonly: props.readonly,
    frameSelector: '.movable-text-box',
    ignoredSelectors: 'button, .resize-handle',
    gridCols: GRID_COLS,
    gridRows: GRID_ROWS,
    getGeometry: () => ({
      x: props.box.x,
      y: props.box.y,
      w: props.box.w,
      h: props.box.h
    }),
    onDragStart: () => {
      isFocused.value = true;
    },
    onDragEnd: async (col, row, w, h, targetPageId) => {
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
          targetBoxes.push({
            id: props.box.id,
            text: props.box.text,
            x: col,
            y: row,
            w: props.box.w, // use original width/height from box definition
            h: props.box.h
          });
          await updatePageField(targetPageId, 'description', serializeTextBoxes(targetBoxes));
        }
      } else {
        const boxes = parseTextBoxes(props.page.description);
        const index = boxes.findIndex(b => b.id === props.box.id);
        if (index !== -1) {
          boxes[index].x = col;
          boxes[index].y = row;
          await updatePageField(props.page.id, 'description', serializeTextBoxes(boxes));
        }
      }
      await fetchAlbumDetail(props.page.album, true);
    },
    onResizeEnd: async (col, row, finalSpanW, finalSpanH) => {
      const boxes = parseTextBoxes(props.page.description);
      const index = boxes.findIndex(b => b.id === props.box.id);
      if (index !== -1) {
        boxes[index].w = finalSpanW;
        boxes[index].h = finalSpanH;
        await updatePageField(props.page.id, 'description', serializeTextBoxes(boxes));
        await fetchAlbumDetail(props.page.album, true);
      }
    }
  });

  return {
    onMousedown: dragResize.onMousedown,
    onResizeMousedown: dragResize.onResizeMousedown
  };
}
