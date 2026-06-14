<template>
  <div v-if="!isSidebarCollapsed" class="flex flex-col gap-4 h-full min-h-0 animate-fade-in">
    <div v-if="isCoverSpread" class="text-center p-6 text-gray-400 flex flex-col items-center gap-3">
      <Icon name="lucide:smile" class="text-3xl text-indigo-300 animate-pulse" />
      <p class="text-xs leading-normal font-bold text-gray-700">Vous êtes sur la couverture</p>
      <p class="text-[10px] text-gray-400 leading-relaxed">Les stickers sont disponibles uniquement sur les pages intérieures.</p>
    </div>
    
    <div v-else class="flex flex-col gap-4 h-full min-h-0">
      <p class="text-[10.5px] text-gray-500 text-center mb-0.5 font-bold uppercase tracking-wider">Stickers & Sceaux</p>
      
      <!-- Left/Right Segmented Button -->
      <div class="flex bg-gray-100 p-1 rounded-xl">
        <button 
          type="button" class="flex-1 py-1.5 text-xs font-extrabold rounded-lg border-none transition-all flex flex-col items-center gap-0.5 cursor-pointer"
          :class="modelValue === 'left' ? 'bg-white text-indigo-600 shadow-sm' : 'bg-transparent text-gray-400'"
          @click="$emit('update:modelValue', 'left')" :disabled="!leftPage"
        >
          <span>Page Gauche</span>
          <span class="text-[8px] font-medium opacity-80" v-if="leftPage && leftPage.sticker">(Actif)</span>
        </button>
        <button 
          type="button" class="flex-1 py-1.5 text-xs font-extrabold rounded-lg border-none transition-all flex flex-col items-center gap-0.5 cursor-pointer"
          :class="modelValue === 'right' ? 'bg-white text-indigo-600 shadow-sm' : 'bg-transparent text-gray-400'"
          @click="$emit('update:modelValue', 'right')" :disabled="!rightPage"
        >
          <span>Page Droite</span>
          <span class="text-[8px] font-medium opacity-80" v-if="rightPage && rightPage.sticker">(Actif)</span>
        </button>
      </div>

      <!-- Sticker Options -->
      <div v-if="activePageForLayout" class="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 min-h-0">
        <div v-if="isPageRestricted(activePageForLayout?.id)" class="text-center p-6 text-gray-400 flex flex-col items-center gap-3">
          <Icon name="lucide:lock" class="text-3xl text-gray-300" />
          <p class="text-xs leading-normal font-bold text-gray-700">Garde verrouillée</p>
        </div>
        
        <div v-else class="flex flex-col gap-4">
          <!-- Loop over categorized stickers -->
          <div v-for="cat in stickerCategories" :key="cat.name" class="flex flex-col gap-2">
            <span class="text-[9.5px] font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-1">{{ cat.name }}</span>
            <div class="grid grid-cols-3 gap-2.5">
              <button 
                v-for="st in cat.items" :key="st.id" type="button"
                class="sticker-card-btn flex flex-col items-center justify-center p-2.5 rounded-xl border border-gray-100 bg-[#faf9f5] hover:bg-white transition-all cursor-pointer outline-none gap-1.5"
                :class="{ 'selected-sticker-card border-indigo-400 ring-2 ring-indigo-100 bg-white': activePageForLayout.sticker === st.id }"
                @click="applySticker(st.id)"
              >
                <Icon :name="st.id" class="text-2xl" :class="activePageForLayout.sticker === st.id ? 'text-indigo-600' : 'text-gray-600/80'" />
                <span class="text-[8.5px] font-bold text-gray-500 text-center leading-none">{{ st.name }}</span>
              </button>
            </div>
          </div>

          <button 
            v-if="activePageForLayout.sticker" type="button"
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
  modelValue: 'left' | 'right'; leftPage: any; rightPage: any; activePageForLayout: any;
  isCoverSpread: boolean; isSidebarCollapsed: boolean;
}>();

defineEmits(['update:modelValue']);

const { updatePageField, fetchAlbumDetail, isPageRestricted } = useAlbumEditorStore();

const stickerCategories = [
  {
    name: 'Amour & Étoiles',
    items: [
      { id: 'lucide:heart', name: 'Amour' },
      { id: 'lucide:sparkles', name: 'Sparkles' },
      { id: 'lucide:star', name: 'Étoile' },
      { id: 'lucide:gift', name: 'Cadeau' }
    ]
  },
  {
    name: 'Voyage & Nature',
    items: [
      { id: 'lucide:plane', name: 'Voyage' },
      { id: 'lucide:sun', name: 'Soleil' },
      { id: 'lucide:tent', name: 'Camping' },
      { id: 'lucide:compass', name: 'Boussole' }
    ]
  },
  {
    name: 'Quotidien & Souvenirs',
    items: [
      { id: 'lucide:camera', name: 'Photo' },
      { id: 'lucide:coffee', name: 'Pause Café' },
      { id: 'lucide:music', name: 'Musique' },
      { id: 'lucide:trophy', name: 'Victoire' }
    ]
  }
];

const applySticker = async (stickerId: string | null) => {
  const page = props.activePageForLayout; if (!page) return;
  await updatePageField(page.id, 'sticker', stickerId);
  await fetchAlbumDetail(page.album, true);
};
</script>

<style scoped>
.sticker-card-btn {
  border: 2px solid white; box-shadow: 0 4px 8px rgba(0,0,0,0.03); outline: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.sticker-card-btn:hover {
  transform: translateY(-2px); box-shadow: 0 6px 12px rgba(0,0,0,0.06);
  border-color: #eef2f6; animation: wiggleEffect 0.3s ease-in-out;
}
.selected-sticker-card {
  border-color: #818cf8 !important; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1) !important;
}

@keyframes wiggleEffect {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-4deg) scale(1.05); }
  75% { transform: rotate(4deg) scale(1.05); }
}
</style>