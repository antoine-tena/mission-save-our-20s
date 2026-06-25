<template>
  <div class="book-spread-outer-container flex flex-col items-center w-full relative">
    <Transition name="fade-slide">
      <div v-if="croppingPhotoId !== null" class="album-global-crop-toolbar-row mb-6">
        <AlbumCropToolbar v-model="tempCropScale" />
      </div>
    </Transition>
    <div class="turn-page-controls-wrapper">
      <div class="turn-page-controls">
        <button type="button" class="nav-turn-btn prev-btn" :disabled="activePageIdx <= 0 || isFlipping" @click="onTurnPage('prev')">
          <Icon name="lucide:chevron-left" />
        </button>
        <AlbumPagePillToolbar
          :page="leftPage" :is-cover-spread="isCoverSpread" :is-left="true" :active-album="activeAlbum"
          :is-full-wrap-cover="isFullWrapCover" :has-opposite-page="!!rightPage"
          @trigger-color-picker="isCoverSpread ? triggerAlbumColorPicker() : triggerLeftColorPicker()"
          @toggle-layout="togglePageLayout" @cycle-slots="cycleSlots" @inject-title="injectTitle"
          @toggle-full-wrap="toggleFullWrap" @propagate-enveloping="p => propagateEnveloping(p, rightPage)"
          @delete-cover="onDeleteBackCover" @retire-style="retirePageStyle"
        />
        <div class="book-and-controls-stack flex-1">
          <AlbumBookPagesFrame
            :active-album="activeAlbum" :active-page-idx="activePageIdx" :is-full-wrap-cover="isFullWrapCover"
            :is-cover-drag-over="isCoverDragOver" :is-back-cover-drag-over="isBackCoverDragOver"
            :left-page="leftPage" :right-page="rightPage" :is-flipping="isFlipping" :flip-direction="flipDirection" :canvas-zoom="canvasZoom"
            @cover-dragover="onCoverDragOver" @cover-dragleave="onCoverDragLeave" @cover-drop="onCoverDrop"
            @back-cover-dragover="onBackCoverDragOver" @back-cover-dragleave="onBackCoverDragLeave" @back-cover-drop="onBackCoverDrop"
            @full-wrap-drop="onFullWrapDrop" @delete-cover="onDeleteCover" @delete-back-cover="onDeleteBackCover"
            @toggle-wrap="toggleFullWrap" @dragstart-back-cover="onBackCoverDragStart"
          />
        </div>
        <AlbumPagePillToolbar
          :page="rightPage" :is-cover-spread="isCoverSpread" :is-left="false" :active-album="activeAlbum"
          :is-full-wrap-cover="isFullWrapCover" :has-opposite-page="!!leftPage"
          @trigger-color-picker="isCoverSpread ? triggerAlbumColorPicker() : triggerRightColorPicker()"
          @toggle-layout="togglePageLayout" @cycle-slots="cycleSlots" @inject-title="injectTitle"
          @toggle-full-wrap="toggleFullWrap" @propagate-enveloping="p => propagateEnveloping(p, leftPage)"
          @delete-cover="onDeleteCover" @retire-style="retirePageStyle"
        />
        <button type="button" class="nav-turn-btn next-btn" :disabled="activePageIdx >= maxPageIdx || isFlipping" @click="onTurnPage('next')">
          <Icon name="lucide:chevron-right" />
        </button>
      </div>
      <input ref="albumColorInput" type="color" :value="activeAlbum?.cover_color || '#3d352e'" class="hidden" @input="onAlbumColorInput" >
      <input ref="leftColorInput" type="color" :value="leftPage?.background_color || '#ffffff'" class="hidden" @input="onLeftColorInput" >
      <input ref="rightColorInput" type="color" :value="rightPage?.background_color || '#ffffff'" class="hidden" @input="onRightColorInput" >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';
import { useBookSpreadLogic } from '~/composables/useBookSpreadLogic';
import { useBookCoverDrops } from '~/composables/useBookCoverDrops';
import { useBookSpreadActions } from '~/composables/useBookSpreadActions';

const props = defineProps<{ activePageIdx: number; }>();
const emit = defineEmits(['update:activePageIdx']);

const { isPageRestricted, croppingPhotoId, tempCropScale, canvasZoom } = useAlbumEditorStore();
const logicState = useBookSpreadLogic(props, emit);
const {
  activeAlbum, isFlipping, flipDirection, isCoverDragOver, isBackCoverDragOver,
  leftPage, rightPage, onTurnPage, toggleFullWrap, isFullWrapCover, maxPageIdx,
  retirePageStyle, propagateEnveloping
} = logicState;

const isCoverSpread = computed(() => props.activePageIdx === 0 || props.activePageIdx === maxPageIdx.value);

const {
  onCoverDragOver, onCoverDragLeave, onBackCoverDragOver, onBackCoverDragLeave,
  onDeleteCover, onDeleteBackCover, onCoverDrop, onBackCoverDrop, onFullWrapDrop,
  onBackCoverDragStart
} = useBookCoverDrops(logicState);

const {
  leftColorInput, rightColorInput, albumColorInput,
  triggerLeftColorPicker, triggerRightColorPicker, triggerAlbumColorPicker,
  selectSpreadBackgroundColor, onLeftColorInput, onRightColorInput, onAlbumColorInput,
  togglePageLayout, cycleSlots, injectTitle
} = useBookSpreadActions(leftPage, rightPage, activeAlbum, logicState);

const presetColors = [
  { hex: '#ffffff', label: 'Blanc' }, { hex: '#fde2e4', label: 'Rose pastel' },
  { hex: '#ffead0', label: 'Pêche' }, { hex: '#fef5d1', label: 'Crème' },
  { hex: '#e2ece9', label: 'Menthe' }, { hex: '#dfebeb', label: 'Azur pastel' },
  { hex: '#dfd7f3', label: 'Lavande' }, { hex: '#f1f5f9', label: 'Gris clair' },
  { hex: '#3d352e', label: 'Chocolat' }, { hex: '#1e1b18', label: 'Noir mat' },
];
</script>

<style scoped>
@import '~/assets/css/book-spread.css';
</style>