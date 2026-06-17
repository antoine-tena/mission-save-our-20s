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

  const toggleLikeRichPost = async (id: number) => {
    try {
      const response = await $fetch<{ status: string; likes_count: number }>(`${apiBase}/social/journal/${id}/like/`, {
        method: 'POST',
        headers: { Authorization: `Token ${token.value}` }
      });
      richPosts.value = richPosts.value.map(post => {
        if (post.id === id) {
          return {
            ...post,
            likes_count: response.likes_count,
            is_liked_by_me: response.status === 'liked'
          };
        }
        return post;
      });
      return response;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const toggleBookmarkRichPost = async (id: number) => {
    try {
      const response = await $fetch<{ status: string; is_bookmarked: boolean }>(`${apiBase}/social/journal/${id}/bookmark/`, {
        method: 'POST',
        headers: { Authorization: `Token ${token.value}` }
      });
      richPosts.value = richPosts.value.map(post => {
        if (post.id === id) {
          return {
            ...post,
            is_bookmarked_by_me: response.is_bookmarked
          };
        }
        return post;
      });
      return response;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const deleteRichPost = async (id: number) => {
    try {
      await $fetch(`${apiBase}/social/journal/${id}/`, {
        method: 'DELETE',
        headers: { Authorization: `Token ${token.value}` }
      });
      richPosts.value = richPosts.value.filter(post => post.id !== id);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const updateRichPost = async (id: number, payload: any) => {
    try {
      const updatedPost = await $fetch<RichPost>(`${apiBase}/social/journal/${id}/`, {
        method: 'PATCH',
        headers: { 
          Authorization: `Token ${token.value}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      richPosts.value = richPosts.value.map(post => post.id === id ? updatedPost : post);
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
    createRichPost,
    toggleLikeRichPost,
    toggleBookmarkRichPost,
    deleteRichPost,
    updateRichPost
  };
};
