<template>
  <div class="glass-card mission-card">
    <h3 class="sidebar-title">Progression Mission</h3>
    <div class="mission-level">
      <span class="level-label">Niveau {{ level }}</span>
      <span class="points-label">{{ points }} XP</span>
    </div>
    <div class="progress-track">
      <div class="progress-bar" :style="{ width: `${progress}%` }"/>
    </div>
    <p class="mission-hint">Partagez et interagissez pour monter en grade !</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{ points: number }>();
const level = computed(() => Math.floor(props.points / 100) + 1);
const progress = computed(() => props.points % 100);
</script>

<style scoped>
.glass-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; margin-bottom: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
.sidebar-title { font-size: 14px; font-weight: 700; color: #4a5568; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; }
.mission-level { display: flex; justify-content: space-between; margin-bottom: 8px; font-weight: 700; }
.level-label { color: var(--clr-primary-600); }
.points-label { color: #718096; font-size: 13px; }
.progress-track { height: 8px; background: #edf2f7; border-radius: 4px; overflow: hidden; margin-bottom: 12px; }
.progress-bar { height: 100%; background: linear-gradient(90deg, var(--clr-primary-400), var(--clr-primary-600)); transition: width 0.5s ease-out; }
.mission-hint { font-size: 12px; color: #a0aec0; font-style: italic; }
</style>
