<template>
  <div class="stars-page">
    <div class="mso-scrapbook-bg"/>

    <div class="full-map-container">
      <StarsStarMap />
      
      <div class="map-overlay-info">
        <h1 class="map-title">Voûte Céleste <Icon name="lucide:stars" /></h1>
        <p class="map-subtitle">Annecy, France — {{ new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// D3-Celestial integration
useSeoMeta({ title: 'Ciel Étoilé — MSO20s' });
</script>

<style scoped>
.stars-page { 
  height: calc(100vh - var(--header-height)); 
  margin-top: var(--header-height);
  background: #050814; 
  overflow: hidden;
}

.full-map-container {
  width: 100%;
  height: 100%;
  position: relative;
  background: #050814;
}

.map-overlay-info {
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 10;
  pointer-events: none;
}

.map-title {
  font-family: var(--font-display);
  font-size: 2.5rem;
  color: white;
  margin: 0;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
}

.map-subtitle {
  color: #ca75d6;
  font-weight: 700;
  margin-top: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.8rem;
}

.mso-scrapbook-bg { 
  position: fixed; 
  inset: 0; 
  background: #050814; 
  z-index: -1; 
}
</style>
