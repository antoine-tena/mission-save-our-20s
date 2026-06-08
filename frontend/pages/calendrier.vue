<template>
  <div class="calendar-page">
    <div class="mso-scrapbook-bg"></div>

    <!-- Page Header (Hero style) -->
    <header class="page-header container">
      <div class="header-text">
        <h1 class="page-title">Notre Agenda <Icon name="lucide:calendar" /></h1>
        <p class="page-subtitle">Nos rendez-vous et moments clés.</p>
      </div>
      <button @click="openAddEvent" class="btn-add-hero">
        <Icon name="lucide:plus" /> Ajouter une mission
      </button>
    </header>

    <div class="ios-calendar-container container">
      <!-- Header Style iPhone -->
      <header class="ios-header">
        <div class="header-left">
          <span class="current-month">{{ monthName }}</span>
          <span class="current-year">{{ currentYear }}</span>
        </div>
      </header>

      <!-- Calendar Grid -->
      <AgendaCalendarGrid 
        :events="events"
        :selected-date="selectedDate"
        @day-click="handleDayClick"
        @update-view="handleViewUpdate"
      />

      <!-- Events List (Integrated, not modal) -->
      <section class="ios-events-list">
        <div class="list-header">
          <h3>{{ selectedDateLabel }}</h3>
        </div>
        
        <div v-if="selectedEvents.length > 0" class="events-scroll">
          <div v-for="event in selectedEvents" :key="event.id" class="ios-event-card" @click="openEventDetail(event)">
            <div class="event-time">
              <span class="time-main">{{ formatTime(event.created_at) }}</span>
            </div>
            <div class="event-details">
              <h4 class="event-title">{{ event.title }}</h4>
              <p v-if="event.location" class="event-location">
                <Icon name="lucide:map-pin" /> {{ event.location }}
              </p>
            </div>
          </div>
        </div>
        <div v-else class="empty-state">
          <p>Aucun événement prévu pour ce jour.</p>
        </div>
      </section>
    </div>

    <!-- Modal for adding OR viewing details -->
    <AgendaEventModal 
      v-if="showModal"
      :mode="modalMode"
      :date="selectedDate"
      :events="modalEvents"
      @close="showModal = false"
      @submit="handleEventAdded"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCalendar } from '~/composables/useCalendar';
import type { MSOEvent } from '~/types';

const { events, fetchEvents } = useCalendar();

const selectedDate = ref<Date>(new Date());
const showModal = ref(false);
const modalMode = ref<'add' | 'detail'>('add');
const modalEvents = ref<MSOEvent[]>([]);
const viewDate = ref(new Date());

const monthName = computed(() => {
  return new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(viewDate.value);
});

const currentYear = computed(() => viewDate.value.getFullYear());

const selectedEvents = computed(() => {
  const dStr = selectedDate.value.toISOString().split('T')[0];
  return events.value.filter(e => e.date === dStr);
});

const selectedDateLabel = computed(() => {
  const today = new Date();
  if (selectedDate.value.toDateString() === today.toDateString()) return "Aujourd'hui";
  return new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).format(selectedDate.value);
});

const handleDayClick = (date: Date) => {
  selectedDate.value = date;
};

const handleViewUpdate = (date: Date) => {
  viewDate.value = date;
};

const openAddEvent = () => {
  modalMode.value = 'add';
  showModal.value = true;
};

const openEventDetail = (event: MSOEvent) => {
  modalMode.value = 'detail';
  modalEvents.value = [event];
  showModal.value = true;
};

const handleEventAdded = () => {
  showModal.value = false;
  fetchEvents();
};

const formatTime = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

onMounted(fetchEvents);

useSeoMeta({ title: 'Agenda — MSO20s' });
</script>

<style scoped>
.calendar-page { 
  min-height: 100vh; 
  padding-top: calc(var(--header-height) + 3rem); 
  padding-bottom: 6rem;
}

.mso-scrapbook-bg { 
  position: fixed; 
  inset: 0; 
  background-color: #ffffff; 
  background-image: radial-gradient(#ca75d615 1.5px, transparent 1.5px); 
  background-size: 30px 30px; 
  z-index: -1; 
}

/* Page Header / Hero */
.page-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: flex-end; 
  margin-bottom: 4rem; 
}

.page-title { 
  font-family: var(--font-display); 
  font-size: 3.5rem; 
  color: var(--clr-neutral-900); 
  letter-spacing: -1px;
}

.page-subtitle { 
  color: var(--clr-primary-500); 
  font-weight: 700; 
  font-size: 1.1rem; 
}

.btn-add-hero {
  background: var(--clr-neutral-900);
  color: white;
  border: none;
  padding: 0.8rem 1.8rem;
  border-radius: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-add-hero:hover {
  background: var(--clr-primary-500);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(202, 117, 214, 0.2);
}

.ios-calendar-container {
  max-width: 500px;
  background: white;
  border-radius: 30px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid #f1f5f9;
}

/* Header iPhone Style */
.ios-header {
  padding: 2rem 2rem 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  flex-direction: column;
}

.current-month {
  font-size: 1.8rem;
  font-weight: 800;
  text-transform: capitalize;
  color: #1c1c1e;
}

.current-year {
  font-size: 1rem;
  color: var(--clr-primary-500);
  font-weight: 700;
}

/* Events List integrated */
.ios-events-list {
  flex: 1;
  background: white;
  padding: 1rem 2rem;
  border-top: 1px solid #f1f5f9;
}

.list-header h3 {
  font-size: 0.9rem;
  text-transform: uppercase;
  color: #94a3b8;
  letter-spacing: 0.5px;
  margin-bottom: 1.5rem;
}

.ios-event-card {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f8fafc;
  cursor: pointer;
  transition: transform 0.2s;
}

.ios-event-card:hover {
  transform: translateX(5px);
}

.event-time {
  min-width: 60px;
  font-weight: 700;
  color: #1c1c1e;
  font-size: 0.9rem;
}

.event-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1c1c1e;
  margin-bottom: 4px;
}

.event-location {
  font-size: 0.85rem;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
}

.empty-state {
  text-align: center;
  padding: 3rem 0;
  color: #94a3b8;
  font-style: italic;
}
</style>
