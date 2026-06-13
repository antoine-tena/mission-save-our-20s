<template>
  <div class="spread-color-picker-row flex flex-col items-center gap-2 mt-4 mb-1" v-if="!isCoverSpread && (leftPage || rightPage)">
    <span class="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Sélectionner une couleur de fond</span>
    <div class="flex items-center gap-2 flex-wrap justify-center bg-white border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.03)] rounded-full px-4 py-2">
      <button
        v-for="color in presetColors"
        :key="color.hex"
        type="button"
        class="preset-color-dot"
        :style="{ backgroundColor: color.hex }"
        :title="color.label"
        @click="$emit('select-color', color.hex)"
      ></button>
      <button
        type="button"
        class="preset-color-dot custom-color-rainbow flex items-center justify-center"
        title="Couleur personnalisée (Pipette)"
        @click="$emit('trigger-custom-picker')"
      >
        <Icon name="lucide:pipette" class="text-xs text-white" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isCoverSpread: boolean;
  leftPage: any;
  rightPage: any;
  presetColors: Array<{ hex: string; label: string; }>;
}>();

defineEmits(['select-color', 'trigger-custom-picker']);
</script>

<style scoped>
@import '~/assets/css/book-spread.css';
</style>