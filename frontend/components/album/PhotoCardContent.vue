<template>
  <div class="polaroid__content">
    <h3 class="polaroid__title">{{ photo.titre }}</h3>
    <p v-if="photo.description" class="polaroid__desc">{{ photo.description }}</p>
    <div class="polaroid__footer">
      <time>{{ formatDate(photo.date_creation) }}</time>
      <span v-if="photo.author_name" class="author">by {{ photo.author_name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/formatters';
import type { Photo } from '~/types';
defineProps<{ photo: Photo }>();
</script>

<style scoped>
.polaroid__content { padding-top: 1.5rem; }
.polaroid__title { font-family: var(--font-display); font-size: 1.3rem; color: #1a1a1a; margin-bottom: 0.5rem; }
.polaroid__desc { font-size: 0.9rem; color: #666; line-height: 1.4; margin-bottom: 1rem; }
.polaroid__footer { display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 700; color: #ccc; text-transform: uppercase; letter-spacing: 1px; }
.author { color: var(--clr-primary-300); }
</style>
