import { useRuntimeConfig, useCookie } from '#app';
import type { AlbumData, PageData, PhotoData } from '~/types/album';
import { activeAlbum, uploadQueue } from './useAlbumEditorState';

export function useAlbumEditorActions() {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || 'http://localhost:8000/api';
  const token = useCookie<string | null>('auth_token');

  const updatePageField = async (pageId: number, field: string, value: any) => {
    if (!activeAlbum.value) return;
    const page = activeAlbum.value.pages.find(p => p.id === pageId);
    if (page) (page as any)[field] = value;
    try {
      await $fetch(`${apiBase}/photos/pages/${pageId}/`, {
        method: 'PATCH', headers: { Authorization: `Token ${token.value}` }, body: { [field]: value }
      });
    } catch (err) { console.error('Failed to auto-save field:', err); }
  };

  const uploadPhotosToPage = async (pageId: number | undefined, files: FileList | File[]) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file) continue;
      const previewUrl = URL.createObjectURL(file);
      const queueItem: any = { file, previewUrl, status: 'uploading' };
      uploadQueue.value.push(queueItem);
      const fd = new FormData();
      fd.append('image', file);
      fd.append('titre', file.name);
      try {
        await $fetch<PhotoData>(`${apiBase}/photos/`, { method: 'POST', headers: { Authorization: `Token ${token.value}` }, body: fd });
        queueItem.status = 'success';
        setTimeout(() => uploadQueue.value = uploadQueue.value.filter(q => q !== queueItem), 1000);
      } catch (err) {
        queueItem.status = 'failed';
        setTimeout(() => uploadQueue.value = uploadQueue.value.filter(q => q !== queueItem), 3000);
      }
    }
  };

  const createPage = async (albumId: number) => {
    try {
      const pageResp = await $fetch<PageData>(`${apiBase}/photos/albums/${albumId}/pages/`, {
        method: 'POST', headers: { Authorization: `Token ${token.value}` }, body: { layout_type: 'scrapbook', title: 'Nouveau Moment' }
      });
      if (activeAlbum.value) activeAlbum.value.pages.push(pageResp);
      return pageResp;
    } catch (err) { return null; }
  };

  const deletePage = async (pageId: number) => {
    try {
      await $fetch(`${apiBase}/photos/pages/${pageId}/`, { method: 'DELETE', headers: { Authorization: `Token ${token.value}` } });
      if (activeAlbum.value) activeAlbum.value.pages = activeAlbum.value.pages.filter(p => p.id !== pageId);
      return true;
    } catch (err) { return false; }
  };

  const createNewAlbum = async (title: string, desc: string, coverFile: File | null) => {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', desc);
    if (coverFile) fd.append('cover_photo', coverFile);
    try {
      return await $fetch<AlbumData>(`${apiBase}/photos/albums/`, { method: 'POST', headers: { Authorization: `Token ${token.value}` }, body: fd });
    } catch (err) { return null; }
  };

  const reorderPages = async (albumId: number, orderedIds: number[]) => {
    if (activeAlbum.value) activeAlbum.value.pages.sort((a, b) => orderedIds.indexOf(a.id) - orderedIds.indexOf(b.id));
    try {
      await $fetch(`${apiBase}/photos/albums/${albumId}/reorder/`, {
        method: 'POST', headers: { Authorization: `Token ${token.value}` }, body: { page_ids: orderedIds }
      });
    } catch (err) { console.error('Failed to save page order:', err); }
  };

  return { updatePageField, uploadPhotosToPage, createPage, deletePage, createNewAlbum, reorderPages };
}