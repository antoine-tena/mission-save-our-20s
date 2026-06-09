<template>
  <section class="add-session-section card glass-card">
    <div class="mso-journal-card__tape"></div>
    <h2 class="card-title">Enregistrer un exploit</h2>
    <form @submit.prevent="$emit('submit')" class="games-form">
      <GamesSessionFormFields :model-value="modelValue" :game-types="gameTypes" @update:field="$emit('update:modelValue', { ...modelValue, ...$event })" />
      <div class="form-group full-width">
        <label>Lieu</label>
        <LocationAutocomplete :model-value="modelValue.location" @update:model-value="val => $emit('update:modelValue', { ...modelValue, location: val })" placeholder="Ex: Billard Club" />
      </div>
      <div class="form-group full-width">
        <label>Notes</label>
        <textarea :value="modelValue.notes" @input="$emit('update:modelValue', { ...modelValue, notes: ($event.target as HTMLTextAreaElement).value })" placeholder="Une anecdote ?"></textarea>
      </div>
      <div class="form-actions"><button type="submit" class="mso-btn-primary" :disabled="isSubmitting">{{ isSubmitting ? 'Enregistrement...' : 'Valider' }}</button></div>
    </form>
  </section>
</template>

<script setup lang="ts">
import type { GameType } from '~/types';
defineProps<{ modelValue: any; gameTypes: GameType[]; isSubmitting: boolean; }>();
defineEmits(['submit', 'update:modelValue']);
</script>

<style scoped>
.add-session-section { margin-bottom: 4rem; padding: 3rem; position: relative; transform: rotate(0.5deg); }
.mso-journal-card__tape { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); width: 120px; height: 35px; background: rgba(202, 117, 214, 0.2); clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%); }
.form-group label { display: block; font-weight: 800; font-size: 0.75rem; text-transform: uppercase; color: #718096; margin-bottom: 0.5rem; }
.form-group input, .form-group textarea { width: 100%; padding: 0.8rem; border: 2px solid #edf2f7; border-radius: 12px; font-family: inherit; }
.full-width { margin-top: 1.5rem; }
.form-actions { margin-top: 2rem; text-align: center; }
.mso-btn-primary { background: #1a1a1a; color: white; border: none; padding: 0.8rem 2rem; border-radius: 50px; font-weight: 800; cursor: pointer; transition: all 0.3s; }
.mso-btn-primary:hover:not(:disabled) { background: #ca75d6; box-shadow: 0 10px 25px rgba(202, 117, 214, 0.3); }
</style>
