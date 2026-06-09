import { ref, computed } from 'vue';
import { useRuntimeConfig, useCookie } from '#app';
import { useAlbumEditorStore } from './useAlbumEditorStore';

export function useBookSpreadLogic(props: { activePageIdx: number }, emit: any) {
  const { activeAlbum, fetchAlbumDetail, draggedPhotoId, draggedSourcePageId, updateAlbumField, updatePageField } = useAlbumEditorStore();
  const isFlipping = ref(false);
  const flipDirection = ref<'next' | 'prev'>('next');
  const isCoverDragOver = ref(false);
  const isBackCoverDragOver = ref(false);

  const spreadsList = computed(() => {
    if (!activeAlbum.value) return [];
    const pages = activeAlbum.value.pages;
    const spreads = [];
    spreads.push({ leftPage: null, rightPage: null });
    for (let i = 0; i < pages.length; i += 2) {
      spreads.push({ leftPage: pages[i] || null, rightPage: pages[i + 1] || null });
    }
    return spreads;
  });

  const isFullWrapCover = computed(() => activeAlbum.value?.is_full_wrap === true);
  const leftPage = computed(() => props.activePageIdx === 0 ? null : activeAlbum.value?.pages[props.activePageIdx - 2] || null);
  const rightPage = computed(() => props.activePageIdx === 0 ? null : activeAlbum.value?.pages[props.activePageIdx - 1] || null);
  const maxPageIdx = computed(() => (spreadsList.value.length - 1) * 2);

  const onTurnPage = async (direction: 'next' | 'prev') => {
    if ((direction === 'next' && props.activePageIdx >= maxPageIdx.value) || (direction === 'prev' && props.activePageIdx <= 0)) return;
    if (isFlipping.value) return;
    isFlipping.value = true;
    flipDirection.value = direction;
    emit('update:activePageIdx', direction === 'next' ? props.activePageIdx + 2 : props.activePageIdx - 2);
    await new Promise(r => setTimeout(r, 350));
    isFlipping.value = false;
  };

  const toggleFullWrap = async (enable: boolean) => {
    if (!activeAlbum.value) return;
    try {
      const config = useRuntimeConfig();
      const token = useCookie<string | null>('auth_token');
      await $fetch(`${config.public.apiBase}/photos/albums/${activeAlbum.value.id}/`, {
        method: 'PATCH', headers: { Authorization: `Token ${token.value}` }, body: { is_full_wrap: enable }
      });
      await fetchAlbumDetail(activeAlbum.value.id, true);
    } catch (err) { console.error(err); }
  };

  const retirePageStyle = async (page: any) => {
    if (!page) return;
    try {
      await updatePageField(page.id, 'background_color', '#ffffff');
      await updatePageField(page.id, 'sticker', null);
      await fetchAlbumDetail(page.album, true);
    } catch (err) { console.error('Failed to retire page style:', err); }
  };

  const propagateEnveloping = async (sourcePage: any, targetPage: any) => {
    if (!sourcePage || !targetPage) return;
    try {
      await updatePageField(targetPage.id, 'background_color', sourcePage.background_color || '#ffffff');
      await updatePageField(targetPage.id, 'sticker', sourcePage.sticker || null);
      await fetchAlbumDetail(sourcePage.album, true);
    } catch (err) { console.error('Failed to propagate enveloping style:', err); }
  };

  return {
    activeAlbum,
    isFlipping,
    flipDirection,
    isCoverDragOver,
    isBackCoverDragOver,
    spreadsList,
    isFullWrapCover,
    leftPage,
    rightPage,
    maxPageIdx,
    onTurnPage,
    toggleFullWrap,
    draggedPhotoId,
    draggedSourcePageId,
    fetchAlbumDetail,
    retirePageStyle,
    propagateEnveloping
  };
}
