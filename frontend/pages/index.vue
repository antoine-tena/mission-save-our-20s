<template>
  <main class="mso-scrapbook">
    <HomeFloatingStickers />
    <HomeHero>
      <HomeJournalCard />
      <HomeFlashback :memories="memories" />
      
      <div class="mso-quick-links">
        <NuxtLink v-for="link in quickLinks" :key="link.to" :to="link.to" class="quick-link-card glass-card">
          <Icon :name="link.icon" class="icon" />
          <span>{{ link.label }}</span>
        </NuxtLink>
      </div>

      <footer class="mso-footer">
        <p>Archive intime & secrète — MSO20s v4.0</p>
        <div class="mso-footer__names">
          <NuxtLink to="/profile?username=amani" class="name-link">Amani</NuxtLink>
          <span class="amp">&</span>
          <NuxtLink to="/profile?username=antoine" class="name-link">Antoine</NuxtLink>
        </div>
      </footer>
    </HomeHero>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useHome } from '~/composables/useHome';
const { memories, fetchMemories } = useHome();

const quickLinks = [
  { to: '/wishlist', label: 'Wishlist', icon: 'lucide:clipboard-list' },
  { to: '/calendrier', label: 'Agenda', icon: 'lucide:calendar' },
  { to: '/etoiles', label: 'Étoiles', icon: 'lucide:stars' }
];

onMounted(fetchMemories);
useSeoMeta({ title: 'Mission Save Our 20s — Notre Histoire' });
</script>

<style scoped>
.mso-scrapbook {
  min-height: 100vh; background-color: #ffffff;
  background-image: radial-gradient(#ca75d622 1px, transparent 1px),
    linear-gradient(to right, #f9f9f9 1px, transparent 1px),
    linear-gradient(to bottom, #f9f9f9 1px, transparent 1px);
  background-size: 24px 24px, 48px 48px, 48px 48px;
  position: relative; overflow: hidden; display: flex; align-items: center;
  padding-top: calc(var(--header-height) + 4rem); padding-bottom: 6rem;
}
.mso-quick-links {
  display: flex; gap: 1rem; justify-content: center; margin-top: 3rem; flex-wrap: wrap;
}
.quick-link-card {
  display: flex; align-items: center; gap: 10px; padding: 12px 24px;
  text-decoration: none; color: var(--clr-neutral-700); font-weight: 700;
  transition: all 0.3s;
}
.quick-link-card:hover { transform: translateY(-3px); color: var(--clr-primary-500); }
.mso-footer { margin-top: 6rem; text-align: center; color: #bbb; font-size: 0.9rem; }
.mso-footer__names { font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #eee; margin-top: 1rem; letter-spacing: 2px; display: flex; justify-content: center; gap: 1rem; }
.name-link { color: inherit; text-decoration: none; transition: color 0.3s; }
.name-link:hover { color: var(--clr-primary-500); }
.amp { opacity: 0.5; }
</style>
