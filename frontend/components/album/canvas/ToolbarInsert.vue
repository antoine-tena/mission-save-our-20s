<template>
  <div class="flex items-center gap-1.5 border-r border-gray-100 pr-3">
    <button type="button" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed" @click="addText" title="Ajouter une zone de texte">
      <Icon name="lucide:type" />
    </button>
    <button type="button" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed" @click="addPhotoZone" title="Ajouter une photo manuellement">
      <Icon name="lucide:image-plus" />
    </button>
    <button type="button" class="w-8 h-8 rounded-full flex items-center justify-center text-amber-500 hover:bg-amber-50 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed" @click="magicFill" title="Remplissage Magique (Auto-Layout)">
      <Icon name="lucide:wand-2" />
    </button>
    <button type="button" class="w-8 h-8 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed" @click="deleteItem" :disabled="focusedPhotoId === null" title="Supprimer l'élément sélectionné">
      <Icon name="lucide:trash-2" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAlbumHistory } from '~/composables/useAlbumHistory';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';
import { parseTextBoxes, serializeTextBoxes } from '~/utils/textBoxes';

const emit = defineEmits(['toast']);
const { 
  activeAlbum, 
  activePageIdx, 
  focusedPhotoId, 
  activeSidebarTab, 
  fetchAlbumDetail, 
  updatePageField 
} = useAlbumEditorStore();

const getTargetPageId = () => {
  if (!activeAlbum.value || activeAlbum.value.pages.length === 0) return undefined;
  const pagesCount = activeAlbum.value.pages.length;
  const totalSpreads = 2 + Math.ceil(pagesCount / 2);
  const maxPageIdxValue = (totalSpreads - 1) * 2;
  const isCover = activePageIdx.value === 0 || activePageIdx.value === maxPageIdxValue;
  if (isCover) return activeAlbum.value.pages[0]?.id;
  return activeAlbum.value.pages[activePageIdx.value - 1]?.id || activeAlbum.value.pages[activePageIdx.value - 2]?.id;
};

const addText = async () => {
  if (!activeAlbum.value) return;
  const targetPageId = getTargetPageId();
  if (!targetPageId) {
    emit('toast', 'Sélectionnez une page valide pour ajouter du texte.');
    return;
  }

  const page = activeAlbum.value.pages.find(p => p.id === targetPageId);
  if (!page) return;

  try {
    const { recordHistory } = useAlbumHistory();
    recordHistory();

    const boxes = parseTextBoxes(page.description);
    const newBox = {
      id: Date.now().toString(),
      text: '<p><b>Nouveau Récit</b></p><p>Tapez votre histoire ici...</p>',
      x: 7,
      y: 7,
      w: 10,
      h: 5
    };
    boxes.push(newBox);

    await updatePageField(page.id, 'description', serializeTextBoxes(boxes));
    await fetchAlbumDetail(activeAlbum.value.id, true);
    emit('toast', 'Nouvelle zone de texte insérée ! Double-cliquez pour écrire, faites-la glisser pour la déplacer.');
  } catch (err) {
    console.error(err);
    emit('toast', 'Erreur lors de l\'ajout de la zone de texte.');
  }
};

const addPhotoZone = () => {
  activeSidebarTab.value = 'photos';
  emit('toast', 'Faites glisser une photo depuis le panneau de gauche !');
};

const deleteItem = async () => {
  if (focusedPhotoId.value !== null && activeAlbum.value) {
    try {
      const { recordHistory } = useAlbumHistory();
      recordHistory();
      const api = useApi();
      await api.patch(`/photos/${focusedPhotoId.value}/`, { page: null, order: 0 });
      await fetchAlbumDetail(activeAlbum.value.id, true);
      focusedPhotoId.value = null;
      emit('toast', 'Photo retirée de la page.');
    } catch (err) {
      console.error(err);
      emit('toast', 'Erreur lors du retrait de la photo.');
    }
  } else {
    emit('toast', 'Sélectionnez d\'abord une photo sur la page pour la retirer.');
  }
};

const magicFill = async () => {
  emit('toast', '✨ Remplissage Magique en cours... Veuillez patienter.');
  if (!activeAlbum.value) return;
  
  const targetPageId = getTargetPageId();
  if (!targetPageId) {
      emit('toast', 'Sélectionnez une page valide pour le Magic Fill.');
      return;
  }
  
  try {
    const api = useApi();
    
    const res: any = await api.post(`/photos/pages/${targetPageId}/magic-fill/`);
    
    emit('toast', `✨ ${res.message || 'Les photos ont été disposées avec succès !'}`);
    await fetchAlbumDetail(activeAlbum.value.id, true);
  } catch (err: any) {
    console.error(err);
    const msg = err.response?._data?.error || 'Erreur lors du remplissage magique.';
    emit('toast', msg);
  }
};
</script>
