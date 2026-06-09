<template>
  <div class="spread-carousel flex items-center gap-4 py-2 px-4 bg-gray-50/50 rounded-xl overflow-x-auto select-none max-w-full">
    
    <div v-for="(spread, idx) in spreadsList" :key="idx" class="flex items-center flex-shrink-0">
      
      <!-- Mini Double Page Spread Preview -->
      <SpreadMiniature 
        :idx="idx"
        :spread="spread"
        :is-active="isActiveSpread(idx)"
        @select="selectSpread(idx)"
      />

      <!-- Small Inter-Spread Insertion [+] Button -->
      <div v-if="idx < spreadsList.length - 1" class="insert-spread-divider px-1.5 flex items-center justify-center">
        <button 
          type="button" 
          class="btn-insert-spread flex items-center justify-center w-6 h-6 rounded-full bg-white border border-gray-200 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all shadow hover:scale-110"
          @click="insertSpreadAt(idx + 1)"
          title="Insérer un feuillet ici"
        >
          <Icon name="lucide:plus" class="text-xs font-bold" />
        </button>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';
import SpreadMiniature from './SpreadMiniature.vue';

const props = defineProps<{ activePageIdx: number; }>();
const emit = defineEmits(['update:activePageIdx']);

const { activeAlbum, createPage, reorderPages, fetchAlbumDetail } = useAlbumEditorStore();

const spreadsList = computed(() => {
  if (!activeAlbum.value) return [];
  const pages = activeAlbum.value.pages;
  const spreads = [];
  
  // 1. Cover Spread: Left is Back Cover, Right is Front Cover
  spreads.push({ leftPage: null, rightPage: null });
  
  // 2. Interior spreads: Left is pages[2k], Right is pages[2k+1]
  for (let i = 0; i < pages.length; i += 2) {
    spreads.push({
      leftPage: pages[i] || null,
      rightPage: pages[i + 1] || null
    });
  }
  
  return spreads;
});

const isActiveSpread = (idx: number) => {
  return props.activePageIdx === idx * 2;
};

const selectSpread = (idx: number) => {
  emit('update:activePageIdx', idx * 2);
};

const insertSpreadAt = async (insertSpreadIndex: number) => {
  if (!activeAlbum.value) return;
  try {
    // 1. Create two new pages
    const page1 = await createPage(activeAlbum.value.id);
    const page2 = await createPage(activeAlbum.value.id);
    
    // Refresh to get latest IDs on backend
    await fetchAlbumDetail(activeAlbum.value.id);
    
    const allPages = [...activeAlbum.value.pages];
    // Find the newly appended pages (the last two)
    const newPages = allPages.slice(-2);
    const existingPages = allPages.slice(0, -2);
    
    // Insert them at the requested spot
    const pageInsertIndex = 2 * insertSpreadIndex - 2;
    existingPages.splice(pageInsertIndex, 0, newPages[0]!, newPages[1]!);
    
    const orderedIds = existingPages.map(p => p.id);
    await reorderPages(activeAlbum.value.id, orderedIds);
    await fetchAlbumDetail(activeAlbum.value.id);
    emit('update:activePageIdx', pageInsertIndex + 2);
  } catch (e) {
    console.error('Failed to insert spread:', e);
  }
};
</script>

<style scoped>
@import '~/assets/css/spread-carousel.css';
</style>