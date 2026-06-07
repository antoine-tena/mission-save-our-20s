<template>
  <div class="mso-modal-overlay" @click.self="$emit('close')">
    <div class="mso-modal glass-card">
      <header class="modal-header">
        <h3>{{ formatDateLong(date) }}</h3>
        <button class="close-btn" @click="$emit('close')">×</button>
      </header>

      <div class="modal-content">
        <div v-if="events.length > 0" class="events-list">
          <div v-for="event in events" :key="event.id" class="event-item">
            <h4>{{ event.title }}</h4>
            <p v-if="event.location">
              <Icon name="lucide:map-pin" /> {{ event.location }}
            </p>
            <p class="desc">{{ event.description }}</p>
          </div>
        </div>
        <div v-else class="empty-events">
          <p>Rien de noté pour ce jour-là.</p>
        </div>

        <div class="flashback-hint" v-if="isPast">
          <p><Icon name="lucide:sparkles" /> Cliquez pour voir les photos de cette période dans l'Album.</p>
          <NuxtLink to="/albumPhoto" class="btn-mini">Voir l'Album</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MSOEvent } from '~/types';

defineProps<{
  date: Date;
  events: MSOEvent[];
  isPast: boolean;
}>();

defineEmits(['close']);

const formatDateLong = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(date);
};
</script>

<style scoped>
.mso-modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center; z-index: 1000;
}
.mso-modal { width: 90%; max-width: 450px; padding: 2rem; position: relative; }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.modal-header h3 { font-family: var(--font-display); text-transform: capitalize; }
.event-item { padding: 1rem; background: #f8fafc; border-radius: 12px; margin-bottom: 1rem; }
.event-item h4 { color: var(--clr-primary-600); margin-bottom: 4px; }
.desc { font-size: 0.9rem; color: #718096; line-height: 1.5; }
.flashback-hint { margin-top: 2rem; padding: 1rem; border-top: 1px dashed #eee; text-align: center; }
.btn-mini { display: inline-block; margin-top: 10px; font-size: 0.8rem; font-weight: 800; color: var(--clr-primary-500); }
</style>
