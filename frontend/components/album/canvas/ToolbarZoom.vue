<template>
  <div class="flex items-center gap-3">
    <!-- Zoom controls -->
    <div class="flex items-center gap-2">
      <button type="button" class="tool-action-btn small-btn" @click="zoomOut" :disabled="canvasZoom <= 50">-</button>
      <span class="text-xs font-extrabold text-gray-500 w-12 text-center">{{ canvasZoom }}%</span>
      <button type="button" class="tool-action-btn small-btn" @click="zoomIn" :disabled="canvasZoom >= 150">+</button>
    </div>

    <div class="v-divider h-5 w-[1px] bg-gray-100"></div>

    <button type="button" class="tool-action-btn" @click="toggleFullscreen" title="Plein écran">
      <Icon :name="isFullscreen ? 'lucide:minimize' : 'lucide:maximize'" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';

const { canvasZoom } = useAlbumEditorStore();
const isFullscreen = ref(false);

const zoomIn = () => {
  if (canvasZoom.value < 150) canvasZoom.value += 10;
};

const zoomOut = () => {
  if (canvasZoom.value > 50) canvasZoom.value -= 10;
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