<template>
  <div class="min-h-screen pb-24 bg-slate-50 overflow-hidden relative selection:bg-amber-200" style="padding-top: calc(var(--header-height) + 3rem)">
    <!-- Animated modern background -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[20%] right-[-5%] w-[40rem] h-[40rem] bg-orange-200/20 rounded-full blur-[120px] animate-pulse" style="animation-duration: 9s;"/>
      <div class="absolute bottom-[10%] left-[-5%] w-[35rem] h-[35rem] bg-amber-200/20 rounded-full blur-[100px] animate-pulse" style="animation-duration: 7s;"/>
    </div>

    <!-- Page Hero -->
    <PageHero
      title="La Galerie des Moments"
      icon="lucide:grid"
      icon-class="text-amber-500"
      :subtitle="`${totalPhotos} éclats de vie sauvegardés`"
      subtitle-class="text-amber-600"
      back-to="/album"
      back-text="Retour à la Bibliothèque"
      back-hover-class="hover:text-amber-600"
      border
    >
      <template #actions>
        <button 
          type="button" 
          class="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-amber-600 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 flex items-center gap-2"
          :class="{ 'bg-slate-200 !text-slate-700 hover:bg-slate-300': showForm }"
          @click="showForm = !showForm"
        >
          <Icon :name="showForm ? 'lucide:x' : 'lucide:plus'" class="w-5 h-5" />
          {{ showForm ? 'Annuler' : 'Fixer un instant' }}
        </button>
      </template>
    </PageHero>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Archive Photo Upload Form -->
      <Transition 
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <AlbumPhotoUploadForm
          v-if="showForm" 
          :form-state="formState" 
          :form-errors="formErrors"
          :is-submitting="isSubmitting" 
          :is-form-valid="isFormValid"
          class="mb-12 backdrop-blur-xl bg-white/60 border border-slate-200/50 shadow-xl rounded-3xl p-8" 
          @submit="handleSubmit" 
          @file-change="handleFileChange" 
          @remove-file="resetForm"
          @drop="handleDrop"
        />
      </Transition>

      <div v-if="isLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="n in 8" :key="n" class="bg-slate-200 animate-pulse rounded-2xl h-64 w-full"/>
      </div>

      <div v-else-if="hasPhotos" class="grid-container">
        <AlbumPhotoGrid :photos="photos" @delete="confirmDelete" />
        
        <!-- Load More Button -->
        <div v-if="hasMorePhotos" class="mt-12 flex justify-center pb-8">
          <button 
            :disabled="isLoadingMore" 
            class="bg-white border-2 border-slate-200 text-slate-700 font-bold py-3 px-8 rounded-full shadow-sm hover:border-amber-400 hover:text-amber-600 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="loadMorePhotos"
          >
            <Icon v-if="isLoadingMore" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
            <Icon v-else name="lucide:chevron-down" class="w-5 h-5" />
            {{ isLoadingMore ? 'Chargement...' : 'Voir plus de photos' }}
          </button>
        </div>
      </div>

      <div v-else class="text-center py-24 px-4 max-w-2xl mx-auto backdrop-blur-md bg-white/40 rounded-3xl border border-slate-200/50">
        <Icon name="lucide:image" class="w-20 h-20 text-amber-400 mx-auto mb-6 opacity-80" />
        <h2 class="font-serif text-3xl font-black text-slate-900 mb-2">La muraille est encore nue.</h2>
        <p class="text-slate-600 mb-8">Commencez par déposer votre premier cliché précieux pour l'éternité.</p>
        <button class="bg-slate-900 text-white px-8 py-3.5 rounded-full font-bold hover:bg-amber-600 transition-colors" @click="showForm = true">Fixer un instant</button>
      </div>
    </div>

    <!-- Confirm Delete Modal -->
    <Transition 
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
      <div v-if="photoToDelete" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" @click.self="photoToDelete = null">
        <div class="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl transform scale-100 transition-transform">
          <Icon name="lucide:alert-triangle" class="w-12 h-12 text-red-500 mb-6" />
          <h3 class="text-2xl font-black text-slate-900 mb-2">Effacer ce souvenir ?</h3>
          <p class="text-slate-600 mb-8 leading-relaxed">
            La brique "<strong class="text-slate-900">{{ photoToDelete.titre }}</strong>" sera retirée à jamais de la galerie et des albums associés.
          </p>
          <div class="flex gap-4">
            <button class="flex-1 px-6 py-3 rounded-full font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors" @click="photoToDelete = null">Annuler</button>
            <button class="flex-1 px-6 py-3 rounded-full font-bold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30" @click="handleDelete">Supprimer</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import type { Photo } from '~/types';
import { usePhotos } from '~/composables/usePhotos';
import { usePhotosForm } from '~/composables/usePhotosForm';

const { 
  photos, 
  totalPhotos, 
  isLoading, 
  isSubmitting, 
  hasPhotos, 
  hasMorePhotos,
  isLoadingMore,
  fetchPhotos, 
  loadMorePhotos,
  createPhoto, 
  deletePhoto 
} = usePhotos();
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