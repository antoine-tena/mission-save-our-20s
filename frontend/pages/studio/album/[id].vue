<template>
  <div v-if="isAlbumLoading" class="loader-container">
    <div class="book-loader"><div class="book-page-loader"></div></div>
    <p>Lecture de votre carnet de souvenirs...</p>
  </div>

  <div v-else-if="!activeAlbum" class="mso-empty glass-card">
    <Icon name="lucide:book-x" class="empty-icon" />
    <h2>Album introuvable</h2>
    <p>Ce livre photo a peut-être été archivé ou supprimé.</p>
    <NuxtLink to="/album" class="btn-create-now">Retourner à la bibliothèque</NuxtLink>
  </div>

  <!-- Atomic desktop SaaS Studio Layout -->
  <AlbumStudioLayout 
    v-else 
    :photos="photos" 
    :page-id="currentUploadPageId"
  >
    <template #canvas>
      <AlbumBookSpread v-model:activePageIdx="activePageIdx" />
    </template>

    <template #footer>
      <AlbumStudioFooter v-model:activePageIdx="activePageIdx" />
    </template>
  </AlbumStudioLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';
import { usePhotos } from '~/composables/usePhotos';

definePageMeta({
  layout: false
});

const route = useRoute();
const albumId = computed(() => parseInt(route.params.id as string));

const { photos, fetchPhotos } = usePhotos();
const { activeAlbum, isLoading: isAlbumLoading, fetchAlbumDetail, createPage } = useAlbumEditorStore();

const activePageIdx = ref(0);

const currentUploadPageId = computed(() => {
  if (!activeAlbum.value || activeAlbum.value.pages.length === 0) return undefined;
  if (activePageIdx.value === 0) return activeAlbum.value.pages[0]?.id;
  return activeAlbum.value.pages[activePageIdx.value - 1]?.id || activeAlbum.value.pages[activePageIdx.value]?.id;
});

const addNewPage = async () => {
  if (activeAlbum.value) {
    await createPage(activeAlbum.value.id);
    await createPage(activeAlbum.value.id);
    await fetchAlbumDetail(albumId.value);
    activePageIdx.value = activeAlbum.value.pages.length - 2;
  }
};

onMounted(async () => {
  await fetchAlbumDetail(albumId.value);
  await fetchPhotos();
  if (activeAlbum.value && activeAlbum.value.pages.length === 0) {
    await addNewPage();
  }
  activePageIdx.value = 0;
});

useSeoMeta({ title: () => `${activeAlbum.value?.title || 'Livre'} — Album Studio` });
</script>

<style scoped>
.loader-container { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; color: #8c7e6e; gap: 1.5rem; font-weight: 600; background: #faf9f6; }
.book-loader { width: 50px; height: 38px; border: 3px solid #2d2a26; border-radius: 4px; position: relative; }
.book-page-loader { width: 50%; height: 100%; background: #2d2a26; position: absolute; right: 0; top: 0; transform-origin: left center; animation: pageTurn 1.2s infinite; }
@keyframes pageTurn { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(-180deg); } }

.mso-empty { text-align: center; padding: 4rem 2rem; max-width: 440px; margin: auto; border-radius: 20px; background: white; border: 1px dashed rgba(0,0,0,0.1); }
.empty-icon { font-size: 3rem; color: #c5a880; margin-bottom: 1rem; }
.mso-empty h2 { font-family: 'Playfair Display', Georgia, serif; font-size: 1.4rem; font-weight: 800; color: #2d2a26; margin-bottom: 0.5rem; }
.mso-empty p { color: #8c7e6e; margin-bottom: 1.5rem; font-size: 0.85rem; }
.btn-create-now { background: #2d2a26; color: white; border: none; padding: 10px 20px; border-radius: 50px; font-weight: 700; cursor: pointer; text-decoration: none; display: inline-block; font-size: 0.85rem; }
</style>