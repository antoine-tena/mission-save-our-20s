<template>
  <div class="history-timeline">
    <h2 class="section-title">Chronologie des Défis</h2>
    <div class="timeline-container">
      <SessionCard
        v-for="session in sessions"
        :key="session.id"
        :session="session"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameSession } from '~/types';

defineProps<{
  sessions: GameSession[];
}>();
</script>

<style scoped>
.section-title {
  font-family: var(--font-display);
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.timeline-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.timeline-container::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #edf2f7;
}

@media (max-width: 768px) {
  .timeline-container::before { left: 10px; }
}
</style>
