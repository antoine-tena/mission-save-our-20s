<template>
  <div class="flex items-center gap-1.5 border-r border-gray-100 pr-3">
    <button type="button" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed" @click="onSave" title="Enregistrer">
      <Icon name="lucide:save" />
    </button>
    <button type="button" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed" @click="onUndo" :disabled="!canUndo" title="Annuler">
      <Icon name="lucide:undo" />
    </button>
    <button type="button" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed" @click="onRedo" :disabled="!canRedo" title="Rétablir">
      <Icon name="lucide:redo" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAlbumHistory } from '~/composables/useAlbumHistory';

const emit = defineEmits(['toast']);
const { canUndo, canRedo, undo: onUndo, redo: onRedo } = useAlbumHistory();

const onSave = () => {
  emit('toast', 'Toutes vos modifications sont enregistrées en temps réel !');
};
</script>