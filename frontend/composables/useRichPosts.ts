import { ref } from 'vue';
import type { RichPost } from '~/types';

export const useRichPosts = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || 'http://localhost:8000/api';
  const token = useCookie<string | null>('auth_token');

  const richPosts = ref<RichPost[]>([]);
  const isLoading = ref(false);

  const fetchRichPosts = async () => {
    isLoading.value = true;
    try {
      richPosts.value = await $fetch<RichPost[]>(`${apiBase}/social/rich-posts/`, {
        headers: { Authorization: `Token ${token.value}` }
      });
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const createRichPost = async (formData: FormData) => {
    try {
      await $fetch(`${apiBase}/social/rich-posts/`, {
        method: 'POST',
        headers: { Authorization: `Token ${token.value}` },
        body: formData
      });
      await fetchRichPosts();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return {
    richPosts: readonly(richPosts),
    isLoading: readonly(isLoading),
    fetchRichPosts,
    createRichPost
  };
};
