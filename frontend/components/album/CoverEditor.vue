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
      <div class="cover-panel" :class="{ active: !isBackCover }">
        <h3 class="cover-title font-serif">Couverture de Début</h3>
        <div class="cover-preview" @click="triggerUpload(false)">
          <img v-if="activeAlbum?.cover_photo_url" :src="activeAlbum.cover_photo_url" class="cover-img" >
          <div v-else class="empty-cover-placeholder">
            <Icon name="lucide:image-plus" class="empty-icon" />
            <span>Ajouter une image</span>
          </div>
        </div>
      </div>

      <!-- Back Cover -->
      <div class="cover-panel" :class="{ active: isBackCover }">
        <h3 class="cover-title font-serif">Couverture de Fin</h3>
        <div class="cover-preview" @click="triggerUpload(true)">
          <img v-if="activeAlbum?.back_cover_photo_url" :src="activeAlbum.back_cover_photo_url" class="cover-img" >
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

    <input ref="fileInput" type="file" class="hidden" accept="image/*" @change="onFileSelected" >
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';

const props = defineProps<{ isBackCover: boolean }>();
const { activeAlbum, updateAlbumCover, updateAlbumField } = useAlbumEditorStore();
const fileInput = ref<HTMLInputElement>();
const uploadingForBack = ref(false);

const localTitle = ref('');
const isSavingTitle = ref(false);

watch(() => activeAlbum.value?.title, (newVal) => {
  if (newVal !== undefined && newVal !== localTitle.value) {
    localTitle.value = newVal;
  }
}, { immediate: true });

let saveTimeout: any = null;
const onTitleInput = (val: string) => {
  localTitle.value = val;
  isSavingTitle.value = true;
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(async () => {
    if (activeAlbum.value) {
      await updateAlbumField(activeAlbum.value.id, 'title', val);
    }
    isSavingTitle.value = false;
  }, 800);
};

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
</script>

<style scoped>
@import '~/assets/css/cover-editor.css';
</style>