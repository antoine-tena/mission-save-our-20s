import { ref, computed } from 'vue';
import type { User, AuthResponse } from '~/types';

export const useAuth = () => {
  const api = useApi();
  const user = useState<User | null>('auth_user', () => null);
  const token = useCookie<string | null>('auth_token', {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/'
  });

  const isAuthenticated = computed(() => !!token.value);

  const register = async (username: string, password: string, email: string = '') => {
    try {
      const response = await api.post<AuthResponse>('/auth/register/', { username, password, email });
      token.value = response.token;
      user.value = response.user;
      return { success: true };
    } catch (err: any) {
      console.error(err);
      return { success: false, error: err.data?.error || 'Erreur lors de l\'inscription' };
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post<AuthResponse>('/auth/login/', { username, password });
      token.value = response.token;
      user.value = response.user;
      return { success: true };
    } catch (err: any) {
      console.error(err);
      return { success: false, error: err.data?.error || 'Identifiants invalides' };
    }
  };

  const logout = async () => {
    if (token.value) {
      try {
        await api.post('/auth/logout/');
      } catch (err) {
        console.error('Logout error:', err);
      }
    }
    token.value = null;
    user.value = null;
    navigateTo('/login');
  };

  const fetchUser = async () => {
    if (!token.value) return;
    try {
      user.value = await api.get<User>('/auth/me/');
    } catch (err) {
      token.value = null;
      user.value = null;
    }
  };

  const updateUserAvatar = (avatarUrl: string | null) => {
    if (user.value) {
      user.value = { ...user.value, avatar_url: avatarUrl };
    }
  };

  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated,
    register,
    login,
    logout,
    fetchUser,
    updateUserAvatar
  };
};
