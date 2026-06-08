<template>
  <div 
    class="ios-day" 
    :class="{ 
      'is-today': isToday, 
      'is-selected': isSelected,
      'has-events': events.length > 0 
    }"
    @click="$emit('click')"
  >
    <div class="day-circle">
      <span class="day-number">{{ date.getDate() }}</span>
    </div>
    <div v-if="events.length > 0" class="event-indicator"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { MSOEvent } from '~/types';

const props = defineProps<{
  date: Date;
  events: MSOEvent[];
  isSelected: boolean;
}>();

defineEmits(['click']);

const isToday = computed(() => {
  const today = new Date();
  return props.date.toDateString() === today.toDateString();
});
</script>

<style scoped>
.ios-day {
  height: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
}

.day-circle {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.day-number {
  font-size: 1rem;
  font-weight: 500;
  color: #1c1c1e;
}

/* Today: Solid Theme Circle, White Text */
.is-today .day-circle {
  background-color: var(--clr-primary-500);
}
.is-today .day-number {
  color: white;
  font-weight: 700;
}

/* Selected (not today): Gray Circle, White Text */
.is-selected:not(.is-today) .day-circle {
  background-color: #1c1c1e;
}
.is-selected:not(.is-today) .day-number {
  color: white;
}

/* Hover effect */
.ios-day:hover:not(.is-selected):not(.is-today) .day-circle {
  background-color: #f2f2f7;
}

/* Event Dot */
.event-indicator {
  width: 4px;
  height: 4px;
  background-color: #8e8e93;
  border-radius: 50%;
  position: absolute;
  bottom: 2px;
}

.is-selected .event-indicator,
.is-today .event-indicator {
  background-color: #1c1c1e; /* Contrast on circle background if needed, but here it's below */
}

/* If selected or today, make dot lighter/different if it overlaps? 
   Actually iOS dots stay below the number even on today. */
.is-today .event-indicator {
  background-color: var(--clr-primary-500);
}
</style>
