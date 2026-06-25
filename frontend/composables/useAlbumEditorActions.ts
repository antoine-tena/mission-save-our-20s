import type { AlbumData, PageData, PhotoData } from '~/types/album';
import { activeAlbum, uploadQueue } from './useAlbumEditorState';
import { useAlbumHistory } from './useAlbumHistory';

export function useAlbumEditorActions() {
  const api = useApi();

  const updatePageField = async (pageId: number, field: string, value: any) => {
    const { recordHistory } = useAlbumHistory();
    recordHistory();
    if (!activeAlbum.value) return;
    const page = activeAlbum.value.pages.find(p => p.id === pageId);
    if (page) (page as any)[field] = value;
    try {
      await api.patch(`/photos/pages/${pageId}/`, { [field]: value });
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
        await api.post<PhotoData>('/photos/', fd);
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
      const pageResp = await api.post<PageData>(`/photos/albums/${albumId}/pages/`, { album: albumId, layout_type: 'scrapbook', title: 'Nouveau Moment' });
      if (activeAlbum.value) activeAlbum.value.pages.push(pageResp);
      return pageResp;
    } catch (err) { return null; }
  };

  const deletePage = async (pageId: number) => {
    try {
      await api.delete(`/photos/pages/${pageId}/`);
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
      return await api.post<AlbumData>('/photos/albums/', fd);
    } catch (err) { return null; }
  };

  const reorderPages = async (albumId: number, orderedIds: number[]) => {
    const { recordHistory } = useAlbumHistory();
    recordHistory();
    if (activeAlbum.value) activeAlbum.value.pages.sort((a, b) => orderedIds.indexOf(a.id) - orderedIds.indexOf(b.id));
    try {
      await api.post(`/photos/albums/${albumId}/reorder/`, { page_ids: orderedIds });
    } catch (err) { console.error('Failed to save page order:', err); }
  };

  return { updatePageField, uploadPhotosToPage, createPage, deletePage, createNewAlbum, reorderPages };
}
