<template>
  <footer class="studio-footer bg-white border-t border-gray-100 px-6 py-3 flex items-center justify-between gap-6 select-none h-[95px] flex-shrink-0">
    
    <!-- Left: Volume dropdown indicator -->
    <div class="flex items-center gap-2 border-r border-gray-100 pr-6">
      <div class="volume-dropdown-trigger flex items-center gap-1 bg-gray-50 border border-gray-100 hover:border-gray-200 rounded-lg px-3 py-1.5 cursor-pointer transition-all">
        <Icon name="lucide:book-open" class="text-indigo-500 text-sm" />
        <span class="text-xs font-bold text-gray-700 whitespace-nowrap">{{ totalPagesCount }} pages</span>
        <Icon name="lucide:chevron-down" class="text-gray-400 text-xs ml-1" />
      </div>
    </div>

    <!-- Center: Horizontal Spread Carousel -->
    <div class="flex-1 min-w-0">
      <AlbumSpreadCarousel :active-page-idx="activePageIdx" @update:active-page-idx="onUpdateActiveSpread" />
    </div>

    <!-- Right: Mini help helper -->
    <div class="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-wider pl-6 border-l border-gray-100 whitespace-nowrap">
      <Icon name="lucide:info" class="text-indigo-500 text-sm" />
      <span>Mise en page active</span>
    </div>

  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';

const props = defineProps<{ activePageIdx: number; }>();
const emit = defineEmits(['update:activePageIdx']);

const { activeAlbum } = useAlbumEditorStore();

const totalPagesCount = computed(() => {
  return activeAlbum.value?.pages?.length || 0;
});

const onUpdateActiveSpread = (nextIdx: number) => {
  emit('update:activePageIdx', nextIdx);
};
</script>

<style scoped>
.studio-footer {
  box-shadow: 0 -4px 20px rgba(0,0,0,0.015);
}
</style>