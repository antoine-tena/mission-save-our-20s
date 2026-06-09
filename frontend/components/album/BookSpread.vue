<template>
  <div class="turn-page-controls-wrapper">
    <div class="turn-page-controls">
      <!-- Previous page arrow -->
      <button type="button" class="nav-turn-btn prev-btn" :disabled="activePageIdx <= 0 || isFlipping" @click="onTurnPage('prev')">
        <Icon name="lucide:chevron-left" />
      </button>

      <!-- LEFT VERTICAL TOOLBAR (Page de Gauche / Back Cover) -->
      <div class="vertical-pill-toolbar select-none">
        <div v-if="!isCoverSpread && leftPage && isPageRestricted(leftPage.id)" class="flex flex-col items-center justify-center text-gray-400 font-sans text-xs font-semibold p-1" title="Garde verrouillée">
          <Icon name="lucide:lock" class="text-sm text-gray-300" />
        </div>
        <template v-else-if="isCoverSpread || leftPage">
          <!-- Color Picker -->
          <button 
            type="button" 
            class="color-dot-btn" 
            :style="{ backgroundColor: isCoverSpread ? (activeAlbum?.cover_color || '#3d352e') : (leftPage?.background_color || '#ffffff') }" 
            @click="isCoverSpread ? triggerAlbumColorPicker() : triggerLeftColorPicker()"
            :title="isCoverSpread ? 'Couleur de couverture' : 'Couleur de page (Gauche)'"
          ></button>

          <!-- Layout toggle -->
          <button 
            type="button" 
            class="pill-action-btn" 
            :class="{ 'active': !isCoverSpread && leftPage?.layout_type === 'text-only' }" 
            :disabled="isCoverSpread"
            @click="!isCoverSpread ? togglePageLayout(leftPage) : null" 
            title="Mode texte/photo"
          >
            <Icon name="lucide:align-left" />
          </button>

          <!-- Adjust slots count -->
          <button 
            type="button" 
            class="pill-action-btn" 
            :disabled="isCoverSpread || leftPage?.layout_type === 'text-only'"
            @click="!isCoverSpread ? cycleSlots(leftPage) : null" 
            title="Nombre de photos"
          >
            <Icon name="lucide:image" />
          </button>

          <!-- Add/Edit page title -->
          <button 
            type="button" 
            class="pill-action-btn" 
            :disabled="isCoverSpread"
            @click="!isCoverSpread ? injectTitle(leftPage) : null" 
            title="Titre de la page"
          >
            <Icon name="lucide:heading" />
          </button>

          <!-- Enveloping propagate / full wrap -->
          <button 
            type="button" 
            class="pill-action-btn" 
            @click="isCoverSpread ? toggleFullWrap(!isFullWrapCover) : propagateEnveloping(leftPage, rightPage)" 
            :disabled="!isCoverSpread && !rightPage" 
            :title="isCoverSpread ? (isFullWrapCover ? 'Séparer en 2' : 'Rendre Enveloppante') : 'Rendre Enveloppante'"
          >
            <Icon :name="isCoverSpread && isFullWrapCover ? 'lucide:columns' : 'lucide:book-open'" />
          </button>

          <!-- Delete cover style / page style -->
          <button 
            type="button" 
            class="pill-action-btn text-red-500 hover:bg-red-50" 
            @click="isCoverSpread ? onDeleteBackCover() : retirePageStyle(leftPage)" 
            title="Retirer le style"
          >
            <Icon name="lucide:trash-2" />
          </button>
        </template>
        <div v-else class="text-[10px] text-gray-300 font-sans italic flex flex-col items-center" title="Page de gauche vide">
          <Icon name="lucide:image-off" class="text-sm" />
        </div>
      </div>

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
              <div v-else-if="leftPage" class="book-page left-page" :class="{ 'garde-page': isPageRestricted(leftPage.id) }" :style="{ backgroundColor: isPageRestricted(leftPage.id) ? '#ffffff' : (leftPage.background_color || '#ffffff') }">
                <div class="page-corner-fold-left"></div>
                <AlbumBookPageHeader v-if="!isPageRestricted(leftPage.id)" :page="leftPage" />
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
              <div v-else-if="rightPage" class="book-page right-page relative" :class="{ 'garde-page': isPageRestricted(rightPage.id) }" :style="{ backgroundColor: isPageRestricted(rightPage.id) ? '#ffffff' : (rightPage.background_color || '#ffffff') }">
                <div class="page-corner-fold-right"></div>
                <AlbumBookPageHeader v-if="!isPageRestricted(rightPage.id)" :page="rightPage" />
                <AlbumBookPageContent :page="rightPage" />
              </div>
              
              <!-- Blank interior right page fallback (if pages count is even) -->
              <div v-else class="book-page right-page" style="background-color: #ffffff;">
                <div class="page-corner-fold-right"></div>
              </div>
            </template>

          </div>
        </div>

        <!-- Suggest background color automatically -->
        <div class="auto-color-spread-control-row" v-if="!isCoverSpread && (leftPage || rightPage)">
          <button 
            type="button" 
            class="auto-color-suggest-btn"
            :disabled="isAnalyzing"
            @click="applySuggestedColor"
          >
            <Icon :name="isAnalyzing ? 'svg-spinners:ring-resize' : 'lucide:sparkles'" class="magic-icon" :class="{ 'spinning': isAnalyzing }" />
            <span>{{ isAnalyzing ? 'Recherche de la meilleure couleur...' : 'Trouver automatiquement une couleur de fond' }}</span>
          </button>
        </div>

      </div>

      <!-- RIGHT VERTICAL TOOLBAR (Page de Droite / Front Cover) -->
      <div class="vertical-pill-toolbar select-none">
        <div v-if="!isCoverSpread && rightPage && isPageRestricted(rightPage.id)" class="flex flex-col items-center justify-center text-gray-400 font-sans text-xs font-semibold p-1" title="Garde verrouillée">
          <Icon name="lucide:lock" class="text-sm text-gray-300" />
        </div>
        <template v-else-if="isCoverSpread || rightPage">
          <!-- Color Picker -->
          <button 
            type="button" 
            class="color-dot-btn" 
            :style="{ backgroundColor: isCoverSpread ? (activeAlbum?.cover_color || '#3d352e') : (rightPage?.background_color || '#ffffff') }" 
            @click="isCoverSpread ? triggerAlbumColorPicker() : triggerRightColorPicker()"
            :title="isCoverSpread ? 'Couleur de couverture' : 'Couleur de page (Droite)'"
          ></button>

          <!-- Layout toggle -->
          <button 
            type="button" 
            class="pill-action-btn" 
            :class="{ 'active': !isCoverSpread && rightPage?.layout_type === 'text-only' }" 
            :disabled="isCoverSpread"
            @click="!isCoverSpread ? togglePageLayout(rightPage) : null" 
            title="Mode texte/photo"
          >
            <Icon name="lucide:align-left" />
          </button>

          <!-- Adjust slots count -->
          <button 
            type="button" 
            class="pill-action-btn" 
            :disabled="isCoverSpread || rightPage?.layout_type === 'text-only'"
            @click="!isCoverSpread ? cycleSlots(rightPage) : null" 
            title="Nombre de photos"
          >
            <Icon name="lucide:image" />
          </button>

          <!-- Add/Edit page title -->
          <button 
            type="button" 
            class="pill-action-btn" 
            :disabled="isCoverSpread"
            @click="!isCoverSpread ? injectTitle(rightPage) : null" 
            title="Titre de la page"
          >
            <Icon name="lucide:heading" />
          </button>

          <!-- Enveloping propagate / full wrap -->
          <button 
            type="button" 
            class="pill-action-btn" 
            @click="isCoverSpread ? toggleFullWrap(!isFullWrapCover) : propagateEnveloping(rightPage, leftPage)" 
            :disabled="!isCoverSpread && !leftPage" 
            :title="isCoverSpread ? (isFullWrapCover ? 'Séparer en 2' : 'Rendre Enveloppante') : 'Rendre Enveloppante'"
          >
            <Icon :name="isCoverSpread && isFullWrapCover ? 'lucide:columns' : 'lucide:book-open'" />
          </button>

          <!-- Delete cover style / page style -->
          <button 
            type="button" 
            class="pill-action-btn text-red-500 hover:bg-red-50" 
            @click="isCoverSpread ? onDeleteCover() : retirePageStyle(rightPage)" 
            title="Retirer le style"
          >
            <Icon name="lucide:trash-2" />
          </button>
        </template>
        <div v-else class="text-[10px] text-gray-300 font-sans italic flex flex-col items-center" title="Page de droite vide">
          <Icon name="lucide:image-off" class="text-sm" />
        </div>
      </div>

      <!-- Next page arrow -->
      <button type="button" class="nav-turn-btn next-btn" :disabled="activePageIdx >= maxPageIdx || isFlipping" @click="onTurnPage('next')">
        <Icon name="lucide:chevron-right" />
      </button>
    </div>

    <!-- Hidden color inputs -->
    <input ref="albumColorInput" type="color" :value="activeAlbum?.cover_color || '#3d352e'" class="hidden" @input="onAlbumColorInput" />
    <input ref="leftColorInput" type="color" :value="leftPage?.background_color || '#ffffff'" class="hidden" @input="onLeftColorInput" />
    <input ref="rightColorInput" type="color" :value="rightPage?.background_color || '#ffffff'" class="hidden" @input="onRightColorInput" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRuntimeConfig, useCookie } from '#app';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';
import { useBookSpreadLogic } from '~/composables/useBookSpreadLogic';
import { useBookCoverDrops } from '~/composables/useBookCoverDrops';

const props = defineProps<{ activePageIdx: number; }>();
const emit = defineEmits(['update:activePageIdx']);

const { updatePageField, isPageRestricted, updateAlbumField } = useAlbumEditorStore();
const logicState = useBookSpreadLogic(props, emit);
const {
  activeAlbum, isFlipping, flipDirection, isCoverDragOver, isBackCoverDragOver,
  leftPage, rightPage, onTurnPage, toggleFullWrap, isFullWrapCover, maxPageIdx,
  retirePageStyle, propagateEnveloping, isAnalyzing, applySuggestedColor
} = logicState;

const isCoverSpread = computed(() => {
  return props.activePageIdx === 0 || props.activePageIdx === maxPageIdx.value;
});

const {
  onCoverDragOver, onCoverDragLeave, onBackCoverDragOver, onBackCoverDragLeave,
  onDeleteCover, onDeleteBackCover, onCoverDrop, onBackCoverDrop, onFullWrapDrop,
  onBackCoverDragStart
} = useBookCoverDrops(logicState);

// Color Pickers refs
const leftColorInput = ref<HTMLInputElement | null>(null);
const rightColorInput = ref<HTMLInputElement | null>(null);
const albumColorInput = ref<HTMLInputElement | null>(null);

const triggerLeftColorPicker = () => { leftColorInput.value?.click(); };
const triggerRightColorPicker = () => { rightColorInput.value?.click(); };
const triggerAlbumColorPicker = () => { albumColorInput.value?.click(); };

const onLeftColorInput = async (e: Event) => {
  if (leftPage.value) {
    const color = (e.target as HTMLInputElement).value;
    await updatePageField(leftPage.value.id, 'background_color', color);
    await logicState.fetchAlbumDetail(leftPage.value.album, true);
  }
};

const onRightColorInput = async (e: Event) => {
  if (rightPage.value) {
    const color = (e.target as HTMLInputElement).value;
    await updatePageField(rightPage.value.id, 'background_color', color);
    await logicState.fetchAlbumDetail(rightPage.value.album, true);
  }
};

const onAlbumColorInput = async (e: Event) => {
  if (activeAlbum.value) {
    const color = (e.target as HTMLInputElement).value;
    try {
      await updateAlbumField(activeAlbum.value.id, 'cover_color', color);
      await logicState.fetchAlbumDetail(activeAlbum.value.id, true);
    } catch (err) { console.error(err); }
  }
};

const togglePageLayout = async (page: any) => {
  if (!page) return;
  const isText = page.layout_type === 'text-only';
  await updatePageField(page.id, 'layout_type', isText ? 'grid-1' : 'text-only');
  await logicState.fetchAlbumDetail(page.album, true);
};

const cycleSlots = async (page: any) => {
  if (!page) return;
  const layoutType = page.layout_type || 'grid-1';
  let count = 1;
  if (layoutType.startsWith('grid-')) {
    count = parseInt(layoutType.split('-')[1]) || 1;
  } else if (layoutType === 'mosaic') {
    count = 3;
  }
  let nextCount = count + 1;
  if (nextCount > 6) nextCount = 1;
  await updatePageField(page.id, 'layout_type', `grid-${nextCount}`);
  await logicState.fetchAlbumDetail(page.album, true);
};

const injectTitle = async (page: any) => {
  if (!page) return;
  const currentTitle = page.title || '';
  const newTitle = prompt('Entrez le titre de la page :', currentTitle);
  if (newTitle !== null) {
    await updatePageField(page.id, 'title', newTitle);
    await logicState.fetchAlbumDetail(page.album, true);
  }
};
</script>

<style scoped>
@import '~/assets/css/book-spread.css';

.auto-color-spread-control-row {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 0.8rem;
  margin-bottom: 0.2rem;
}

.auto-color-suggest-btn {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.3px;
  padding: 8px 18px;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.02);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
}

.auto-color-suggest-btn:hover:not(:disabled) {
  border-color: #cbd5e1;
  color: #334155;
  background: #f1f5f9;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.auto-color-suggest-btn:disabled {
  background: #f1f5f9;
  border-color: #e2e8f0;
  color: #94a3b8;
  cursor: not-allowed;
}

.magic-icon {
  font-size: 1rem;
  color: #a855f7;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
