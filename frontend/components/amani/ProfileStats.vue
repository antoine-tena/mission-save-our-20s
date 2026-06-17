<template>
  <ScrapbookCard tape="corner" class="stats-card">
    <h3>Registres</h3>
    <div class="stats-list">
      <div class="stat-row">
        <span class="label">Origine</span>
        <span class="value">Paris 75011</span>
      </div>
      <div class="stat-row">
        <span class="label">Parcours</span>
        <span class="value">CPGE Voltaire</span>
      </div>
      <div class="stat-row">
        <span class="label">Points Mission</span>
        <span class="value">{{ points }} XP</span>
      </div>
    </div>
  </ScrapbookCard>
</template>

<script setup lang="ts">
defineProps<{
  points: number;
}>();
</script>

<style scoped>
.stats-card h3 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #c40e75;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px dashed #ca75d644;
}

.stat-row .label { font-size: 0.8rem; text-transform: uppercase; font-weight: 800; color: #999; }
.stat-row .value { font-weight: 700; color: #c40e75; }
</style>
