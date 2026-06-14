import { ref, computed } from 'vue';
import type { Photo, AsyncStatus } from '~/types';

// Global Singleton State (allows real-time syncing between pages and components)
const photos = ref<Photo[]>([]);
const fetchStatus = ref<AsyncStatus>('idle');
const submitStatus = ref<AsyncStatus>('idle');
const fetchError = ref<string | null>(null);
const nextPageUrl = ref<string | null>(null);
const isLoadingMore = ref<boolean>(false);

export const usePhotos = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || 'http://localhost:8000/api';
  const { token } = useAuth();

  const authHeaders = computed(() => {
    const headers: Record<string, string> = {};
    if (token.value) {
      headers['Authorization'] = `Token ${token.value}`;
    }
    return headers;
  });
  
  const isLoading = computed(() => fetchStatus.value === 'loading');
  const isSubmitting = computed(() => submitStatus.value === 'loading');
  const hasPhotos = computed(() => photos.value.length > 0);
  const totalPhotos = computed(() => photos.value.length);
  const hasMorePhotos = computed(() => nextPageUrl.value !== null);

  const fetchPhotos = async () => {
    fetchStatus.value = 'loading'; 
    fetchError.value = null;
    try {
      const res: any = await $fetch(`${apiBase}/photos/`, { headers: authHeaders.value });
      photos.value = res.results || res;
      nextPageUrl.value = res.next || null;
      fetchStatus.value = 'success';
    } catch (err: any) {
      fetchStatus.value = 'error'; 
      fetchError.value = "Erreur lors du chargement de l'archive."; 
      console.error(err);
    }
  };

  const loadMorePhotos = async () => {
    if (!nextPageUrl.value || isLoadingMore.value) return;
    
    isLoadingMore.value = true;
    try {
      const res: any = await $fetch(nextPageUrl.value, { headers: authHeaders.value });
      photos.value = [...photos.value, ...(res.results || [])];
      nextPageUrl.value = res.next || null;
    } catch (err: any) {
      console.error('Erreur lors du chargement des photos supplémentaires:', err);
    } finally {
      isLoadingMore.value = false;
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
      submitStatus.value = 'error'; 
      return false;
    }
  };

  const deletePhoto = async (id: number) => {
    try {
      await $fetch(`${apiBase}/photos/${id}/`, { method: 'DELETE', headers: authHeaders.value });
      photos.value = photos.value.filter(p => p.id !== id);
      return true;
    } catch (err: any) { 
      return false; 
    }
  };

  const clearAllPhotos = async () => {
    try {
      await $fetch(`${apiBase}/photos/`, { method: 'DELETE', headers: authHeaders.value });
      photos.value = [];
      nextPageUrl.value = null;
      return true;
    } catch (err: any) { 
      return false; 
    }
  };

  return { 
    photos, 
    totalPhotos, 
    fetchStatus, 
    submitStatus, 
    fetchError, 
    isLoading, 
    isSubmitting, 
    hasPhotos, 
    hasMorePhotos,
    isLoadingMore,
    fetchPhotos, 
    loadMorePhotos,
    createPhoto, 
    deletePhoto, 
    clearAllPhotos 
  };
};
