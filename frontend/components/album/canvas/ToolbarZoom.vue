<template>
  <div class="flex items-center gap-3">
    <!-- Zoom controls -->
    <div class="flex items-center gap-2">
      <button type="button" class="w-6 h-6 rounded-full flex items-center justify-center bg-slate-100 text-slate-500 text-xs font-extrabold hover:text-indigo-600 hover:bg-slate-200 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed" :disabled="canvasZoom <= 50" @click="zoomOut">-</button>
      <span class="text-xs font-extrabold text-gray-500 w-12 text-center">{{ canvasZoom }}%</span>
      <button type="button" class="w-6 h-6 rounded-full flex items-center justify-center bg-slate-100 text-slate-500 text-xs font-extrabold hover:text-indigo-600 hover:bg-slate-200 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed" :disabled="canvasZoom >= 150" @click="zoomIn">+</button>
    </div>

    <div class="v-divider h-5 w-[1px] bg-gray-100"/>

    <button type="button" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed" title="Plein écran" @click="toggleFullscreen">
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
