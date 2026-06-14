<template>
  <div 
    :data-photo-id="photo.id"
    class="polaroid-frame shadow-md"
    :class="[
      `frame-style-${pageFrameStyle}`,
      { 'cropping-active': croppingPhotoId === photo.id, 'readonly': readonly, 'focused': focusedPhotoId === photo.id }
    ]"
    :draggable="false"
    :style="getGridStyles()"
    @mousedown="onMousedown($event, startCropping)"
    @dblclick.stop="handleDoubleClick()"
  >
    <div 
      class="image-crop-container relative"
      @mousedown="croppingPhotoId === photo.id ? onCropMouseDown($event) : null"
      @wheel.prevent.stop="croppingPhotoId === photo.id ? onCropWheel($event) : null"
    >
      <img :src="photo.image_url" class="slot-image font-sans" :style="getImageStyle()" />
      
      <!-- Rule-of-Thirds 3x3 Grid Overlay -->
      <div v-if="croppingPhotoId === photo.id" class="crop-grid-overlay absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 z-30">
        <div v-for="i in 9" :key="i" class="border border-white/20 border-dashed"></div>
      </div>
    </div>

    <!-- Central Washi Tape for 'polaroid-tape' style -->
    <div v-if="pageFrameStyle === 'polaroid-tape' && croppingPhotoId !== photo.id" class="washi-tape" :style="getTapeRotationStyle()"></div>

    <!-- 4 Corner Washi Tapes for 'washi-corners' style -->
    <template v-if="pageFrameStyle === 'washi-corners' && croppingPhotoId !== photo.id">
      <div class="corner-tape tl"></div>
      <div class="corner-tape tr"></div>
      <div class="corner-tape bl"></div>
      <div class="corner-tape br"></div>
    </template>

    <!-- Clear position / snap back button -->
    <button 
      v-if="croppingPhotoId !== photo.id && !readonly && photo.custom_x !== null" 
      type="button" class="reset-position-btn" title="Ajuster à la grille par défaut" @click.stop="resetPosition"
    >
      <Icon name="lucide:grid" />
    </button>

    <button v-if="croppingPhotoId !== photo.id && !readonly" type="button" class="delete-photo-btn" @click.stop="deletePhoto">
      <Icon name="lucide:x" />
    </button>

    <!-- Bottom-right corner snap-to-grid resize handle -->
    <div v-if="!readonly && croppingPhotoId !== photo.id" class="grid-resize-handle" @mousedown.stop.prevent="onResizeMousedown($event)">
      <Icon name="lucide:arrow-down-right" class="text-xs text-gray-500" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';
import { usePhotoCrop } from '~/composables/usePhotoCrop';
import { usePolaroidDragResize } from '~/composables/usePolaroidDragResize';
import { useAlbumHistory } from '~/composables/useAlbumHistory';
import { getDefaultPhotoSlot } from '~/utils/photoSlots';
import { useCookie } from '#app';

const props = withDefaults(
  defineProps<{ photo: any; pageId: number; readonly?: boolean; }>(),
  { readonly: false }
);

const { fetchAlbumDetail, updatePhotoPosition, activeAlbum, focusedPhotoId } = useAlbumEditorStore();
const { onMousedown, onResizeMousedown } = usePolaroidDragResize(props);
const {
  croppingPhotoId, tempCropScale, tempWidth, tempHeight,
  startCropping: _startCropping, onCropMouseDown, onCropWheel, startResizing, getImageStyle: _getImageStyle,
  saveCrop,
} = usePhotoCrop();

const startCropping = () => _startCropping(props.photo, `.polaroid-frame[data-photo-id="${props.photo.id}"]`);
const getImageStyle = () => _getImageStyle(props.photo);
const pageFrameStyle = computed(() => activeAlbum.value?.pages.find(p => p.id === props.pageId)?.location || 'polaroid-tape');

const handleDoubleClick = () => {
  if (props.readonly) return;
  if (croppingPhotoId.value === props.photo.id) saveCrop();
  else startCropping();
};

const GRID_COLS = 24; const GRID_ROWS = 18;

const getGridStyles = () => {
  let colStart = props.photo.custom_x; let rowStart = props.photo.custom_y;
  let spanW = props.photo.custom_width; let spanH = props.photo.custom_height;
  if (colStart === null || rowStart === null) {
    const slot = getDefaultPhotoSlot(props.photo.order ?? 0);
    colStart = slot.x; rowStart = slot.y;
    if (spanW === null) spanW = slot.w;
    if (spanH === null) spanH = slot.h;
  }
  spanW = spanW ?? 8; spanH = spanH ?? 8;
  colStart = Math.max(1, Math.min(GRID_COLS - spanW + 1, colStart));
  rowStart = Math.max(1, Math.min(GRID_ROWS - spanH + 1, rowStart));

  const isFocused = focusedPhotoId.value === props.photo.id;
  const isCropping = croppingPhotoId.value === props.photo.id;
  const angles = [-1.5, 1, -2.5, 1.8, -0.8, 2.2, -2, 1.2];
  const angle = angles[props.photo.id % angles.length];

  const styles: any = {
    gridColumnStart: `${colStart}`, gridColumnEnd: `${colStart + spanW}`,
    gridRowStart: `${rowStart}`, gridRowEnd: `${rowStart + spanH}`,
    zIndex: isFocused ? 20 : 10, transform: isCropping ? 'none' : `rotate(${angle}deg)`
  };
  if (isCropping) {
    styles.width = `${tempWidth.value}px`; styles.height = `${tempHeight.value}px`;
    styles.position = 'absolute';
  }
  return styles;
};

const getTapeRotationStyle = () => {
  const tapeAngles = [1.2, -2, 1.8, -1.2, -2.2, 1.5, -1, 2.5];
  const angle = tapeAngles[props.photo.id % tapeAngles.length];
  return { transform: `translateX(-50%) rotate(${angle}deg)` };
};

const resetPosition = async () => {
  try {
    await updatePhotoPosition(props.photo.id, null, null, null, null);
    if (activeAlbum.value) await fetchAlbumDetail(activeAlbum.value.id, true);
  } catch (err) { console.error('Failed to reset photo position:', err); }
};

const deletePhoto = async () => {
  try {
    const { recordHistory } = useAlbumHistory(); recordHistory();
    const config = useRuntimeConfig(); const token = useCookie<string | null>('auth_token');
    await $fetch(`${config.public.apiBase}/photos/${props.photo.id}/`, {
      method: 'PATCH', headers: { Authorization: `Token ${token.value}` }, body: { page: null, order: 0 }
    });
    await fetchAlbumDetail(props.pageId, true);
  } catch (err) { console.error(err); }
};
</script>

<style scoped>
@import '~/assets/css/polaroid-photo.css';
</style>