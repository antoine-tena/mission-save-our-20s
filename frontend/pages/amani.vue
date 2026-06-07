<template>
  <div class="mso-scrapbook mso-scrapbook--amani">
    <div class="mso-scrapbook-bg"></div>
    
    <div class="mso-stickers" aria-hidden="true">
      <Icon v-for="i in 5" :key="i" name="lucide:flower-2" class="mso-sticker" :style="getStickerStyle(i)" />
    </div>

    <div class="container scrapbook-container">
      <header class="scrapbook-header">
        <div class="mso-mission-badge">
          <span class="mso-mission-badge__pulse"></span>
          Espace Réservé : Amani
        </div>
        <h1 class="scrapbook-title">Le Jardin d'Amani <Icon name="lucide:flower" /></h1>
      </header>

      <div class="scrapbook-grid">
        <AmaniProfileMain />
        <AmaniProfileStats :points="profile?.points || 0" />
      </div>

      <footer class="scrapbook-footer">
        <NuxtLink to="/profile" class="btn-text">Modifier mon profil →</NuxtLink>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSocial } from '~/composables/useSocial';

const { profile, fetchProfile } = useSocial();

const getStickerStyle = (index: number) => ({
  top: `${20 + index * 15}%`,
  left: `${10 + (index % 2) * 70}%`,
  transform: `rotate(${(index * 45) % 360}deg)`,
  fontSize: '2.5rem',
  opacity: 0.4
});

onMounted(fetchProfile);

useSeoMeta({
  title: 'Espace Amani — MSO20s',
  description: 'Le carnet de bord personnel d\'Amani.'
});
</script>

<style scoped>
.mso-scrapbook--amani { background-color: #fff0f9; min-height: 100vh; padding-top: calc(var(--header-height) + 4rem); }
.scrapbook-container { max-width: 900px; position: relative; z-index: 10; }
.scrapbook-header { text-align: center; margin-bottom: 4rem; }
.scrapbook-title { font-family: var(--font-display); font-size: 4rem; color: #c40e75; margin-top: 1.5rem; }
.scrapbook-grid { display: grid; grid-template-columns: 1fr 300px; gap: 3rem; }
.scrapbook-footer { margin-top: 5rem; text-align: center; }
.mso-mission-badge { background: #ca75d6; color: white; padding: 8px 20px; border-radius: 50px; font-size: 0.75rem; font-weight: 900; display: inline-flex; align-items: center; gap: 10px; }
.mso-mission-badge__pulse { width: 8px; height: 8px; background: white; border-radius: 50%; animation: pulse 2s infinite; }
@keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.6); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
@media (max-width: 800px) { .scrapbook-grid { grid-template-columns: 1fr; } .scrapbook-title { font-size: 2.5rem; } }
</style>
