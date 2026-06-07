import { ref, computed } from 'vue';
import type { User, AuthResponse } from '~/types';

export const useAuth = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || 'http://127.0.0.1:8000/api';

  const user = useState<User | null>('auth_user', () => null);
  const token = useCookie<string | null>('auth_token', {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/'
  });

  const isAuthenticated = computed(() => !!token.value);

  const register = async (username: string, password: string, email: string = '') => {
    try {
      const response = await $fetch<AuthResponse>(`${apiBase}/auth/register/`, {
        method: 'POST',
        body: { username, password, email },
        credentials: 'include'
      });
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
      const response = await $fetch<AuthResponse>(`${apiBase}/auth/login/`, {
        method: 'POST',
        body: { username, password },
        credentials: 'include'
      });
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
        await $fetch(`${apiBase}/auth/logout/`, {
          method: 'POST',
          headers: {
            'Authorization': `Token ${token.value}`
          },
          credentials: 'include'
        });
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
      const data = await $fetch<User>(`${apiBase}/auth/me/`, {
        headers: {
          'Authorization': `Token ${token.value}`
        },
        credentials: 'include'
      });
      user.value = data;
    } catch (err) {
      token.value = null;
      user.value = null;
    }
  };

  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated,
    register,
    login,
    logout,
    fetchUser
  };
};
