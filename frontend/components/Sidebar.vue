<template>
  <aside class="w-[76px] h-screen flex flex-col justify-between items-center border-r border-gray-200 bg-white py-6 px-3 sticky top-0 left-0 z-50 flex-shrink-0 shadow-sm">
    <!-- 1. TOP LOGO BLOCK -->
    <div class="w-full flex items-center justify-center mt-6 mb-10 flex-shrink-0">
      <NuxtLink to="/" class="group flex items-center justify-center" aria-label="Accueil MSO20s">
        <div class="logo-icon-box flex items-center justify-center w-12 h-12 bg-fuchsia-500 text-white rounded-2xl shadow-lg shadow-fuchsia-500/25 transition-all duration-300 group-hover:rotate-[-6deg] group-hover:scale-110">
          <Icon name="lucide:camera" class="w-6 h-6" />
        </div>
      </NuxtLink>
    </div>

    <!-- 2. CENTER NAVIGATION ICONS -->
    <nav class="flex-1 w-full flex flex-col items-center justify-center gap-1">
      <NuxtLink 
        v-for="item in navItems" 
        :key="item.to" 
        :to="item.to" 
        class="sidebar-icon-item group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200" 
        active-class="active"
        :title="item.label"
      >
        <Icon :name="item.icon" class="nav-icon" />
        
        <!-- Premium Tooltip on hover (appears on the right) -->
        <span class="tooltip-bubble">{{ item.label }}</span>
      </NuxtLink>
    </nav>

    <!-- 3. BOTTOM USER & LOGOUT ICONS -->
    <div class="w-full flex flex-col items-center gap-1 mt-auto pt-4 mb-6 border-t border-gray-100 flex-shrink-0">
      <!-- Profile Link -->
      <NuxtLink 
        to="/profile" 
        class="sidebar-icon-item group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200" 
        active-class="active"
        title="Profil"
      >
        <div class="avatar-circle">
          <span class="avatar-initials">{{ userInitial }}</span>
        </div>
        <span class="tooltip-bubble">Profil</span>
      </NuxtLink>

      <!-- Logout Button -->
      <button 
        type="button" 
        @click="handleLogout" 
        class="sidebar-icon-item logout-btn group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200"
        title="Déconnexion"
      >
        <Icon name="lucide:log-out" class="nav-icon text-slate-400 group-hover:text-red-500" />
        <span class="tooltip-bubble">Déconnexion</span>
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
.sidebar-icon-item {
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
}

.nav-icon {
  width: 1.45rem;
  height: 1.45rem;
  color: #64748b;
  transition: transform 0.2s, color 0.2s;
}

/* Hover effect: soft grey background pill */
.sidebar-icon-item:hover {
  color: #0f172a;
  background: #f1f5f9;
}

.sidebar-icon-item:hover .nav-icon {
  transform: scale(1.1);
  color: #0f172a;
}

/* Active state: fuchsia colored pill with glowing background */
.sidebar-icon-item.active {
  color: #ca75d6;
  background: rgba(202, 117, 214, 0.08);
}

.sidebar-icon-item.active .nav-icon {
  color: #ca75d6;
  stroke-width: 2.5px;
}

/* Avatar styling */
.avatar-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
  border: 1.5px solid #ca75d6;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.sidebar-icon-item:hover .avatar-circle {
  transform: scale(1.08);
}

.avatar-initials {
  font-size: 0.75rem;
  font-weight: 800;
  color: #ca75d6;
}

/* High-end hovering Tooltip Bubble appearing on the right */
.tooltip-bubble {
  position: absolute;
  left: 64px;
  top: 50%;
  transform: translateY(-50%) translateX(-8px);
  background: #0f172a;
  color: white;
  padding: 0.4rem 0.85rem;
  border-radius: 8px;
  font-size: 0.775rem;
  font-weight: 700;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
  transition: opacity 0.15s, transform 0.15s;
  z-index: 100;
}

/* Tiny triangle arrow on left of tooltip */
.tooltip-bubble::before {
  content: '';
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-width: 5px;
  border-style: solid;
  border-color: transparent #0f172a transparent transparent;
}

.sidebar-icon-item:hover .tooltip-bubble {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

.logout-btn:hover {
  background: #fef2f2;
}
</style>
