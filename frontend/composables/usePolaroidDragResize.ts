import { useAlbumEditorStore } from './useAlbumEditorStore';
import { getDefaultPhotoSlot } from '~/utils/photoSlots';
import { useGridDragResize } from './useGridDragResize';

export function usePolaroidDragResize(
  props: { photo: any; readonly?: boolean; },
  GRID_COLS: number = 24, GRID_ROWS: number = 18
) {
  const { updatePhotoPosition, activeAlbum, fetchAlbumDetail, focusedPhotoId } = useAlbumEditorStore();

  const dragResize = useGridDragResize({
    readonly: props.readonly,
    frameSelector: '.polaroid-frame',
    ignoredSelectors: 'button, .resize-handle, .crop-toolbar, .grid-resize-handle',
    gridCols: GRID_COLS,
    gridRows: GRID_ROWS,
    getGeometry: () => {
      let x = props.photo.custom_x;
      let y = props.photo.custom_y;
      let w = props.photo.custom_width;
      let h = props.photo.custom_height;
      if (x === null || y === null) {
        const slot = getDefaultPhotoSlot(props.photo.order ?? 0);
        x = slot.x;
        y = slot.y;
        w = w ?? slot.w;
        h = h ?? slot.h;
      }
      return { x, y, w: w ?? 8, h: h ?? 8 };
    },
    onDragStart: () => {
      focusedPhotoId.value = props.photo.id;
    },
    onDragEnd: async (col, row, w, h, targetPageId) => {
      const originPageId = props.photo.page;
      const pageChanged = targetPageId !== null && targetPageId !== originPageId;

      await updatePhotoPosition(props.photo.id, col, row, w, h, pageChanged ? targetPageId : null);
      if (activeAlbum.value) {
        await fetchAlbumDetail(activeAlbum.value.id, true);
      }
    },
    onResizeEnd: async (col, row, w, h) => {
      await updatePhotoPosition(props.photo.id, col, row, w, h);
      if (activeAlbum.value) {
        await fetchAlbumDetail(activeAlbum.value.id, true);
      }
    }
  });

  const onMousedown = (e: MouseEvent, ..._args: any[]) => {
    dragResize.onMousedown(e);
  };

  return {
    onMousedown,
    onResizeMousedown: dragResize.onResizeMousedown
  };
}
