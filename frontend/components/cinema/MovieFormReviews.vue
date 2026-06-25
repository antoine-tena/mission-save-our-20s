<template>
  <div class="reviews-input-grid">
    <div class="review-input-box review-input-box--amani">
      <h3>Critique d'Amani <Icon name="lucide:flower-2" /></h3>
      <textarea :value="amaniReview" placeholder="Ton avis, Amani..." @input="$emit('update:amaniReview', ($event.target as HTMLInputElement).value)"/>
      <StarRating :model-value="amaniRating" interactive :size="24" class="rating-input" @update:model-value="val => $emit('update:amaniRating', val)" />
    </div>
    <div class="review-input-box review-input-box--antoine">
      <h3>Critique d'Antoine <Icon name="lucide:shield" /></h3>
      <textarea :value="antoineReview" placeholder="Ton avis, Antoine..." @input="$emit('update:antoineReview', ($event.target as HTMLInputElement).value)"/>
      <StarRating :model-value="antoineRating" interactive :size="24" class="rating-input" @update:model-value="val => $emit('update:antoineRating', val)" />
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
.rating-input { margin-top: 10px; }
@media (max-width: 900px) { .reviews-input-grid { grid-template-columns: 1fr; } }
</style>
