<template>
  <div class="session-scores-row">
    <div class="score-box amani" :class="{ 'winner': winner === 'Amani' }">
      <span class="name">Amani</span>
      <span class="score">{{ amaniScore }}</span>
    </div>
    <div class="score-vs">VS</div>
    <div class="score-box antoine" :class="{ 'winner': winner === 'Antoine' }">
      <span class="name">Antoine</span>
      <span class="score">{{ antoineScore }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ winner: string; amaniScore: number; antoineScore: number }>();
</script>

<style scoped>
.session-scores-row { display: flex; align-items: center; justify-content: center; gap: 2rem; margin: 1rem 0; }
.score-box { display: flex; flex-direction: column; align-items: center; padding: 1rem; border-radius: 12px; min-width: 100px; transition: transform 0.3s; }
.score-box.winner { transform: scale(1.1); font-weight: 800; }
.score-box.amani.winner { background: #fff0f9; box-shadow: 0 5px 15px rgba(196, 14, 117, 0.1); }
.score-box.antoine.winner { background: #f4fafe; box-shadow: 0 5px 15px rgba(29, 78, 216, 0.1); }
.score-box .name { font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.2rem; }
.score-box .score { font-size: 2rem; font-weight: 900; }
.score-vs { font-weight: 900; color: #cbd5e0; font-size: 0.8rem; }
@media (max-width: 768px) { .session-scores-row { gap: 1rem; } .score-box { min-width: 80px; } }
</style>
