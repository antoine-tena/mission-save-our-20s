import { ref } from 'vue';
import type { SocialPost } from '~/types';

export const useSocialPosts = (apiBase: string, token: any) => {
  const posts = ref<SocialPost[]>([]);

  const fetchPosts = async (username?: string) => {
    try {
      let url = `${apiBase}/social/posts/`;
      if (username) url += `?username=${username}`;
      posts.value = await $fetch<SocialPost[]>(url, {
        headers: { Authorization: `Token ${token.value}` }
      });
    } catch (err) { console.error(err); }
  };

  const createPost = async (formData: FormData) => {
    try {
      await $fetch(`${apiBase}/social/posts/`, {
        method: 'POST', headers: { Authorization: `Token ${token.value}` }, body: formData
      });
      return true;
    } catch (err) { console.error(err); return false; }
  };

  const likePost = async (id: number) => {
    try {
      const data = await $fetch<{ liked: boolean }>(`${apiBase}/social/posts/${id}/like/`, {
        method: 'POST', headers: { Authorization: `Token ${token.value}` }
      });
      const post = posts.value.find(p => p.id === id);
      if (post) {
        post.is_liked = data.liked;
        post.likes_count += data.liked ? 1 : -1;
      }
    } catch (err) { console.error(err); }
  };

  return { posts: readonly(posts), fetchPosts, createPost, likePost };
};
