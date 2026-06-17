import { readonly } from 'vue';

export const useApi = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || 'http://localhost:8000/api';
  const token = useCookie<string | null>('auth_token');

  const getHeaders = (customHeaders?: Record<string, string>) => {
    const headers: Record<string, string> = {};
    if (token.value) {
      headers['Authorization'] = `Token ${token.value}`;
    }
    return { ...headers, ...customHeaders };
  };

  const request = async <T>(url: string, options: any = {}): Promise<T> => {
    const fullUrl = url.startsWith('http') ? url : `${apiBase}${url.startsWith('/') ? '' : '/'}${url}`;
    const headers = getHeaders(options.headers);
    return $fetch<T>(fullUrl, {
      ...options,
      headers,
      credentials: 'include'
    });
  };

  return {
    apiBase,
    token: readonly(token),
    request,
    get: <T>(url: string, options: any = {}) => request<T>(url, { ...options, method: 'GET' }),
    post: <T>(url: string, body?: any, options: any = {}) => request<T>(url, { ...options, method: 'POST', body }),
    put: <T>(url: string, body?: any, options: any = {}) => request<T>(url, { ...options, method: 'PUT', body }),
    patch: <T>(url: string, body?: any, options: any = {}) => request<T>(url, { ...options, method: 'PATCH', body }),
    delete: <T>(url: string, options: any = {}) => request<T>(url, { ...options, method: 'DELETE' })
  };
};
