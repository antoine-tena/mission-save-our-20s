<template>
  <header :class="['fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out', isScrolled ? 'h-[calc(var(--header-height)-10px)]' : 'h-[var(--header-height)]']">
    <div :class="['absolute inset-0 transition-all duration-300 ease-in-out backdrop-blur-xl -z-10', isScrolled ? 'bg-white/90 shadow-[0_4px_30px_rgba(0,0,0,0.03)]' : 'bg-white/70 border-b border-black/5']"></div>
    <div class="container mx-auto px-4 h-full flex items-center justify-between">
      <HeaderLogo />
      
      <div class="hidden lg:flex flex-1 justify-center">
        <HeaderNav />
      </div>

      <div class="flex items-center gap-4">
        <HeaderActions 
          :is-authenticated="isAuthenticated" 
          :username="user?.username" 
          @logout="logout" 
        />
        
        <button class="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-black/5 transition-colors" @click="isMobileMenuOpen = !isMobileMenuOpen" aria-label="Menu">
          <Icon :name="isMobileMenuOpen ? 'lucide:x' : 'lucide:menu'" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <Transition name="slide-down">
      <div v-if="isMobileMenuOpen" class="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.1)] border-b border-slate-100" @click="isMobileMenuOpen = false">
        <HeaderNav is-mobile />
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';

// On simule useAuth ici puisque c'était dans le code original, en admettant que le composable soit global
const { isAuthenticated, user, logout } = useAuth();

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const handleScroll = () => { 
  isScrolled.value = window.scrollY > 20; 
};

onMounted(() => { 
  window.addEventListener('scroll', handleScroll);
  handleScroll(); 
});
onUnmounted(() => { window.removeEventListener('scroll', handleScroll); });

const route = useRoute();
watch(() => route.fullPath, () => {
  isMobileMenuOpen.value = false;
});
</script>

<style scoped>
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.3s ease; }
.slide-down-enter-from, .slide-down-leave-to { transform: translateY(-10px); opacity: 0; }
</style>
