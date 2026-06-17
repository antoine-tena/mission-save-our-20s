<template>
  <div class="reviews-container">
    <div class="review-bubble review-bubble--amani" :class="{ 'empty': !amaniReview }">
      <div class="review-author">Amani</div>
      <p v-if="amaniReview">{{ amaniReview }}</p>
      <p v-else class="placeholder-text">En attente de l'avis de la parisienne...</p>
      <StarRating :modelValue="amaniRating" class="review-rating" />
    </div>
    <div class="review-bubble review-bubble--antoine" :class="{ 'empty': !antoineReview }">
      <div class="review-author">Antoine</div>
      <p v-if="antoineReview">{{ antoineReview }}</p>
      <p v-else class="placeholder-text">En attente de l'avis du lyonnais...</p>
      <StarRating :modelValue="antoineRating" class="review-rating" />
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
.review-rating { margin-top: auto; padding-top: 1rem; }
@media (max-width: 900px) { .reviews-container { grid-template-columns: 1fr; } }
</style>
