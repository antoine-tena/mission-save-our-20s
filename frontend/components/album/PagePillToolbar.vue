<template>
  <div class="vertical-pill-toolbar select-none">
    <div v-if="!isCoverSpread && page && isPageRestricted(page.id)" class="flex flex-col items-center justify-center text-gray-400 font-sans text-xs font-semibold p-1" title="Garde verrouillée">
      <Icon name="lucide:lock" class="text-sm text-gray-300" />
    </div>
    <template v-else-if="isCoverSpread || page">
      <!-- Color Picker -->
      <button 
        type="button" 
        class="color-dot-btn" 
        :style="{ backgroundColor: isCoverSpread ? (activeAlbum?.cover_color || '#3d352e') : (page?.background_color || '#ffffff') }" 
        @click="$emit('trigger-color-picker')"
        :title="isCoverSpread ? 'Couleur de couverture' : (isLeft ? 'Couleur de page (Gauche)' : 'Couleur de page (Droite)')"
      ></button>

      <!-- Layout toggle -->
      <button 
        type="button" 
        class="pill-action-btn" 
        :class="{ 'active': !isCoverSpread && page?.layout_type === 'text-only' }" 
        :disabled="isCoverSpread"
        @click="!isCoverSpread ? $emit('toggle-layout', page) : null" 
        title="Mode texte/photo"
      >
        <Icon name="lucide:align-left" />
      </button>

      <!-- Adjust slots count -->
      <button 
        type="button" 
        class="pill-action-btn" 
        :disabled="isCoverSpread || page?.layout_type === 'text-only'"
        @click="!isCoverSpread ? $emit('cycle-slots', page) : null" 
        title="Nombre de photos"
      >
        <Icon name="lucide:image" />
      </button>

      <!-- Add/Edit page title -->
      <button 
        type="button" 
        class="pill-action-btn" 
        :disabled="isCoverSpread"
        @click="!isCoverSpread ? $emit('inject-title', page) : null" 
        title="Titre de la page"
      >
        <Icon name="lucide:heading" />
      </button>

      <!-- Enveloping propagate / full wrap -->
      <button 
        type="button" 
        class="pill-action-btn" 
        @click="isCoverSpread ? $emit('toggle-full-wrap', !isFullWrapCover) : $emit('propagate-enveloping', page)" 
        :disabled="!isCoverSpread && !hasOppositePage" 
        :title="isCoverSpread ? (isFullWrapCover ? 'Séparer en 2' : 'Rendre Enveloppante') : 'Rendre Enveloppante'"
      >
        <Icon :name="isCoverSpread && isFullWrapCover ? 'lucide:columns' : 'lucide:book-open'" />
      </button>

      <!-- Delete cover style / page style -->
      <button 
        type="button" 
        class="pill-action-btn text-red-500 hover:bg-red-50" 
        @click="isCoverSpread ? $emit('delete-cover') : $emit('retire-style', page)" 
        title="Retirer le style"
      >
        <Icon name="lucide:trash-2" />
      </button>
    </template>
    <div v-else class="text-[10px] text-gray-300 font-sans italic flex flex-col items-center" :title="isLeft ? 'Page de gauche vide' : 'Page de droite vide'">
      <Icon name="lucide:image-off" class="text-sm" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';

defineProps<{
  page: any;
  isCoverSpread: boolean;
  isLeft: boolean;
  activeAlbum: any;
  isFullWrapCover: boolean;
  hasOppositePage: boolean;
}>();

defineEmits([
  'trigger-color-picker',
  'toggle-layout',
  'cycle-slots',
  'inject-title',
  'toggle-full-wrap',
  'propagate-enveloping',
  'delete-cover',
  'retire-style'
]);

const { isPageRestricted } = useAlbumEditorStore();
</script>

<style scoped>
@import '~/assets/css/book-spread.css';
</style>