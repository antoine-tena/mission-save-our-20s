<template>
  <ScrapbookCard class="add-movie-section">
    <h2 class="card-title">{{ isEditing ? 'Modifier la Séance' : 'Nouvelle Séance' }}</h2>
    <form @submit.prevent="$emit('submit')" class="movie-form">
      <CinemaMovieFormBase
        :date-seen="modelValue.date_seen"
        @update:date-seen="val => updateField('date_seen', val)"
        :location="modelValue.location"
        @update:location="val => updateField('location', val)"
        :latitude="modelValue.latitude"
        @update:latitude="val => updateField('latitude', val)"
        :longitude="modelValue.longitude"
        @update:longitude="val => updateField('longitude', val)"
        :title="modelValue.title"
        @select="onMovieSelect"
      />
      <CinemaMovieFormReviews
        :amani-review="modelValue.amani_review"
        @update:amani-review="val => updateField('amani_review', val)"
        :amani-rating="modelValue.amani_rating"
        @update:amani-rating="val => updateField('amani_rating', val)"
        :antoine-review="modelValue.antoine_review"
        @update:antoine-review="val => updateField('antoine_review', val)"
        :antoine-rating="modelValue.antoine_rating"
        @update:antoine-rating="val => updateField('antoine_rating', val)"
      />
      <div class="form-actions">
        <button type="submit" class="mso-btn-primary" :disabled="isSubmitting || !modelValue.tmdb_id">
          {{ isSubmitting ? 'Gravure en cours...' : (isEditing ? 'Mettre à jour' : 'Graver dans le marbre') }}
        </button>
        <button v-if="isEditing" type="button" class="mso-btn-secondary" @click="$emit('cancel')">
          Annuler la modification
        </button>
      </div>
    </form>
  </ScrapbookCard>
</template>

<script setup lang="ts">
import type { TMDBSuggestion } from '~/types';
const props = defineProps<{ modelValue: any; isSubmitting: boolean; isEditing?: boolean }>();
const emit = defineEmits(['submit', 'update:modelValue', 'cancel']);

const updateField = (field: string, value: any) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value });
};

const onMovieSelect = (s: TMDBSuggestion) => {
  emit('update:modelValue', { ...props.modelValue, tmdb_id: s.id, title: s.title });
};
</script>

<style scoped>
.add-movie-section { margin-bottom: 4rem; }
.form-title { font-family: var(--font-display); font-size: 1.8rem; margin-bottom: 2rem; text-align: center; }
.form-actions { display: flex; flex-direction: column; gap: 1rem; align-items: center; margin-top: 2rem; }
.mso-btn-primary { background: #1a1a1a; color: white; border: none; padding: 1rem 2.5rem; border-radius: 50px; font-weight: 800; cursor: pointer; transition: all 0.3s; width: 100%; }
.mso-btn-primary:hover:not(:disabled) { background: #ca75d6; box-shadow: 0 10px 25px rgba(202, 117, 214, 0.4); }
.mso-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.mso-btn-secondary { background: none; border: 2px solid #edf2f7; color: #718096; padding: 0.8rem 2rem; border-radius: 50px; font-weight: 700; cursor: pointer; transition: all 0.2s; width: 100%; }
.mso-btn-secondary:hover { background: #f7fafc; border-color: #cbd5e0; color: #4a5568; }
</style>
