<template>
  <header class="mso-header" :class="{ 'mso-header--scrolled': isScrolled }">
    <div class="container mso-header__inner">
      <HeaderLogo />
      <HeaderNav @antoine-click="handleAntoineClick" />
      <HeaderActions 
        :is-authenticated="isAuthenticated" 
        :username="user?.username" 
        @logout="logout" 
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const { isAuthenticated, user, logout } = useAuth();
const isScrolled = ref(false);

const handleScroll = () => { 
  isScrolled.value = window.scrollY > 50; 
};

function handleAntoineClick() {
  alert("ALERTE : Attention à Bascop, Mazingue et Yvenat ! L'accès à cet espace est hautement sécurisé par la brigade lyonnaise.");
  navigateTo('/antoine');
}

onMounted(() => { window.addEventListener('scroll', handleScroll); });
onUnmounted(() => { window.removeEventListener('scroll', handleScroll); });
</script>

<style scoped>
.mso-header {
  height: var(--header-height);
  background: #ca75d6ff;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
.mso-header--scrolled {
  height: calc(var(--header-height) - 15px);
  background: rgba(202, 117, 214, 0.95);
  backdrop-filter: blur(10px);
}
.mso-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
