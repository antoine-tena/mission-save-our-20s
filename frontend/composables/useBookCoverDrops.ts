import { useRuntimeConfig } from '#app';

export function useBookCoverDrops(state: any) {
  const api = useApi();
  const { activeAlbum, isCoverDragOver, isBackCoverDragOver, draggedPhotoId, draggedSourcePageId, fetchAlbumDetail } = state;

  const onCoverDragOver = (e: DragEvent) => { e.preventDefault(); isCoverDragOver.value = true; };
  const onCoverDragLeave = () => { isCoverDragOver.value = false; };
  
  const onBackCoverDragOver = (e: DragEvent) => { e.preventDefault(); isBackCoverDragOver.value = true; };
  const onBackCoverDragLeave = () => { isBackCoverDragOver.value = false; };

  const onDeleteCover = async () => {
    if (confirm('Retirer le style/photo de couverture ?')) {
      try {
        const { recordHistory } = useAlbumHistory();
        recordHistory();
        const body: any = { cover_photo_id: null, cover_color: '#3d352e' };
        if (activeAlbum.value?.is_full_wrap) {
          body.back_cover_photo_id = null;
        }
        await api.patch(`/photos/albums/${activeAlbum.value?.id}/`, body);
        await fetchAlbumDetail(activeAlbum.value!.id, true);
      } catch (err) { console.error(err); }
    }
  };

  const onDeleteBackCover = async () => {
    if (confirm('Retirer le style/photo de couverture de fin ?')) {
      try {
        const { recordHistory } = useAlbumHistory();
        recordHistory();
        await api.patch(`/photos/albums/${activeAlbum.value?.id}/`, { back_cover_photo_id: null, cover_color: '#3d352e' });
        await fetchAlbumDetail(activeAlbum.value!.id, true);
      } catch (err) { console.error(err); }
    }
  };

  const onCoverDrop = async (e: DragEvent) => {
    isCoverDragOver.value = false;
    const droppedIdRaw = e.dataTransfer?.getData('text/plain');
    if (!droppedIdRaw || !/^\d+$/.test(droppedIdRaw)) return;
    const photoId = parseInt(droppedIdRaw, 10);
    if (!activeAlbum.value) return;
    try {
      const { recordHistory } = useAlbumHistory();
      recordHistory();
      if (draggedSourcePageId.value !== null && draggedPhotoId.value !== null) {
        await api.patch(`/photos/${draggedPhotoId.value}/`, { page: null, order: 0 });
      }
      await api.patch(`/photos/albums/${activeAlbum.value?.id}/`, { cover_photo_id: photoId });
      await fetchAlbumDetail(activeAlbum.value!.id, true);
    } catch (err) { console.error(err); } finally { draggedPhotoId.value = null; draggedSourcePageId.value = null; }
  };

  const onBackCoverDrop = async (e: DragEvent) => {
    isBackCoverDragOver.value = false;
    const droppedIdRaw = e.dataTransfer?.getData('text/plain');
    if (!droppedIdRaw || !/^\d+$/.test(droppedIdRaw)) return;
    const photoId = parseInt(droppedIdRaw, 10);
    if (!activeAlbum.value) return;
    try {
      const { recordHistory } = useAlbumHistory();
      recordHistory();
      if (draggedSourcePageId.value !== null && draggedPhotoId.value !== null) {
        await api.patch(`/photos/${draggedPhotoId.value}/`, { page: null, order: 0 });
      }
      await api.patch(`/photos/albums/${activeAlbum.value?.id}/`, { back_cover_photo_id: photoId });
      await fetchAlbumDetail(activeAlbum.value!.id, true);
    } catch (err) { console.error(err); } finally { draggedPhotoId.value = null; draggedSourcePageId.value = null; }
  };

  const onFullWrapDrop = async (e: DragEvent) => {
    isCoverDragOver.value = false;
    const droppedIdRaw = e.dataTransfer?.getData('text/plain');
    if (!droppedIdRaw || !/^\d+$/.test(droppedIdRaw)) return;
    const photoId = parseInt(droppedIdRaw, 10);
    if (!activeAlbum.value) return;
    try {
      const { recordHistory } = useAlbumHistory();
      recordHistory();
      if (draggedSourcePageId.value !== null && draggedPhotoId.value !== null) {
        await api.patch(`/photos/${draggedPhotoId.value}/`, { page: null, order: 0 });
      }
      await api.patch(`/photos/albums/${activeAlbum.value?.id}/`, { cover_photo_id: photoId, back_cover_photo_id: photoId });
      await fetchAlbumDetail(activeAlbum.value!.id, true);
    } catch (err) { console.error(err); } finally { draggedPhotoId.value = null; draggedSourcePageId.value = null; }
  };

  const onBackCoverDragStart = (e: DragEvent) => {
    if (!activeAlbum.value) return;
    const backCoverUrl = activeAlbum.value.back_cover_photo_url;
    if (!backCoverUrl) return;
    const matchedPhoto = activeAlbum.value.pages.flatMap((p: any) => p.photos).find((ph: any) => backCoverUrl.endsWith(ph.image_url) || ph.image_url.endsWith(backCoverUrl));
    if (matchedPhoto) {
      draggedPhotoId.value = matchedPhoto.id;
      draggedSourcePageId.value = null;
      e.dataTransfer?.setData('text/plain', matchedPhoto.id.toString());
    }
  };

  return {
    onCoverDragOver, onCoverDragLeave, onBackCoverDragOver, onBackCoverDragLeave,
    onDeleteCover, onDeleteBackCover, onCoverDrop, onBackCoverDrop, onFullWrapDrop,
    onBackCoverDragStart
  };
}
