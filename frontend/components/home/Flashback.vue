<template>
  <div v-if="memories.length > 0" class="mso-flashback">
    <h3 class="mso-flashback__title">✨ Flashback : Ce mois-ci les années passées</h3>
    <div class="mso-flashback__grid">
      <div v-for="memory in memories" :key="memory.id" class="mso-flashback__item">
        <img :src="memory.image_url" :alt="memory.titre" class="mso-flashback__img" />
        <div class="mso-flashback__overlay">
          <span class="mso-flashback__date">{{ formatDateYear(memory.date_creation) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Photo } from '~/types';

defineProps<{
  memories: Photo[]
}>();

const formatDateYear = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
};
</script>

<style scoped>
.mso-flashback {
  margin-top: 5rem;
  width: 100%;
}

.mso-flashback__title {
  font-family: var(--font-display);
  font-size: 1.8rem;
  color: #1a1a1a;
  margin-bottom: 2rem;
  text-align: center;
}

.mso-flashback__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
}

.mso-flashback__item {
  position: relative;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  transition: transform 0.3s;
}

.mso-flashback__item:hover {
  transform: scale(1.05) rotate(2deg);
}

.mso-flashback__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mso-flashback__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
  display: flex;
  align-items: flex-end;
  padding: 10px;
}

.mso-flashback__date {
  color: white;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}
</style>
