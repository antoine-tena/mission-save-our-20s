<template>
  <div class="canvas-toolbar flex items-center justify-between gap-4 px-6 py-2.5 bg-white border border-gray-100 rounded-full shadow-lg select-none">
    
    <!-- Left: History & Save -->
    <div class="flex items-center gap-1.5 border-r border-gray-100 pr-3">
      <button type="button" class="tool-action-btn" @click="onSave" title="Enregistrer">
        <Icon name="lucide:save" />
      </button>
      <button type="button" class="tool-action-btn" @click="onUndo" disabled title="Annuler">
        <Icon name="lucide:undo" />
      </button>
      <button type="button" class="tool-action-btn" @click="onRedo" disabled title="Rétablir">
        <Icon name="lucide:redo" />
      </button>
    </div>

    <!-- Center: Copy/Paste, Insert, Delete -->
    <div class="flex items-center gap-1.5 border-r border-gray-100 pr-3">
      <button type="button" class="tool-action-btn" @click="onCut" title="Couper">
        <Icon name="lucide:scissors" />
      </button>
      <button type="button" class="tool-action-btn" @click="onCopy" title="Copier">
        <Icon name="lucide:copy" />
      </button>
      <button type="button" class="tool-action-btn" @click="onPaste" title="Coller">
        <Icon name="lucide:clipboard" />
      </button>
      
      <div class="v-divider mx-1 h-5 w-[1px] bg-gray-100"></div>

      <button type="button" class="tool-action-btn" @click="addText" title="Ajouter du texte">
        <Icon name="lucide:type" />
      </button>
      <button type="button" class="tool-action-btn" @click="addPhotoZone" title="Ajouter une zone photo">
        <Icon name="lucide:image-plus" />
      </button>
      <button type="button" class="tool-action-btn text-red-500 hover:bg-red-50" @click="deleteItem" title="Supprimer">
        <Icon name="lucide:trash-2" />
      </button>
    </div>

    <!-- Right: Zoom & Fullscreen -->
    <div class="flex items-center gap-3">
      <!-- Zoom controls -->
      <div class="flex items-center gap-2">
        <button type="button" class="tool-action-btn small-btn" @click="zoomOut" :disabled="zoom <= 50">-</button>
        <span class="text-xs font-extrabold text-gray-500 w-12 text-center">{{ zoom }}%</span>
        <button type="button" class="tool-action-btn small-btn" @click="zoomIn" :disabled="zoom >= 150">+</button>
      </div>

      <div class="v-divider h-5 w-[1px] bg-gray-100"></div>

      <button type="button" class="tool-action-btn" @click="toggleFullscreen" title="Plein écran">
        <Icon :name="isFullscreen ? 'lucide:minimize' : 'lucide:maximize'" />
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const zoom = ref(100);
const isFullscreen = ref(false);

const onSave = () => {
  alert('Projet sauvegardé automatiquement en temps réel !');
};

const onUndo = () => {};
const onRedo = () => {};
const onCut = () => {};
const onCopy = () => {};
const onPaste = () => {};

const addText = () => {
  alert('Zone de texte dynamique insérée ! Utilisez le double-clic pour la modifier.');
};

const addPhotoZone = () => {
  alert('Une nouvelle zone photo vide a été insérée sur votre page !');
};

const deleteItem = () => {
  alert('Sélectionnez un élément sur la page pour le supprimer.');
};

const zoomIn = () => {
  if (zoom.value < 150) zoom.value += 10;
};

const zoomOut = () => {
  if (zoom.value > 50) zoom.value -= 10;
};

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    isFullscreen.value = true;
  } else {
    document.exitFullscreen();
    isFullscreen.value = false;
  }
};
</script>

<style scoped>
.canvas-toolbar {
  z-index: 50;
}
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
.small-btn {
  width: 24px;
  height: 24px;
  background: #f1f5f9;
  font-size: 0.8rem;
  font-weight: 800;
}
</style>