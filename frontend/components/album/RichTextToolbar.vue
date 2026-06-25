<template>
  <div v-if="!readonly" class="rich-text-word-toolbar flex items-center flex-wrap gap-1 p-1 bg-gray-50 border-b border-gray-100 rounded-t-xl select-none animate-fade-in">
    <!-- Font Size Controls (Petit, Moyen, Grand) -->
    <button 
      type="button" 
      class="toolbar-btn text-xs font-bold px-1.5 py-0.5 rounded hover:bg-gray-200" 
      title="Police Petite" 
      @mousedown.prevent="$emit('format', 'fontSize', '2')"
    >P</button>
    <button 
      type="button" 
      class="toolbar-btn text-sm font-bold px-1.5 py-0.5 rounded hover:bg-gray-200" 
      title="Police Moyenne" 
      @mousedown.prevent="$emit('format', 'fontSize', '4')"
    >M</button>
    <button 
      type="button" 
      class="toolbar-btn text-base font-bold px-1.5 py-0.5 rounded hover:bg-gray-200" 
      title="Police Grande" 
      @mousedown.prevent="$emit('format', 'fontSize', '6')"
    >G</button>

    <div class="h-4 w-[1px] bg-gray-200 mx-1"/>

    <!-- Basic Formatting Actions -->
    <button 
      type="button" 
      class="toolbar-btn hover:bg-gray-200 p-1 rounded" 
      title="Gras" 
      @mousedown.prevent="$emit('format', 'bold')"
    >
      <Icon name="lucide:bold" class="text-xs text-gray-600" />
    </button>
    <button 
      type="button" 
      class="toolbar-btn hover:bg-gray-200 p-1 rounded" 
      title="Italique" 
      @mousedown.prevent="$emit('format', 'italic')"
    >
      <Icon name="lucide:italic" class="text-xs text-gray-600" />
    </button>
    <button 
      type="button" 
      class="toolbar-btn hover:bg-gray-200 p-1 rounded" 
      title="Souligné" 
      @mousedown.prevent="$emit('format', 'underline')"
    >
      <Icon name="lucide:underline" class="text-xs text-gray-600" />
    </button>

    <div class="h-4 w-[1px] bg-gray-200 mx-1"/>

    <!-- Alignment Control Actions -->
    <button 
      type="button" 
      class="toolbar-btn hover:bg-gray-200 p-1 rounded" 
      title="Aligner à gauche" 
      @mousedown.prevent="$emit('format', 'justifyLeft')"
    >
      <Icon name="lucide:align-left" class="text-xs text-gray-600" />
    </button>
    <button 
      type="button" 
      class="toolbar-btn hover:bg-gray-200 p-1 rounded" 
      title="Centrer" 
      @mousedown.prevent="$emit('format', 'justifyCenter')"
    >
      <Icon name="lucide:align-center" class="text-xs text-gray-600" />
    </button>
    <button 
      type="button" 
      class="toolbar-btn hover:bg-gray-200 p-1 rounded" 
      title="Aligner à droite" 
      @mousedown.prevent="$emit('format', 'justifyRight')"
    >
      <Icon name="lucide:align-right" class="text-xs text-gray-600" />
    </button>
    <button 
      type="button" 
      class="toolbar-btn hover:bg-gray-200 p-1 rounded" 
      title="Justifier" 
      @mousedown.prevent="$emit('format', 'justifyFull')"
    >
      <Icon name="lucide:align-justify" class="text-xs text-gray-600" />
    </button>

    <div class="h-4 w-[1px] bg-gray-200 mx-1"/>

    <!-- Color Swatches (Noir, Indigo, Rose, Or, Émeraude) -->
    <button type="button" class="w-3.5 h-3.5 rounded-full bg-gray-950 border border-white shadow-sm hover:scale-110 cursor-pointer" title="Noir" @mousedown.prevent="$emit('format', 'foreColor', '#030712')"/>
    <button type="button" class="w-3.5 h-3.5 rounded-full bg-indigo-600 border border-white shadow-sm hover:scale-110 cursor-pointer" title="Indigo" @mousedown.prevent="$emit('format', 'foreColor', '#4f46e5')"/>
    <button type="button" class="w-3.5 h-3.5 rounded-full bg-rose-500 border border-white shadow-sm hover:scale-110 cursor-pointer" title="Rose" @mousedown.prevent="$emit('format', 'foreColor', '#f43f5e')"/>
    <button type="button" class="w-3.5 h-3.5 rounded-full bg-amber-500 border border-white shadow-sm hover:scale-110 cursor-pointer" title="Or / Ambre" @mousedown.prevent="$emit('format', 'foreColor', '#d97706')"/>
    <button type="button" class="w-3.5 h-3.5 rounded-full bg-emerald-600 border border-white shadow-sm hover:scale-110 cursor-pointer" title="Émeraude" @mousedown.prevent="$emit('format', 'foreColor', '#059669')"/>

    <!-- Spacer -->
    <div class="flex-1"/>

    <!-- Clear/Delete Text block -->
    <button 
      type="button" 
      class="text-red-500 hover:bg-red-50 p-1 rounded transition-colors cursor-pointer border-none" 
      title="Masquer / Supprimer la zone de texte" 
      @mousedown.prevent="$emit('delete')"
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