<template>
  <section class="md:col-span-5 h-full hidden md:flex flex-col gap-4 items-center justify-center bg-slate-50/40 rounded-3xl border border-slate-200/50 p-6 relative">
    <div class="preview-title-bar-top absolute top-6 left-6 right-6 flex items-center justify-center text-xs text-slate-400 font-extrabold uppercase tracking-widest">
      <span>Aperçu Mobile instantané</span>
    </div>

    <div class="mobile-phone-simulator scale-95 origin-center in-simulator">
      <div class="simulator-screen">
        <!-- Phone Notch / Status Bar -->
        <div class="simulator-status-bar">
          <span class="status-time">09:41</span>
          <div class="status-icons">
            <Icon name="lucide:wifi" class="w-3.5 h-3.5" />
            <Icon name="lucide:signal" class="w-3.5 h-3.5" />
            <Icon name="lucide:battery" class="w-4 h-4" />
          </div>
        </div>

        <!-- App Bar -->
        <div class="simulator-app-header">
          <span class="font-display font-black text-slate-800 tracking-tight text-lg animate-pulse" style="animation-duration: 3s;">MSO20s Journal</span>
          <div class="flex items-center gap-2">
            <Icon name="lucide:search" class="w-4 h-4 text-slate-500" />
            <Icon name="lucide:bell" class="w-4 h-4 text-slate-500" />
          </div>
        </div>

        <!-- Feed Content -->
        <div class="simulator-content-area">
          <JournalPostCard :post="post" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import JournalPostCard from '~/components/journal/JournalPostCard.vue';

defineProps<{
  post: any;
}>();
</script>

<style scoped>
/* Smartphone Simulator */
.mobile-phone-simulator {
  width: 320px !important;
  background: #0f172a !important;
  border: 10px solid #1e293b !important;
  border-radius: 36px !important;
  box-shadow: 
    0 25px 60px -15px rgba(15, 23, 42, 0.25) !important,
    0 0 0 1px rgba(255,255,255,0.03) !important;
  overflow: hidden !important;
  height: 600px !important;
  display: flex !important;
  flex-direction: column !important;
}

.simulator-screen {
  flex: 1 !important;
  background: #f8fafc !important;
  display: flex !important;
  flex-direction: column !important;
  overflow: hidden !important;
}

.simulator-status-bar {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding: 0.4rem 1.25rem 0.2rem !important;
  background: white !important;
  font-size: 0.7rem !important;
  font-weight: 700 !important;
  color: #1e293b !important;
}

.status-icons {
  display: flex !important;
  align-items: center !important;
  gap: 0.25rem !important;
}

.simulator-app-header {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 0.75rem 1.25rem 0.5rem !important;
  background: white !important;
  border-bottom: 1px solid #f1f5f9 !important;
}

.simulator-content-area {
  flex: 1 !important;
  overflow-y: auto !important;
  padding: 0.75rem !important;
}
</style>
