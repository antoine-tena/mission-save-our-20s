import { ref, onMounted } from 'vue';
import type { Photo } from '~/types';

export const useHome = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || 'http://127.0.0.1:8001/api';
  const { token } = useAuth();
  const memories = ref<Photo[]>([]);
  const isLoading = ref(false);

  const fetchMemories = async () => {
    if (!token.value) return;
    isLoading.value = true;
    try {
      const data = await $fetch<Photo[]>(`${apiBase}/photos/memories/`, {
        headers: { Authorization: `Token ${token.value}` }
      });
      memories.value = data;
    } catch (err) {
      console.error('Memories load error:', err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    memories: readonly(memories),
    isLoading,
    fetchMemories
  };
};
