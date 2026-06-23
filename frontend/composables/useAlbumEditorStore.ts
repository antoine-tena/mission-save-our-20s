import { activeAlbum, isLoading, uploadQueue, draggedPhotoId, draggedSourcePageId, isSidebarCollapsed, activeSidebarTab, focusedPhotoId, activePageIdx, croppingPhotoId, tempCropScale, canvasZoom } from './useAlbumEditorState';
import { useAlbumEditorActions } from './useAlbumEditorActions';
import { useAlbumHistory } from './useAlbumHistory';
import type { AlbumData } from '~/types/album';

export const useAlbumEditorStore = () => {
  const api = useApi();
  const actions = useAlbumEditorActions();

  const updateAlbumTitle = async (albumId: number, title: string) => {
    const { recordHistory } = useAlbumHistory();
    recordHistory();
    if (activeAlbum.value && activeAlbum.value.id === albumId) activeAlbum.value.title = title;
    try {
      await api.patch(`/photos/albums/${albumId}/`, { title });
    } catch (err) { console.error('Failed to rename album:', err); }
  };

  const updateAlbumCover = async (albumId: number, isBackCover: boolean, file: File) => {
    const { recordHistory } = useAlbumHistory();
    recordHistory();
    try {
      const fd = new FormData();
      fd.append(isBackCover ? 'back_cover_photo' : 'cover_photo', file);
      const data = await api.patch<AlbumData>(`/photos/albums/${albumId}/`, fd);
      if (activeAlbum.value && activeAlbum.value.id === albumId) {
        if (isBackCover) activeAlbum.value.back_cover_photo_url = data.back_cover_photo_url;
        else activeAlbum.value.cover_photo_url = data.cover_photo_url;
      }
    } catch (err) { console.error('Failed to update album cover:', err); }
  };

  const updateAlbumField = async (albumId: number, field: string, value: any) => {
    const { recordHistory } = useAlbumHistory();
    recordHistory();
    if (activeAlbum.value && activeAlbum.value.id === albumId) (activeAlbum.value as any)[field] = value;
    try {
      await api.patch(`/photos/albums/${albumId}/`, { [field]: value });
    } catch (err) { console.error(`Failed to update album field ${field}:`, err); }
  };

  const updatePhotoCrop = async (photoId: number, cropX: number, cropY: number, cropScale: number, customWidth: number | null = null, customHeight: number | null = null) => {
    const { recordHistory } = useAlbumHistory();
    recordHistory();
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
      const bodyPayload: any = { crop_x: cropX, crop_y: cropY, crop_scale: cropScale };
      if (customWidth !== null) bodyPayload.custom_width = customWidth;
      if (customHeight !== null) bodyPayload.custom_height = customHeight;
      await api.patch(`/photos/${photoId}/`, bodyPayload);
      if (activeAlbum.value) await fetchAlbumDetail(activeAlbum.value.id, true);
    } catch (err) { console.error('Failed to update photo crop:', err); }
  };

  const updatePhotoPosition = async (photoId: number, customX: number | null, customY: number | null, customWidth: number | null = null, customHeight: number | null = null, pageId: number | null = null) => {
    const { recordHistory } = useAlbumHistory();
    recordHistory();
    if (activeAlbum.value) {
      let foundPhoto: any = null;
      for (const page of activeAlbum.value.pages) {
        const index = page.photos.findIndex(p => p.id === photoId);
        if (index !== -1) {
          foundPhoto = page.photos.splice(index, 1)[0];
          break;
        }
      }
      if (foundPhoto) {
        foundPhoto.custom_x = customX; foundPhoto.custom_y = customY;
        if (customWidth !== null) foundPhoto.custom_width = customWidth;
        if (customHeight !== null) foundPhoto.custom_height = customHeight;
        const targetPageId = pageId || foundPhoto.page;
        foundPhoto.page = targetPageId;
        const targetPage = activeAlbum.value.pages.find(p => p.id === targetPageId);
        if (targetPage) targetPage.photos.push(foundPhoto);
      }
    }
    try {
      const bodyPayload: any = { custom_x: customX, custom_y: customY };
      if (customWidth !== null) bodyPayload.custom_width = customWidth;
      if (customHeight !== null) bodyPayload.custom_height = customHeight;
      if (pageId !== null) bodyPayload.page = pageId;
      await api.patch(`/photos/${photoId}/`, bodyPayload);
    } catch (err) { console.error('Failed to update photo position:', err); }
  };

  const fetchAlbumDetail = async (id: number, silent = false) => {
    if (!silent) {
      isLoading.value = true;
      const { clearHistory } = useAlbumHistory();
      clearHistory();
    }
    try {
      activeAlbum.value = await api.get<AlbumData>(`/photos/albums/${id}/?t=${Date.now()}`);
    } catch (err) { console.error('Error loading album details:', err); } finally {
      if (!silent) isLoading.value = false;
    }
  };

  const isPageRestricted = (pageId: number | undefined): boolean => {
    return false;
  };

  return {
    activeAlbum, isLoading, uploadQueue, draggedPhotoId, draggedSourcePageId, isSidebarCollapsed, activeSidebarTab, focusedPhotoId, activePageIdx, croppingPhotoId, tempCropScale, canvasZoom,
    fetchAlbumDetail, updateAlbumTitle, updateAlbumCover, updateAlbumField, updatePhotoCrop, updatePhotoPosition, isPageRestricted,
    ...actions
  };
};
