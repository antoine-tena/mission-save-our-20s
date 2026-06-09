<template>
  <div 
    :data-photo-id="photo.id"
    class="polaroid-frame shadow-md"
    :class="{ 'cropping-active': croppingPhotoId === photo.id, 'readonly': readonly, 'focused': focusedPhotoId === photo.id }"
    :draggable="false"
    :style="getGridStyles()"
    @mousedown="onMousedown($event)"
    @dblclick="readonly ? null : startCropping"
  >
    <div v-if="croppingPhotoId !== photo.id" class="washi-tape"></div>
    
    <div 
      class="image-crop-container"
      @mousedown="croppingPhotoId === photo.id ? onCropMouseDown($event) : null"
    >
      <img 
        :src="photo.image_url" 
        class="slot-image font-sans" 
        :style="getImageStyle()"
      />
    </div>

    <!-- Clear position / snap back button -->
    <button 
      v-if="croppingPhotoId !== photo.id && !readonly && photo.custom_x !== null" 
      type="button" 
      class="reset-position-btn" 
      title="Ajuster à la grille par défaut"
      @click.stop="resetPosition"
    >
      <Icon name="lucide:grid" />
    </button>

    <button 
      v-if="croppingPhotoId !== photo.id && !readonly" 
      type="button" 
      class="delete-photo-btn" 
      @click.stop="deletePhoto"
    >
      <Icon name="lucide:x" />
    </button>

    <!-- Crop Controls -->
    <AlbumCropToolbar v-if="croppingPhotoId === photo.id" v-model="tempCropScale" />

    <!-- Resize Handles for cropping (fine-tune scale/dimensions) -->
    <template v-if="croppingPhotoId === photo.id">
      <div class="resize-handle resize-handle-r" @mousedown="startResizing($event, 'r')"></div>
      <div class="resize-handle resize-handle-b" @mousedown="startResizing($event, 'b')"></div>
      <div class="resize-handle resize-handle-se" @mousedown="startResizing($event, 'se')">
        <Icon name="lucide:arrow-down-right" class="text-[8px] text-gray-400" />
      </div>
    </template>

    <!-- Bottom-right corner snap-to-grid resize handle -->
    <div 
      v-if="!readonly && croppingPhotoId !== photo.id" 
      class="grid-resize-handle" 
      @mousedown.stop.prevent="onResizeMousedown($event)"
    >
      <Icon name="lucide:arrow-down-right" class="text-xs text-gray-500" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';
import { usePhotoCrop } from '~/composables/usePhotoCrop';

const props = withDefaults(
  defineProps<{
    photo: any;
    pageId: number;
    readonly?: boolean;
  }>(),
  {
    readonly: false
  }
);
const { fetchAlbumDetail, draggedPhotoId, draggedSourcePageId, updatePhotoPosition, activeAlbum, focusedPhotoId } = useAlbumEditorStore();

const {
  croppingPhotoId,
  tempCropScale,
  tempWidth,
  tempHeight,
  startCropping: _startCropping,
  onCropMouseDown,
  startResizing,
  getImageStyle: _getImageStyle,
} = usePhotoCrop();

const startCropping = () => _startCropping(props.photo, `.polaroid-frame[data-photo-id="${props.photo.id}"]`);
const getImageStyle = () => _getImageStyle(props.photo);

// Snapping Constants
const GRID_COLS = 24;
const GRID_ROWS = 18;

const getGridStyles = () => {
  let colStart = props.photo.custom_x;
  let rowStart = props.photo.custom_y;
  let spanW = props.photo.custom_width;
  let spanH = props.photo.custom_height;

  // Fallback to dynamic, non-overlapping grid slots if not customized yet
  if (colStart === null || rowStart === null) {
    const order = props.photo.order ?? 0;
    if (order === 0) { colStart = 2; rowStart = 2; spanW = 10; spanH = 8; }
    else if (order === 1) { colStart = 13; rowStart = 2; spanW = 10; spanH = 8; }
    else if (order === 2) { colStart = 2; rowStart = 11; spanW = 10; spanH = 8; }
    else if (order === 3) { colStart = 13; rowStart = 11; spanW = 10; spanH = 8; }
    else {
      colStart = 2 + (order % 4) * 4;
      rowStart = 2 + Math.floor(order / 4) * 4;
      spanW = 8;
      spanH = 8;
    }
  }

  spanW = spanW ?? 8;
  spanH = spanH ?? 8;
  colStart = Math.max(1, Math.min(GRID_COLS - spanW + 1, colStart));
  rowStart = Math.max(1, Math.min(GRID_ROWS - spanH + 1, rowStart));

  const isFocused = focusedPhotoId.value === props.photo.id;

  return {
    gridColumnStart: `${colStart}`,
    gridColumnEnd: `${colStart + spanW}`,
    gridRowStart: `${rowStart}`,
    gridRowEnd: `${rowStart + spanH}`,
    zIndex: isFocused ? 20 : 10,
    transform: 'none' // Grid elements are straight for overlapping alignment
  };
};

const onMousedown = (e: MouseEvent) => {
  if (props.readonly) return;
  if (croppingPhotoId.value === props.photo.id) return;
  if (e.target.closest('button, .resize-handle, .crop-toolbar, .grid-resize-handle')) return;

  // Focus photo on click to put it on top of stack
  focusedPhotoId.value = props.photo.id;

  const startX = e.clientX;
  const startY = e.clientY;
  
  const frameEl = e.currentTarget as HTMLElement;
  const wrapperEl = frameEl.closest('.grid-canvas') as HTMLElement;
  if (!wrapperEl) return;

  const rect = frameEl.getBoundingClientRect();
  const wrapperRect = wrapperEl.getBoundingClientRect();

  const cellWidth = wrapperRect.width / GRID_COLS;
  const cellHeight = wrapperRect.height / GRID_ROWS;

  // Resolve grid dimensions
  let colStart = props.photo.custom_x;
  let rowStart = props.photo.custom_y;
  let spanW = props.photo.custom_width ?? 8;
  let spanH = props.photo.custom_height ?? 8;

  if (colStart === null || rowStart === null) {
    const order = props.photo.order ?? 0;
    if (order === 0) { colStart = 2; rowStart = 2; spanW = 10; spanH = 8; }
    else if (order === 1) { colStart = 13; rowStart = 2; spanW = 10; spanH = 8; }
    else if (order === 2) { colStart = 2; rowStart = 11; spanW = 10; spanH = 8; }
    else if (order === 3) { colStart = 13; rowStart = 11; spanW = 10; spanH = 8; }
    else {
      colStart = 2 + (order % 4) * 4;
      rowStart = 2 + Math.floor(order / 4) * 4;
    }
  }

  const initialPixelX = (colStart - 1) * cellWidth;
  const initialPixelY = (rowStart - 1) * cellHeight;

  let hasMoved = false;

  const onMousemove = (moveEvent: MouseEvent) => {
    const dx = moveEvent.clientX - startX;
    const dy = moveEvent.clientY - startY;

    if (!hasMoved && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
      hasMoved = true;
    }

    if (hasMoved) {
      moveEvent.preventDefault();
      const currentPixelX = initialPixelX + dx;
      const currentPixelY = initialPixelY + dy;

      let col = Math.round(currentPixelX / cellWidth) + 1;
      let row = Math.round(currentPixelY / cellHeight) + 1;

      col = Math.max(1, Math.min(GRID_COLS - spanW + 1, col));
      row = Math.max(1, Math.min(GRID_ROWS - spanH + 1, row));

      // Snapping visual representation in real-time
      frameEl.style.gridColumnStart = `${col}`;
      frameEl.style.gridColumnEnd = `${col + spanW}`;
      frameEl.style.gridRowStart = `${row}`;
      frameEl.style.gridRowEnd = `${row + spanH}`;
      frameEl.style.zIndex = '100';
    }
  };

  const onMouseup = async (upEvent: MouseEvent) => {
    window.removeEventListener('mousemove', onMousemove);
    window.removeEventListener('mouseup', onMouseup);

    if (hasMoved) {
      const dx = upEvent.clientX - startX;
      const dy = upEvent.clientY - startY;
      const currentPixelX = initialPixelX + dx;
      const currentPixelY = initialPixelY + dy;

      let col = Math.round(currentPixelX / cellWidth) + 1;
      let row = Math.round(currentPixelY / cellHeight) + 1;

      col = Math.max(1, Math.min(GRID_COLS - spanW + 1, col));
      row = Math.max(1, Math.min(GRID_ROWS - spanH + 1, row));

      await updatePhotoPosition(props.photo.id, col, row, spanW, spanH);
      if (activeAlbum.value) {
        await fetchAlbumDetail(activeAlbum.value.id, true);
      }
    }
  };

  window.addEventListener('mousemove', onMousemove);
  window.addEventListener('mouseup', onMouseup);
};

const onResizeMousedown = (e: MouseEvent) => {
  if (props.readonly) return;

  const startX = e.clientX;
  const startY = e.clientY;

  const frameEl = e.currentTarget.closest('.polaroid-frame') as HTMLElement;
  const wrapperEl = frameEl.closest('.grid-canvas') as HTMLElement;
  if (!wrapperEl) return;

  const rect = frameEl.getBoundingClientRect();
  const wrapperRect = wrapperEl.getBoundingClientRect();

  const cellWidth = wrapperRect.width / GRID_COLS;
  const cellHeight = wrapperRect.height / GRID_ROWS;

  // Resolve grid dimensions
  let colStart = props.photo.custom_x;
  let rowStart = props.photo.custom_y;
  let initialSpanW = props.photo.custom_width;
  let initialSpanH = props.photo.custom_height;

  if (colStart === null || rowStart === null) {
    const order = props.photo.order ?? 0;
    if (order === 0) { colStart = 2; rowStart = 2; initialSpanW = 10; initialSpanH = 8; }
    else if (order === 1) { colStart = 13; rowStart = 2; initialSpanW = 10; initialSpanH = 8; }
    else if (order === 2) { colStart = 2; rowStart = 11; initialSpanW = 10; initialSpanH = 8; }
    else if (order === 3) { colStart = 13; rowStart = 11; initialSpanW = 10; initialSpanH = 8; }
    else {
      colStart = 2 + (order % 4) * 4;
      rowStart = 2 + Math.floor(order / 4) * 4;
      initialSpanW = 8;
      initialSpanH = 8;
    }
  }

  initialSpanW = initialSpanW ?? 8;
  initialSpanH = initialSpanH ?? 8;

  let finalSpanW = initialSpanW;
  let finalSpanH = initialSpanH;

  const onMousemove = (moveEvent: MouseEvent) => {
    moveEvent.preventDefault();
    const dx = moveEvent.clientX - startX;
    const dy = moveEvent.clientY - startY;

    const deltaCellsW = Math.round(dx / cellWidth);
    const deltaCellsH = Math.round(dy / cellHeight);

    finalSpanW = Math.max(2, Math.min(GRID_COLS - colStart + 1, initialSpanW + deltaCellsW));
    finalSpanH = Math.max(2, Math.min(GRID_ROWS - rowStart + 1, initialSpanH + deltaCellsH));

    frameEl.style.gridColumnEnd = `${colStart + finalSpanW}`;
    frameEl.style.gridRowEnd = `${rowStart + finalSpanH}`;
    frameEl.style.zIndex = '100';
  };

  const onMouseup = async (upEvent: MouseEvent) => {
    window.removeEventListener('mousemove', onMousemove);
    window.removeEventListener('mouseup', onMouseup);

    await updatePhotoPosition(props.photo.id, colStart, rowStart, finalSpanW, finalSpanH);
    if (activeAlbum.value) {
      await fetchAlbumDetail(activeAlbum.value.id, true);
    }
  };

  window.addEventListener('mousemove', onMousemove);
  window.addEventListener('mouseup', onMouseup);
};

const resetPosition = async () => {
  try {
    await updatePhotoPosition(props.photo.id, null, null, null, null);
    if (activeAlbum.value) {
      await fetchAlbumDetail(activeAlbum.value.id, true);
    }
  } catch (err) {
    console.error('Failed to reset photo position:', err);
  }
};

const deletePhoto = async () => {
  try {
    const config = useRuntimeConfig();
    const token = useCookie<string | null>('auth_token');
    await $fetch(`${config.public.apiBase}/photos/${props.photo.id}/`, {
      method: 'PATCH', headers: { Authorization: `Token ${token.value}` }, body: { page: null, order: 0 }
    });
    await fetchAlbumDetail(props.pageId, true);
  } catch (err) { console.error(err); }
};
</script>

<style scoped>
.polaroid-frame { width: 100%; height: 100%; background: #ffffff; border-radius: 4px; padding: 6px 6px 18px 6px; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 6px 16px rgba(0,0,0,0.06); position: relative; display: flex; flex-direction: column; overflow: hidden; transform: rotate(-1deg); min-height: 0; cursor: grab; transition: transform 0.3s, box-shadow 0.3s; }
.polaroid-frame.cropping-active { transform: none !important; z-index: 50; box-shadow: 0 10px 25px rgba(99,102,241,0.25); border-color: rgba(99,102,241,0.4); cursor: default; overflow: visible !important; }
.polaroid-frame.focused { border-color: #6366f1; box-shadow: 0 8px 20px rgba(99,102,241,0.15); }
.polaroid-frame.readonly { cursor: default !important; transform: none !important; box-shadow: 0 4px 10px rgba(0,0,0,0.03); pointer-events: none; }
.polaroid-frame.readonly:hover { transform: none !important; }
.washi-tape { position: absolute; top: -14px; left: 50%; transform: translateX(-50%) rotate(-2deg); width: 55px; height: 22px; background-color: rgba(220, 210, 190, 0.45); backdrop-filter: blur(1px); border-left: 2px dashed rgba(0,0,0,0.03); border-right: 2px dashed rgba(0,0,0,0.03); z-index: 5; pointer-events: none; }
.image-crop-container { width: 100%; height: 100%; overflow: hidden; position: relative; background: #f7f6f2; border-radius: 2px; }
.slot-image { width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
.polaroid-frame.cropping-active .image-crop-container { cursor: grab; }
.polaroid-frame.cropping-active .image-crop-container:active { cursor: grabbing; }

.delete-photo-btn { position: absolute; top: 10px; right: 10px; background: rgba(239, 68, 68, 0.9); border: none; color: white; width: 20px; height: 20px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 10px; z-index: 10; opacity: 0; transition: opacity 0.2s; }
.polaroid-frame:hover .delete-photo-btn { opacity: 1; }

.reset-position-btn { position: absolute; top: 10px; left: 10px; background: rgba(99, 102, 241, 0.9); border: none; color: white; width: 20px; height: 20px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 10px; z-index: 10; opacity: 0; transition: opacity 0.2s; }
.polaroid-frame:hover .reset-position-btn { opacity: 1; }

.resize-handle { position: absolute; z-index: 110; background: transparent; transition: background 0.2s; }
.resize-handle:hover { background: rgba(99,102,241,0.2); }
.resize-handle-r { top: 0; right: 0; bottom: 0; width: 6px; cursor: col-resize; }
.resize-handle-b { left: 0; right: 0; bottom: 0; height: 6px; cursor: row-resize; }
.resize-handle-se { right: 2px; bottom: 2px; width: 14px; height: 14px; cursor: nwse-resize; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.03); border-radius: 3px; }
.resize-handle-se:hover { background: #6366f1; color: white; }

.grid-resize-handle { position: absolute; right: 4px; bottom: 4px; width: 16px; height: 16px; cursor: se-resize; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.05); border-radius: 4px; z-index: 50; transition: all 0.2s; opacity: 0; }
.polaroid-frame:hover .grid-resize-handle { opacity: 1; background: rgba(99, 102, 241, 0.15); }
.grid-resize-handle:hover { background: #6366f1 !important; color: white !important; }
</style>