<template>
  <div class="book-scene">
    <!-- COUCHE 1 : Surface de table (contexte environnemental) -->
    <div class="table-surface" aria-hidden="true" />

    <!-- WRAPPER DE ZOOM : appliqué au livre entier -->
    <div
      class="book-zoom-wrapper"
      :style="{
        transform: `scale(${canvasZoom / 100})`,
        transformOrigin: 'center center'
      }"
    >
      <!-- COUCHE 2 & 3 : Conteneur livre (ombres + tranche) -->
      <div
        class="book-container"
        :class="{
          'flipping-next': isFlipping && flipDirection === 'next',
          'flipping-prev': isFlipping && flipDirection === 'prev'
        }"
      >
        <!-- RELIURE CENTRALE — Couche 5 -->
        <template
          v-if="
            !(activePageIdx === 0 && isFullWrapCover) &&
            !(leftPage && isPageRestricted(leftPage.id)) &&
            !(rightPage && isPageRestricted(rightPage.id))
          "
        >
          <!-- Ligne physique de jonction -->
          <div class="spine-line" aria-hidden="true" />
          <!-- Halo de profondeur progressif -->
          <div class="spine-glow" aria-hidden="true" />
          <!-- Reflet spéculaire linéaire sur la reliure -->
          <div class="spine-specular" aria-hidden="true" />
        </template>

        <!-- DOUBLE-PAGE SPREAD -->
        <div class="book-pages-spread">
          <!-- A. COUVERTURE UNIFIÉE PLEIN FORMAT (page index 0) -->
          <AlbumBookSpreadFullWrap
            v-if="activePageIdx === 0 && isFullWrapCover"
            :active-album="activeAlbum"
            v-bind="$attrs"
          />

          <!-- B. PAGES INTÉRIEURES ET COUVERTURE SÉPARÉE -->
          <template v-else>
            <!-- LEFT PAGE / COUVERTURE ARRIÈRE -->
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

            <div
              v-else-if="leftPage"
              class="book-page left-page"
              :class="{ 'garde-page': isPageRestricted(leftPage.id) }"
              :style="{ backgroundColor: isPageRestricted(leftPage.id) ? '#ffffff' : (leftPage.background_color || '#f8f5f0') }"
            >
              <!-- Vignette de courbure interne (uniquement si ce n'est pas une page de garde restricted) -->
              <div v-if="!isPageRestricted(leftPage.id)" class="page-curve-overlay left-curve" aria-hidden="true" />
              <!-- Micro-texture papier (uniquement si ce n'est pas une page de garde restricted) -->
              <div v-if="!isPageRestricted(leftPage.id)" class="page-texture-overlay" aria-hidden="true" />

              <AlbumBookPageHeader v-if="!isPageRestricted(leftPage.id)" :page="leftPage" />
              <AlbumBookPageContent :page="leftPage" />
            </div>

            <div v-else class="book-page left-page" style="background-color: #ffffff;"/>

            <!-- RIGHT PAGE / COUVERTURE AVANT -->
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

            <div
              v-else-if="rightPage"
              class="book-page right-page"
              :class="{ 'garde-page': isPageRestricted(rightPage.id) }"
              :style="{ backgroundColor: isPageRestricted(rightPage.id) ? '#ffffff' : (rightPage.background_color || '#f8f5f0') }"
            >
              <!-- Vignette de courbure interne (uniquement si ce n'est pas une page de garde restricted) -->
              <div v-if="!isPageRestricted(rightPage.id)" class="page-curve-overlay right-curve" aria-hidden="true" />
              <!-- Micro-texture papier (uniquement si ce n'est pas une page de garde restricted) -->
              <div v-if="!isPageRestricted(rightPage.id)" class="page-texture-overlay" aria-hidden="true" />

              <AlbumBookPageHeader v-if="!isPageRestricted(rightPage.id)" :page="rightPage" />
              <AlbumBookPageContent :page="rightPage" />
            </div>

            <div v-else class="book-page right-page" style="background-color: #ffffff;"/>
          </template>
        </div>

        <!-- COUCHE 6 : Reflet de lumière ambiante sur la surface du livre -->
        <div class="book-ambient-light" aria-hidden="true" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';

defineProps<{
  activeAlbum: any;
  activePageIdx: number;
  leftPage: any;
  rightPage: any;
  isFullWrapCover: boolean;
  isCoverDragOver: boolean;
  isBackCoverDragOver: boolean;
  isFlipping: boolean;
  flipDirection: 'next' | 'prev' | null;
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