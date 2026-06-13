<template>
  <aside 
    class="studio-sidebar h-screen bg-white border-r border-gray-100 flex flex-col justify-between transition-all duration-300 select-none flex-shrink-0"
    :class="isSidebarCollapsed ? 'w-[70px]' : 'w-[260px]'"
  >
    <!-- TOP SECTION: Navigation Tabs & Title Rename -->
    <div class="flex flex-col min-h-0 flex-1">
      
      <!-- Studio Album Rename Input (Hides when collapsed) -->
      <div v-if="!isSidebarCollapsed" class="sidebar-rename-block p-4 border-b border-gray-100 flex flex-col gap-1">
        <NuxtLink to="/album" class="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mb-1">
          <Icon name="lucide:chevron-left" /> Bibliothèque
        </NuxtLink>
        <label class="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider">Carnet d'album</label>
        <input 
          type="text" 
          :value="activeAlbum?.title" 
          @blur="e => activeAlbum && updateAlbumTitle(activeAlbum.id, (e.target as HTMLInputElement).value)" 
          class="w-full text-sm font-extrabold text-gray-800 border border-gray-100 focus:border-indigo-500 focus:bg-white rounded-lg bg-gray-50 px-2 py-1.5 outline-none transition-all"
        />
      </div>

      <!-- Icon-based Minimalist Navigation Tabs -->
      <nav class="sidebar-nav-tabs flex border-b border-gray-100" :class="isSidebarCollapsed ? 'flex-col items-center p-2 gap-2' : 'p-2 justify-between'">
        <button 
          v-for="t in tabs" 
          :key="t.id"
          type="button"
          class="tab-btn flex flex-col items-center justify-center p-2 rounded-lg transition-all"
          :class="[
            activeSidebarTab === t.id ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50',
            isSidebarCollapsed ? 'w-10 h-10' : 'flex-1'
          ]"
          @click="activeSidebarTab = t.id"
          :title="t.label"
        >
          <Icon :name="t.icon" class="text-lg" />
          <span v-if="!isSidebarCollapsed" class="text-[9px] font-bold mt-1 tracking-tight">{{ t.shortLabel }}</span>
        </button>
      </nav>

      <!-- Active Tab Panel Content (Scrollable) -->
      <div class="sidebar-active-panel flex-1 min-h-0 overflow-y-auto p-4">
        <!-- 1. PHOTOS PANEL -->
        <div v-if="activeSidebarTab === 'photos'" class="h-full flex flex-col min-h-0">
          <AlbumPhotoTray v-if="!isSidebarCollapsed" :photos="photos" :page-id="pageId" />
          <div v-else class="flex flex-col items-center gap-4 text-gray-400 pt-4">
            <Icon name="lucide:image" class="text-xl" />
          </div>
        </div>

        <!-- 2. COUVERTURE PANEL -->
        <div v-else-if="activeSidebarTab === 'cover'" class="h-full flex flex-col min-h-0 gap-4">
          <p v-if="!isSidebarCollapsed" class="text-xs text-gray-500 text-center mb-1">Configurez les couvertures de votre livre photo.</p>
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
          v-else-if="activeSidebarTab === 'bg'" :is-sidebar-collapsed="isSidebarCollapsed"
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
    <div class="sidebar-retract-panel p-3 border-t border-gray-100 flex items-center justify-center bg-gray-50/50">
      <button 
        type="button" 
        class="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-indigo-600 transition-all px-3 py-1.5 rounded-lg"
        @click="isSidebarCollapsed = !isSidebarCollapsed"
      >
        <Icon :name="isSidebarCollapsed ? 'lucide:chevrons-right' : 'lucide:chevrons-left'" class="text-base" />
        <span v-if="!isSidebarCollapsed">Masquer</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';

defineProps<{ photos: any[]; pageId?: number; }>();

const { activeAlbum, updateAlbumTitle, isSidebarCollapsed, activeSidebarTab, activePageIdx } = useAlbumEditorStore();
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
@import '~/assets/css/studio-sidebar.css';
</style>