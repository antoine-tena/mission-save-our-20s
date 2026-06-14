import { ref } from 'vue';
import type { Photo } from '~/types';

export interface AlbumPageDetail {
  id: number;
  album: number;
  title: string;
  description: string;
  date: string | null;
  location: string | null;
  layout_type: 'full' | 'scrapbook' | 'mosaic' | 'text-only';
  background_color: string;
  sticker: string | null;
  order: number;
  photos: any[];
}

export interface AlbumDetail {
  id: number;
  author_name: string;
  title: string;
  description: string | null;
  cover_photo: number | null;
  cover_photo_url: string | null;
  pages?: AlbumPageDetail[];
  created_at: string;
}

export const useAlbums = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || 'http://localhost:8000/api';
  const token = useCookie<string | null>('auth_token');

  const customAlbums = ref<AlbumDetail[]>([]);
  const isAlbumsLoading = ref(false);

  const fetchAlbums = async () => {
    isAlbumsLoading.value = true;
    try {
      const res: any = await $fetch(`${apiBase}/photos/albums/?t=${Date.now()}`, {
        headers: { Authorization: `Token ${token.value}` }
      });
      customAlbums.value = res.results || res;
    } catch (err) {
      console.error('Error fetching custom albums:', err);
    } finally {
      isAlbumsLoading.value = false;
    }
  };

  const createAlbum = async (albumData: { title: string; description: string; theme: string; photos: number[]; cover_photo: number | null; layout_data?: any }) => {
    try {
      const response = await $fetch<AlbumDetail>(`${apiBase}/photos/albums/`, {
        method: 'POST',
        headers: { Authorization: `Token ${token.value}` },
        body: albumData
      });
      await fetchAlbums();
      return response;
    } catch (err) {
      console.error('Error creating album:', err);
      return null;
    }
  };

  const updateAlbum = async (id: number, albumData: { title?: string; description?: string; theme?: string; photos?: number[]; cover_photo?: number | null; layout_data?: any }) => {
    try {
      const response = await $fetch<AlbumDetail>(`${apiBase}/photos/albums/${id}/`, {
        method: 'PATCH',
        headers: { Authorization: `Token ${token.value}` },
        body: albumData
      });
      await fetchAlbums();
      return response;
    } catch (err) {
      console.error('Error updating album:', err);
      return null;
    }
  };

  const deleteAlbum = async (id: number) => {
    try {
      await $fetch(`${apiBase}/photos/albums/${id}/`, {
        method: 'DELETE',
        headers: { Authorization: `Token ${token.value}` }
      });
      customAlbums.value = customAlbums.value.filter(a => a.id !== id);
      return true;
    } catch (err) {
      console.error('Error deleting album:', err);
      return false;
    }
  };

  return {
    customAlbums: readonly(customAlbums),
    isAlbumsLoading: readonly(isAlbumsLoading),
    fetchAlbums,
    createAlbum,
    updateAlbum,
    deleteAlbum
  };
};
