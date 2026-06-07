import { ref, computed } from 'vue';
import type { PhotoFormState, PhotoFormErrors } from '~/types';

export const usePhotosForm = () => {
  const formState = ref<PhotoFormState>({
    titre: '', description: '', fichier: null, apercu: null
  });

  const formErrors = ref<PhotoFormErrors>({
    titre: '', fichier: '', description: '', global: ''
  });

  const isFormValid = computed(() => {
    return formState.value.titre.trim().length > 0 && formState.value.fichier !== null;
  });

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      formErrors.value.fichier = "L'image est trop lourde (max 10 Mo).";
      return;
    }

    formState.value.fichier = file;
    formState.value.apercu = URL.createObjectURL(file);
    formErrors.value.fichier = '';
  };

  const resetForm = () => {
    if (formState.value.apercu) URL.revokeObjectURL(formState.value.apercu);
    formState.value = { titre: '', description: '', fichier: null, apercu: null };
    formErrors.value = { titre: '', fichier: '', description: '', global: '' };
  };

  return { formState, formErrors, isFormValid, handleFileChange, resetForm };
};
