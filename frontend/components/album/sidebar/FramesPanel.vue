<template>
  <div v-if="!isSidebarCollapsed" class="flex flex-col gap-4 h-full min-h-0 animate-fade-in">
    <p class="text-[10.5px] text-gray-500 text-center mb-0.5 font-bold uppercase tracking-wider">Style de Cadres</p>
    <div class="flex flex-col gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 items-center justify-center text-center">
      <Icon name="lucide:frame" class="text-3xl text-indigo-400 animate-pulse" />
      <p class="text-xs leading-normal font-bold text-gray-700">
        Cadre Polaroid Standard
      </p>
      <p class="text-[10px] text-gray-400 leading-relaxed">
        Toutes vos photos de souvenirs possèdent par défaut un magnifique cadre vintage style Polaroid avec une ombre 3D, parfait pour raconter vos aventures des 20 ans.
      </p>
    </div>
  </div>
  <div v-else class="flex flex-col items-center gap-4 text-gray-400 pt-4">
    <Icon name="lucide:frame" class="text-xl" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isSidebarCollapsed: boolean;
}>();
</script>