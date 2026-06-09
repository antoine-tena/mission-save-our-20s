import { ref } from 'vue';
import type { Profile, AsyncStatus } from '~/types';

export const useSocial = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;
  const token = useCookie<string | null>('auth_token');

  const profile = ref<Profile | null>(null);
  const status = ref<AsyncStatus>('idle');

  const fetchProfile = async (username?: string) => {
    try {
      const url = username ? `${apiBase}/social/profile/${username}/` : `${apiBase}/social/profile/`;
      profile.value = await $fetch<Profile>(url, {
        headers: { Authorization: `Token ${token.value}` },
        credentials: 'include'
      });
    } catch (err) { console.error(err); }
  };

  const updateProfile = async (formData: FormData) => {
    try {
      profile.value = await $fetch<Profile>(`${apiBase}/social/profile/`, {
        method: 'PATCH', headers: { Authorization: `Token ${token.value}` }, body: formData
      });
      return true;
    } catch (err) { console.error(err); return false; }
  };

  const { posts, fetchPosts, createPost, likePost } = useSocialPosts(apiBase, token);

  return {
    profile: readonly(profile), posts, status,
    fetchProfile, updateProfile, fetchPosts, createPost, likePost
  };
};
