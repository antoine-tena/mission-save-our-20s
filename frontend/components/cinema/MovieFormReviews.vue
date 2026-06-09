<template>
  <div class="reviews-input-grid">
    <div class="review-input-box review-input-box--amani">
      <h3>Critique d'Amani <Icon name="lucide:flower-2" /></h3>
      <textarea :value="amaniReview" @input="$emit('update:amaniReview', ($event.target as HTMLInputElement).value)" placeholder="Ton avis, Amani..."></textarea>
      <div class="rating-input">
        <span v-for="i in 5" :key="i" @click="$emit('update:amaniRating', i)" class="star" :class="{ 'is-active': amaniRating >= i }">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" :fill="amaniRating >= i ? '#fbbf24' : 'none'" :stroke="amaniRating >= i ? '#fbbf24' : '#cbd5e0'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </span>
      </div>
    </div>
    <div class="review-input-box review-input-box--antoine">
      <h3>Critique d'Antoine <Icon name="lucide:shield" /></h3>
      <textarea :value="antoineReview" @input="$emit('update:antoineReview', ($event.target as HTMLInputElement).value)" placeholder="Ton avis, Antoine..."></textarea>
      <div class="rating-input">
        <span v-for="i in 5" :key="i" @click="$emit('update:antoineRating', i)" class="star" :class="{ 'is-active': antoineRating >= i }">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" :fill="antoineRating >= i ? '#fbbf24' : 'none'" :stroke="antoineRating >= i ? '#fbbf24' : '#cbd5e0'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ amaniReview: string; amaniRating: number; antoineReview: string; antoineRating: number }>();
defineEmits(['update:amaniReview', 'update:amaniRating', 'update:antoineReview', 'update:antoineRating']);
</script>

<style scoped>
.reviews-input-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem; }
.review-input-box { padding: 1.5rem; border-radius: 15px; }
.review-input-box--amani { background: #fff0f9; border: 1px solid #c40e7522; }
.review-input-box--antoine { background: #f4fafe; border: 1px solid #3b82f622; }
.review-input-box h3 { font-size: 1rem; margin-bottom: 1rem; font-family: var(--font-display); }
.review-input-box textarea { width: 100%; height: 120px; background: white; border: 1px solid rgba(0,0,0,0.05); border-radius: 10px; padding: 10px; font-family: inherit; resize: none; }
.rating-input { margin-top: 10px; font-size: 1.5rem; cursor: pointer; display: flex; gap: 4px; }
.star { color: #cbd5e0; transition: all 0.2s; display: flex; }
.star.is-active { color: #fbbf24; }
.star.is-active :deep(svg),
.star.is-active :deep(svg path),
.star.is-active :deep(svg polygon) { 
  fill: #fbbf24 !important; 
  stroke: #fbbf24 !important; 
}
@media (max-width: 900px) { .reviews-input-grid { grid-template-columns: 1fr; } }
</style>
