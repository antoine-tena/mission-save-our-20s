import { ref, computed } from 'vue';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';

export function useAlbumToolbarLogic(props: { page: any }) {
  const { updatePageField, activeAlbum, deletePage, fetchAlbumDetail } = useAlbumEditorStore();
  const hexInput = ref<HTMLInputElement>();
  const showPropagateModal = ref(false);
  const editingCaptionSlot = ref<number | null>(null);
  const editingCaptionPhoto = ref<any>(null);

  const getPhotoAtSlot = (slotIdx: number) => {
    return props.page.photos?.find((p: any) => p.order === slotIdx) || null;
  };

  const slotsCount = computed(() => {
    const layoutType = props.page.layout_type;
    if (layoutType === 'full' || layoutType === 'scrapbook') return 1;
    if (layoutType === 'mosaic') return 3;
    if (layoutType === 'text-only') return 0;
    if (layoutType.startsWith('grid-')) {
      return parseInt(layoutType.split('-')[1]) || 1;
    }
    return 1;
  });

  const adjustSlots = async (delta: number) => {
    const count = slotsCount.value;
    let newCount = count + delta;
    if (newCount < 1) newCount = 1;
    if (newCount > 10) newCount = 10;
    await updatePageField(props.page.id, 'layout_type', `grid-${newCount}`);
  };

  const toggleTextOnly = async () => {
    const isText = props.page.layout_type === 'text-only';
    await updatePageField(props.page.id, 'layout_type', isText ? 'grid-1' : 'text-only');
  };

  const injectTitle = async () => {
    const currentTitle = props.page.title || '';
    const newTitle = prompt('Entrez le titre de la page :', currentTitle);
    if (newTitle !== null) {
      await updatePageField(props.page.id, 'title', newTitle);
    }
  };

  const updateColor = async (c: string) => {
    await updatePageField(props.page.id, 'is_auto_color', false);
    await updatePageField(props.page.id, 'background_color', c);
  };

  const triggerHexPicker = () => { hexInput.value?.click(); };
  const onHexColorInput = async (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    await updatePageField(props.page.id, 'is_auto_color', false);
    await updatePageField(props.page.id, 'background_color', val);
  };

  const updateIcon = async (iconName: string | null) => {
    await updatePageField(props.page.id, 'sticker', iconName);
  };

  const applyColorToAll = async () => {
    const color = props.page.background_color || '#ffffff';
    if (confirm(`Appliquer la couleur ${color} à absolument TOUTES les pages de l'album ?`) && activeAlbum.value) {
      for (const p of activeAlbum.value.pages) {
        await updatePageField(p.id, 'is_auto_color', false);
        await updatePageField(p.id, 'background_color', color);
      }
    }
  };

  const removePage = async () => {
    if (confirm('Supprimer définitivement cette double-page ? les photos resteront disponibles dans la corbeille.')) {
      await deletePage(props.page.id);
      await fetchAlbumDetail(props.page.album);
    }
  };

  const editCaptionForSlot = (slotIdx: number) => {
    const photo = getPhotoAtSlot(slotIdx);
    if (photo) {
      editingCaptionPhoto.value = photo;
      editingCaptionSlot.value = slotIdx;
    }
  };

  const closeCaptionModal = () => {
    editingCaptionSlot.value = null;
    editingCaptionPhoto.value = null;
  };

  const onCaptionSaved = async () => {
    await fetchAlbumDetail(props.page.album);
  };

  return {
    hexInput,
    showPropagateModal,
    editingCaptionSlot,
    editingCaptionPhoto,
    getPhotoAtSlot,
    slotsCount,
    adjustSlots,
    toggleTextOnly,
    injectTitle,
    updateColor,
    triggerHexPicker,
    onHexColorInput,
    updateIcon,
    applyColorToAll,
    removePage,
    editCaptionForSlot,
    closeCaptionModal,
    onCaptionSaved
  };
}