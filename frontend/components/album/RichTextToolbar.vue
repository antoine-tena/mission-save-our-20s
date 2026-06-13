<template>
  <div v-if="!readonly" class="rich-text-word-toolbar flex items-center flex-wrap gap-1 p-1 bg-gray-50 border-b border-gray-100 rounded-t-xl select-none animate-fade-in">
    <!-- Font Size Controls (Petit, Moyen, Grand) -->
    <button 
      type="button" 
      class="toolbar-btn text-xs font-bold px-1.5 py-0.5 rounded hover:bg-gray-200" 
      @mousedown.prevent="$emit('format', 'fontSize', '2')" 
      title="Police Petite"
    >P</button>
    <button 
      type="button" 
      class="toolbar-btn text-sm font-bold px-1.5 py-0.5 rounded hover:bg-gray-200" 
      @mousedown.prevent="$emit('format', 'fontSize', '4')" 
      title="Police Moyenne"
    >M</button>
    <button 
      type="button" 
      class="toolbar-btn text-base font-bold px-1.5 py-0.5 rounded hover:bg-gray-200" 
      @mousedown.prevent="$emit('format', 'fontSize', '6')" 
      title="Police Grande"
    >G</button>

    <div class="h-4 w-[1px] bg-gray-200 mx-1"></div>

    <!-- Basic Formatting Actions -->
    <button 
      type="button" 
      class="toolbar-btn hover:bg-gray-200 p-1 rounded" 
      @mousedown.prevent="$emit('format', 'bold')" 
      title="Gras"
    >
      <Icon name="lucide:bold" class="text-xs text-gray-600" />
    </button>
    <button 
      type="button" 
      class="toolbar-btn hover:bg-gray-200 p-1 rounded" 
      @mousedown.prevent="$emit('format', 'italic')" 
      title="Italique"
    >
      <Icon name="lucide:italic" class="text-xs text-gray-600" />
    </button>
    <button 
      type="button" 
      class="toolbar-btn hover:bg-gray-200 p-1 rounded" 
      @mousedown.prevent="$emit('format', 'underline')" 
      title="Souligné"
    >
      <Icon name="lucide:underline" class="text-xs text-gray-600" />
    </button>

    <div class="h-4 w-[1px] bg-gray-200 mx-1"></div>

    <!-- Alignment Control Actions -->
    <button 
      type="button" 
      class="toolbar-btn hover:bg-gray-200 p-1 rounded" 
      @mousedown.prevent="$emit('format', 'justifyLeft')" 
      title="Aligner à gauche"
    >
      <Icon name="lucide:align-left" class="text-xs text-gray-600" />
    </button>
    <button 
      type="button" 
      class="toolbar-btn hover:bg-gray-200 p-1 rounded" 
      @mousedown.prevent="$emit('format', 'justifyCenter')" 
      title="Centrer"
    >
      <Icon name="lucide:align-center" class="text-xs text-gray-600" />
    </button>
    <button 
      type="button" 
      class="toolbar-btn hover:bg-gray-200 p-1 rounded" 
      @mousedown.prevent="$emit('format', 'justifyRight')" 
      title="Aligner à droite"
    >
      <Icon name="lucide:align-right" class="text-xs text-gray-600" />
    </button>
    <button 
      type="button" 
      class="toolbar-btn hover:bg-gray-200 p-1 rounded" 
      @mousedown.prevent="$emit('format', 'justifyFull')" 
      title="Justifier"
    >
      <Icon name="lucide:align-justify" class="text-xs text-gray-600" />
    </button>

    <div class="h-4 w-[1px] bg-gray-200 mx-1"></div>

    <!-- Color Swatches (Noir, Indigo, Rose, Or, Émeraude) -->
    <button type="button" class="w-3.5 h-3.5 rounded-full bg-gray-950 border border-white shadow-sm hover:scale-110 cursor-pointer" @mousedown.prevent="$emit('format', 'foreColor', '#030712')" title="Noir"></button>
    <button type="button" class="w-3.5 h-3.5 rounded-full bg-indigo-600 border border-white shadow-sm hover:scale-110 cursor-pointer" @mousedown.prevent="$emit('format', 'foreColor', '#4f46e5')" title="Indigo"></button>
    <button type="button" class="w-3.5 h-3.5 rounded-full bg-rose-500 border border-white shadow-sm hover:scale-110 cursor-pointer" @mousedown.prevent="$emit('format', 'foreColor', '#f43f5e')" title="Rose"></button>
    <button type="button" class="w-3.5 h-3.5 rounded-full bg-amber-500 border border-white shadow-sm hover:scale-110 cursor-pointer" @mousedown.prevent="$emit('format', 'foreColor', '#d97706')" title="Or / Ambre"></button>
    <button type="button" class="w-3.5 h-3.5 rounded-full bg-emerald-600 border border-white shadow-sm hover:scale-110 cursor-pointer" @mousedown.prevent="$emit('format', 'foreColor', '#059669')" title="Émeraude"></button>

    <!-- Spacer -->
    <div class="flex-1"></div>

    <!-- Clear/Delete Text block -->
    <button 
      type="button" 
      class="text-red-500 hover:bg-red-50 p-1 rounded transition-colors cursor-pointer border-none" 
      @mousedown.prevent="$emit('delete')" 
      title="Masquer / Supprimer la zone de texte"
    >
      <Icon name="lucide:trash" class="text-xs" />
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ readonly: boolean; }>();
defineEmits(['format', 'delete']);
</script>

<style scoped>
.rich-text-word-toolbar {
  border-radius: 12px 12px 0 0;
  border-bottom: 1px solid #f3f1e9;
  background-color: #f7f5ee;
}
.page-content-wrapper:not(.readonly) .rich-text-word-toolbar {
  border: 2px solid #f59e0b !important;
}
.toolbar-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a5568;
  transition: all 0.15s;
}
</style>