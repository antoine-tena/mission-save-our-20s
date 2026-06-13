<template>
  <div v-if="!isSidebarCollapsed" class="flex flex-col gap-4 h-full min-h-0">
    <div v-if="isCoverSpread" class="text-center p-6 text-gray-400 flex flex-col items-center gap-3">
      <Icon name="lucide:book-open-check" class="text-3xl text-indigo-300 animate-pulse" />
      <p class="text-xs leading-normal font-bold text-gray-700">Vous êtes sur la couverture</p>
      <p class="text-[10px] text-gray-400 leading-relaxed">Les modèles de mises en page sont disponibles uniquement pour les pages intérieures.</p>
      <button 
        type="button" 
        class="mt-2 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 rounded-lg px-3 py-1.5 transition-all border-none cursor-pointer"
        @click="$emit('switch-to-cover')"
      >
        Gérer la couverture
      </button>
    </div>
    
    <div v-else class="flex flex-col gap-4 h-full min-h-0">
      <div v-if="isPageRestricted(activePageForLayout?.id)" class="text-center p-6 text-gray-400 flex flex-col items-center gap-3">
        <Icon name="lucide:lock" class="text-3xl text-gray-300 animate-pulse" />
        <p class="text-xs leading-normal font-bold text-gray-700">Garde verrouillée</p>
        <p class="text-[10px] text-gray-400 leading-relaxed">Cette page de garde est vide par défaut et ne peut pas être personnalisée ou modifiée.</p>
      </div>
      <div v-else class="flex flex-col gap-4 h-full min-h-0">
        <p class="text-[10.5px] text-gray-500 text-center mb-0.5 font-bold uppercase tracking-wider">Mise en page</p>
      
        <!-- Left/Right Segmented Button -->
        <div class="flex bg-gray-100 p-1 rounded-xl">
          <button 
            type="button"
            class="flex-1 py-1.5 text-xs font-extrabold rounded-lg border-none transition-all flex flex-col items-center gap-0.5 cursor-pointer"
            :style="{ outline: 'none' }"
            :class="modelValue === 'left' ? 'bg-white text-indigo-600 shadow-sm' : 'bg-transparent text-gray-500 hover:text-gray-700'"
            @click="$emit('update:modelValue', 'left')"
            :disabled="!leftPage"
          >
            <span>Page Gauche</span>
            <span class="text-[8px] font-medium opacity-80" v-if="leftPage">
              ({{ leftPage.layout_type === 'text-only' ? 'Texte' : leftPage.layout_type.replace('grid-', '') + ' photo(s)' }})
            </span>
            <span class="text-[8px] font-medium opacity-80" v-else>Vide</span>
          </button>
          
          <button 
            type="button"
            class="flex-1 py-1.5 text-xs font-extrabold rounded-lg border-none transition-all flex flex-col items-center gap-0.5 cursor-pointer"
            :style="{ outline: 'none' }"
            :class="modelValue === 'right' ? 'bg-white text-indigo-600 shadow-sm' : 'bg-transparent text-gray-500 hover:text-gray-700'"
            @click="$emit('update:modelValue', 'right')"
            :disabled="!rightPage"
          >
            <span>Page Droite</span>
            <span class="text-[8px] font-medium opacity-80" v-if="rightPage">
              ({{ rightPage.layout_type === 'text-only' ? 'Texte' : rightPage.layout_type.replace('grid-', '') + ' photo(s)' }})
            </span>
            <span class="text-[8px] font-medium opacity-80" v-else>Vide</span>
          </button>
        </div>

        <!-- Selected Page Info & Layout presets -->
        <div v-if="activePageForLayout" class="flex-1 overflow-y-auto pr-1 flex flex-col gap-3 min-h-0">
          <div class="flex items-center justify-between border-b border-gray-100 pb-2">
            <span class="text-xs font-extrabold text-gray-700 uppercase tracking-wide">Modèles</span>
            <span class="text-[10px] text-gray-400 font-bold" v-if="activePageForLayout.title">
              Titre : "{{ activePageForLayout.title }}"
            </span>
          </div>
          
          <!-- Layout Presets List -->
          <div class="flex flex-col gap-2.5">
            <button 
              v-for="opt in layoutOptions" 
              :key="opt.id"
              type="button"
              class="layout-preset-btn flex items-center gap-3 p-2.5 rounded-xl border border-gray-100 bg-white hover:bg-gray-50/50 hover:border-indigo-200 transition-all text-left cursor-pointer outline-none"
              :class="{ 'selected-layout-card border-indigo-500 bg-indigo-50/20 shadow-sm': activePageForLayout.layout_type === opt.id }"
              @click="applyLayoutPreset(opt.id)"
            >
              <!-- Layout Miniature Wireframe Shape (Extracted Daughter) -->
              <AlbumSidebarLayoutWireframe :layout-id="opt.id" />
              
              <!-- Name & Description -->
              <div class="flex-1 min-w-0 flex flex-col gap-0.5">
                <span class="text-[11px] font-extrabold text-gray-800 flex items-center justify-between">
                  {{ opt.name }}
                  <Icon v-if="activePageForLayout.layout_type === opt.id" name="lucide:check-circle-2" class="text-indigo-600 text-xs flex-shrink-0 ml-1" />
                </span>
                <span class="text-[9px] text-gray-400 leading-normal font-medium block truncate-two-lines">{{ opt.desc }}</span>
              </div>
            </button>
          </div>
        </div>
        
        <div v-else class="text-center p-6 text-gray-400">
          <Icon name="lucide:book-open" class="text-3xl text-gray-300 mb-2" />
          <p class="text-xs font-semibold">Aucune page active détectée à cette position.</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col items-center gap-4 text-gray-400 pt-4">
    <Icon name="lucide:layout" class="text-xl animate-pulse" />
  </div>
</template>

<script setup lang="ts">
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';
import { layoutOptions, layoutPresetsConfig } from './layoutsConfig';

const props = defineProps<{
  modelValue: 'left' | 'right'; leftPage: any; rightPage: any; activePageForLayout: any;
  isCoverSpread: boolean; isSidebarCollapsed: boolean;
}>();

defineEmits(['update:modelValue', 'switch-to-cover']);

const { updatePageField, fetchAlbumDetail, updatePhotoPosition, isPageRestricted } = useAlbumEditorStore();

const applyLayoutPreset = async (layoutType: string) => {
  const page = props.activePageForLayout; if (!page) return;
  await updatePageField(page.id, 'layout_type', layoutType);
  if (layoutType.startsWith('grid-') && page.photos && page.photos.length > 0) {
    const preset = layoutPresetsConfig[layoutType];
    if (preset) {
      const sortedPhotos = [...page.photos].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      for (let i = 0; i < sortedPhotos.length; i++) {
        const photo = sortedPhotos[i];
        if (i < preset.length) {
          const slot = preset[i]; await updatePhotoPosition(photo.id, slot.x, slot.y, slot.w, slot.h);
        } else {
          await updatePhotoPosition(photo.id, null, null, null, null);
        }
      }
    }
  } else if (layoutType === 'text-only' && page.photos && page.photos.length > 0) {
    for (const photo of page.photos) {
      await updatePhotoPosition(photo.id, null, null, null, null);
    }
  }
  await fetchAlbumDetail(page.album, true);
};
</script>

<style scoped>
@import '~/assets/css/layouts-panel.css';
</style>