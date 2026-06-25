<template>
  <main class="relative min-h-screen flex flex-col items-center pb-24 overflow-hidden bg-slate-50 selection:bg-fuchsia-200" style="padding-top: calc(var(--header-height) + 4rem)">
    <!-- Modern Background Blobs -->
    <div class="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
      <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-fuchsia-300/30 blur-[100px] animate-pulse" style="animation-duration: 8s;"/>
      <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-300/20 blur-[120px] animate-pulse" style="animation-duration: 10s;"/>
    </div>

    <HomeFloatingStickers />
    
    <div class="w-full max-w-4xl px-4 relative z-10 flex flex-col items-center">
      <HomeHero>
        <HomeJournalCard class="backdrop-blur-xl bg-white/60 border border-white/50 shadow-xl rounded-2xl transition-all duration-300 hover:shadow-fuchsia-500/10" />
        <HomeFlashback :memories="memories" class="mt-8 backdrop-blur-xl bg-white/60 border border-white/50 shadow-xl rounded-2xl transition-all duration-300 hover:shadow-indigo-500/10" />
        
        <div class="flex gap-4 justify-center mt-12 flex-wrap">
          <NuxtLink 
            v-for="link in quickLinks" 
            :key="link.to" 
            :to="link.to" 
            class="flex items-center gap-3 px-6 py-4 rounded-xl backdrop-blur-md bg-white/70 border border-white/40 shadow-lg text-slate-700 font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-white/90 hover:text-fuchsia-600 group"
          >
            <Icon :name="link.icon" class="w-5 h-5 text-fuchsia-500 group-hover:scale-110 transition-transform duration-300" />
            <span>{{ link.label }}</span>
          </NuxtLink>
        </div>

        <footer class="mt-24 text-center">
          <p class="text-slate-400 text-sm font-medium tracking-wider uppercase">Archive intime & secrète — MSO20s v4.0</p>
          <div class="flex justify-center items-center gap-4 mt-4 font-display text-2xl tracking-widest text-slate-800">
            <NuxtLink to="/profile?username=amani" class="hover:text-fuchsia-500 transition-colors duration-300">Amani</NuxtLink>
            <span class="text-fuchsia-300/50 font-light">&</span>
            <NuxtLink to="/profile?username=antoine" class="hover:text-fuchsia-500 transition-colors duration-300">Antoine</NuxtLink>
          </div>
        </footer>
      </HomeHero>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useHome } from '~/composables/useHome';
const { memories, fetchMemories } = useHome();

const quickLinks = [
  { to: '/wishlist', label: 'Wishlist', icon: 'lucide:clipboard-list' },
  { to: '/calendrier', label: 'Agenda', icon: 'lucide:calendar' },
  { to: '/jeux', label: 'Jeux', icon: 'lucide:gamepad-2' }
];

onMounted(fetchMemories);
useSeoMeta({ 
  title: 'Mission Save Our 20s — Notre Histoire',
  description: 'Archive intime et secrète'
});
</script>
