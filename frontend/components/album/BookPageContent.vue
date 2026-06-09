<template>
  <div class="page-content-wrapper select-none" :class="{ 'readonly': readonly || isRestricted }">
    <!-- If Restricted Guard Page -->
    <div v-if="isRestricted" class="restricted-blank-page h-full w-full flex items-center justify-center">
      <!-- Completely blank white page -->
    </div>

    <!-- If Text-Only Layout -->
    <div v-else-if="page.layout_type === 'text-only'" class="text-only-layout" :class="{ 'readonly': readonly }">
      <textarea 
        v-model="page.description" 
        placeholder="Ajouter vos mémoires..." 
        class="page-textarea font-serif" 
        :class="{ 'readonly': readonly }"
        rows="6"
        :disabled="readonly"
        :readonly="readonly"
        @save="val => onDescBlur(val)"
      />
    </div>

    <!-- 24x18 Snapping Canvas Grid -->
    <div 
      v-else 
      class="grid-canvas" 
      :class="{ 'readonly': readonly }"
      @dragover.prevent
      @drop="readonly ? null : onDrop($event)"
    >
      <AlbumPolaroidPhoto 
        v-for="photo in page.photos" 
        :key="photo.id"
        :photo="photo"
        :page-id="page.id"
        :readonly="readonly"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';

const props = withDefaults(
  defineProps<{
    page: any;
    readonly?: boolean;
  }>(),
  {
    readonly: false
  }
);
const { updatePageField, fetchAlbumDetail, draggedPhotoId, draggedSourcePageId, isPageRestricted } = useAlbumEditorStore();

const isRestricted = computed(() => isPageRestricted(props.page.id));

const onDescBlur = (val: string) => updatePageField(props.page.id, 'description', val);

const onDrop = async (e: DragEvent) => {
  const droppedIdRaw = e.dataTransfer?.getData('text/plain');
  if (!droppedIdRaw || !/^\d+$/.test(droppedIdRaw)) return;
  const draggedId = parseInt(droppedIdRaw, 10);
  if (draggedPhotoId.value === null || draggedPhotoId.value !== draggedId) return;

  const wrapperEl = e.currentTarget as HTMLElement;
  const rect = wrapperEl.getBoundingClientRect();
  const dropX = e.clientX - rect.left;
  const dropY = e.clientY - rect.top;

  const GRID_COLS = 24;
  const GRID_ROWS = 18;

  const cellWidth = rect.width / GRID_COLS;
  const cellHeight = rect.height / GRID_ROWS;

  const defaultSpanW = 10;
  const defaultSpanH = 8;

  let colStart = Math.floor(dropX / cellWidth) + 1 - Math.floor(defaultSpanW / 2);
  let rowStart = Math.floor(dropY / cellHeight) + 1 - Math.floor(defaultSpanH / 2);

  colStart = Math.max(1, Math.min(GRID_COLS - defaultSpanW + 1, colStart));
  rowStart = Math.max(1, Math.min(GRID_ROWS - defaultSpanH + 1, rowStart));

  try {
    const config = useRuntimeConfig();
    const token = useCookie<string | null>('auth_token');

    await $fetch(`${config.public.apiBase}/photos/${draggedPhotoId.value}/`, {
      method: 'PATCH',
      headers: { Authorization: `Token ${token.value}` },
      body: {
        page: props.page.id,
        order: props.page.photos?.length || 0,
        custom_x: colStart,
        custom_y: rowStart,
        custom_width: defaultSpanW,
        custom_height: defaultSpanH
      }
    });

    await fetchAlbumDetail(props.page.album, true);
  } catch (err) {
    console.error(err);
  } finally {
    draggedPhotoId.value = null;
    draggedSourcePageId.value = null;
  }
};
</script>

<style scoped>
.page-content-wrapper { position: relative; flex: 1; display: flex; flex-direction: column; justify-content: center; overflow: hidden; max-height: 335px; width: 100%; }
.text-only-layout { display: flex; align-items: center; justify-content: center; padding: 1rem; }
.page-textarea { border: none; outline: none; background: transparent; width: 100%; font-size: 0.95rem; color: #52473e; resize: none; text-align: center; line-height: 1.8; }

.grid-canvas {
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-template-rows: repeat(18, 1fr);
  width: 100%;
  height: 100%;
  position: relative;
  overflow: visible;
  padding: 4px;
  box-sizing: border-box;
}

.grid-canvas.readonly {
  pointer-events: none;
}

.page-textarea.readonly,
.page-textarea:disabled {
  background: transparent !important;
  opacity: 1 !important;
  color: #52473e !important;
  -webkit-text-fill-color: #52473e !important;
  cursor: default;
  resize: none;
  pointer-events: none;
}
</style>
