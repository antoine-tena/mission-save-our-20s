<template>
  <div class="mso-scrapbook mso-scrapbook--antoine">
    <div class="mso-scrapbook-bg"></div>
    
    <div class="mso-stickers" aria-hidden="true">
      <Icon v-for="i in 5" :key="i" name="lucide:shield" class="mso-sticker" :style="getStickerStyle(i)" />
    </div>

    <div class="container scrapbook-container">
      <header class="scrapbook-header">
        <div class="mso-mission-badge">
          <span class="mso-mission-badge__pulse"></span>
          Zone de Données : Antoine
        </div>
        <h1 class="scrapbook-title">L'Avant-poste Lyonnais <Icon name="lucide:mountain" /></h1>
      </header>

      <div class="scrapbook-grid">
        <AntoineProfileStats :points="profile?.points || 0" />
        <AntoineProfileMain />
      </div>

      <footer class="scrapbook-footer">
        <NuxtLink to="/profile" class="btn-text">Accéder aux paramètres système →</NuxtLink>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSocial } from '~/composables/useSocial';

const { profile, fetchProfile } = useSocial();

const getStickerStyle = (index: number) => ({
  top: `${15 + index * 18}%`,
  left: `${5 + (index % 2) * 80}%`,
  transform: `rotate(${(index * 30) % 360}deg)`,
  fontSize: '2.5rem',
  opacity: 0.4
});

onMounted(fetchProfile);

useSeoMeta({
  title: 'Espace Antoine — MSO20s',
  description: 'Le centre de contrôle d\'Antoine.'
});
</script>

<style scoped>
.mso-scrapbook--antoine { background-color: #f4fafe; min-height: 100vh; padding-top: calc(var(--header-height) + 4rem); }
.scrapbook-container { max-width: 900px; position: relative; z-index: 10; }
.scrapbook-header { text-align: center; margin-bottom: 4rem; }
.scrapbook-title { font-family: var(--font-display); font-size: 4rem; color: #1d4ed8; margin-top: 1.5rem; }
.scrapbook-grid { display: grid; grid-template-columns: 300px 1fr; gap: 3rem; }
.scrapbook-footer { margin-top: 5rem; text-align: center; }
.mso-mission-badge { background: #3b82f6; color: white; padding: 8px 20px; border-radius: 50px; font-size: 0.75rem; font-weight: 900; display: inline-flex; align-items: center; gap: 10px; }
.mso-mission-badge__pulse { width: 8px; height: 8px; background: white; border-radius: 50%; animation: pulse 2s infinite; }
@keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.6); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
@media (max-width: 800px) { .scrapbook-grid { grid-template-columns: 1fr; } .scrapbook-grid aside { order: 2; } .scrapbook-title { font-size: 2.5rem; } }
</style>
