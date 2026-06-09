<template>
  <header class="mso-header" :class="{ 'mso-header--scrolled': isScrolled }">
    <div class="header-blur-bg"></div>
    <div class="container mso-header__inner">
      <HeaderLogo />
      
      <div class="header-nav-wrapper">
        <HeaderNav />
      </div>

      <div class="header-right-group">
        <HeaderActions 
          :is-authenticated="isAuthenticated" 
          :username="user?.username" 
          @logout="logout" 
        />
        
        <button class="mobile-menu-toggle" @click="isMobileMenuOpen = !isMobileMenuOpen" aria-label="Menu">
          <Icon :name="isMobileMenuOpen ? 'lucide:x' : 'lucide:menu'" />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <Transition name="slide-down">
      <div v-if="isMobileMenuOpen" class="mobile-drawer" @click="isMobileMenuOpen = false">
        <HeaderNav is-mobile />
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

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

// Close mobile menu on navigate
const route = useRoute();
watch(() => route.fullPath, () => {
  isMobileMenuOpen.value = false;
});
</script>

<style scoped>
.mso-header {
  height: var(--header-height);
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.header-blur-bg {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  z-index: -1;
  transition: all 0.3s ease;
}

.mso-header--scrolled {
  height: calc(var(--header-height) - 10px);
}

.mso-header--scrolled .header-blur-bg {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
}

.mso-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.header-nav-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
}

.header-right-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--clr-neutral-700);
  cursor: pointer;
  padding: 5px;
  border-radius: 8px;
}

.mobile-menu-toggle:hover {
  background: rgba(0, 0, 0, 0.05);
}

/* Mobile Drawer */
.mobile-drawer {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #f1f5f9;
}

/* Transitions */
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.3s ease; }
.slide-down-enter-from, .slide-down-leave-to { transform: translateY(-10px); opacity: 0; }

@media (max-width: 1024px) {
  .header-nav-wrapper { display: none; }
  .mobile-menu-toggle { display: flex; }
}
</style>
