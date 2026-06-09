<template>
  <div class="cover-editor-container flex flex-col gap-4">
    <!-- Mode Choice Toggle -->
    <div class="cover-mode-selector flex bg-gray-100 p-1 rounded-xl w-full">
      <button 
        type="button"
        class="flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer border-none outline-none"
        :class="activeAlbum?.show_cover_photo ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-800 bg-transparent'"
        @click="setCoverMode(true)"
      >
        <Icon name="lucide:image" /> Couverture Photo
      </button>
      <button 
        type="button"
        class="flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer border-none outline-none"
        :class="!activeAlbum?.show_cover_photo ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-800 bg-transparent'"
        @click="setCoverMode(false)"
      >
        <Icon name="lucide:palette" /> Couleur unie
      </button>
    </div>

    <!-- Mode 1: Photo Panels (Only shown if show_cover_photo is true) -->
    <div v-if="activeAlbum?.show_cover_photo" class="flex gap-4 w-full">
      <!-- Front Cover -->
      <div class="cover-panel flex flex-col items-center" :class="{ active: !isBackCover }">
        <h3 class="cover-title font-serif">Couverture de Début</h3>
        <div class="cover-preview" @click="triggerUpload(false)">
          <img v-if="activeAlbum?.cover_photo_url" :src="activeAlbum.cover_photo_url" class="cover-img" />
          <div v-else class="empty-cover-placeholder">
            <Icon name="lucide:image-plus" class="empty-icon" />
            <span>Ajouter une image</span>
          </div>
        </div>

        <!-- Album Title input field -->
        <div class="mt-3 flex flex-col gap-1 w-full text-left">
          <label class="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider pl-1">Titre de l'album</label>
          <input 
            type="text"
            :value="activeAlbum?.title"
            @input="e => updateAlbumField(activeAlbum.id, 'title', (e.target as HTMLInputElement).value)"
            placeholder="Titre de l'album..."
            class="w-full text-xs font-bold text-gray-700 border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-indigo-500 focus:bg-white transition-all bg-gray-50"
          />
        </div>
      </div>

      <!-- Back Cover -->
      <div class="cover-panel" :class="{ active: isBackCover }">
        <h3 class="cover-title font-serif">Couverture de Fin</h3>
        <div class="cover-preview" @click="triggerUpload(true)">
          <img v-if="activeAlbum?.back_cover_photo_url" :src="activeAlbum.back_cover_photo_url" class="cover-img" />
          <div v-else class="empty-cover-placeholder">
            <Icon name="lucide:image-plus" class="empty-icon" />
            <span>Ajouter une image</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Mode 2: Solid Color Cover Preview & Info (Only shown if show_cover_photo is false) -->
    <div v-else class="solid-color-cover-info flex flex-col items-center justify-center py-6 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center gap-3">
      <Icon name="lucide:book-open" class="text-4xl text-indigo-500" />
      <h3 class="font-serif text-sm font-bold text-gray-700">Couverture Couleur Unie</h3>
      <p class="text-xs text-gray-500 max-w-xs leading-relaxed">
        Les photos de couverture de début et de fin sont masquées. La couverture affiche actuellement une couleur unie élégante sur l'ensemble de l'espace.
      </p>
    </div>

    <!-- Color Palette Section (Shown in both modes for max flexibility) -->
    <div class="cover-color-palette-section flex flex-col gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
      <span class="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Couleur de fond de la couverture</span>
      
      <div class="flex flex-wrap gap-2 justify-center items-center">
        <button 
          v-for="c in coverPresets" 
          :key="c" 
          type="button" 
          class="cover-color-btn border-none"
          :style="{ backgroundColor: c }"
          :class="{ 'active': activeAlbum?.cover_color === c }"
          @click="updateCoverColor(c)"
          :title="c"
        ></button>
        
        <div class="hex-picker-wrapper">
          <button type="button" class="cover-color-btn hex-rainbow-btn border-none" @click="triggerHexPicker" title="Couleur personnalisée (HEX)"></button>
          <input ref="hexInput" type="color" :value="activeAlbum?.cover_color || '#3d352e'" class="hidden-color-input" @input="onHexColorInput" />
        </div>
      </div>
    </div>

    <input ref="fileInput" type="file" class="hidden" accept="image/*" @change="onFileSelected" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';

const props = defineProps<{ isBackCover: boolean }>();
const { activeAlbum, updateAlbumCover, updateAlbumField } = useAlbumEditorStore();
const fileInput = ref<HTMLInputElement>();
const hexInput = ref<HTMLInputElement>();
const uploadingForBack = ref(false);

const coverPresets = ['#1A1A1A', '#4A5568', '#1B365D', '#722F37', '#2D5A27', '#EAE6DF', '#FFFFFF', '#89CFF0'];

const triggerUpload = (isBack: boolean) => {
  uploadingForBack.value = isBack;
  fileInput.value?.click();
};

const onFileSelected = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file && activeAlbum.value) {
    await updateAlbumCover(activeAlbum.value.id, uploadingForBack.value, file);
  }
};

const setCoverMode = async (showPhotos: boolean) => {
  if (activeAlbum.value) {
    await updateAlbumField(activeAlbum.value.id, 'show_cover_photo', showPhotos);
  }
};

const updateCoverColor = async (color: string) => {
  if (activeAlbum.value) {
    await updateAlbumField(activeAlbum.value.id, 'cover_color', color);
  }
};

const triggerHexPicker = () => {
  hexInput.value?.click();
};

const onHexColorInput = async (e: Event) => {
  const color = (e.target as HTMLInputElement).value;
  await updateCoverColor(color);
};
</script>

<style scoped>
@import '~/assets/css/cover-editor.css';
</style>