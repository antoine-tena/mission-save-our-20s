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
import { onMounted } from 'vue';
import { useCalendar } from '~/composables/useCalendar';
import { useCalendarView } from '~/composables/useCalendarView';
import type { MSOEvent } from '~/types';

const { events, fetchEvents } = useCalendar();

const {
  selectedDate, showModal, modalMode, modalEvents, viewDate, monthName, currentYear,
  selectedEvents, selectedDateLabel, handleDayClick, handleViewUpdate, openAddEvent, openEventDetail, formatTime
} = useCalendarView(events);

const handleEventAdded = () => {
  showModal.value = false;
  fetchEvents();
};

onMounted(fetchEvents);

useSeoMeta({ title: 'Agenda — MSO20s' });
</script>

<style scoped>
@import '~/assets/css/calendrier.css';
</style>
