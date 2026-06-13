<template>
  <div class="layout-mini-wireframe w-11 h-9 rounded bg-gray-50 border border-gray-200 flex items-center justify-center p-1 flex-shrink-0 transition-all">
    <!-- Wireframe structure based on ID -->
    <div v-if="layoutId === 'text-only'" class="flex flex-col gap-0.5 w-full">
      <div class="h-0.5 w-4/5 bg-gray-300 rounded mx-auto"></div>
      <div class="h-0.5 w-full bg-gray-300 rounded"></div>
      <div class="h-0.5 w-3/4 bg-gray-300 rounded mx-auto"></div>
    </div>
    <div v-else-if="layoutId === 'grid-1'" class="w-full h-full bg-indigo-100/50 border border-indigo-200 rounded-sm"></div>
    <div v-else-if="layoutId === 'grid-2'" class="grid grid-cols-2 gap-0.5 w-full h-full">
      <div class="bg-indigo-100/50 border border-indigo-200 rounded-sm"></div>
      <div class="bg-indigo-100/50 border border-indigo-200 rounded-sm"></div>
    </div>
    <div v-else-if="layoutId === 'grid-3'" class="grid grid-cols-3 gap-0.5 w-full h-full">
      <div class="bg-indigo-100/50 border border-indigo-200 rounded-sm col-span-2"></div>
      <div class="flex flex-col gap-0.5 h-full">
        <div class="bg-indigo-100/50 border border-indigo-200 rounded-sm flex-1"></div>
        <div class="bg-indigo-100/50 border border-indigo-200 rounded-sm flex-1"></div>
      </div>
    </div>
    <div v-else-if="layoutId === 'grid-4'" class="grid grid-cols-2 grid-rows-2 gap-0.5 w-full h-full">
      <div class="bg-indigo-100/50 border border-indigo-200 rounded-sm"></div>
      <div class="bg-indigo-100/50 border border-indigo-200 rounded-sm"></div>
      <div class="bg-indigo-100/50 border border-indigo-200 rounded-sm"></div>
      <div class="bg-indigo-100/50 border border-indigo-200 rounded-sm"></div>
    </div>
    <div v-else-if="layoutId === 'grid-5'" class="grid grid-cols-3 gap-0.5 w-full h-full">
      <div class="bg-indigo-100/50 border border-indigo-200 rounded-sm col-span-2"></div>
      <div class="bg-indigo-100/50 border border-indigo-200 rounded-sm"></div>
      <div class="bg-indigo-100/50 border border-indigo-200 rounded-sm"></div>
      <div class="bg-indigo-100/50 border border-indigo-200 rounded-sm"></div>
      <div class="bg-indigo-100/50 border border-indigo-200 rounded-sm"></div>
    </div>
    <div v-else-if="layoutId === 'grid-6'" class="grid grid-cols-3 grid-rows-2 gap-0.5 w-full h-full">
      <div v-for="i in 6" :key="i" class="bg-indigo-100/50 border border-indigo-200 rounded-sm animate-pulse"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ layoutId: string; }>();
</script>

<style scoped>
.layout-mini-wireframe { transition: all 0.2s; }
.layout-preset-btn:hover .layout-mini-wireframe { border-color: #cbd5e1; background-color: #f8fafc; }
.selected-layout-card .layout-mini-wireframe { border-color: #a5b4fc !important; background-color: #e0e7ff !important; }
</style>