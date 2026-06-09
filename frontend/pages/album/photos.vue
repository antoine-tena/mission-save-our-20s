<template>
  <div class="mso-album-gallery">
    <div class="mso-scrapbook-bg"></div>
    <header class="mso-album__header container">
      <div class="header-text">
        <NuxtLink to="/album" class="back-link font-sans">
          <Icon name="lucide:arrow-left" />
          <span>Retour à la Bibliothèque</span>
        </NuxtLink>
        <h1 class="mso-title-fancy font-serif mt-4">La Galerie des Moments</h1>
        <p class="mso-subtitle">
          <span class="pulse-dot"></span>
          {{ totalPhotos }} éclats de vie sauvegardés
        </p>
      </div>

      <div class="header-actions">
        <button 
          type="button" 
          class="mso-btn-add" 
          :class="{ 'mso-btn-add--active': showForm }" 
          @click="showForm = !showForm"
        >
          <span class="icon">{{ showForm ? '×' : '+' }}</span>
          <span class="label">{{ showForm ? 'Annuler' : 'Fixer un moment' }}</span>
        </button>
      </div>
    </header>

    <div class="container gallery-body">
      <!-- Archive Photo Upload Form -->
      <Transition name="scrapbook-slide">
        <AlbumPhotoUploadForm
          v-if="showForm" 
          :form-state="formState" 
          :form-errors="formErrors"
          :is-submitting="isSubmitting" 
          :is-form-valid="isFormValid"
          @submit="handleSubmit" 
          @file-change="handleFileChange" 
          @remove-file="resetForm" 
          @drop="handleDrop"
        />
      </Transition>

      <div v-if="isLoading" class="loader-container">
        <div class="shimmer-grid">
          <div v-for="n in 8" :key="n" class="skeleton-polaroid"></div>
        </div>
      </div>

      <div v-else-if="hasPhotos" class="grid-container">
        <AlbumPhotoGrid :photos="photos" @delete="confirmDelete" />
      </div>

      <div v-else class="mso-empty glass-card">
        <Icon name="lucide:image" class="empty-icon" />
        <h2>La muraille est encore nue.</h2>
        <p>Commencez par déposer votre premier cliché précieux pour l'éternité.</p>
        <button type="button" class="btn-create-now" @click="showForm = true">Fixer un instant</button>
      </div>
    </div>

    <!-- Confirm Delete Modal -->
    <Transition name="fade">
      <div v-if="photoToDelete" class="mso-dialog-overlay" @click.self="photoToDelete = null">
        <div class="mso-dialog glass-card">
          <Icon name="lucide:alert-triangle" class="alert-icon" />
          <h3>Effacer ce souvenir ?</h3>
          <p>La brique "<strong>{{ photoToDelete.titre }}</strong>" sera retirée à jamais de la galerie et des albums associés.</p>
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
    showForm.value = false; 
    resetForm();
    await nextTick(); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const confirmDelete = (p: Photo) => {
  photoToDelete.value = p;
};

const handleDelete = async () => {
  if (photoToDelete.value && await deletePhoto(photoToDelete.value.id)) {
    photoToDelete.value = null;
  }
};

onMounted(fetchPhotos);
useSeoMeta({ title: 'La Galerie des Moments — MSO20s' });
</script>

<style scoped>
@import '~/assets/css/album-photos.css';
</style>