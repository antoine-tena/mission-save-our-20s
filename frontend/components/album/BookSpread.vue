<template>
  <div class="turn-page-controls-wrapper">
    <div class="turn-page-controls">
      <!-- Previous page arrow -->
      <button type="button" class="nav-turn-btn prev-btn" :disabled="activePageIdx <= 0 || isFlipping" @click="onTurnPage('prev')">
        <Icon name="lucide:chevron-left" />
      </button>

      <div class="book-and-controls-stack flex-1">
        <!-- 3D Book spread frame -->
        <div 
          class="book-container" 
          :class="{ 'flipping-next': isFlipping && flipDirection === 'next', 'flipping-prev': isFlipping && flipDirection === 'prev' }"
          :style="{ backgroundColor: activeAlbum?.cover_color || '#3d352e' }"
        >
          <div class="spine-line" v-if="!(activePageIdx === 0 && isFullWrapCover)"></div>
          <div class="spine-glow" v-if="!(activePageIdx === 0 && isFullWrapCover)"></div>
          <div class="book-pages-spread">
            
            <!-- A. UNIFIED FULL-WRAP OUTER COVER SPREAD (Spans both columns, width 640px) -->
            <AlbumBookSpreadFullWrap
              v-if="activePageIdx === 0 && isFullWrapCover"
              :active-album="activeAlbum"
              :is-cover-drag-over="isCoverDragOver"
              @dragover="onCoverDragOver"
              @dragleave="onCoverDragLeave"
              @drop="onFullWrapDrop"
              @delete="onDeleteCover"
              @toggle-wrap="toggleFullWrap"
            />

            <!-- B. SPLIT COVER SPREAD OR REGULAR PAGES -->
            <template v-else>
              <!-- LEFT PAGE -->
              <!-- Back Cover if activePageIdx === 0 -->
              <AlbumBookSpreadSplitCover
                v-if="activePageIdx === 0"
                type="back"
                :active-album="activeAlbum"
                :is-drag-over="isBackCoverDragOver"
                @dragover="onBackCoverDragOver"
                @dragleave="onBackCoverDragLeave"
                @drop="onBackCoverDrop"
                @delete="onDeleteBackCover"
                @toggle-wrap="toggleFullWrap"
                @dragstart="onBackCoverDragStart"
              />
              
              <!-- Regular interior left page -->
              <div v-else-if="leftPage" class="book-page left-page" :style="{ backgroundColor: leftPage.background_color || '#ffffff' }">
                <div class="page-corner-fold-left"></div>
                <AlbumBookPageHeader :page="leftPage" />
                <AlbumBookPageContent :page="leftPage" />
              </div>
              
              <!-- Blank interior left page fallback (if pages count is odd) -->
              <div v-else class="book-page left-page" style="background-color: #ffffff;">
                <div class="page-corner-fold-left"></div>
              </div>

              <!-- RIGHT PAGE -->
              <!-- Front Cover if activePageIdx === 0 -->
              <AlbumBookSpreadSplitCover
                v-if="activePageIdx === 0"
                type="front"
                :active-album="activeAlbum"
                :is-drag-over="isCoverDragOver"
                @dragover="onCoverDragOver"
                @dragleave="onCoverDragLeave"
                @drop="onCoverDrop"
                @delete="onDeleteCover"
                @toggle-wrap="toggleFullWrap"
              />
              
              <!-- Regular interior right page -->
              <div v-else-if="rightPage" class="book-page right-page relative" :style="{ backgroundColor: rightPage.background_color || '#ffffff' }">
                <div class="page-corner-fold-right"></div>
                <AlbumBookPageHeader :page="rightPage" />
                <AlbumBookPageContent :page="rightPage" />

                <!-- Floating page controls overlay for rightPage -->
                <div class="cover-overlay-minimal right-overlay flex flex-col gap-2">
                  <button type="button" class="delete-cover-btn-full-floating" @click.stop="retirePageStyle(rightPage)">
                    <Icon name="lucide:trash-2" /> Retirer
                  </button>
                  <button v-if="leftPage" type="button" class="toggle-wrap-btn-floating" @click.stop="propagateEnveloping(rightPage, leftPage)">
                    <Icon name="lucide:book-open" /> Rendre Enveloppante
                  </button>
                </div>
              </div>
              
              <!-- Blank interior right page fallback (if pages count is even) -->
              <div v-else class="book-page right-page" style="background-color: #ffffff;">
                <div class="page-corner-fold-right"></div>
              </div>
            </template>

          </div>
        </div>

        <!-- NEW: Extracted Global Pages Controls Row -->
        <div class="global-book-controls-row">
          <div class="page-controls-column">
            <AlbumToolbar v-if="leftPage && activePageIdx !== 0" :page="leftPage" />
          </div>
          <div class="page-controls-column">
            <AlbumToolbar v-if="rightPage && activePageIdx !== 0" :page="rightPage" />
          </div>
        </div>
      </div>

      <!-- Next page arrow -->
      <button type="button" class="nav-turn-btn next-btn" :disabled="activePageIdx >= maxPageIdx || isFlipping" @click="onTurnPage('next')">
        <Icon name="lucide:chevron-right" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBookSpreadLogic } from '~/composables/useBookSpreadLogic';
import { useBookCoverDrops } from '~/composables/useBookCoverDrops';

const props = defineProps<{ activePageIdx: number; }>();
const emit = defineEmits(['update:activePageIdx']);

const logicState = useBookSpreadLogic(props, emit);
const {
  activeAlbum, isFlipping, flipDirection, isCoverDragOver, isBackCoverDragOver,
  leftPage, rightPage, onTurnPage, toggleFullWrap, isFullWrapCover, maxPageIdx,
  retirePageStyle, propagateEnveloping
} = logicState;

const {
  onCoverDragOver, onCoverDragLeave, onBackCoverDragOver, onBackCoverDragLeave,
  onDeleteCover, onDeleteBackCover, onCoverDrop, onBackCoverDrop, onFullWrapDrop,
  onBackCoverDragStart
} = useBookCoverDrops(logicState);
</script>

<style scoped>
@import '~/assets/css/book-spread.css';
</style>