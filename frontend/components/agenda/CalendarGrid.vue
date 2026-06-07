<template>
  <div class="calendar-container glass-card">
    <header class="calendar-header">
      <button @click="prevMonth">◀</button>
      <h2>{{ monthName }} {{ currentYear }}</h2>
      <button @click="nextMonth">▶</button>
    </header>

    <div class="calendar-grid">
      <div v-for="day in weekDays" :key="day" class="weekday">{{ day }}</div>
      <div v-for="n in startOffset" :key="'offset-'+n" class="day offset"></div>
      <CalendarDay 
        v-for="date in daysInMonth" 
        :key="date.toISOString()" 
        :date="date"
        :events="getEventsForDate(date)"
        @click="$emit('day-click', date)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { MSOEvent } from '~/types';

const props = defineProps<{ events: MSOEvent[] }>();
defineEmits(['day-click']);

const currentDate = ref(new Date());
const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const currentMonth = computed(() => currentDate.value.getMonth());
const currentYear = computed(() => currentDate.value.getFullYear());

const monthName = computed(() => {
  return new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(currentDate.value);
});

const startOffset = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay();
  return firstDay === 0 ? 6 : firstDay - 1; // Align to Monday
});

const daysInMonth = computed(() => {
  const count = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
  return Array.from({ length: count }, (_, i) => new Date(currentYear.value, currentMonth.value, i + 1));
});

const prevMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1);
};

const nextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1);
};

const getEventsForDate = (date: Date) => {
  const dStr = date.toISOString().split('T')[0];
  return props.events.filter(e => e.date === dStr);
};
</script>

<style scoped>
.calendar-container { padding: 2rem; }
.calendar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.calendar-header h2 { text-transform: capitalize; font-family: var(--font-display); }
.calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; }
.weekday { text-align: center; font-weight: 800; font-size: 0.7rem; color: #a0aec0; text-transform: uppercase; padding-bottom: 10px; }
.day.offset { background: #f7fafc; border-radius: 8px; }
</style>
