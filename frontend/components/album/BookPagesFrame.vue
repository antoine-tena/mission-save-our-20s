<template>
  <div 
    class="book-container" 
    :class="{ 'flipping-next': isFlipping && flipDirection === 'next', 'flipping-prev': isFlipping && flipDirection === 'prev' }"
    :style="{ 
      backgroundColor: activeAlbum?.cover_color || '#3d352e',
      transform: `scale(${canvasZoom / 100})`,
      transformOrigin: 'center center'
    }"
  >
    <div class="spine-line" v-if="!(activePageIdx === 0 && isFullWrapCover) && !(leftPage && isPageRestricted(leftPage.id)) && !(rightPage && isPageRestricted(rightPage.id))"></div>
    <div class="spine-glow" v-if="!(activePageIdx === 0 && isFullWrapCover) && !(leftPage && isPageRestricted(leftPage.id)) && !(rightPage && isPageRestricted(rightPage.id))"></div>
    <div class="book-pages-spread">
      
      <!-- A. UNIFIED FULL-WRAP OUTER COVER SPREAD -->
      <AlbumBookSpreadFullWrap
        v-if="activePageIdx === 0 && isFullWrapCover"
        :active-album="activeAlbum"
        :is-cover-drag-over="isCoverDragOver"
        @dragover="$emit('cover-dragover', $event)"
        @dragleave="$emit('cover-dragleave', $event)"
        @drop="$emit('full-wrap-drop', $event)"
        @delete="$emit('delete-cover')"
        @toggle-wrap="$emit('toggle-wrap', $event)"
      />

      <!-- B. SPLIT COVER SPREAD OR REGULAR PAGES -->
      <template v-else>
        <!-- LEFT PAGE -->
        <AlbumBookSpreadSplitCover
          v-if="activePageIdx === 0"
          type="back"
          :active-album="activeAlbum"
          :is-drag-over="isBackCoverDragOver"
          @dragover="$emit('back-cover-dragover', $event)"
          @dragleave="$emit('back-cover-dragleave', $event)"
          @drop="$emit('back-cover-drop', $event)"
          @delete="$emit('delete-back-cover')"
          @toggle-wrap="$emit('toggle-wrap', $event)"
          @dragstart="$emit('dragstart-back-cover', $event)"
        />
        
        <div v-else-if="leftPage" class="book-page left-page" :class="{ 'garde-page': isPageRestricted(leftPage.id) }" :style="{ backgroundColor: isPageRestricted(leftPage.id) ? '#ffffff' : (leftPage.background_color || '#ffffff') }">
          <div class="page-corner-fold-left" v-if="!isPageRestricted(leftPage.id)"></div>
          <AlbumBookPageHeader v-if="!isPageRestricted(leftPage.id)" :page="leftPage" />
          <AlbumBookPageContent :page="leftPage" />
        </div>
        
        <div v-else class="book-page left-page" style="background-color: #ffffff;">
          <div class="page-corner-fold-left"></div>
        </div>

        <!-- RIGHT PAGE -->
        <AlbumBookSpreadSplitCover
          v-if="activePageIdx === 0"
          type="front"
          :active-album="activeAlbum"
          :is-drag-over="isCoverDragOver"
          @dragover="$emit('cover-dragover', $event)"
          @dragleave="$emit('cover-dragleave', $event)"
          @drop="$emit('cover-drop', $event)"
          @delete="$emit('delete-cover')"
          @toggle-wrap="$emit('toggle-wrap', $event)"
        />
        
        <div v-else-if="rightPage" class="book-page right-page relative" :class="{ 'garde-page': isPageRestricted(rightPage.id) }" :style="{ backgroundColor: isPageRestricted(rightPage.id) ? '#ffffff' : (rightPage.background_color || '#ffffff') }">
          <div class="page-corner-fold-right" v-if="!isPageRestricted(rightPage.id)"></div>
          <AlbumBookPageHeader v-if="!isPageRestricted(rightPage.id)" :page="rightPage" />
          <AlbumBookPageContent :page="rightPage" />
        </div>
        
        <div v-else class="book-page right-page" style="background-color: #ffffff;">
          <div class="page-corner-fold-right"></div>
        </div>
      </template>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';

defineProps<{
  activeAlbum: any;
  activePageIdx: number;
  isFullWrapCover: boolean;
  isCoverDragOver: boolean;
  isBackCoverDragOver: boolean;
  leftPage: any;
  rightPage: any;
  isFlipping: boolean;
  flipDirection: 'prev' | 'next' | null;
  canvasZoom: number;
}>();

defineEmits([
  'cover-dragover', 'cover-dragleave', 'cover-drop',
  'back-cover-dragover', 'back-cover-dragleave', 'back-cover-drop',
  'full-wrap-drop', 'delete-cover', 'delete-back-cover', 'toggle-wrap',
  'dragstart-back-cover'
]);

const { isPageRestricted } = useAlbumEditorStore();
</script>

<style scoped>
@import '~/assets/css/book-spread.css';
</style>