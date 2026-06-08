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
            <input v-model="form.title" type="text" placeholder="Titre" class="ios-input title-input" />
            <input v-model="form.location" type="text" placeholder="Lieu" class="ios-input" />
          </div>

          <div class="form-section">
            <div class="form-row">
              <label>Date</label>
              <input v-model="form.date" type="date" class="ios-date-picker" />
            </div>
          </div>

          <div class="form-section">
            <textarea v-model="form.description" placeholder="Notes" class="ios-textarea"></textarea>
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
.ios-modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px);
  display: flex; align-items: flex-end; justify-content: center; z-index: 2000;
}

.ios-sheet {
  width: 100%;
  max-width: 500px;
  background: #f2f2f7;
  border-radius: 20px 20px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease-out;
  max-height: 90vh;
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.sheet-header {
  padding: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-bottom: 1px solid #e5e5ea;
  border-radius: 20px 20px 0 0;
}

.sheet-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1c1c1e;
}

.btn-cancel, .btn-done {
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: var(--clr-primary-500);
  cursor: pointer;
}

.btn-done {
  font-weight: 700;
}

.btn-done:disabled {
  color: #aeaeb2;
  cursor: not-allowed;
}

.sheet-content {
  padding: 1.5rem;
  overflow-y: auto;
}

/* Form Styles */
.form-section {
  background: white;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  overflow: hidden;
}

.ios-input, .ios-textarea, .ios-date-picker {
  width: 100%;
  padding: 0.8rem 1rem;
  border: none;
  background: white;
  font-family: inherit;
  font-size: 1rem;
  color: #1c1c1e;
}

.ios-input:not(:last-child) {
  border-bottom: 1px solid #f2f2f7;
}

.title-input {
  font-weight: 600;
}

.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  background: white;
}

.form-row label {
  font-size: 1rem;
  color: #1c1c1e;
}

.ios-date-picker {
  width: auto;
  text-align: right;
  color: #007aff;
  font-weight: 600;
}

.ios-textarea {
  min-height: 100px;
  resize: none;
}

/* Detail Styles */
.event-details {
  background: white;
  border-radius: 10px;
  padding: 1rem;
}

.detail-item h4 {
  color: var(--clr-primary-500);
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.location {
  font-size: 0.9rem;
  color: #8e8e93;
  margin-bottom: 10px;
}

.desc {
  font-size: 1rem;
  line-height: 1.5;
  color: #48484a;
}
</style>
