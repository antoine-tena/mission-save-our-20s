<template>
  <section class="add-photo-card glass-card">
    <div class="tape-effect"></div>
    <form @submit.prevent="$emit('submit')" class="mso-form">
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
  </section>
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
  max-width: 600px; margin: 0 auto 4rem; padding: 3rem; position: relative; transform: rotate(-0.5deg);
}
.tape-effect {
  position: absolute; top: -15px; left: 50%; transform: translateX(-50%);
  width: 120px; height: 35px; background: rgba(202, 117, 214, 0.2);
  clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);
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
