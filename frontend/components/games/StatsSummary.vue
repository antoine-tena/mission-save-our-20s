<template>
  <section class="stats-overview grid-3">
    <div class="stat-card glass-card amani-stat">
      <span class="stat-label">Amani</span>
      <span class="stat-value">{{ stats?.overall.amani_wins || 0 }}</span>
      <span class="stat-desc">Victoires Totales</span>
    </div>
    <div class="stat-card glass-card draw-stat">
      <span class="stat-label">Égalités</span>
      <span class="stat-value">{{ stats?.overall.draws || 0 }}</span>
      <span class="stat-desc">Parties Serrées</span>
    </div>
    <div class="stat-card glass-card antoine-stat">
      <span class="stat-label">Antoine</span>
      <span class="stat-value">{{ stats?.overall.antoine_wins || 0 }}</span>
      <span class="stat-desc">Victoires Totales</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ScoreboardStats } from '~/types';

defineProps<{
  stats: ScoreboardStats | null;
}>();
</script>

<style scoped>
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.stat-card {
  text-align: center;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 20px;
}

.stat-label { font-weight: 800; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px; }
.stat-value { font-size: 3rem; font-weight: 900; line-height: 1; }
.stat-desc { font-size: 0.85rem; color: #94a3b8; }

.amani-stat { background: #fff0f9; color: #c40e75ff; border: 1px solid #c40e7522; }
.antoine-stat { background: #f4fafe; color: #1d4ed8; border: 1px solid #3b82f622; }
.draw-stat { background: #f8fafc; color: #64748b; }

@media (max-width: 768px) {
  .grid-3 { grid-template-columns: 1fr; }
}
</style>
