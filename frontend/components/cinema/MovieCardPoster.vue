<template>
  <div class="movie-poster-wrapper">
    <img v-if="posterUrl" :src="posterUrl" :alt="title" class="movie-poster" >
    <div v-else class="movie-poster movie-poster--fallback">
      <span><Icon name="lucide:clapperboard" /></span>
    </div>
    <div class="movie-date-badge">{{ date }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ posterUrl?: string | null; title: string; date: string }>();
</script>

<style scoped>
.movie-poster-wrapper { position: relative; height: 300px; }
.movie-poster { width: 100%; height: 100%; object-fit: cover; border-radius: 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
.movie-poster--fallback { background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); display: flex; align-items: center; justify-content: center; font-size: 4rem; }
.movie-date-badge { position: absolute; top: -10px; left: -10px; background: #1a1a1a; color: white; padding: 5px 12px; border-radius: 8px; font-weight: 800; font-size: 0.8rem; transform: rotate(-5deg); }
@media (max-width: 900px) { .movie-poster-wrapper { height: 400px; } }
</style>
