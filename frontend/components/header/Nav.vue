<template>
  <nav class="mso-nav" :class="{ 'mso-nav--mobile': isMobile }">
    <ul class="mso-nav__list">
      <li v-for="link in navigationLinks" :key="link.to">
        <NuxtLink 
          :to="link.to" 
          class="mso-nav__link" 
        >
          <Icon v-if="isMobile" :name="link.icon" class="nav-icon" />
          <span>{{ link.label }}</span>
          <div class="active-indicator"></div>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
defineProps<{ isMobile?: boolean }>();

const navigationLinks = [
  { id: 'album', to: '/album', label: 'Album', icon: 'lucide:camera' },
  { id: 'carte', to: '/carte', label: 'Carte', icon: 'lucide:map' },
  { id: 'cinema', to: '/cinema', label: 'Cinéma', icon: 'lucide:clapperboard' },
  { id: 'jeux', to: '/jeux', label: 'Jeux', icon: 'lucide:gamepad-2' },
  { id: 'wishlist', to: '/wishlist', label: 'Wishlist', icon: 'lucide:clipboard-list' },
  { id: 'agenda', to: '/calendrier', label: 'Agenda', icon: 'lucide:calendar' },
  { id: 'stars', to: '/etoiles', label: 'Étoiles', icon: 'lucide:stars' },
];
</script>

<style scoped>
.mso-nav__list {
  display: flex;
  list-style: none;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  align-items: center;
}

.mso-nav__link {
  color: var(--clr-neutral-600);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.85rem;
  padding: 10px 14px;
  border-radius: 12px;
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
}

.mso-nav__link:hover {
  color: var(--clr-primary-500);
  background: rgba(202, 117, 214, 0.05);
}

.mso-nav__link.router-link-active {
  color: var(--clr-primary-500);
}

.mso-nav__link.router-link-active .active-indicator {
  position: absolute;
  bottom: 0;
  left: 14px;
  right: 14px;
  height: 2px;
  background: var(--clr-primary-500);
  border-radius: 2px;
}

.mso-nav--mobile .mso-nav__link.router-link-active .active-indicator {
  left: 0;
  right: auto;
  width: 4px;
  height: 20px;
  top: 50%;
  bottom: auto;
  transform: translateY(-50%);
}

/* Mobile Layout */
.mso-nav--mobile .mso-nav__list {
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;
}

.mso-nav--mobile .mso-nav__link {
  font-size: 1rem;
  padding: 12px 16px;
}

.nav-icon {
  font-size: 1.2rem;
  opacity: 0.7;
}

@media (max-width: 1024px) {
  .mso-nav:not(.mso-nav--mobile) { display: none; }
}
</style>
