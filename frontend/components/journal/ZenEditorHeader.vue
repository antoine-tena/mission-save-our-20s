<template>
  <header class="zen-header relative z-20 py-4 border-b border-slate-200/50 bg-white/60 backdrop-blur-lg">
    <div class="container mx-auto px-6 flex items-center justify-between">
      <NuxtLink to="/journal" class="zen-back-btn group">
        <Icon name="lucide:arrow-left" class="w-5 h-5 group-hover:-translate-x-1 transition-transform text-slate-500 group-hover:text-indigo-600" />
        <span class="text-slate-600 group-hover:text-indigo-600 font-bold transition-colors">Quitter l'éditeur</span>
      </NuxtLink>
      
      <div class="zen-brand">
        <div class="zen-pulse-dot"></div>
        <Icon name="lucide:feather" class="w-5 h-5 text-indigo-500 animate-bounce" />
        <span class="font-display font-extrabold text-slate-800 tracking-tight">MSO20s Creative Studio</span>
      </div>

      <div class="flex items-center gap-4">
        <span class="draft-autosave-indicator" :class="{ 'saving': isSavingDraft }">
          <Icon :name="isSavingDraft ? 'lucide:loader-2' : 'lucide:cloud-check'" :class="{ 'spin': isSavingDraft }" class="w-4 h-4" />
          <span>{{ draftStatusText }}</span>
        </span>
        
        <button 
          type="button"
          @click="$emit('publish')" 
          class="publish-top-btn" 
          :disabled="isDisabled"
        >
          <Icon :name="isSubmitting ? 'lucide:loader-2' : 'lucide:send-horizontal'" :class="{ 'spin': isSubmitting }" class="w-4 h-4" />
          <span>{{ isSubmitting ? 'Publication...' : 'Publier' }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  draftStatusText: string
  isSavingDraft: boolean
  isSubmitting: boolean
  isDisabled: boolean
}>();
defineEmits(['publish']);
</script>
