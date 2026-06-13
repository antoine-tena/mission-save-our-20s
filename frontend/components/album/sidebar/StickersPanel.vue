<template>
  <div v-if="!isSidebarCollapsed" class="flex flex-col gap-4 h-full min-h-0">
    <div v-if="isCoverSpread" class="text-center p-6 text-gray-400 flex flex-col items-center gap-3">
      <Icon name="lucide:smile" class="text-3xl text-indigo-300 animate-pulse" />
      <p class="text-xs leading-normal font-bold text-gray-700">
        Vous êtes sur la couverture
      </p>
      <p class="text-[10px] text-gray-400 leading-relaxed">
        Les stickers sont disponibles uniquement sur les pages intérieures.
      </p>
    </div>
    
    <div v-else class="flex flex-col gap-4 h-full min-h-0">
      <p class="text-[10.5px] text-gray-500 text-center mb-0.5 font-bold uppercase tracking-wider">Stickers & Sceaux</p>
      
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
          <span class="text-[8px] font-medium opacity-80" v-if="leftPage && leftPage.sticker">
            (Actif)
          </span>
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
          <span class="text-[8px] font-medium opacity-80" v-if="rightPage && rightPage.sticker">
            (Actif)
          </span>
        </button>
      </div>

      <!-- Sticker Options -->
      <div v-if="activePageForLayout" class="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 min-h-0">
        <div v-if="isPageRestricted(activePageForLayout?.id)" class="text-center p-6 text-gray-400 flex flex-col items-center gap-3">
          <Icon name="lucide:lock" class="text-3xl text-gray-300" />
          <p class="text-xs leading-normal font-bold text-gray-700">Garde verrouillée</p>
        </div>
        
        <div v-else class="flex flex-col gap-3">
          <span class="text-xs font-extrabold text-gray-700 uppercase tracking-wide border-b border-gray-100 pb-2 block">Tampons disponibles</span>
          
          <div class="grid grid-cols-3 gap-2.5">
            <button 
              v-for="st in stickerOptions" 
              :key="st.id"
              type="button"
              class="sticker-card-btn flex flex-col items-center justify-center p-3 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 hover:border-indigo-200 transition-all cursor-pointer outline-none gap-2"
              :class="{ 'selected-sticker-card border-indigo-500 bg-indigo-50/20': activePageForLayout.sticker === st.id }"
              @click="applySticker(st.id)"
            >
              <Icon :name="st.id" class="text-2xl" :class="activePageForLayout.sticker === st.id ? 'text-indigo-600 animate-bounce' : 'text-gray-500'" />
              <span class="text-[9px] font-bold text-gray-600 text-center leading-none">{{ st.name }}</span>
            </button>
          </div>

          <button 
            v-if="activePageForLayout.sticker"
            type="button"
            class="mt-2 w-full py-2 bg-red-50 hover:bg-red-100 text-red-600 font-extrabold rounded-xl border-none cursor-pointer text-xs flex items-center justify-center gap-1.5 transition-all"
            @click="applySticker(null)"
          >
            <Icon name="lucide:trash-2" class="text-sm" /> Retirer le sticker
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col items-center gap-4 text-gray-400 pt-4">
    <Icon name="lucide:smile" class="text-xl" />
  </div>
</template>

<script setup lang="ts">
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';

const props = defineProps<{
  modelValue: 'left' | 'right';
  leftPage: any;
  rightPage: any;
  activePageForLayout: any;
  isCoverSpread: boolean;
  isSidebarCollapsed: boolean;
}>();

defineEmits(['update:modelValue']);

const { updatePageField, fetchAlbumDetail, isPageRestricted } = useAlbumEditorStore();

const stickerOptions = [
  { id: 'lucide:heart', name: 'Amour' },
  { id: 'lucide:camera', name: 'Photo' },
  { id: 'lucide:sparkles', name: 'Étoiles' },
  { id: 'lucide:plane', name: 'Voyage' },
  { id: 'lucide:sun', name: 'Soleil' },
  { id: 'lucide:tent', name: 'Camping' },
  { id: 'lucide:trophy', name: 'Trophée' },
  { id: 'lucide:music', name: 'Musique' },
  { id: 'lucide:gift', name: 'Cadeau' },
  { id: 'lucide:star', name: 'Étoile' },
  { id: 'lucide:compass', name: 'Boussole' },
  { id: 'lucide:coffee', name: 'Café' }
];

const applySticker = async (stickerId: string | null) => {
  const page = props.activePageForLayout;
  if (!page) return;
  await updatePageField(page.id, 'sticker', stickerId);
  await fetchAlbumDetail(page.album, true);
};
</script>

<style scoped>
.sticker-card-btn { transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); outline: none; }
.sticker-card-btn:hover { border-color: #cbd5e1; transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0,0,0,0.04); }
.selected-sticker-card { border-color: #6366f1 !important; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.08); }
</style>