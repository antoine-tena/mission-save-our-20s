import { useRuntimeConfig, useCookie } from '#app';
import type { AlbumData } from '~/types/album';
import { activeAlbum, isLoading, uploadQueue, draggedPhotoId, draggedSourcePageId, isSidebarCollapsed, activeSidebarTab } from './useAlbumEditorState';
import { useAlbumEditorActions } from './useAlbumEditorActions';

export const useAlbumEditorStore = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || 'http://localhost:8000/api';
  const token = useCookie<string | null>('auth_token');

  const actions = useAlbumEditorActions();

  const updateAlbumTitle = async (albumId: number, title: string) => {
    if (activeAlbum.value && activeAlbum.value.id === albumId) activeAlbum.value.title = title;
    try {
      await $fetch(`${apiBase}/photos/albums/${albumId}/`, { method: 'PATCH', headers: { Authorization: `Token ${token.value}` }, body: { title } });
    } catch (err) { console.error('Failed to rename album:', err); }
  };

  const updateAlbumCover = async (albumId: number, isBackCover: boolean, file: File) => {
    try {
      const fd = new FormData();
      fd.append(isBackCover ? 'back_cover_photo' : 'cover_photo', file);
      const data = await $fetch<AlbumData>(`${apiBase}/photos/albums/${albumId}/`, { method: 'PATCH', headers: { Authorization: `Token ${token.value}` }, body: fd });
      if (activeAlbum.value && activeAlbum.value.id === albumId) {
        if (isBackCover) activeAlbum.value.back_cover_photo_url = data.back_cover_photo_url;
        else activeAlbum.value.cover_photo_url = data.cover_photo_url;
      }
    } catch (err) { console.error('Failed to update album cover:', err); }
  };

  const updateAlbumField = async (albumId: number, field: string, value: any) => {
    if (activeAlbum.value && activeAlbum.value.id === albumId) (activeAlbum.value as any)[field] = value;
    try {
      await $fetch(`${apiBase}/photos/albums/${albumId}/`, { method: 'PATCH', headers: { Authorization: `Token ${token.value}` }, body: { [field]: value } });
    } catch (err) { console.error(`Failed to update album field ${field}:`, err); }
  };

  const updatePhotoCrop = async (photoId: number, cropX: number, cropY: number, cropScale: number, customWidth: number | null = null, customHeight: number | null = null) => {
    if (activeAlbum.value) {
      for (const page of activeAlbum.value.pages) {
        const photo = page.photos.find(p => p.id === photoId);
        if (photo) {
          photo.crop_x = cropX; photo.crop_y = cropY; photo.crop_scale = cropScale;
          photo.custom_width = customWidth; photo.custom_height = customHeight;
          break;
        }
      }
    }
    try {
      await $fetch(`${apiBase}/photos/${photoId}/`, {
        method: 'PATCH', headers: { Authorization: `Token ${token.value}` },
        body: { crop_x: cropX, crop_y: cropY, crop_scale: cropScale, custom_width: customWidth, custom_height: customHeight }
      });
    } catch (err) { console.error('Failed to update photo crop:', err); }
  };

  const fetchAlbumDetail = async (id: number, silent = false) => {
    if (!silent) isLoading.value = true;
    try {
      const data = await $fetch<AlbumData>(`${apiBase}/photos/albums/${id}/?t=${Date.now()}`, { headers: { Authorization: `Token ${token.value}` } });
      activeAlbum.value = data;
    } catch (err) { console.error('Error loading album details:', err); } finally {
      if (!silent) isLoading.value = false;
    }
  };

  return {
    activeAlbum, isLoading, uploadQueue, draggedPhotoId, draggedSourcePageId, isSidebarCollapsed, activeSidebarTab,
    fetchAlbumDetail, updateAlbumTitle, updateAlbumCover, updateAlbumField, updatePhotoCrop,
    ...actions
  };
};