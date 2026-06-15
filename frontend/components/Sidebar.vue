<template>
  <aside class="group/sidebar w-[72px] hover:w-60 h-screen flex flex-col justify-between items-start border-r border-gray-200 bg-white p-3 hover:p-6 sticky top-0 left-0 z-50 flex-shrink-0 transition-all duration-150 ease-out shadow-sm hover:shadow-xl">
    <!-- 1. TOP LOGO BLOCK -->
    <div class="w-full flex items-center justify-start py-6 xl:py-4 mb-12 pl-1 hover:pl-0 transition-all duration-150">
      <NuxtLink to="/" class="sidebar-logo-link group flex items-center gap-3.5 text-decoration-none" aria-label="Accueil MSO20s">
        <div class="logo-icon-box flex items-center justify-center w-11 h-11 bg-fuchsia-500 text-white rounded-xl shadow-lg shadow-fuchsia-500/30 transition-transform group-hover:rotate-[-5deg] group-hover:scale-110 flex-shrink-0">
          <Icon name="lucide:camera" class="w-5.5 h-5.5" />
        </div>
        <div class="opacity-0 w-0 max-w-0 overflow-hidden group-hover/sidebar:opacity-100 group-hover/sidebar:w-auto group-hover/sidebar:max-w-xs flex flex-col leading-none transition-all duration-150 ease-out">
          <span class="font-display font-black text-xl text-slate-900 tracking-tight leading-none">MSO20s</span>
          <span class="text-[9px] font-extrabold text-fuchsia-500 tracking-wider uppercase mt-1 leading-none whitespace-nowrap">Mission Save Our 20s</span>
        </div>
      </NuxtLink>
    </div>

    <!-- 2. CENTER NAVIGATION BLOCK -->
    <nav class="flex-1 w-full flex flex-col gap-1.5">
      <NuxtLink 
        v-for="item in navItems" 
        :key="item.to" 
        :to="item.to" 
        class="sidebar-nav-item group" 
        active-class="active"
      >
        <div class="nav-item-content w-full">
          <Icon :name="item.icon" class="nav-icon flex-shrink-0" />
          <span class="nav-label">{{ item.label }}</span>
        </div>
        <!-- Subtly highlight the active page -->
        <div class="active-indicator"></div>
      </NuxtLink>
    </nav>

    <!-- 3. BOTTOM USER & SETTINGS BLOCK -->
    <div class="w-full flex flex-col gap-2.5 mt-auto pt-6 border-t border-gray-100/80">
      <!-- Profile Link -->
      <NuxtLink 
        to="/profile" 
        class="sidebar-nav-item group" 
        active-class="active"
      >
        <div class="nav-item-content w-full">
          <div class="avatar-circle flex-shrink-0">
            <span class="avatar-initials">{{ userInitial }}</span>
          </div>
          <span class="nav-label font-bold text-slate-800">{{ username }}</span>
        </div>
      </NuxtLink>

      <!-- Logout Button -->
      <button 
        type="button" 
        @click="handleLogout" 
        class="sidebar-nav-item logout-btn group w-full text-left"
      >
        <div class="nav-item-content w-full">
          <Icon name="lucide:log-out" class="nav-icon text-slate-500 group-hover:text-red-500 flex-shrink-0" />
          <span class="nav-label text-slate-600 group-hover:text-red-500">Déconnexion</span>
        </div>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const { user, logout } = useAuth();

const username = computed(() => user.value?.username || 'antoine');
const userInitial = computed(() => username.value.charAt(0).toUpperCase());

const navItems = [
  { to: '/journal', label: 'Journal', icon: 'lucide:home' },
  { to: '/album', label: 'Album', icon: 'lucide:book-open' },
  { to: '/carte', label: 'Carte', icon: 'lucide:compass' },
  { to: '/cinema', label: 'Cinéma', icon: 'lucide:film' },
  { to: '/jeux', label: 'Jeux', icon: 'lucide:gamepad-2' },
  { to: '/etoiles', label: 'Étoiles', icon: 'lucide:star' },
  { to: '/wishlist', label: 'Wishlist', icon: 'lucide:heart' },
  { to: '/calendrier', label: 'Agenda', icon: 'lucide:calendar' }
];

const handleLogout = async () => {
  if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
    await logout();
    navigateTo('/login');
  }
};
</script>

<style scoped>
.sidebar-nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0.85rem;
  border-radius: 14px;
  color: #475569;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.15s ease-out;
  position: relative;
  cursor: pointer;
  border: none;
  background: transparent;
}

.sidebar-nav-item:hover {
  color: #0f172a;
  background: #f1f5f9;
}

.nav-item-content {
  display: flex;
  align-items: center;
  gap: 1.15rem;
}

.nav-icon {
  width: 1.4rem;
  height: 1.4rem;
  color: #64748b;
  transition: transform 0.15s, color 0.15s;
}

.sidebar-nav-item:hover .nav-icon {
  transform: scale(1.05);
  color: #0f172a;
}

.sidebar-nav-item.active {
  color: #ca75d6;
  background: rgba(202, 117, 214, 0.05);
}

.sidebar-nav-item.active .nav-icon {
  color: #ca75d6;
  stroke-width: 2.5px;
}

/* Elegant text labels sliding fade-in */
.nav-label {
  opacity: 0;
  max-width: 0;
  width: 0;
  overflow: hidden;
  white-space: nowrap;
  transition: all 0.15s ease-out;
}

.group\/sidebar:hover .nav-label {
  opacity: 1;
  max-width: 150px;
  width: auto;
  margin-left: 0.25rem;
}

.avatar-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
  border: 1.5px solid #ca75d6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-initials {
  font-size: 0.7rem;
  font-weight: 800;
  color: #ca75d6;
}

.active-indicator {
  position: absolute;
  right: 0px;
  top: 15%;
  bottom: 15%;
  width: 3px;
  background: #ca75d6;
  border-radius: 4px 0 0 4px;
  opacity: 0;
  transition: opacity 0.15s;
}

.sidebar-nav-item.active .active-indicator {
  opacity: 1;
}

.logout-btn:hover {
  background: #fef2f2;
}
</style>
