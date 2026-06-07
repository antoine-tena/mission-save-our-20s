<template>
  <div class="map-overlay-legend glass-card">
    <div class="legend-item"><span class="dot dot--photo"></span><span>Souvenir Photo</span></div>
    <div class="legend-item"><span class="dot dot--manual"></span><span>Lieu Mémorable</span></div>
  </div>
</template>

<style scoped>
.map-overlay-legend { position: absolute; top: 2rem; right: 2rem; padding: 1rem 1.5rem; z-index: 1000; display: flex; flex-direction: column; gap: 0.8rem; }
.legend-item { display: flex; align-items: center; gap: 10px; font-size: 0.8rem; font-weight: 800; color: #444; }
.dot { width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.dot--photo { background: #3b82f6; }
.dot--manual { background: #ca75d6; }
</style>
