<template>
  <div class="ios-modal-overlay" @click.self="$emit('close')">
    <div class="ios-sheet glass-card">
      <header class="sheet-header">
        <button class="btn-cancel" @click="$emit('close')">Annuler</button>
        <h3>{{ mode === 'add' ? 'Nouvel événement' : 'Détails' }}</h3>
        <button 
          class="btn-done" 
          :disabled="!isValid" 
          @click="handleSubmit"
        >
          {{ mode === 'add' ? 'Ajouter' : 'OK' }}
        </button>
      </header>

      <div class="sheet-content">
        <!-- Add Mode Form -->
        <div v-if="mode === 'add'" class="ios-form">
          <div class="form-section">
            <input v-model="form.title" type="text" placeholder="Titre" class="ios-input title-input" >
            <LocationAutocomplete v-model="form.location" placeholder="Lieu" input-class="ios-input" />
          </div>

          <div class="form-section">
            <div class="form-row">
              <label>Date</label>
              <input v-model="form.date" type="date" class="ios-date-picker" >
            </div>
          </div>

          <div class="form-section">
            <textarea v-model="form.description" placeholder="Notes" class="ios-textarea"/>
          </div>
        </div>

        <!-- Detail Mode -->
        <div v-else class="event-details">
          <div v-for="event in events" :key="event.id" class="detail-item">
            <h4>{{ event.title }}</h4>
            <p v-if="event.location" class="location"><Icon name="lucide:map-pin" /> {{ event.location }}</p>
            <p class="desc">{{ event.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { MSOEvent } from '~/types';

const props = defineProps<{
  date: Date;
  events?: MSOEvent[];
  mode: 'add' | 'detail';
}>();

const emit = defineEmits(['close', 'submit']);

const form = ref({
  title: '',
  location: '',
  date: props.date.toISOString().split('T')[0],
  description: ''
});

const isValid = computed(() => form.value.title.trim().length > 0);

const handleSubmit = async () => {
  if (props.mode === 'detail') {
    emit('close');
    return;
  }

  const { createEvent } = useCalendar();
  if (await createEvent(form.value)) {
    emit('submit');
  }
};
</script>

<style scoped>
@import '~/assets/css/event-modal.css';
</style>
