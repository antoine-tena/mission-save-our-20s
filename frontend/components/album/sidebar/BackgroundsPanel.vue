<template>
  <div v-if="!isSidebarCollapsed" class="flex flex-col gap-4 h-full min-h-0">
    <p class="text-xs text-gray-500 text-center mb-1">Personnalisez le fond et les contours.</p>
    
    <div class="flex flex-col gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 animate-fade-in">
      <div class="flex items-center gap-1.5">
        <Icon name="lucide:book-open" class="text-indigo-500 text-base" />
        <span class="text-xs font-bold text-gray-700">Contour de l'album</span>
      </div>
      <p class="text-[10px] text-gray-500 leading-normal">
        Cette couleur s'applique sur le cadre extérieur/couverture visible autour des pages ouvertes.
      </p>
      
      <div class="flex flex-wrap gap-2 justify-center items-center mt-1">
        <button 
          v-for="c in coverPresets" 
          :key="c" 
          type="button" 
          class="cover-color-btn border-none cursor-pointer"
          :style="{ backgroundColor: c }"
          :class="{ 'active': activeAlbum?.cover_color === c }"
          @click="updateContourColor(c)"
          :title="c"
        ></button>
        
        <div class="hex-picker-wrapper">
          <button type="button" class="cover-color-btn hex-rainbow-btn border-none cursor-pointer" @click="triggerContourHexPicker" title="Couleur personnalisée (HEX)"></button>
          <input ref="contourHexInput" type="color" :value="activeAlbum?.cover_color || '#3d352e'" class="hidden-color-input" @input="onContourHexColorInput" />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col items-center gap-4 text-gray-400 pt-4">
    <Icon name="lucide:palette" class="text-xl" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';

defineProps<{
  isSidebarCollapsed: boolean;
}>();

const { activeAlbum, updateAlbumField } = useAlbumEditorStore();

const contourHexInput = ref<HTMLInputElement>();
const coverPresets = ['#1A1A1A', '#4A5568', '#1B365D', '#722F37', '#2D5A27', '#EAE6DF', '#FFFFFF', '#89CFF0'];

const updateContourColor = async (color: string) => {
  if (activeAlbum.value) {
    await updateAlbumField(activeAlbum.value.id, 'cover_color', color);
  }
};

const triggerContourHexPicker = () => {
  contourHexInput.value?.click();
};

const onContourHexColorInput = async (e: Event) => {
  const color = (e.target as HTMLInputElement).value;
  await updateContourColor(color);
};
</script>

<style scoped>
.cover-color-btn {
  width: 24px; height: 24px; border-radius: 50%; cursor: pointer; padding: 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05); transition: all 0.2s;
}
.cover-color-btn:hover { transform: scale(1.1); }
.cover-color-btn.active { transform: scale(1.25); box-shadow: 0 0 0 2px #4f46e5; }
.hex-rainbow-btn { background: linear-gradient(135deg, #ff0000, #00ff00, #0000ff); }
.hidden-color-input { position: absolute; opacity: 0; width: 0; height: 0; pointer-events: none; }
.hex-picker-wrapper { position: relative; display: flex; align-items: center; justify-content: center; }
</style>