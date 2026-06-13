<template>
  <div class="page-content-wrapper select-none" :class="{ 'readonly': readonly || isRestricted }">
    <!-- If Restricted Guard Page -->
    <div v-if="isRestricted" class="restricted-blank-page h-full w-full flex items-center justify-center">
      <!-- Completely blank white page -->
    </div>

    <!-- Page Layout Container combining Rich Text & Photos Grid-Canvas -->
    <div v-else class="page-inner-container h-full w-full relative flex flex-col justify-start">
      
      <!-- Word-like Rich Text Editorial Box (Rule/Journal style) -->
      <AlbumRichTextEditorial :page="page" :readonly="readonly" />

      <!-- 24x18 Snapping Canvas Grid for photos -->
      <div 
        class="grid-canvas flex-1 relative" 
        :class="{ 'readonly': readonly, 'empty-grid-canvas': !page.photos || page.photos.length === 0 }"
        @dragover.prevent
        @drop="readonly ? null : onDrop($event)"
      >
        <!-- Premium tactile empty canvas placeholder -->
        <AlbumCanvasEmptyPlaceholder v-if="(!page.photos || page.photos.length === 0) && !readonly" />

        <AlbumPolaroidPhoto 
          v-for="photo in page.photos" 
          :key="photo.id"
          :photo="photo"
          :page-id="page.id"
          :readonly="readonly"
        />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRuntimeConfig, useCookie } from '#app';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';
import { useAlbumHistory } from '~/composables/useAlbumHistory';

const props = withDefaults(
  defineProps<{
    page: any;
    readonly?: boolean;
  }>(),
  { readonly: false }
);

const { fetchAlbumDetail, draggedPhotoId, isPageRestricted } = useAlbumEditorStore();
const isRestricted = computed(() => isPageRestricted(props.page.id));

const onDrop = async (e: DragEvent) => {
  const droppedIdRaw = e.dataTransfer?.getData('text/plain');
  if (!droppedIdRaw || !/^\d+$/.test(droppedIdRaw)) return;
  const draggedId = parseInt(droppedIdRaw, 10);
  if (draggedPhotoId.value === null || draggedPhotoId.value !== draggedId) return;

  const wrapperEl = e.currentTarget as HTMLElement;
  const rect = wrapperEl.getBoundingClientRect();
  const dropX = e.clientX - rect.left;
  const dropY = e.clientY - rect.top;

  const GRID_COLS = 24; const GRID_ROWS = 18;
  const cellWidth = rect.width / GRID_COLS; const cellHeight = rect.height / GRID_ROWS;
  const defaultSpanW = 10; const defaultSpanH = 8;

  let colStart = Math.floor(dropX / cellWidth) + 1 - Math.floor(defaultSpanW / 2);
  let rowStart = Math.floor(dropY / cellHeight) + 1 - Math.floor(defaultSpanH / 2);
  colStart = Math.max(1, Math.min(GRID_COLS - defaultSpanW + 1, colStart));
  rowStart = Math.max(1, Math.min(GRID_ROWS - defaultSpanH + 1, rowStart));

  try {
    const { recordHistory } = useAlbumHistory();
    recordHistory();
    const config = useRuntimeConfig();
    const token = useCookie<string | null>('auth_token');

    await $fetch(`${config.public.apiBase}/photos/${draggedPhotoId.value}/`, {
      method: 'PATCH', headers: { Authorization: `Token ${token.value}` },
      body: {
        page: props.page.id, order: props.page.photos?.length || 0,
        custom_x: colStart, custom_y: rowStart, custom_width: defaultSpanW, custom_height: defaultSpanH
      }
    });
    await fetchAlbumDetail(props.page.album, true);
  } catch (err) {
    console.error('Failed to drop photo in page grid canvas:', err);
  }
};
</script>

<style scoped>
@import '~/assets/css/book-page.css';
</style>