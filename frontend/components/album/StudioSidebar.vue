<template>
  <aside 
    class="h-screen select-none flex-shrink-0 bg-white border-r border-slate-200 transition-all duration-300 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-30"
    :class="isSidebarCollapsed ? 'w-[70px]' : 'w-[320px]'"
  >
    <!-- TOP SECTION: Navigation Tabs & Title Rename -->
    <div class="flex flex-col min-h-0 flex-1">
      
      <!-- Studio Album Rename/Identity Block -->
      <AlbumSidebarIdentity v-if="!isSidebarCollapsed" class="p-4 border-b border-slate-100" />
      <div v-else class="h-16 flex items-center justify-center border-b border-slate-100">
        <Icon name="lucide:book" class="w-6 h-6 text-amber-600" />
      </div>

      <!-- Icon-based Minimalist Navigation Tabs -->
      <nav class="flex p-2 gap-1 border-b border-slate-100 bg-slate-50/50" :class="isSidebarCollapsed ? 'flex-col items-center' : 'justify-between'">
        <button 
          v-for="t in tabs" 
          :key="t.id"
          type="button"
          class="flex flex-col items-center justify-center rounded-xl transition-all duration-200 hover:bg-white hover:shadow-sm hover:text-amber-600 text-slate-500"
          :class="[
            activeSidebarTab === t.id ? 'bg-white shadow-sm text-amber-600 ring-1 ring-slate-200' : '',
            isSidebarCollapsed ? 'w-12 h-12' : 'flex-1 py-3'
          ]"
          @click="activeSidebarTab = t.id"
          :title="t.label"
        >
          <Icon :name="t.icon" class="text-xl mb-1" :class="activeSidebarTab === t.id ? 'text-amber-500' : ''" />
          <span v-if="!isSidebarCollapsed" class="text-[10px] font-bold tracking-wider uppercase">{{ t.shortLabel }}</span>
        </button>
      </nav>

      <!-- Active Tab Panel Content (Scrollable) -->
      <div class="flex-1 min-h-0 overflow-y-auto p-4 bg-slate-50/30 custom-scrollbar">
        <!-- 1. PHOTOS PANEL -->
        <div v-if="activeSidebarTab === 'photos'" class="h-full flex flex-col min-h-0">
          <AlbumPhotoTray v-if="!isSidebarCollapsed" :photos="photos" :page-id="pageId" />
          <div v-else class="flex flex-col items-center gap-4 text-slate-400 pt-4">
            <Icon name="lucide:image" class="text-2xl" />
          </div>
        </div>

        <!-- 2. COUVERTURE PANEL -->
        <div v-else-if="activeSidebarTab === 'cover'" class="h-full flex flex-col min-h-0 gap-4">
          <p v-if="!isSidebarCollapsed" class="text-sm text-slate-500 text-center mb-2 font-medium">Configurez les couvertures de votre livre photo.</p>
          <AlbumCoverEditor :is-back-cover="false" class="flex-col gap-4" />
        </div>

        <!-- 3. MISE EN PAGE PANEL -->
        <AlbumSidebarLayoutsPanel
          v-else-if="activeSidebarTab === 'layouts'"
          v-model="targetPageSelection"
          :left-page="leftPage" :right-page="rightPage" :active-page-for-layout="activePageForLayout"
          :is-cover-spread="isCoverSpread" :is-sidebar-collapsed="isSidebarCollapsed"
          @switch-to-cover="activeSidebarTab = 'cover'"
        />

        <!-- 4. ARRIÈRE-PLANS (FONDS) PANEL -->
        <AlbumSidebarBackgroundsPanel
          v-else-if="activeSidebarTab === 'bg'"
          v-model="targetPageSelection"
          :left-page="leftPage" :right-page="rightPage" :active-page-for-layout="activePageForLayout"
          :is-sidebar-collapsed="isSidebarCollapsed"
        />

        <!-- 5. STICKERS PANEL -->
        <AlbumSidebarStickersPanel
          v-else-if="activeSidebarTab === 'stickers'"
          v-model="targetPageSelection"
          :left-page="leftPage" :right-page="rightPage" :active-page-for-layout="activePageForLayout"
          :is-cover-spread="isCoverSpread" :is-sidebar-collapsed="isSidebarCollapsed"
        />

        <!-- 6. CADRES PANEL -->
        <AlbumSidebarFramesPanel
          v-else-if="activeSidebarTab === 'frames'" :is-sidebar-collapsed="isSidebarCollapsed"
        />
      </div>

    </div>

    <!-- BOTTOM SECTION: Retract / Hide Button -->
    <div class="p-3 border-t border-slate-200 bg-white">
      <button 
        type="button" 
        class="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors font-bold text-sm"
        @click="isSidebarCollapsed = !isSidebarCollapsed"
      >
        <Icon :name="isSidebarCollapsed ? 'lucide:chevrons-right' : 'lucide:chevrons-left'" class="text-lg" />
        <span v-if="!isSidebarCollapsed">Masquer le panneau</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';

defineProps<{ photos: any[]; pageId?: number; }>();

const { activeAlbum, isSidebarCollapsed, activeSidebarTab, activePageIdx } = useAlbumEditorStore();
const targetPageSelection = ref<'left' | 'right'>('left');

const maxPageIdx = computed(() => {
  const pagesCount = activeAlbum.value?.pages?.length || 0;
  return (2 + Math.ceil(pagesCount / 2) - 1) * 2;
});

const isCoverSpread = computed(() => activePageIdx.value === 0 || activePageIdx.value === maxPageIdx.value);

const leftPage = computed(() => (!activeAlbum.value || isCoverSpread.value) ? null : activeAlbum.value.pages[activePageIdx.value - 2] || null);
const rightPage = computed(() => (!activeAlbum.value || isCoverSpread.value) ? null : activeAlbum.value.pages[activePageIdx.value - 1] || null);

const activePageForLayout = computed(() => {
  if (targetPageSelection.value === 'left') return leftPage.value || rightPage.value;
  return rightPage.value || leftPage.value;
});

watch([leftPage, rightPage], ([newLeft, newRight]) => {
  if (!newLeft && newRight) targetPageSelection.value = 'right';
  else if (newLeft && !newRight) targetPageSelection.value = 'left';
}, { immediate: true });

const tabs = [
  { id: 'photos', label: 'Photos', shortLabel: 'Photos', icon: 'lucide:image' },
  { id: 'cover', label: 'Couverture', shortLabel: 'Couv', icon: 'lucide:book-open' },
  { id: 'layouts', label: 'Mise en page', shortLabel: 'Layouts', icon: 'lucide:layout' },
  { id: 'bg', label: 'Arrière-plans', shortLabel: 'Fonds', icon: 'lucide:palette' },
  { id: 'stickers', label: 'Stickers', shortLabel: 'Stickers', icon: 'lucide:smile' },
  { id: 'frames', label: 'Cadres', shortLabel: 'Cadres', icon: 'lucide:frame' }
];
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 10px;
}
</style>