<template>
  <div class="stars-page">
    <div class="mso-scrapbook-bg"></div>

    <header class="page-header container">
      <div class="header-text">
        <h1 class="page-title">Voûte Céleste <Icon name="lucide:stars" /></h1>
        <p class="page-subtitle">Nos nuits étoilées, du bivouac à la fenêtre.</p>
      </div>
    </header>

    <div class="container main-content grid-layout">
      <div class="map-section">
        <StarsSkyMap :stars="skyStars" @select="selectedBody = $event" />
        <div class="map-actions">
          <button @click="generateNewSky" class="btn-refresh"><Icon name="lucide:refresh-cw" /> Rafraîchir le ciel</button>
        </div>
      </div>

      <aside class="info-section">
        <StarsCelestialInfo v-if="selectedBody" :body="selectedBody" />
        <div v-else class="info-placeholder glass-card">
          <p>Cliquez sur une étoile pour découvrir ses secrets...</p>
        </div>

        <div class="location-card glass-card">
          <h3>Localisation</h3>
          <p><Icon name="lucide:map-pin" /> Annecy, France</p>
          <p><Icon name="lucide:calendar" /> {{ new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) }}</p>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { CelestialBody } from '~/types';

const selectedBody = ref<CelestialBody | null>(null);
const skyStars = ref<any[]>([]);

const generateNewSky = () => {
  const stars = [
    { name: 'Sirius', x: 100, y: 150, r: 4, type: 'Étoile', magnitude: -1.46, distance: '8.6 ly', constellation: 'Canis Major' },
    { name: 'Vega', x: 350, y: 100, r: 3.5, type: 'Étoile', magnitude: 0.03, distance: '25 ly', constellation: 'Lyra' },
    { name: 'Betelgeuse', x: 120, y: 380, r: 3.8, type: 'Supergéante Rouge', magnitude: 0.42, distance: '640 ly', constellation: 'Orion' },
    { name: 'Altair', x: 400, y: 250, r: 3, type: 'Étoile', magnitude: 0.77, distance: '16.7 ly', constellation: 'Aquila' },
    { name: 'Deneb', x: 280, y: 80, r: 3.2, type: 'Étoile', magnitude: 1.25, distance: '2600 ly', constellation: 'Cygnus' },
  ];

  // Add random background stars
  for (let i = 0; i < 150; i++) {
    const x = Math.random() * 400 + 50;
    const y = Math.random() * 400 + 50;
    const dist = Math.sqrt((x - 250) ** 2 + (y - 250) ** 2);
    if (dist < 235) {
      stars.push({
        name: `Astre ${Math.floor(Math.random() * 9000)}`,
        x, y, r: Math.random() * 1.5 + 0.5,
        type: 'Étoile lointaine',
        magnitude: Math.random() * 5 + 2,
        distance: `${Math.floor(Math.random() * 5000)} ly`
      });
    }
  }
  skyStars.value = stars;
};

onMounted(generateNewSky);

useSeoMeta({ title: 'Ciel Étoilé — MSO20s' });
</script>

<style scoped>
.stars-page { min-height: 100vh; padding-top: calc(var(--header-height) + 3rem); padding-bottom: 6rem; background: #050814; color: white; }
.mso-scrapbook-bg { position: fixed; inset: 0; background: #050814; background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 50px 50px; z-index: -1; }
.page-header { margin-bottom: 4rem; text-align: center; }
.page-title { font-family: var(--font-display); font-size: 3.5rem; color: white; }
.page-subtitle { color: #ca75d6; font-weight: 700; }
.grid-layout { display: grid; grid-template-columns: 1fr 350px; gap: 4rem; align-items: start; }
.map-actions { margin-top: 2rem; text-align: center; }
.btn-refresh { background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2); padding: 8px 20px; border-radius: 50px; cursor: pointer; font-size: 0.8rem; font-weight: 700; transition: all 0.3s; }
.btn-refresh:hover { background: rgba(255,255,255,0.2); }
.info-section { display: flex; flex-direction: column; gap: 2rem; }
.info-placeholder { padding: 2rem; text-align: center; color: #a0aec0; font-style: italic; }
.location-card { padding: 1.5rem; }
.location-card h3 { font-size: 0.8rem; text-transform: uppercase; color: #ca75d6; margin-bottom: 10px; }
@media (max-width: 900px) { .grid-layout { grid-template-columns: 1fr; } }
</style>
