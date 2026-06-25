<template>
  <div class="absolute top-4 bg-white/80 backdrop-blur-md border border-slate-200/50 shadow-sm rounded-full p-2 flex flex-col items-center gap-3 z-50 select-none" :class="isLeft ? '-left-12' : '-right-12'">
    <template v-if="isCoverSpread || page">
      <!-- Color Picker Only -->
      <button 
        type="button" 
        class="w-6 h-6 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2" 
        :style="{ backgroundColor: isCoverSpread ? (activeAlbum?.cover_color || '#3d352e') : (page?.background_color || '#ffffff') }" 
        :title="isCoverSpread ? 'Couleur de couverture' : (isLeft ? 'Couleur de page (Gauche)' : 'Couleur de page (Droite)')"
        @click="$emit('trigger-color-picker')"
      />
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
