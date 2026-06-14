<template>
  <header class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 relative z-10 container mx-auto px-4">
    <div>
      <h1 class="font-display text-5xl md:text-6xl font-bold text-slate-800 tracking-tight flex items-center gap-4">
        Ciné-Journal <Icon name="lucide:clapperboard" class="text-rose-500 w-12 h-12" />
      </h1>
      <p class="text-rose-600 font-semibold mt-2 text-lg uppercase tracking-widest flex items-center gap-2">
        Nos critiques étanches & indépendantes <Icon name="lucide:popcorn" />
      </p>
    </div>
    <button 
      @click="$emit('toggle')" 
      class="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-rose-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:shadow-rose-500/30 flex items-center gap-2 self-start md:self-end" 
      :class="{ '!bg-rose-600 !shadow-rose-500/30': showForm }"
    >
      <Icon :name="showForm ? 'lucide:x' : 'lucide:plus'" class="w-5 h-5" />
      <span>{{ showForm ? 'Fermer' : 'Ajouter un film' }}</span>
    </button>
  </header>
</template>

<script setup lang="ts">
defineProps<{ showForm: boolean }>();
defineEmits(['toggle']);
</script>

<style scoped>
/* Bloc de style pour réinitialiser le cache HMR de Vite */
</style>
