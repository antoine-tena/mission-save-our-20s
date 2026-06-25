<template>
  <ScrapbookCard class="add-photo-card" rotation="-0.5deg">
    <form class="mso-form" @submit.prevent="$emit('submit')">
      <h2 class="form-title">Nouveau Souvenir</h2>

      <AlbumPhotoUploadFormDropZone
        :apercu="formState.apercu"
        :has-error="!!formErrors.fichier"
        @change="$emit('fileChange', $event)"
        @remove="$emit('removeFile')"
        @drop="$emit('drop', $event)"
      />

      <AlbumPhotoUploadFormFields
        v-model:titre="formState.titre"
        v-model:description="formState.description"
      />

      <button type="submit" class="mso-btn-primary" :disabled="isSubmitting || !isFormValid">
        {{ isSubmitting ? 'Gravure en cours...' : 'Graver le souvenir' }}
      </button>
    </form>
  </ScrapbookCard>
</template>

<script setup lang="ts">
import type { PhotoFormState, PhotoFormErrors } from '~/types';

defineProps<{
  formState: PhotoFormState;
  formErrors: PhotoFormErrors;
  isSubmitting: boolean;
  isFormValid: boolean;
}>();

defineEmits(['submit', 'fileChange', 'removeFile', 'drop']);
</script>

<style scoped>
.add-photo-card {
  max-width: 600px; margin: 0 auto 4rem;
}
.form-title { font-family: var(--font-display); font-size: 1.8rem; margin-bottom: 2rem; text-align: center; }
.mso-btn-primary {
  width: 100%; background: #1a1a1a; color: white; border: none; padding: 1.2rem;
  border-radius: 12px; font-weight: 800; cursor: pointer; transition: all 0.3s;
}
.mso-btn-primary:hover:not(:disabled) {
  background: var(--clr-primary-500); box-shadow: 0 15px 30px rgba(202, 117, 214, 0.4);
}
</style>
