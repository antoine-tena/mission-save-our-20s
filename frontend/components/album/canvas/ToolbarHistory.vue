<template>
  <div class="flex items-center gap-1.5 border-r border-gray-100 pr-3">
    <button type="button" class="tool-action-btn" @click="onSave" title="Enregistrer">
      <Icon name="lucide:save" />
    </button>
    <button type="button" class="tool-action-btn" @click="onUndo" :disabled="!canUndo" title="Annuler">
      <Icon name="lucide:undo" />
    </button>
    <button type="button" class="tool-action-btn" @click="onRedo" :disabled="!canRedo" title="Rétablir">
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

<style scoped>
.tool-action-btn {
  background: none;
  border: none;
  color: #718096;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
}
.tool-action-btn:hover:not(:disabled) {
  background: #f7fafc;
  color: #4f46e5;
}
.tool-action-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>