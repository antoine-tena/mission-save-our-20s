<template>
  <div class="celestial-info glass-card">
    <header class="info-header">
      <span class="type-badge">{{ body.type }}</span>
      <h2>{{ body.name }}</h2>
    </header>

    <div class="info-grid">
      <div class="info-item">
        <span class="label">Magnitude</span>
        <span class="value">{{ body.magnitude }}</span>
      </div>
      <div class="info-item" v-if="body.distance">
        <span class="label">Distance</span>
        <span class="value">{{ body.distance }}</span>
      </div>
      <div class="info-item" v-if="body.constellation">
        <span class="label">Constellation</span>
        <span class="value">{{ body.constellation }}</span>
      </div>
    </div>

    <p class="description" v-if="description">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { CelestialBody } from '~/types';

const props = defineProps<{
  body: CelestialBody;
}>();

const description = computed(() => {
  if (props.body.name === 'Sirius') return "L'étoile la plus brillante du ciel nocturne. Également connue sous le nom de l'étoile du Chien.";
  if (props.body.name === 'Vega') return "Une étoile blanche éclatante dans la constellation de la Lyre. Très brillante dans l'hémisphère nord.";
  return "Un astre lointain qui veille sur vos bivouacs.";
});
</script>

<style scoped>
.celestial-info { padding: 1.5rem; color: #4a5568; }
.info-header { display: flex; align-items: center; gap: 10px; margin-bottom: 1rem; }
.type-badge { font-size: 0.7rem; background: #edf2f7; padding: 2px 8px; border-radius: 4px; font-weight: 800; text-transform: uppercase; }
.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
.info-item { display: flex; flex-direction: column; }
.label { font-size: 0.7rem; color: #a0aec0; text-transform: uppercase; }
.value { font-weight: 700; }
.description { font-size: 0.9rem; line-height: 1.5; font-style: italic; }
</style>
