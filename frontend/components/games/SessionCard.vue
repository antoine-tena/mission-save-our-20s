<template>
  <article class="timeline-item">
    <div class="timeline-dot" :class="getWinnerClass(session.winner)"></div>
    <div class="timeline-date">{{ formatDateShort(session.date) }}</div>
    <div class="timeline-content glass-card">
      <div class="session-header">
        <span class="session-type">
          <Icon :name="session.game_type_icon || 'lucide:gamepad-2'" /> {{ session.game_type_name }}
        </span>
        <span class="session-location" v-if="session.location">
          <Icon name="lucide:map-pin" /> {{ session.location }}
        </span>
      </div>
      <GamesSessionCardScores :winner="session.winner" :amani-score="session.amani_score" :antoine-score="session.antoine_score" />
      <p class="session-notes" v-if="session.notes">"{{ session.notes }}"</p>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { GameSession } from '~/types';
defineProps<{ session: GameSession; }>();
const formatDateShort = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
const getWinnerClass = (w: string) => ({ 'Amani': 'winner-amani', 'Antoine': 'winner-antoine' }[w] || 'winner-draw');
</script>

<style scoped>
.timeline-item { display: flex; gap: 2rem; padding-left: 10px; }
.timeline-dot { width: 20px; height: 20px; border-radius: 50%; background: white; border: 4px solid #edf2f7; flex-shrink: 0; z-index: 1; }
.winner-amani { border-color: #c40e75ff; }
.winner-antoine { border-color: #1d4ed8; }
.winner-draw { border-color: #94a3b8; }
.timeline-date { width: 100px; font-size: 0.8rem; font-weight: 700; color: #94a3b8; padding-top: 2px; }
.timeline-content { flex-grow: 1; padding: 1.5rem; border-radius: 16px; }
.session-header { display: flex; justify-content: space-between; margin-bottom: 1rem; }
.session-type { font-weight: 800; color: var(--clr-neutral-900); }
.session-location { font-size: 0.8rem; color: #94a3b8; }
.session-notes { font-style: italic; font-size: 0.9rem; color: #64748b; text-align: center; border-top: 1px dashed #edf2f7; padding-top: 1rem; }
@media (max-width: 768px) { .timeline-item { gap: 1rem; } .timeline-date { width: 60px; font-size: 0.7rem; } }
</style>
