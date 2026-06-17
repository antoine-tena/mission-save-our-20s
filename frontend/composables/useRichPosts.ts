import { ref } from 'vue';
import type { RichPost } from '~/types';

export const useRichPosts = () => {
  const api = useApi();

  const richPosts = ref<RichPost[]>([]);
  const isLoading = ref(false);

  const fetchRichPosts = async () => {
    isLoading.value = true;
    try {
      richPosts.value = await api.get<RichPost[]>('/social/rich-posts/');
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const createRichPost = async (formData: FormData) => {
    try {
      await api.post('/social/rich-posts/', formData);
      await fetchRichPosts();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const toggleLikeRichPost = async (id: number) => {
    try {
      const response = await api.post<{ status: string; likes_count: number }>(`/social/journal/${id}/like/`);
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
      const response = await api.post<{ status: string; is_bookmarked: boolean }>(`/social/journal/${id}/bookmark/`);
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
      await api.delete(`/social/journal/${id}/`);
      richPosts.value = richPosts.value.filter(post => post.id !== id);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const updateRichPost = async (id: number, payload: any) => {
    try {
      const updatedPost = await api.patch<RichPost>(`/social/journal/${id}/`, payload);
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
