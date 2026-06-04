import { ref, computed } from 'vue';
import type { Photo, PhotoFormState, PhotoFormErrors, AsyncStatus } from '~/types';

export const usePhotos = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || 'http://127.0.0.1:8001/api';
  const { token } = useAuth();

  const photos = ref<Photo[]>([]);
  const fetchStatus = ref<AsyncStatus>('idle');
  const submitStatus = ref<AsyncStatus>('idle');
  const fetchError = ref<string | null>(null);

  const authHeaders = computed(() => {
    return token.value ? { 'Authorization': `Token ${token.value}` } : {};
  });

  const formState = ref<PhotoFormState>({
    titre: '',
    description: '',
    fichier: null,
    apercu: null
  });

  const formErrors = ref<PhotoFormErrors>({
    titre: '',
    fichier: '',
    description: '',
    global: ''
  });

  const isLoading = computed(() => fetchStatus.value === 'loading');
  const isSubmitting = computed(() => submitStatus.value === 'loading');
  const hasPhotos = computed(() => photos.value.length > 0);
  const totalPhotos = computed(() => photos.value.length);
  const isFormValid = computed(() => {
    return formState.value.titre.trim().length > 0 && formState.value.fichier !== null;
  });

  const fetchPhotos = async () => {
    fetchStatus.value = 'loading';
    fetchError.value = null;
    try {
      const data = await $fetch<Photo[]>(`${apiBase}/photos/`, {
        headers: authHeaders.value
      });
      photos.value = data;
      fetchStatus.value = 'success';
    } catch (err: any) {
      fetchStatus.value = 'error';
      fetchError.value = "Erreur lors du chargement des photos.";
      console.error(err);
    }
  };

  const createPhoto = async () => {
    if (!isFormValid.value) return false;

    submitStatus.value = 'loading';
    formErrors.value.global = '';

    const formData = new FormData();
    formData.append('titre', formState.value.titre);
    formData.append('description', formState.value.description);
    if (formState.value.fichier) {
      formData.append('image', formState.value.fichier);
    }

    try {
      await $fetch(`${apiBase}/photos/`, {
        method: 'POST',
        headers: authHeaders.value,
        body: formData
      });
      submitStatus.value = 'success';
      resetForm();
      await fetchPhotos();
      return true;
    } catch (err: any) {
      submitStatus.value = 'error';
      formErrors.value.global = "Erreur lors de l'ajout de la photo.";
      return false;
    }
  };

  const deletePhoto = async (id: number) => {
    try {
      await $fetch(`${apiBase}/photos/${id}/`, {
        method: 'DELETE',
        headers: authHeaders.value
      });
      photos.value = photos.value.filter(p => p.id !== id);
      return true;
    } catch (err: any) {
      console.error(err);
      return false;
    }
  };

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
    if (formState.value.apercu) {
      URL.revokeObjectURL(formState.value.apercu);
    }
    formState.value = {
      titre: '',
      description: '',
      fichier: null,
      apercu: null
    };
    formErrors.value = {
      titre: '',
      fichier: '',
      description: '',
      global: ''
    };
  };

  return {
    photos,
    totalPhotos,
    fetchStatus,
    submitStatus,
    fetchError,
    formState,
    formErrors,
    isLoading,
    isSubmitting,
    hasPhotos,
    isFormValid,
    fetchPhotos,
    createPhoto,
    deletePhoto,
    handleFileChange,
    resetForm
  };
};
