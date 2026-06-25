<template>
  <div v-if="!isSidebarCollapsed" class="flex flex-col gap-4 h-full min-h-0 animate-fade-in select-none">
    <p class="text-[10px] text-gray-400 text-center mb-1 font-bold uppercase tracking-wider">Arrière-plans & Palettes</p>

    <!-- Page Background Color Picker Panel -->
    <div class="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 min-h-0">
      <div v-if="isPageRestricted(activePageForLayout?.id)" class="text-center p-6 text-gray-400">
        <Icon name="lucide:lock" class="text-3xl text-gray-300 mb-2" />
        <p class="text-xs font-semibold text-gray-700">Garde verrouillée</p>
      </div>

      <div v-else-if="activePageForLayout" class="flex flex-col gap-3">
        <div class="flex items-center gap-1.5 pt-1">
          <Icon name="lucide:palette" class="text-indigo-500 text-sm" />
          <span class="text-xs font-bold text-gray-700 uppercase tracking-wide">Fonds de Page</span>
        </div>
        
        <!-- Segmented select left/right page background -->
        <div class="flex bg-gray-100 p-1 rounded-lg text-[10px]">
          <button type="button" class="flex-1 py-1 font-bold rounded cursor-pointer border-none" :class="modelValue === 'left' ? 'bg-white text-indigo-600 shadow-sm' : 'bg-transparent text-gray-400'" :disabled="!leftPage" @click="$emit('update:modelValue', 'left')">Gauche</button>
          <button type="button" class="flex-1 py-1 font-bold rounded cursor-pointer border-none" :class="modelValue === 'right' ? 'bg-white text-indigo-600 shadow-sm' : 'bg-transparent text-gray-400'" :disabled="!rightPage" @click="$emit('update:modelValue', 'right')">Droite</button>
        </div>

        <!-- Button: Apply Everywhere -->
        <button 
          type="button" 
          class="w-full py-2 px-3 rounded-xl border border-indigo-100 hover:border-indigo-200 bg-indigo-50/40 hover:bg-indigo-50/70 text-indigo-600 hover:text-indigo-700 transition-all font-bold text-[9.5px] cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
          @click="applyPageColorToAll"
        >
          <Icon name="lucide:copy" class="text-xs" />
          <span>Appliquer ce fond partout</span>
        </button>

        <!-- Palette 1: Warm Pastels -->
        <div class="flex flex-col gap-1.5 mt-1">
          <span class="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider">Pastels Poétiques</span>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="c in pastelPresets" :key="c.hex" type="button"
              class="color-dot-btn border-none cursor-pointer"
              :style="{ backgroundColor: c.hex }"
              :class="{ 'active': activePageForLayout.background_color === c.hex }"
              :title="c.label"
              @click="applyPageColor(c.hex)"
            />
          </div>
        </div>

        <!-- Palette 2: Dark & Elegant -->
        <div class="flex flex-col gap-1.5">
          <span class="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider">Sombres Artistiques</span>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="c in darkPresets" :key="c.hex" type="button"
              class="color-dot-btn border-none cursor-pointer"
              :style="{ backgroundColor: c.hex }"
              :class="{ 'active': activePageForLayout.background_color === c.hex }"
              :title="c.label"
              @click="applyPageColor(c.hex)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col items-center gap-4 text-gray-400 pt-4">
    <Icon name="lucide:palette" class="text-xl" />
  </div>
</template>

<script setup lang="ts">
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';

const props = defineProps<{
  modelValue: 'left' | 'right';
  leftPage: any;
  rightPage: any;
  activePageForLayout: any;
  isSidebarCollapsed: boolean;
}>();

defineEmits(['update:modelValue']);

const { activeAlbum, updatePageField, fetchAlbumDetail, isPageRestricted } = useAlbumEditorStore();

const pastelPresets = [
  { hex: '#ffffff', label: 'Blanc Coton' },
  { hex: '#fcfaf2', label: 'Sable d\'Ivoire' },
  { hex: '#fbf4ec', label: 'Biscuit Chaud' },
  { hex: '#fdf0ed', label: 'Brume de Rose' },
  { hex: '#fef6e4', label: 'Crème d\'Abricot' },
  { hex: '#f0ece1', label: 'Clay d\'Argile' },
  { hex: '#eef2eb', label: 'Vert Eucalyptus' },
  { hex: '#e8f1f5', label: 'Ciel d\'Avril' },
  { hex: '#ece8f5', label: 'Fleur de Lavande' }
];

const darkPresets = [
  { hex: '#1a1a1a', label: 'Noir Anthracite' },
  { hex: '#2b2621', label: 'Terre Brûlée' },
  { hex: '#24332c', label: 'Vert Sapin' },
  { hex: '#1a2636', label: 'Bleu Abysse' },
  { hex: '#3a2025', label: 'Prune Sauvage' },
  { hex: '#2c2530', label: 'Ombre Violette' },
  { hex: '#4a5357', label: 'Gris Tempête' }
];

const applyPageColor = async (color: string) => {
  const page = props.activePageForLayout;
  if (page) {
    await updatePageField(page.id, 'background_color', color);
    await fetchAlbumDetail(page.album, true);
  }
};

const applyPageColorToAll = async () => {
  const page = props.activePageForLayout;
  if (!page || !activeAlbum.value) return;
  const color = page.background_color;

  // 1. Update all local pages instantly for immediate visual feedback
  activeAlbum.value.pages.forEach(p => {
    p.background_color = color;
  });
  activeAlbum.value = { ...activeAlbum.value };

  // 2. Persist to database in parallel
  const promises = activeAlbum.value.pages.map(p => 
    updatePageField(p.id, 'background_color', color)
  );
  await Promise.all(promises);
};
</script>

<style scoped>
.color-dot-btn {
  width: 24px; height: 24px; border-radius: 50%; cursor: pointer; padding: 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05); transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
}
.color-dot-btn:hover { transform: scale(1.15); box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
.color-dot-btn.active { transform: scale(1.25); box-shadow: 0 0 0 2.5px #4f46e5; border-color: white !important; }
</style>