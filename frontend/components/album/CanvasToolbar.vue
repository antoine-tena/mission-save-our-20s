<template>
  <div class="canvas-toolbar-container relative">
    <div class="canvas-toolbar flex items-center justify-between gap-4 px-6 py-2.5 bg-white border border-gray-100 rounded-full shadow-lg select-none">
      
      <!-- Left: History & Save -->
      <AlbumCanvasToolbarHistory @toast="showToast" />

      <!-- Center: Insert & Delete Text/Photo -->
      <AlbumCanvasToolbarInsert @toast="showToast" />

      <!-- Right: Zoom & Fullscreen -->
      <AlbumCanvasToolbarZoom />

    </div>

    <!-- Floating clean toast message underneath -->
    <Transition name="toast-slide">
      <div v-if="toastMsg" class="absolute left-1/2 -translate-x-1/2 top-[60px] bg-gray-900 text-white text-[11px] font-bold px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 z-50 whitespace-nowrap">
        <Icon name="lucide:check-circle-2" class="text-emerald-400 text-sm" />
        <span>{{ toastMsg }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const toastMsg = ref<string | null>(null);

const showToast = (msg: string) => {
  toastMsg.value = msg;
  setTimeout(() => {
    if (toastMsg.value === msg) toastMsg.value = null;
  }, 2500);
};
</script>

<style scoped>
.canvas-toolbar {
  z-index: 50;
}

/* Toast Transitions & Styling */
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-slide-enter-from,
.toast-slide-leave-to {
  transform: translate(-50%, -10px);
  opacity: 0;
}
</style>