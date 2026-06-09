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

        <!-- Magic Auto-Color Spread Toggle -->
        <div class="auto-color-spread-control-row" v-if="activePageIdx !== 0 && (leftPage || rightPage)">
          <button 
            type="button" 
            class="auto-color-toggle-btn"
            :class="{ 'active': isSpreadAutoColor }"
            @click="toggleSpreadAutoColor"
          >
            <Icon :name="isSpreadAutoColor ? 'lucide:sparkles' : 'lucide:palette'" class="magic-icon" />
            <span>Mode Couleur Auto : <strong>{{ isSpreadAutoColor ? 'Activé' : 'Désactivé' }}</strong></span>
          </button>
        </div>

      </div>

      <!-- Next page arrow -->
      <button type="button" class="nav-turn-btn next-btn" :disabled="activePageIdx >= maxPageIdx || isFlipping" @click="onTurnPage('next')">
        <Icon name="lucide:chevron-right" />
      </button>
    </div>

    <!-- Right Sidebar Column containing the vertical pill toolbar -->
    <aside class="right-spread-sidebar-col flex items-center justify-center">
      <div class="vertical-pill-toolbar flex flex-col items-center gap-4 py-6 px-2.5 bg-white border border-gray-100 rounded-full shadow-lg select-none">
        
        <!-- FULL WRAP COVER MODE -->
        <template v-if="activePageIdx === 0 && isFullWrapCover">
          <!-- Color Picker Button -->
          <div class="relative flex items-center justify-center">
            <button 
              type="button" 
              class="color-dot-btn" 
              :style="{ backgroundColor: activeAlbum?.cover_color || '#3d352e' }" 
              @click="triggerAlbumColorPicker"
              title="Couleur de couverture"
            ></button>
            <input ref="albumColorInput" type="color" :value="activeAlbum?.cover_color || '#3d352e'" class="hidden" @input="onAlbumColorInput" />
          </div>

          <!-- Separer in 2 Covers -->
          <button type="button" class="pill-action-btn" @click="toggleFullWrap(false)" title="Séparer en 2 couvertures">
            <Icon name="lucide:columns" />
          </button>

          <!-- Delete cover style -->
          <button type="button" class="pill-action-btn text-red-500 hover:bg-red-50" @click="onDeleteCover" title="Retirer le style/photo">
            <Icon name="lucide:trash-2" />
          </button>
        </template>

        <!-- SPLIT COVER OR REGULAR PAGES -->
        <template v-else>
          <!-- LEFT PAGE SECTION (Top half of vertical pill) -->
          <div class="flex flex-col items-center gap-3" v-if="activePageIdx === 0 || leftPage">
            <!-- Color Picker -->
            <div class="relative flex items-center justify-center">
              <button 
                type="button" 
                class="color-dot-btn" 
                :style="{ backgroundColor: activePageIdx === 0 ? (activeAlbum?.cover_color || '#3d352e') : (leftPage?.background_color || '#ffffff') }" 
                @click="activePageIdx === 0 ? triggerAlbumColorPicker() : triggerLeftColorPicker()"
                :title="activePageIdx === 0 ? 'Couleur de couverture' : 'Couleur de page (Gauche)'"
              ></button>
              <input v-if="activePageIdx === 0" ref="albumColorInput" type="color" :value="activeAlbum?.cover_color || '#3d352e'" class="hidden" @input="onAlbumColorInput" />
              <input v-else ref="leftColorInput" type="color" :value="leftPage?.background_color || '#ffffff'" class="hidden" @input="onLeftColorInput" />
            </div>

            <!-- Layout toggle (Only if interior page) -->
            <button v-if="activePageIdx !== 0" type="button" class="pill-action-btn" :class="{ 'active': leftPage?.layout_type === 'text-only' }" @click="togglePageLayout(leftPage)" title="Mode texte/photo">
              <Icon name="lucide:align-left" />
            </button>

            <!-- Adjust slots count (Only if interior page and not text-only) -->
            <button v-if="activePageIdx !== 0 && leftPage?.layout_type !== 'text-only'" type="button" class="pill-action-btn" @click="cycleSlots(leftPage)" title="Nombre de photos">
              <Icon name="lucide:image" />
            </button>

            <!-- Add/Edit page title -->
            <button v-if="activePageIdx !== 0" type="button" class="pill-action-btn" @click="injectTitle(leftPage)" title="Titre de la page">
              <Icon name="lucide:heading" />
            </button>

            <!-- Enveloping propagate -->
            <button type="button" class="pill-action-btn" @click="activePageIdx === 0 ? toggleFullWrap(true) : propagateEnveloping(leftPage, rightPage)" :disabled="activePageIdx !== 0 && !rightPage" title="Rendre Enveloppante">
              <Icon name="lucide:book-open" />
            </button>

            <!-- Delete cover style / page style -->
            <button type="button" class="pill-action-btn text-red-500 hover:bg-red-50" @click="activePageIdx === 0 ? onDeleteBackCover() : retirePageStyle(leftPage)" title="Retirer le style">
              <Icon name="lucide:trash-2" />
            </button>
          </div>

          <!-- Divider -->
          <div class="h-[1px] w-6 bg-gray-100 my-1"></div>

          <!-- RIGHT PAGE SECTION (Bottom half of vertical pill) -->
          <div class="flex flex-col items-center gap-3" v-if="activePageIdx === 0 || rightPage">
            <!-- Color Picker -->
            <div class="relative flex items-center justify-center">
              <button 
                type="button" 
                class="color-dot-btn" 
                :style="{ backgroundColor: activePageIdx === 0 ? (activeAlbum?.cover_color || '#3d352e') : (rightPage?.background_color || '#ffffff') }" 
                @click="activePageIdx === 0 ? triggerAlbumColorPicker() : triggerRightColorPicker()"
                :title="activePageIdx === 0 ? 'Couleur de couverture' : 'Couleur de page (Droite)'"
              ></button>
              <input v-if="activePageIdx === 0" ref="albumColorInput" type="color" :value="activeAlbum?.cover_color || '#3d352e'" class="hidden" @input="onAlbumColorInput" />
              <input v-else ref="rightColorInput" type="color" :value="rightPage?.background_color || '#ffffff'" class="hidden" @input="onRightColorInput" />
            </div>

            <!-- Layout toggle -->
            <button v-if="activePageIdx !== 0" type="button" class="pill-action-btn" :class="{ 'active': rightPage?.layout_type === 'text-only' }" @click="togglePageLayout(rightPage)" title="Mode texte/photo">
              <Icon name="lucide:align-left" />
            </button>

            <!-- Adjust slots count -->
            <button v-if="activePageIdx !== 0 && rightPage?.layout_type !== 'text-only'" type="button" class="pill-action-btn" @click="cycleSlots(rightPage)" title="Nombre de photos">
              <Icon name="lucide:image" />
            </button>

            <!-- Add/Edit page title -->
            <button v-if="activePageIdx !== 0" type="button" class="pill-action-btn" @click="injectTitle(rightPage)" title="Titre de la page">
              <Icon name="lucide:heading" />
            </button>

            <!-- Enveloping propagate -->
            <button type="button" class="pill-action-btn" @click="activePageIdx === 0 ? toggleFullWrap(true) : propagateEnveloping(rightPage, leftPage)" :disabled="activePageIdx !== 0 && !leftPage" title="Rendre Enveloppante">
              <Icon name="lucide:book-open" />
            </button>

            <!-- Delete cover style / page style -->
            <button type="button" class="pill-action-btn text-red-500 hover:bg-red-50" @click="activePageIdx === 0 ? onDeleteCover() : retirePageStyle(rightPage)" title="Retirer le style">
              <Icon name="lucide:trash-2" />
            </button>
          </div>
        </template>

      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRuntimeConfig, useCookie } from '#app';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';
import { useBookSpreadLogic } from '~/composables/useBookSpreadLogic';
import { useBookCoverDrops } from '~/composables/useBookCoverDrops';

const props = defineProps<{ activePageIdx: number; }>();
const emit = defineEmits(['update:activePageIdx']);

const { updatePageField } = useAlbumEditorStore();
const logicState = useBookSpreadLogic(props, emit);
const {
  activeAlbum, isFlipping, flipDirection, isCoverDragOver, isBackCoverDragOver,
  leftPage, rightPage, onTurnPage, toggleFullWrap, isFullWrapCover, maxPageIdx,
  retirePageStyle, propagateEnveloping, isSpreadAutoColor, toggleSpreadAutoColor
} = logicState;

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
      const config = useRuntimeConfig();
      const token = useCookie<string | null>('auth_token');
      await $fetch(`${config.public.apiBase}/photos/albums/${activeAlbum.value.id}/`, {
        method: 'PATCH', headers: { Authorization: `Token ${token.value}` }, body: { cover_color: color }
      });
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

.auto-color-toggle-btn {
  background: white;
  border: 1.5px solid #e2e8f0;
  color: #718096;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.3px;
  padding: 8px 18px;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.02);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
}

.auto-color-toggle-btn:hover {
  border-color: #6366f1;
  color: #4f46e5;
  background: rgba(99, 102, 241, 0.02);
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(99, 102, 241, 0.08);
}

.auto-color-toggle-btn.active {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  border-color: #4f46e5;
  color: white;
  box-shadow: 0 8px 16px rgba(99, 102, 241, 0.2);
}

.magic-icon {
  font-size: 1rem;
}

.auto-color-toggle-btn.active .magic-icon {
  animation: magicPulse 1.5s infinite alternate;
}

@keyframes magicPulse {
  0% { transform: scale(1); filter: drop-shadow(0 0 2px rgba(255,255,255,0.6)); }
  100% { transform: scale(1.2); filter: drop-shadow(0 0 5px rgba(255,255,255,0.9)); }
}
</style>