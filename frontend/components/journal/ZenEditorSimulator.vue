<template>
  <section class="lg:col-span-5 h-full hidden lg:flex flex-col gap-4 items-center justify-center bg-slate-50/40 rounded-3xl border border-slate-200/50 p-6 relative">
    <div class="preview-title-bar-top absolute top-6 left-6 right-6 flex items-center justify-between text-xs text-slate-400 font-extrabold uppercase tracking-widest">
      <span class="w-full text-center">Aperçu Mobile instantané</span>
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
          <JournalPostCard :post="mockPost" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import JournalPostCard from '~/components/journal/JournalPostCard.vue';
defineProps<{ mockPost: any }>();
</script>
