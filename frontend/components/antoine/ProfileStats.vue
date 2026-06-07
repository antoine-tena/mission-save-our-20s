<template>
  <aside class="scrapbook-card glass-card stats-card">
    <div class="tape-effect tape-effect--corner"></div>
    <h3>Métriques</h3>
    <div class="stats-list">
      <div class="stat-row">
        <span class="label">Base</span>
        <span class="value">Lyon (69)</span>
      </div>
      <div class="stat-row">
        <span class="label">Formation</span>
        <span class="value">Polytech Data</span>
      </div>
      <div class="stat-row">
        <span class="label">Score Mission</span>
        <span class="value">{{ points }} XP</span>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
defineProps<{
  points: number;
}>();
</script>

<style scoped>
.scrapbook-card {
  padding: 3rem;
  position: relative;
}

.stats-card h3 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #1d4ed8;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px dashed #3b82f644;
}

.stat-row .label { font-size: 0.8rem; text-transform: uppercase; font-weight: 800; color: #999; }
.stat-row .value { font-weight: 700; color: #1d4ed8; }

.tape-effect--corner {
  position: absolute;
  top: -10px;
  left: -20px;
  width: 120px;
  height: 35px;
  background: rgba(59, 130, 246, 0.2);
  clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);
  transform: rotate(-45deg);
}
</style>
