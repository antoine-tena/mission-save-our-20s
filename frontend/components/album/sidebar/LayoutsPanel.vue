<template>
  <div v-if="!isSidebarCollapsed" class="flex flex-col gap-4 h-full min-h-0 select-none animate-fade-in">
    <div v-if="isCoverSpread" class="text-center p-6 text-gray-400 flex flex-col items-center gap-3">
      <Icon name="lucide:book-open-check" class="text-3xl text-indigo-300 animate-pulse" />
      <p class="text-xs leading-normal font-bold text-gray-700">Vous êtes sur la couverture</p>
      <p class="text-[10px] text-gray-400 leading-relaxed">Les modèles de mises en page sont disponibles uniquement pour les pages intérieures.</p>
    </div>
    <div v-else class="flex flex-col gap-3.5 h-full min-h-0">
      <div v-if="isPageRestricted(activePageForLayout?.id)" class="text-center p-6 text-gray-400 flex flex-col items-center gap-3">
        <Icon name="lucide:lock" class="text-3xl text-gray-300 animate-pulse" />
        <p class="text-xs leading-normal font-bold text-gray-700">Garde verrouillée</p>
      </div>
      <div v-else class="flex flex-col gap-3.5 h-full min-h-0">
        <!-- Segmented Left/Right Selector -->
        <div class="flex bg-gray-100 p-1 rounded-xl">
          <button type="button" class="flex-1 py-1.5 text-xs font-extrabold rounded-lg border-none transition-all flex flex-col items-center gap-0.5 cursor-pointer outline-none" :class="modelValue === 'left' ? 'bg-white text-indigo-600 shadow-sm' : 'bg-transparent text-gray-500'" :disabled="!leftPage" @click="$emit('update:modelValue', 'left')">Page Gauche</button>
          <button type="button" class="flex-1 py-1.5 text-xs font-extrabold rounded-lg border-none transition-all flex flex-col items-center gap-0.5 cursor-pointer outline-none" :class="modelValue === 'right' ? 'bg-white text-indigo-600 shadow-sm' : 'bg-transparent text-gray-500'" :disabled="!rightPage" @click="$emit('update:modelValue', 'right')">Page Droite</button>
        </div>
        <!-- Categories & Proposals List -->
        <div v-if="activePageForLayout" class="flex-1 overflow-y-auto pr-1 flex flex-col gap-2 min-h-0 pb-6">
          <div v-for="cat in layoutCategories" :key="cat.count" class="border border-gray-100/70 rounded-xl overflow-hidden bg-white">
            <button type="button" class="w-full px-3.5 py-2.5 flex items-center justify-between text-left cursor-pointer border-none bg-white hover:bg-gray-50/55 transition-all outline-none" @click="toggleCategory(cat.count)">
              <div class="flex items-center gap-2">
                <Icon name="lucide:layout-grid" class="text-xs text-indigo-500" />
                <span class="text-[11px] font-bold text-gray-700">{{ cat.name }}</span>
              </div>
              <Icon :name="expandedCategory === cat.count ? 'lucide:chevron-up' : 'lucide:chevron-down'" class="text-gray-400 text-xs" />
            </button>
            <div v-if="expandedCategory === cat.count" class="border-t border-gray-50 p-2 bg-gray-50/30">
              <!-- Sub-Tabs Filter -->
              <div class="flex bg-slate-200/50 p-1 rounded-lg text-[9px] mb-2 flex-shrink-0">
                <button type="button" class="flex-1 py-1 font-bold rounded cursor-pointer border-none outline-none" :class="activeSubTab === 'photos' ? 'bg-white text-indigo-600 shadow-sm' : 'bg-transparent text-slate-400'" @click="activeSubTab = 'photos'">Photos seules</button>
                <button type="button" class="flex-1 py-1 font-bold rounded cursor-pointer border-none outline-none" :class="activeSubTab === 'text1' ? 'bg-white text-indigo-600 shadow-sm' : 'bg-transparent text-slate-400'" @click="activeSubTab = 'text1'">+ 1 Récit</button>
                <button type="button" class="flex-1 py-1 font-bold rounded cursor-pointer border-none outline-none" :class="activeSubTab === 'text2' ? 'bg-white text-indigo-600 shadow-sm' : 'bg-transparent text-slate-400'" @click="activeSubTab = 'text2'">+ 2 Récits</button>
              </div>
              <!-- Proposals -->
              <div class="space-y-1.5 max-h-56 overflow-y-auto pr-0.5">
                <button v-for="prop in filteredProposals(cat)" :key="prop.id" type="button" class="w-full flex items-center gap-2.5 p-2 rounded-lg border text-left cursor-pointer transition-all outline-none" :class="isProposalActive(prop) ? 'border-indigo-500 bg-indigo-50/25 shadow-sm' : 'border-gray-100 bg-white hover:bg-gray-50'" @click="applyLayoutProposal(prop)">
                  <div class="w-11 h-8 rounded border border-gray-100 bg-slate-50 relative p-1 flex-shrink-0 overflow-hidden">
                    <div class="w-full h-full relative">
                      <div v-for="(slot, sidx) in prop.slots" :key="`s-${sidx}`" class="absolute bg-indigo-500/10 border border-indigo-500/35 rounded-sm" :style="{ left: `${(slot.x - 1) / 24 * 100}%`, top: `${(slot.y - 1) / 18 * 100}%`, width: `${slot.w / 24 * 100}%`, height: `${slot.h / 18 * 100}%` }"/>
                      <div v-for="(txt, tidx) in prop.texts" :key="`t-${tidx}`" class="absolute bg-amber-500/10 border border-amber-500/40 rounded-sm" :style="{ left: `${(txt.x - 1) / 24 * 100}%`, top: `${(txt.y - 1) / 18 * 100}%`, width: `${txt.w / 24 * 100}%`, height: `${txt.h / 18 * 100}%` }"/>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0 flex items-center justify-between">
                    <span class="text-[9.5px] font-bold text-gray-700 truncate">{{ prop.name }}</span>
                    <Icon v-if="isProposalActive(prop)" name="lucide:check-circle-2" class="text-indigo-600 text-xs" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col items-center gap-4 text-gray-400 pt-4"><Icon name="lucide:layout" class="text-xl animate-pulse" /></div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';
import { layoutCategories, type LayoutProposal } from './layoutsConfig';

const props = defineProps<{
  modelValue: 'left' | 'right'; leftPage: any; rightPage: any; activePageForLayout: any;
  isCoverSpread: boolean; isSidebarCollapsed: boolean;
}>();

defineEmits(['update:modelValue']);

const { updatePageField, fetchAlbumDetail, updatePhotoPosition, isPageRestricted } = useAlbumEditorStore();
const expandedCategory = ref<number | null>(1);
const activeSubTab = ref<'photos' | 'text1' | 'text2'>('photos');

const toggleCategory = (count: number) => expandedCategory.value = expandedCategory.value === count ? null : count;

const filteredProposals = (cat: any) => cat.proposals.filter((p: any) => 
  activeSubTab.value === 'photos' ? !p.texts || p.texts.length === 0 :
  activeSubTab.value === 'text1' ? p.texts && p.texts.length === 1 :
  p.texts && p.texts.length === 2
);

const isProposalActive = (prop: LayoutProposal) => {
  const p = props.activePageForLayout; if (!p || !p.layout_type.startsWith('grid-') || (parseInt(p.layout_type.replace('grid-', ''), 10) || 0) !== prop.slots.length) return false;
  if (p.photos && p.photos.length > 0) {
    const sorted = [...p.photos].sort((a,b) => (a.order ?? 0) - (b.order ?? 0));
    for (let i = 0; i < prop.slots.length; i++) {
      if (i >= sorted.length || sorted[i].custom_x !== prop.slots[i].x || sorted[i].custom_y !== prop.slots[i].y) return false;
    }
  }
  return true;
};

const applyLayoutProposal = async (proposal: LayoutProposal) => {
  const page = props.activePageForLayout; if (!page) return;
  await updatePageField(page.id, 'layout_type', `grid-${proposal.slots.length}`);
  if (page.photos && page.photos.length > 0) {
    const sorted = [...page.photos].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const promises = sorted.map((p, i) => i < proposal.slots.length 
      ? updatePhotoPosition(p.id, proposal.slots[i].x, proposal.slots[i].y, proposal.slots[i].w, proposal.slots[i].h)
      : updatePhotoPosition(p.id, null, null, null, null)
    );
    await Promise.all(promises);
  }
  let textBoxes: any[] = [];
  if (proposal.texts && proposal.texts.length > 0) {
    textBoxes = proposal.texts.map((t, idx) => ({
      id: `text-${Date.now()}-${idx}`,
      text: idx === 0 ? "Saisissez votre premier texte..." : "Seconde note ou anecdote...",
      x: t.x, y: t.y, w: t.w, h: t.h
    }));
  }
  await updatePageField(page.id, 'description', JSON.stringify(textBoxes));
  await fetchAlbumDetail(page.album, true);
};
</script>

<style scoped>
@import '~/assets/css/layouts-panel.css';
</style>