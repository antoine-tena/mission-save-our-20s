<template>
  <div class="vertical-pill-toolbar select-none">
    <template v-if="isCoverSpread || page">
      <!-- Color Picker Only -->
      <button 
        type="button" 
        class="color-dot-btn" 
        :style="{ backgroundColor: isCoverSpread ? (activeAlbum?.cover_color || '#3d352e') : (page?.background_color || '#ffffff') }" 
        @click="$emit('trigger-color-picker')"
        :title="isCoverSpread ? 'Couleur de couverture' : (isLeft ? 'Couleur de page (Gauche)' : 'Couleur de page (Droite)')"
      ></button>
    </template>
    <div v-else class="text-[10px] text-gray-300 font-sans italic flex flex-col items-center" :title="isLeft ? 'Page de gauche vide' : 'Page de droite vide'">
      <Icon name="lucide:image-off" class="text-sm" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  page: any;
  isCoverSpread: boolean;
  isLeft: boolean;
  activeAlbum: any;
}>();

defineEmits(['trigger-color-picker']);
</script>

<style scoped>
@import '~/assets/css/book-spread.css';
</style>