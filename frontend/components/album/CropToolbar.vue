<template>
  <div class="crop-toolbar flex items-center gap-4 py-2.5 px-4 bg-white border border-gray-100 rounded-full shadow-lg" @click.stop>
    <div class="flex items-center gap-2 flex-shrink-0 select-none">
      <span class="text-[10px] font-extrabold text-indigo-600 bg-indigo-50 rounded-full px-2.5 py-0.5 uppercase tracking-wider flex items-center gap-1">
        <Icon name="lucide:crop" class="text-xs" /> Recadrage
      </span>
    </div>

    <!-- Zoom Slider Section -->
    <div class="flex items-center gap-2 w-48 border-r border-gray-100 pr-4">
      <Icon name="lucide:zoom-in" class="text-sm text-gray-400" />
      <input 
        type="range" 
        :value="modelValue"
        @input="$emit('update:modelValue', parseFloat(($event.target as HTMLInputElement).value))"
        min="1.0" 
        max="3.0" 
        step="0.05" 
        class="crop-zoom-slider flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <span class="text-[10px] font-bold text-gray-600 w-10 text-right">{{ Math.round(modelValue * 100) }}%</span>
    </div>

    <!-- Help Info Section -->
    <div class="flex items-center gap-4 text-[10px] text-gray-400 select-none">
      <span class="flex items-center gap-1 font-bold text-gray-500 uppercase tracking-wide">
        <Icon name="lucide:move" class="text-xs text-indigo-400" /> Glissez pour déplacer la photo
      </span>
      <span class="text-gray-300">|</span>
      <span class="italic font-medium text-gray-400 flex items-center gap-1">
        <Icon name="lucide:mouse-pointer-click" class="text-xs text-indigo-300" /> Cliquez en dehors de la photo pour valider
      </span>
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
.crop-toolbar { 
  pointer-events: auto; 
  box-shadow: 0 10px 25px rgba(0,0,0,0.06);
}
.crop-zoom-slider { -webkit-appearance: none; outline: none; }
.crop-zoom-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 12px; height: 12px; border-radius: 50%; background: #6366f1; cursor: pointer; transition: transform 0.1s; }
.crop-zoom-slider::-webkit-slider-thumb:hover { transform: scale(1.25); }
</style>