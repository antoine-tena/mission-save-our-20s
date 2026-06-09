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

    <!-- Right Side Spread Control Toolbar -->
    <aside class="spread-right-toolbar">
      <div class="flex items-center gap-2 border-b border-gray-100 pb-2 mb-1">
        <Icon name="lucide:sliders" class="text-indigo-500 text-sm" />
        <h4 class="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider font-sans">Mise en page</h4>
      </div>

      <!-- FULL WRAP COVER MODE -->
      <div v-if="activePageIdx === 0 && isFullWrapCover" class="flex flex-col gap-3">
        <div class="page-section-header">
          <span class="text-xs font-bold text-gray-700">Couverture Enveloppante</span>
        </div>
        <div class="flex flex-col gap-2">
          <button type="button" class="right-tb-btn btn-retirer flex items-center gap-2 text-left" @click="onDeleteCover">
            <Icon name="lucide:trash-2" class="text-red-500" />
            <span>Retirer le style</span>
          </button>
          <button type="button" class="right-tb-btn btn-wrap flex items-center gap-2 text-left" @click="toggleFullWrap(false)">
            <Icon name="lucide:columns" class="text-indigo-500" />
            <span>Séparer en 2</span>
          </button>
        </div>
      </div>

      <!-- SPLIT COVER OR REGULAR SPREAD MODE -->
      <template v-else>
        <!-- LEFT PAGE SECTION -->
        <div class="flex flex-col gap-2">
          <div class="page-section-header flex items-center justify-between border-b border-gray-50 pb-1">
            <span class="text-[11px] font-bold text-gray-600 font-serif">
              {{ activePageIdx === 0 ? 'Couverture Fin (Gauche)' : `Page de Gauche (${activePageIdx - 1})` }}
            </span>
          </div>
          
          <div class="flex flex-col gap-1.5" v-if="activePageIdx === 0 || leftPage">
            <button 
              type="button" 
              class="right-tb-btn btn-retirer flex items-center gap-2 text-left" 
              @click="activePageIdx === 0 ? onDeleteBackCover() : retirePageStyle(leftPage)"
            >
              <Icon name="lucide:trash-2" class="text-red-500 text-xs" />
              <span class="text-[11px] text-gray-700 font-medium">Retirer le style</span>
            </button>
            <button 
              type="button" 
              class="right-tb-btn btn-wrap flex items-center gap-2 text-left" 
              @click="activePageIdx === 0 ? toggleFullWrap(true) : propagateEnveloping(leftPage, rightPage)"
              :disabled="activePageIdx !== 0 && !rightPage"
            >
              <Icon name="lucide:book-open" class="text-indigo-500 text-xs" />
              <span class="text-[11px] text-gray-700 font-medium">Rendre Enveloppante</span>
            </button>
          </div>
          <div v-else class="text-[10px] text-gray-400 italic">Page vide</div>
        </div>

        <div class="h-[1px] bg-gray-100 my-1"></div>

        <!-- RIGHT PAGE SECTION -->
        <div class="flex flex-col gap-2">
          <div class="page-section-header flex items-center justify-between border-b border-gray-50 pb-1">
            <span class="text-[11px] font-bold text-gray-600 font-serif">
              {{ activePageIdx === 0 ? 'Couverture Début (Droite)' : `Page de Droite (${activePageIdx})` }}
            </span>
          </div>
          
          <div class="flex flex-col gap-1.5" v-if="activePageIdx === 0 || rightPage">
            <button 
              type="button" 
              class="right-tb-btn btn-retirer flex items-center gap-2 text-left" 
              @click="activePageIdx === 0 ? onDeleteCover() : retirePageStyle(rightPage)"
            >
              <Icon name="lucide:trash-2" class="text-red-500 text-xs" />
              <span class="text-[11px] text-gray-700 font-medium">Retirer le style</span>
            </button>
            <button 
              type="button" 
              class="right-tb-btn btn-wrap flex items-center gap-2 text-left" 
              @click="activePageIdx === 0 ? toggleFullWrap(true) : propagateEnveloping(rightPage, leftPage)"
              :disabled="activePageIdx !== 0 && !leftPage"
            >
              <Icon name="lucide:book-open" class="text-indigo-500 text-xs" />
              <span class="text-[11px] text-gray-700 font-medium">Rendre Enveloppante</span>
            </button>
          </div>
          <div v-else class="text-[10px] text-gray-400 italic">Page vide</div>
        </div>
      </template>
    </aside>
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