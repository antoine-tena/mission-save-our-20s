import { ref } from 'vue';
import type { Photo } from '~/types';

export const useHome = () => {
  const api = useApi();
  const memories = ref<Photo[]>([]);
  const isLoading = ref(false);

  const fetchMemories = async () => {
    isLoading.value = true;
    try {
      memories.value = await api.get<Photo[]>('/photos/memories/');
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
