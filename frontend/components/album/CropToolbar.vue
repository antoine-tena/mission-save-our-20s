<template>
  <div class="crop-toolbar flex flex-col gap-1.5 p-2 bg-white/95 backdrop-blur-xs rounded-lg shadow-lg border border-gray-100" @click.stop>
    <div class="flex items-center gap-2">
      <Icon name="lucide:zoom-in" class="text-xs text-gray-400" />
      <input 
        type="range" 
        :value="modelValue"
        @input="$emit('update:modelValue', parseFloat(($event.target as HTMLInputElement).value))"
        min="1.0" 
        max="3.0" 
        step="0.05" 
        class="crop-zoom-slider flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <span class="text-[9px] font-bold text-gray-500 w-8 text-right">{{ Math.round(modelValue * 100) }}%</span>
    </div>
    <div class="flex items-center justify-between gap-2 mt-1">
      <span class="text-[8px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-0.5 select-none">
        <Icon name="lucide:move" /> Glissez pour déplacer
      </span>
      <span class="text-[8px] text-gray-400 italic select-none">Cliquez ailleurs pour sauvegarder</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: number;
}>();
defineEmits(['update:modelValue']);
</script>

<style scoped>
.crop-toolbar { position: absolute; bottom: 8px; left: 8px; right: 8px; z-index: 100; box-shadow: 0 4px 15px rgba(0,0,0,0.1); pointer-events: auto; }
.crop-zoom-slider { -webkit-appearance: none; outline: none; }
.crop-zoom-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 10px; height: 10px; border-radius: 50%; background: #6366f1; cursor: pointer; transition: transform 0.1s; }
.crop-zoom-slider::-webkit-slider-thumb:hover { transform: scale(1.3); }
</style>