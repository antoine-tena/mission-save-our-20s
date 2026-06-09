import { ref, computed } from 'vue';
import { useRuntimeConfig, useCookie } from '#app';
import { useAlbumEditorStore } from './useAlbumEditorStore';

export function useBookSpreadLogic(props: { activePageIdx: number }, emit: any) {
  const { activeAlbum, fetchAlbumDetail, draggedPhotoId, draggedSourcePageId, updateAlbumField, updatePageField } = useAlbumEditorStore();
  const isFlipping = ref(false);
  const flipDirection = ref<'next' | 'prev'>('next');
  const isCoverDragOver = ref(false);
  const isBackCoverDragOver = ref(false);
  const isAnalyzing = ref(false);

  const spreadsList = computed(() => {
    if (!activeAlbum.value) return [];
    const pages = activeAlbum.value.pages;
    const spreads = [];
    // 1. Cover Spread (Beginning): Left is Back Cover, Right is Front Cover
    spreads.push({ leftPage: null, rightPage: null });
    // 2. Interior spreads
    for (let i = 0; i < pages.length; i += 2) {
      spreads.push({ leftPage: pages[i] || null, rightPage: pages[i + 1] || null });
    }
    // 3. Cover Spread (End): Left is Back Cover, Right is Front Cover
    spreads.push({ leftPage: null, rightPage: null });
    return spreads;
  });

  const isFullWrapCover = computed(() => activeAlbum.value?.is_full_wrap === true);
  const maxPageIdx = computed(() => (spreadsList.value.length - 1) * 2);
  const leftPage = computed(() => (props.activePageIdx === 0 || props.activePageIdx === maxPageIdx.value) ? null : activeAlbum.value?.pages[props.activePageIdx - 2] || null);
  const rightPage = computed(() => (props.activePageIdx === 0 || props.activePageIdx === maxPageIdx.value) ? null : activeAlbum.value?.pages[props.activePageIdx - 1] || null);

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
      await updatePageField(page.id, 'is_auto_color', false);
      await updatePageField(page.id, 'background_color', '#ffffff');
      await updatePageField(page.id, 'sticker', null);
      await fetchAlbumDetail(page.album, true);
    } catch (err) { console.error('Failed to retire page style:', err); }
  };

  const propagateEnveloping = async (sourcePage: any, targetPage: any) => {
    if (!sourcePage || !targetPage) return;
    try {
      await updatePageField(targetPage.id, 'is_auto_color', false);
      await updatePageField(targetPage.id, 'background_color', sourcePage.background_color || '#ffffff');
      await updatePageField(targetPage.id, 'sticker', sourcePage.sticker || null);
      await fetchAlbumDetail(sourcePage.album, true);
    } catch (err) { console.error('Failed to propagate enveloping style:', err); }
  };

  // --- ONE-SHOT AUTO COLOR LOGIC FOR DOUBLE PAGE (SPREAD) ---
  const applySuggestedColor = async () => {
    if (isAnalyzing.value) return;
    
    // Collect all photo urls on this spread
    const urls: string[] = [];
    if (leftPage.value?.photos) {
      for (const p of leftPage.value.photos) {
        if (p.image_url) urls.push(p.image_url);
      }
    }
    if (rightPage.value?.photos) {
      for (const p of rightPage.value.photos) {
        if (p.image_url) urls.push(p.image_url);
      }
    }

    if (urls.length === 0) {
      alert("Ajoutez d'abord des photos sur cette double-page pour pouvoir suggérer automatiquement une couleur de fond !");
      return;
    }

    isAnalyzing.value = true;
    try {
      const { getBestBackgroundForImages } = await import('~/utils/colorExtractor');
      const bestColor = await getBestBackgroundForImages(urls);

      if (leftPage.value) {
        await updatePageField(leftPage.value.id, 'background_color', bestColor);
      }
      if (rightPage.value) {
        await updatePageField(rightPage.value.id, 'background_color', bestColor);
      }

      if (activeAlbum.value) {
        await fetchAlbumDetail(activeAlbum.value.id, true);
      }
    } catch (err) {
      console.error('Failed to apply suggested color:', err);
    } finally {
      // Artificial delay of 450ms for premium fluid visual feedback
      await new Promise(r => setTimeout(r, 450));
      isAnalyzing.value = false;
    }
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
    propagateEnveloping,
    isAnalyzing,
    applySuggestedColor
  };
}
