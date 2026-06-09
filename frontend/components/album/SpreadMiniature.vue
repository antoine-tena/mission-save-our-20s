<template>
  <div 
    class="spread-miniature flex flex-col gap-1 p-1.5 border-2 rounded-lg cursor-pointer transition-all bg-white relative hover:scale-105"
    :class="isActive ? 'border-indigo-600 ring-2 ring-indigo-100 shadow-md' : 'border-gray-200 hover:border-indigo-300'"
    @click="$emit('select')"
  >
    <div class="mini-pages flex gap-0.5 h-[70px] w-[102px] overflow-hidden rounded bg-gray-100">
      
      <!-- 1. FULL-WRAP COVER SPREAD PREVIEW (isCover and isFullWrapCover is active) -->
      <div 
        v-if="isCover && isFullWrapCover"
        class="mini-page-scaled-wrapper" 
        :style="{ width: '102px', backgroundColor: activeAlbum?.cover_color || '#3d352e' }"
      >
        <div class="mini-page-scaled-content" style="width: 640px; transform: scale(0.159375); transform-origin: top left;">
          <div class="studio-book-cover-wrapper" style="width: 640px;">
            <div class="spine-line-cover"></div>
            <div class="spine-glow-cover"></div>
            <div v-if="activeAlbum?.show_cover_photo" class="book-cover-image">
              <img v-if="activeAlbum?.cover_photo_url" :src="activeAlbum.cover_photo_url" alt="Couverture Enveloppante" />
              <div v-else class="empty-cover-placeholder-studio-full">
                <Icon name="lucide:cloud-upload" class="empty-icon-studio-full" />
              </div>
              <div class="cover-wash"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. STANDARD SPLIT COVER OR INTERIOR PAGES SPREAD -->
      <template v-else>
        <!-- LEFT PAGE PREVIEW -->
        <!-- Cover spread left is Back Cover -->
        <div 
          v-if="isCover"
          class="mini-page-scaled-wrapper border-r border-gray-200" 
          :style="{ backgroundColor: activeAlbum?.cover_color || '#3d352e' }"
        >
          <div class="mini-page-scaled-content">
            <div class="studio-book-cover-wrapper">
              <div class="book-spine-edge" style="border-radius: 0 4px 4px 0; left: auto; right: 0; transform: scaleX(-1);"></div>
              <div v-if="activeAlbum?.show_cover_photo" class="book-cover-image">
                <img v-if="activeAlbum?.back_cover_photo_url" :src="activeAlbum.back_cover_photo_url" alt="Couverture de Fin" />
                <div v-else class="empty-cover-placeholder-studio-full">
                  <Icon name="lucide:cloud-upload" class="empty-icon-studio-full" />
                </div>
                <div class="cover-wash"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Regular interior left page -->
        <div 
          v-else
          class="mini-page-scaled-wrapper border-r border-gray-200" 
          :style="{ backgroundColor: spread.leftPage?.background_color || '#ffffff' }"
        >
          <div 
            v-if="spread.leftPage"
            class="mini-page-scaled-content-page" 
            :style="{ backgroundColor: spread.leftPage.background_color || '#ffffff' }"
          >
            <AlbumBookPageHeader :page="spread.leftPage" />
            <AlbumBookPageContent :page="spread.leftPage" :readonly="true" />
          </div>
          <div v-else class="mini-page-scaled-content-page" style="background-color: #ffffff;"></div>
        </div>

        <!-- RIGHT PAGE PREVIEW -->
        <!-- Cover spread right is Front Cover -->
        <div 
          v-if="isCover"
          class="mini-page-scaled-wrapper" 
          :style="{ backgroundColor: activeAlbum?.cover_color || '#3d352e' }"
        >
          <div class="mini-page-scaled-content">
            <div class="studio-book-cover-wrapper">
              <div class="book-spine-edge"></div>
              <div v-if="activeAlbum?.show_cover_photo" class="book-cover-image">
                <img v-if="activeAlbum?.cover_photo_url" :src="activeAlbum.cover_photo_url" alt="Couverture" />
                <div v-else class="empty-cover-placeholder-studio-full">
                  <Icon name="lucide:cloud-upload" class="empty-icon-studio-full" />
                </div>
                <div class="cover-wash"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Regular interior right page -->
        <div 
          v-else
          class="mini-page-scaled-wrapper" 
          :style="{ backgroundColor: spread.rightPage ? (spread.rightPage.background_color || '#ffffff') : '#ffffff' }"
        >
          <div 
            v-if="spread.rightPage" 
            class="mini-page-scaled-content-page" 
            :style="{ backgroundColor: spread.rightPage.background_color || '#ffffff' }"
          >
            <AlbumBookPageHeader :page="spread.rightPage" />
            <AlbumBookPageContent :page="spread.rightPage" :readonly="true" />
          </div>
          <div v-else class="mini-page-scaled-content-page" style="background-color: #ffffff;"></div>
        </div>
      </template>

    </div>
    <span class="mini-label text-[9px] font-extrabold text-gray-400 text-center uppercase tracking-wider block">
      {{ spreadLabel(idx, spread) }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';

const props = defineProps<{
  idx: number;
  spread: any;
  isActive: boolean;
}>();

const emit = defineEmits(['select']);

const { activeAlbum } = useAlbumEditorStore();

const isFullWrapCover = computed(() => {
  return activeAlbum.value?.is_full_wrap === true;
});

const isBeginningCover = computed(() => {
  return props.idx === 0;
});

const isEndCover = computed(() => {
  if (!activeAlbum.value) return false;
  const pagesCount = activeAlbum.value.pages?.length || 0;
  const totalSpreads = 2 + Math.ceil(pagesCount / 2);
  return props.idx === totalSpreads - 1;
});

const isCover = computed(() => {
  return isBeginningCover.value || isEndCover.value;
});

const spreadLabel = (idx: number, spread: any) => {
  if (isCover.value) return 'Garde';
  return `P. ${(idx * 2) - 1} / ${idx * 2}`;
};
</script>