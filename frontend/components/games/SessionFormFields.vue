<template>
  <div class="form-grid">
    <div class="form-group">
      <label>Type de jeu</label>
      <select :value="modelValue.game_type" @change="$emit('update:field', { game_type: Number(($event.target as HTMLSelectElement).value) })" required>
        <option v-for="t in gameTypes" :key="t.id" :value="t.id">{{ t.name }}</option>
      </select>
    </div>
    <div class="form-group">
      <label>Date</label>
      <input :value="modelValue.date" @input="$emit('update:field', { date: ($event.target as HTMLInputElement).value })" type="date" required />
    </div>
    <div class="form-group">
      <label>Score d'Amani <Icon name="lucide:flower-2" /></label>
      <input :value="modelValue.amani_score" @input="$emit('update:field', { amani_score: Number(($event.target as HTMLInputElement).value) })" type="number" min="0" required />
    </div>
    <div class="form-group">
      <label>Score d'Antoine <Icon name="lucide:shield" /></label>
      <input :value="modelValue.antoine_score" @input="$emit('update:field', { antoine_score: Number(($event.target as HTMLInputElement).value) })" type="number" min="0" required />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameType } from '~/types';
defineProps<{ modelValue: any; gameTypes: GameType[] }>();
defineEmits(['update:field']);
</script>

<style scoped>
.form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
.form-group label { display: block; font-weight: 800; font-size: 0.75rem; text-transform: uppercase; color: #718096; margin-bottom: 0.5rem; }
.form-group input, .form-group select { width: 100%; padding: 0.8rem; border: 2px solid #edf2f7; border-radius: 12px; font-family: inherit; }
@media (max-width: 768px) { .form-grid { grid-template-columns: 1fr; } }
</style>
