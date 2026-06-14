import { ref } from 'vue';
import { useAlbumEditorStore } from './useAlbumEditorStore';

export function useBookSpreadActions(leftPage: any, rightPage: any, activeAlbum: any, logicState: any) {
  const { updatePageField, updateAlbumField } = useAlbumEditorStore();

  const leftColorInput = ref<HTMLInputElement | null>(null);
  const rightColorInput = ref<HTMLInputElement | null>(null);
  const albumColorInput = ref<HTMLInputElement | null>(null);

  const triggerLeftColorPicker = () => { leftColorInput.value?.click(); };
  const triggerRightColorPicker = () => { rightColorInput.value?.click(); };
  const triggerAlbumColorPicker = () => { albumColorInput.value?.click(); };

  const selectSpreadBackgroundColor = async (color: string) => {
    if (leftPage.value) await updatePageField(leftPage.value.id, 'background_color', color);
    if (rightPage.value) await updatePageField(rightPage.value.id, 'background_color', color);
    if (activeAlbum.value) await logicState.fetchAlbumDetail(activeAlbum.value.id, true);
  };

  const onLeftColorInput = async (e: Event) => {
    if (leftPage.value) {
      const color = (e.target as HTMLInputElement).value;
      await updatePageField(leftPage.value.id, 'background_color', color);
      await logicState.fetchAlbumDetail(leftPage.value.album, true);
    }
  };

  const onRightColorInput = async (e: Event) => {
    if (rightPage.value) {
      const color = (e.target as HTMLInputElement).value;
      await updatePageField(rightPage.value.id, 'background_color', color);
      await logicState.fetchAlbumDetail(rightPage.value.album, true);
    }
  };

  const onAlbumColorInput = async (e: Event) => {
    if (activeAlbum.value) {
      const color = (e.target as HTMLInputElement).value;
      try {
        await updateAlbumField(activeAlbum.value.id, 'cover_color', color);
        await logicState.fetchAlbumDetail(activeAlbum.value.id, true);
      } catch (err) { console.error(err); }
    }
  };

  const togglePageLayout = async (page: any) => {
    if (!page) return;
    const isText = page.layout_type === 'text-only';
    await updatePageField(page.id, 'layout_type', isText ? 'grid-1' : 'text-only');
    await logicState.fetchAlbumDetail(page.album, true);
  };

  const cycleSlots = async (page: any) => {
    if (!page) return;
    const layoutType = page.layout_type || 'grid-1';
    let count = 1;
    if (layoutType.startsWith('grid-')) count = parseInt(layoutType.split('-')[1]) || 1;
    else if (layoutType === 'mosaic') count = 3;
    let nextCount = count + 1;
    if (nextCount > 6) nextCount = 1;
    await updatePageField(page.id, 'layout_type', `grid-${nextCount}`);
    await logicState.fetchAlbumDetail(page.album, true);
  };

  const injectTitle = async (page: any) => {
    if (!page) return;
    const currentTitle = page.title || '';
    const newTitle = prompt('Entrez le titre de la page :', currentTitle);
    if (newTitle !== null) {
      await updatePageField(page.id, 'title', newTitle);
      await logicState.fetchAlbumDetail(page.album, true);
    }
  };

  return {
    leftColorInput, rightColorInput, albumColorInput,
    triggerLeftColorPicker, triggerRightColorPicker, triggerAlbumColorPicker,
    selectSpreadBackgroundColor, onLeftColorInput, onRightColorInput, onAlbumColorInput,
    togglePageLayout, cycleSlots, injectTitle
  };
}
