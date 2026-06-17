import { ref } from 'vue';
import type { SocialPost } from '~/types';

export const useSocialPosts = () => {
  const api = useApi();
  const posts = ref<SocialPost[]>([]);

  const fetchPosts = async (username?: string) => {
    try {
      let url = '/social/posts/';
      if (username) url += `?username=${username}`;
      posts.value = await api.get<SocialPost[]>(url);
    } catch (err) { console.error(err); }
  };

  const createPost = async (formData: FormData) => {
    try {
      await api.post('/social/posts/', formData);
      return true;
    } catch (err) { console.error(err); return false; }
  };

  const likePost = async (id: number) => {
    try {
      const data = await api.post<{ liked: boolean }>(`/social/posts/${id}/like/`);
      const post = posts.value.find(p => p.id === id);
      if (post) {
        post.is_liked = data.liked;
        post.likes_count += data.liked ? 1 : -1;
      }
    } catch (err) { console.error(err); }
  };

  return { posts: readonly(posts), fetchPosts, createPost, likePost };
};
