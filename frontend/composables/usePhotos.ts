import { ref, computed } from 'vue';
import type { Photo, AsyncStatus } from '~/types';

export const usePhotos = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || 'http://localhost:8000/api';
  const { token } = useAuth();

  const photos = ref<Photo[]>([]);
  const fetchStatus = ref<AsyncStatus>('idle');
  const submitStatus = ref<AsyncStatus>('idle');
  const fetchError = ref<string | null>(null);

  const authHeaders = computed(() => token.value ? { 'Authorization': `Token ${token.value}` } : {});
  const isLoading = computed(() => fetchStatus.value === 'loading');
  const isSubmitting = computed(() => submitStatus.value === 'loading');
  const hasPhotos = computed(() => photos.value.length > 0);
  const totalPhotos = computed(() => photos.value.length);

  const fetchPhotos = async () => {
    fetchStatus.value = 'loading'; fetchError.value = null;
    try {
      photos.value = await $fetch<Photo[]>(`${apiBase}/photos/`, { headers: authHeaders.value });
      fetchStatus.value = 'success';
    } catch (err: any) {
      fetchStatus.value = 'error'; fetchError.value = "Erreur archive."; console.error(err);
    }
  };

  const createPhoto = async (formData: FormData) => {
    submitStatus.value = 'loading';
    try {
      await $fetch(`${apiBase}/photos/`, { method: 'POST', headers: authHeaders.value, body: formData });
      submitStatus.value = 'success';
      await fetchPhotos();
      return true;
    } catch (err: any) {
      submitStatus.value = 'error'; return false;
    }
  };

  const deletePhoto = async (id: number) => {
    try {
      await $fetch(`${apiBase}/photos/${id}/`, { method: 'DELETE', headers: authHeaders.value });
      photos.value = photos.value.filter(p => p.id !== id);
      return true;
    } catch (err: any) { return false; }
  };

  return { photos, totalPhotos, fetchStatus, submitStatus, fetchError, isLoading, isSubmitting, hasPhotos, fetchPhotos, createPhoto, deletePhoto };
};
