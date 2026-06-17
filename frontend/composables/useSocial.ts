import { ref } from 'vue';
import type { Profile, AsyncStatus } from '~/types';

export const useSocial = () => {
  const api = useApi();

  const profile = ref<Profile | null>(null);
  const status = ref<AsyncStatus>('idle');

  const fetchProfile = async (username?: string) => {
    try {
      const url = username ? `/social/profile/${username}/` : '/social/profile/';
      profile.value = await api.get<Profile>(url);
    } catch (err) { console.error(err); }
  };

  const { updateUserAvatar } = useAuth();

  const updateProfile = async (formData: FormData) => {
    try {
      const updated = await api.patch<Profile>('/social/profile/', formData);
      profile.value = updated;
      updateUserAvatar(updated.avatar_url);
      return true;
    } catch (err) { console.error(err); return false; }
  };

  const { posts, fetchPosts, createPost, likePost } = useSocialPosts();

  return {
    profile: readonly(profile), posts, status,
    fetchProfile, updateProfile, fetchPosts, createPost, likePost
  };
};
