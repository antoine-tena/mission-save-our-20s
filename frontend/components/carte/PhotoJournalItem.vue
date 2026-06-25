<template>
  <div class="journal-item glass-card" @click="$emit('click')">
    <div class="journal-item__img"><img :src="photo.image_url" :alt="photo.titre" ></div>
    <div class="journal-item__info">
      <h4>{{ photo.titre }}</h4>
      <time>{{ formatDate(photo.date_creation) }}</time>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/formatters';
import type { Photo } from '~/types';
defineProps<{ photo: Photo }>();
defineEmits(['click']);
</script>

<style scoped>
.journal-item { display: flex; gap: 1rem; padding: 10px; cursor: pointer; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); border: 1px solid #f0f0f0; }
.journal-item:hover { transform: translateX(10px) scale(1.02); border-color: var(--clr-primary-200); }
.journal-item__img { width: 80px; height: 80px; border-radius: 8px; overflow: hidden; flex-shrink: 0; }
.journal-item__img img { width: 100%; height: 100%; object-fit: cover; }
.journal-item__info h4 { font-family: var(--font-display); font-size: 1rem; margin-bottom: 4px; color: #333; }
.journal-item__info time { font-size: 0.75rem; font-weight: 700; color: #999; text-transform: uppercase; }
</style>
