<template>
  <header class="zen-header relative z-20 py-4 border-b border-slate-200/50 bg-white/60 backdrop-blur-lg">
    <div class="container mx-auto px-6 flex items-center justify-between">
      <NuxtLink to="/journal" class="zen-back-btn group">
        <Icon name="lucide:arrow-left" class="w-5 h-5 group-hover:-translate-x-1 transition-transform text-slate-500 group-hover:text-indigo-600" />
        <span class="text-slate-600 group-hover:text-indigo-600 font-bold transition-colors">Quitter l'éditeur</span>
      </NuxtLink>
      
      <div class="zen-brand">
        <div class="zen-pulse-dot"/>
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
          class="publish-top-btn" 
          :disabled="publishDisabled || isSubmitting" 
          @click="$emit('submit')"
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
  isSavingDraft: boolean;
  draftStatusText: string;
  isSubmitting: boolean;
  publishDisabled: boolean;
}>();

defineEmits<{
  (e: 'submit'): void;
}>();
</script>

<style scoped>
.zen-header {
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.01);
}

.zen-back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  cursor: pointer;
  background: none;
  border: none;
}

.zen-brand {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.zen-pulse-dot {
  width: 6px;
  height: 6px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  animation: pulse-green 2s infinite;
}

@keyframes pulse-green {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

.draft-autosave-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  background: #f1f5f9;
  padding: 0.35rem 0.75rem;
  border-radius: 99px;
  transition: all 0.3s ease;
}

.draft-autosave-indicator.saving {
  color: #4f46e5;
  background: #eeebff;
}

.publish-top-btn {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%) !important;
  color: white !important;
  font-weight: 700 !important;
  font-size: 0.85rem !important;
  padding: 0.55rem 1.25rem !important;
  border-radius: 12px !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  border: none !important;
  cursor: pointer !important;
  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.25) !important;
  transition: all 0.2s ease !important;
}

.publish-top-btn:hover:not(:disabled) {
  transform: translateY(-1px) !important;
  box-shadow: 0 6px 20px rgba(79, 70, 229, 0.35) !important;
}

.publish-top-btn:disabled {
  background: #cbd5e1 !important;
  color: #94a3b8 !important;
  box-shadow: none !important;
  cursor: not-allowed !important;
}
</style>
