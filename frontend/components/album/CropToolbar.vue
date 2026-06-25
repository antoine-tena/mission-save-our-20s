<template>
  <div class="crop-toolbar flex items-center gap-3.5 py-2 px-3.5 bg-white border border-gray-100 rounded-full shadow-lg" @click.stop>
    <!-- Left Icon -->
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 select-none">
      <Icon name="lucide:crop" class="text-sm" />
    </div>

    <div class="h-4 w-[1px] bg-gray-100"/>

    <!-- Zoom Slider Section -->
    <div class="flex items-center gap-2.5 w-40">
      <Icon name="lucide:minus" class="text-xs text-gray-400 font-bold" />
      <input 
        type="range" 
        :value="modelValue"
        min="1.0"
        max="3.0" 
        step="0.05" 
        class="crop-zoom-slider flex-1 cursor-pointer" 
        @input="$emit('update:modelValue', parseFloat(($event.target as HTMLInputElement).value))"
      >
      <Icon name="lucide:plus" class="text-xs text-gray-400 font-bold" />
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
.crop-zoom-slider { 
  -webkit-appearance: none; 
  appearance: none;
  outline: none; 
  width: 100% !important;
  min-width: 0 !important; /* Bypass Chrome's default 150px range input width limit */
  height: 4px !important;
  background: #cbd5e1;
  border-radius: 9999px;
  margin: 0 !important;
  padding: 0 !important;
}
.crop-zoom-slider::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  height: 4px !important;
  background: transparent;
  border: none;
}
.crop-zoom-slider::-moz-range-track {
  height: 4px !important;
  background: transparent;
  border: none;
}
.crop-zoom-slider::-webkit-slider-thumb { 
  -webkit-appearance: none; 
  appearance: none; 
  width: 12px; 
  height: 12px; 
  border-radius: 50%; 
  background: #6366f1; 
  cursor: pointer; 
  transition: transform 0.1s; 
  margin-top: -4px !important; /* Center the 12px thumb on the 4px track */
}
.crop-zoom-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border: none;
  border-radius: 50%;
  background: #6366f1;
  cursor: pointer;
}
.crop-zoom-slider::-webkit-slider-thumb:hover { transform: scale(1.25); }
.crop-zoom-slider::-moz-range-thumb:hover { transform: scale(1.25); }
</style>