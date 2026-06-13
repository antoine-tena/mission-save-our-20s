<template>
  <div class="studio-footer-container relative flex flex-col flex-shrink-0 select-none">
    
    <!-- Top-floating "X pages" Collapse/Expand drawer tab -->
    <div class="absolute -top-[38px] left-6 z-50">
      <button 
        type="button" 
        class="volume-dropdown-trigger flex items-center gap-1.5 bg-white border border-gray-100 hover:border-indigo-300 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] hover:shadow-md rounded-t-xl px-4 py-2 cursor-pointer transition-all text-xs font-bold text-gray-700"
        @click="isCollapsed = !isCollapsed"
      >
        <Icon name="lucide:book-open" class="text-indigo-500 text-sm" />
        <span class="text-xs font-bold text-gray-700 whitespace-nowrap">{{ totalPagesCount }} pages</span>
        <Icon :name="isCollapsed ? 'lucide:chevron-up' : 'lucide:chevron-down'" class="text-gray-400 text-xs ml-0.5 transition-transform duration-300" />
      </button>
    </div>

    <!-- Collapsible main footer container -->
    <transition name="collapse-footer">
      <footer 
        v-show="!isCollapsed" 
        class="studio-footer bg-white border-t border-gray-100 px-6 py-2 flex items-center justify-between gap-6 h-[75px] w-full"
      >
        <!-- Center: Horizontal Spread Carousel -->
        <div class="flex-1 min-w-0">
          <AlbumSpreadCarousel :active-page-idx="activePageIdx" @update:active-page-idx="onUpdateActiveSpread" />
        </div>
      </footer>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';

const props = defineProps<{ activePageIdx: number; }>();
const emit = defineEmits(['update:activePageIdx']);

const { activeAlbum } = useAlbumEditorStore();

const isCollapsed = ref(false);

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

.collapse-footer-enter-active,
.collapse-footer-leave-active {
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s ease, border-color 0.3s ease;
  max-height: 75px;
  overflow: hidden;
}

.collapse-footer-enter-from,
.collapse-footer-leave-to {
  max-height: 0px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  border-top-color: transparent !important;
}
</style>