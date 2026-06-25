<template>
  <div class="ios-calendar-grid-wrapper">
    <!-- Month Navigation (Internal for grid control) -->
    <div class="grid-nav">
      <button class="nav-btn" @click="changeMonth(-1)"><Icon name="lucide:chevron-left" /></button>
      <div class="spacer"/>
      <button class="nav-btn" @click="changeMonth(1)"><Icon name="lucide:chevron-right" /></button>
    </div>

    <div class="calendar-grid">
      <div v-for="day in weekDays" :key="day" class="weekday">{{ day }}</div>
      <div v-for="n in startOffset" :key="'offset-'+n" class="day offset"/>
      <AgendaCalendarDay 
        v-for="date in daysInMonth" 
        :key="date.toISOString()" 
        :date="date"
        :is-selected="selectedDate.toDateString() === date.toDateString()"
        :events="getEventsForDate(date)"
        @click="$emit('day-click', date)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { MSOEvent } from '~/types';

const props = defineProps<{ 
  events: MSOEvent[];
  selectedDate: Date;
}>();

const emit = defineEmits(['day-click', 'update-view']);

const currentDate = ref(new Date());
const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

const currentMonth = computed(() => currentDate.value.getMonth());
const currentYear = computed(() => currentDate.value.getFullYear());

const startOffset = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay();
  return firstDay === 0 ? 6 : firstDay - 1; 
});

const daysInMonth = computed(() => {
  const count = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
  return Array.from({ length: count }, (_, i) => new Date(currentYear.value, currentMonth.value, i + 1));
});

const changeMonth = (delta: number) => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + delta, 1);
  emit('update-view', currentDate.value);
};

const getEventsForDate = (date: Date) => {
  const dStr = date.toISOString().split('T')[0];
  return props.events.filter(e => e.date === dStr);
};
</script>

<style scoped>
.ios-calendar-grid-wrapper {
  padding: 0 1.5rem 2rem 1.5rem;
  position: relative;
}

.grid-nav {
  display: flex;
  justify-content: space-between;
  margin-bottom: -35px; /* Overlay on grid header */
  position: relative;
  z-index: 5;
}

.nav-btn {
  background: none;
  border: none;
  color: var(--clr-primary-500);
  cursor: pointer;
  padding: 10px;
  font-size: 1.2rem;
  display: flex;
}

.spacer { flex: 1; }

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.weekday {
  text-align: center;
  font-weight: 600;
  font-size: 0.75rem;
  color: #8e8e93;
  padding: 10px 0;
}

.day.offset {
  height: 44px;
}
</style>
