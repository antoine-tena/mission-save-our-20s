<template>
  <div v-if="croppingPhotoId === null" class="canvas-toolbar-container relative animate-fade-in">
    <div class="canvas-toolbar flex items-center justify-between gap-4 px-6 py-2.5 bg-white border border-gray-100 rounded-full shadow-lg select-none">
      
      <!-- Left: History & Save -->
      <AlbumCanvasToolbarHistory @toast="showToast" />

      <!-- Center: Insert & Delete Text/Photo -->
      <AlbumCanvasToolbarInsert @toast="showToast" />

      <!-- Right: Zoom & Fullscreen -->
      <AlbumCanvasToolbarZoom />

    </div>
  </div>
</template>

<script setup lang="ts">
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';

const { croppingPhotoId } = useAlbumEditorStore();
const toast = useToast();

const showToast = (msg: string) => {
  toast.success(msg);
};
</script>

<style scoped>
.canvas-toolbar {
  z-index: 50;
}
</style>
