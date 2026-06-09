<template>
  <div class="movie-metadata">
    <div class="metadata-row">
      <span class="label"><Icon name="lucide:calendar" /> Séance:</span>
      <span class="value">{{ dateLabel }}</span>
    </div>
    <div class="metadata-row">
      <span class="label">Réalisation:</span>
      <span class="value">{{ director || 'Inconnu' }}</span>
    </div>
    <div class="metadata-row">
      <span class="label">Genres:</span>
      <span class="value">{{ genres || 'N/A' }}</span>
    </div>
    <div class="metadata-row">
      <span class="label">Durée:</span>
      <span class="value">{{ runtime ? runtime + ' min' : 'N/A' }}</span>
    </div>
    <div class="metadata-row full">
      <span class="label">Casting:</span>
      <span class="value">{{ cast || 'N/A' }}</span>
    </div>
    <p v-if="overview" class="overview">{{ overview }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{ dateSeen: string; director?: string | null; genres?: string | null; runtime?: number | null; cast?: string | null; overview?: string | null; }>();

const dateLabel = computed(() => {
  return new Date(props.dateSeen).toLocaleString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
});
</script>

<style scoped>
.movie-metadata { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; padding: 1rem; background: #f8fafc; border-radius: 12px; }
.metadata-row { display: flex; gap: 8px; font-size: 0.85rem; }
.metadata-row.full { flex-direction: column; }
.label { font-weight: 800; color: #718096; text-transform: uppercase; font-size: 0.7rem; }
.value { color: #2d3748; }
.overview { font-size: 0.9rem; line-height: 1.5; color: #4a5568; border-top: 1px dashed #e2e8f0; padding-top: 0.8rem; margin-top: 0.5rem; }
</style>
