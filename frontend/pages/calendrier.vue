<template>
  <div class="calendar-page">
    <div class="mso-scrapbook-bg"></div>

    <header class="page-header container">
      <div class="header-text">
        <h1 class="page-title">Notre Agenda <Icon name="lucide:calendar" /></h1>
        <p class="page-subtitle">Nos rendez-vous et moments clés.</p>
      </div>
    </header>

    <div class="container main-content">
      <AgendaCalendarGrid 
        :events="events"
        @day-click="handleDayClick"
      />
    </div>

    <AgendaEventModal 
      v-if="selectedDate"
      :date="selectedDate"
      :events="selectedEvents"
      :is-past="isPast(selectedDate)"
      @close="selectedDate = null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCalendar } from '~/composables/useCalendar';
import type { MSOEvent } from '~/types';

const { events, fetchEvents } = useCalendar();

const selectedDate = ref<Date | null>(null);

const selectedEvents = computed(() => {
  if (!selectedDate.value) return [];
  const dStr = selectedDate.value.toISOString().split('T')[0];
  return events.value.filter(e => e.date === dStr);
});

const handleDayClick = (date: Date) => {
  selectedDate.value = date;
};

const isPast = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

onMounted(fetchEvents);

useSeoMeta({ title: 'Agenda — MSO20s' });
</script>

<style scoped>
.calendar-page { min-height: 100vh; padding-top: calc(var(--header-height) + 3rem); padding-bottom: 6rem; }
.mso-scrapbook-bg { position: fixed; inset: 0; background-color: #ffffff; background-image: radial-gradient(#ca75d615 1.5px, transparent 1.5px); background-size: 30px 30px; z-index: -1; }
.page-header { margin-bottom: 3rem; text-align: center; }
.page-title { font-family: var(--font-display); font-size: 3.5rem; color: var(--clr-neutral-900); }
.page-subtitle { color: var(--clr-primary-500); font-weight: 700; margin-top: 0.5rem; }
</style>
