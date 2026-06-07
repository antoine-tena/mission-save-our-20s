<template>
  <div 
    class="calendar-day" 
    :class="{ 'has-events': events.length > 0, 'is-today': isToday, 'is-past': isPast }"
    @click="$emit('click')"
  >
    <span class="day-number">{{ date.getDate() }}</span>
    <div v-if="events.length > 0" class="event-dots">
      <span v-for="e in events.slice(0, 3)" :key="e.id" class="dot"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MSOEvent } from '~/types';

const props = defineProps<{
  date: Date;
  events: MSOEvent[];
}>();

defineEmits(['click']);

const isToday = computed(() => {
  const today = new Date();
  return props.date.toDateString() === today.toDateString();
});

const isPast = computed(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return props.date < today;
});
</script>

<style scoped>
.calendar-day {
  aspect-ratio: 1; border-radius: 12px; border: 1px solid #edf2f7;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.2s; position: relative;
}
.calendar-day:hover { background: #fff0f9; border-color: #ca75d644; transform: scale(1.05); }
.is-today { border: 2px solid var(--clr-primary-500); font-weight: 900; }
.has-events { background: #fdf2f8; }
.is-past { opacity: 0.8; }
.day-number { font-size: 1rem; color: #4a5568; }
.event-dots { display: flex; gap: 2px; margin-top: 4px; }
.dot { width: 4px; height: 4px; background: var(--clr-primary-500); border-radius: 50%; }
</style>
