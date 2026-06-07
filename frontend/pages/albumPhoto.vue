<template>
  <div class="mso-album">
    <div class="mso-scrapbook-bg"></div>
    <header class="mso-album__header container">
      <div class="header-text">
        <h1 class="mso-title-fancy">L'Archive Visuelle</h1>
        <p class="mso-subtitle"><span class="pulse-dot"></span>{{ totalPhotos }} éclats de vie sauvegardés</p>
      </div>
      <button type="button" class="mso-btn-add" :class="{ 'mso-btn-add--active': showForm }" @click="showForm = !showForm">
        <span class="icon">{{ showForm ? '×' : '+' }}</span>
        <span class="label">{{ showForm ? 'Annuler' : 'Fixer un moment' }}</span>
      </button>
    </header>

    <div class="container mso-album__body">
      <Transition name="scrapbook-slide">
        <AlbumPhotoUploadForm
          v-if="showForm" :form-state="formState" :form-errors="formErrors"
          :is-submitting="isSubmitting" :is-form-valid="isFormValid"
          @submit="handleSubmit" @file-change="handleFileChange" @remove-file="resetForm" @drop="handleDrop"
        />
      </Transition>

      <div v-if="isLoading" class="mso-loader">
        <div v-for="n in 4" :key="n" class="skeleton-polaroid"></div>
      </div>
      <AlbumPhotoGrid v-else-if="hasPhotos" :photos="photos" @delete="confirmDelete" />
      <div v-else class="mso-empty"><h2>La muraille est encore nue.</h2></div>
    </div>

    <Transition name="fade">
      <div v-if="photoToDelete" class="mso-dialog-overlay" @click.self="photoToDelete = null">
        <div class="mso-dialog glass-card">
          <h3>Effacer ce souvenir ?</h3>
          <p>La brique "<strong>{{ photoToDelete.titre }}</strong>" sera retirée à jamais.</p>
          <div class="mso-dialog__actions">
            <button class="btn-cancel" @click="photoToDelete = null">Annuler</button>
            <button class="btn-danger" @click="handleDelete">Supprimer</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import type { Photo } from '~/types';

const { photos, totalPhotos, isLoading, isSubmitting, hasPhotos, fetchPhotos, createPhoto, deletePhoto } = usePhotos();
const { formState, formErrors, isFormValid, handleFileChange, resetForm } = usePhotosForm();

const showForm = ref(false);
const photoToDelete = ref<Photo | null>(null);

const handleDrop = (file: File) => {
  const event = { target: { files: [file] } } as any;
  handleFileChange(event);
};

const handleSubmit = async () => {
  const fd = new FormData();
  fd.append('titre', formState.value.titre);
  fd.append('description', formState.value.description);
  if (formState.value.fichier) fd.append('image', formState.value.fichier);
  
  if (await createPhoto(fd)) {
    showForm.value = false; resetForm();
    await nextTick(); window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const confirmDelete = (p: Photo) => photoToDelete.value = p;
const handleDelete = async () => {
  if (photoToDelete.value && await deletePhoto(photoToDelete.value.id)) photoToDelete.value = null;
};

onMounted(fetchPhotos);
useSeoMeta({ title: 'Album Photo — MSO20s' });
</script>

<style scoped>
.mso-album { min-height: 100vh; padding-top: calc(var(--header-height) + 3rem); padding-bottom: 6rem; position: relative; }
.mso-scrapbook-bg { position: fixed; inset: 0; background-color: #ffffff; background-image: radial-gradient(#ca75d615 1.5px, transparent 1.5px); background-size: 30px 30px; z-index: -1; }
.mso-album__header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 4rem; }
.mso-title-fancy { font-family: var(--font-display); font-size: clamp(2.5rem, 8vw, 4rem); color: var(--clr-neutral-900); line-height: 0.9; letter-spacing: -2px; }
.mso-subtitle { color: var(--clr-primary-500); font-weight: 700; display: flex; align-items: center; gap: 10px; margin-top: 1rem; }
.pulse-dot { width: 8px; height: 8px; background: var(--clr-primary-500); border-radius: 50%; animation: pulse 2s infinite; }
@keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.4; } 100% { transform: scale(1); opacity: 1; } }
.mso-btn-add { background: #1a1a1a; color: white; border: none; padding: 10px 24px; border-radius: 50px; font-weight: 800; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
.mso-btn-add:hover { transform: translateY(-3px) rotate(1deg); background: var(--clr-primary-500); }
.mso-btn-add--active { background: #ff4d4d; }
.mso-dialog-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); z-index: 2000; display: flex; align-items: center; justify-content: center; }
.mso-dialog { max-width: 400px; padding: 2.5rem; text-align: center; }
.mso-dialog__actions { display: flex; gap: 1rem; margin-top: 2rem; }
.btn-cancel { flex: 1; padding: 0.8rem; border-radius: 10px; border: 1px solid #ddd; background: none; cursor: pointer; }
.btn-danger { flex: 1; padding: 0.8rem; border-radius: 10px; border: none; background: #ff4d4d; color: white; font-weight: 800; cursor: pointer; }
@media (max-width: 768px) { .mso-album__header { flex-direction: column; align-items: center; text-align: center; gap: 2rem; } }
</style>
