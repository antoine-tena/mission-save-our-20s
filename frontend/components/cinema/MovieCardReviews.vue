<template>
  <div class="reviews-container">
    <div class="review-bubble review-bubble--amani" :class="{ 'empty': !amaniReview }">
      <div class="review-author">Amani</div>
      <p v-if="amaniReview">{{ amaniReview }}</p>
      <p v-else class="placeholder-text">En attente de l'avis de la parisienne...</p>
      <div class="review-rating">
        <span v-for="i in 5" :key="i" class="star" :class="{ 'is-filled': amaniRating >= i }">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" :fill="amaniRating >= i ? '#fbbf24' : 'none'" :stroke="amaniRating >= i ? '#fbbf24' : '#cbd5e0'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </span>
      </div>
    </div>
    <div class="review-bubble review-bubble--antoine" :class="{ 'empty': !antoineReview }">
      <div class="review-author">Antoine</div>
      <p v-if="antoineReview">{{ antoineReview }}</p>
      <p v-else class="placeholder-text">En attente de l'avis du lyonnais...</p>
      <div class="review-rating">
        <span v-for="i in 5" :key="i" class="star" :class="{ 'is-filled': antoineRating >= i }">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" :fill="antoineRating >= i ? '#fbbf24' : 'none'" :stroke="antoineRating >= i ? '#fbbf24' : '#cbd5e0'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ amaniReview?: string; amaniRating: number; antoineReview?: string; antoineRating: number }>();
</script>

<style scoped>
.reviews-container { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; flex-grow: 1; }
.review-bubble { padding: 1.2rem; border-radius: 18px; position: relative; font-size: 0.95rem; line-height: 1.6; display: flex; flex-direction: column; }
.review-author { font-weight: 900; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 0.5rem; }
.review-bubble--amani { background: #fff0f9; color: #c40e75ff; border-left: 4px solid #c40e75ff; }
.review-bubble--antoine { background: #f4fafe; color: #1d4ed8; border-left: 4px solid #1d4ed8; }
.review-bubble.empty { background: #f8fafc; color: #94a3b8; border-left: 4px solid #e2e8f0; font-style: italic; }
.review-rating { margin-top: auto; padding-top: 1rem; display: flex; gap: 4px; }
.star { color: #cbd5e0; font-size: 1.2rem; display: flex; transition: all 0.2s; }
.star.is-filled { color: #fbbf24; }
.star.is-filled :deep(svg), 
.star.is-filled :deep(svg path),
.star.is-filled :deep(svg polygon) { 
  fill: #fbbf24 !important; 
  stroke: #fbbf24 !important; 
}
@media (max-width: 900px) { .reviews-container { grid-template-columns: 1fr; } }
</style>
