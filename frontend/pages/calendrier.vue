<template>
  <div class="min-h-screen pb-24 bg-slate-50 overflow-hidden relative selection:bg-fuchsia-200" style="padding-top: calc(var(--header-height) + 3rem)">
    <!-- Animated modern background -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[20%] right-[-10%] w-[40rem] h-[40rem] bg-indigo-300/20 rounded-full blur-[120px] animate-pulse" style="animation-duration: 8s;"></div>
      <div class="absolute bottom-[0%] left-[-10%] w-[30rem] h-[30rem] bg-fuchsia-300/20 rounded-full blur-[100px] animate-pulse" style="animation-duration: 10s;"></div>
    </div>

    <!-- Page Hero -->
    <PageHero
      title="Notre Agenda"
      icon="lucide:calendar"
      icon-class="text-indigo-500"
      subtitle="Nos rendez-vous et moments clés."
      subtitle-class="text-indigo-600"
    >
      <template #actions>
        <button @click="openAddEvent" class="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:shadow-indigo-500/30 flex items-center gap-2">
          <Icon name="lucide:plus" class="w-5 h-5" /> Ajouter une mission
        </button>
      </template>
    </PageHero>

    <div class="container mx-auto px-4 relative z-10">
      <div class="backdrop-blur-xl bg-white/60 border border-white/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        
        <!-- Left Side: Calendar Grid -->
        <div class="lg:w-2/3 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-200/50">
          <header class="flex items-center justify-between mb-8">
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-display font-bold text-slate-800 capitalize">{{ monthName }}</span>
              <span class="text-xl text-slate-500 font-medium">{{ currentYear }}</span>
            </div>
            <!-- Pagination logic would be in AgendaCalendarGrid usually, 
                 but we provide a beautiful container for it here -->
          </header>

          <AgendaCalendarGrid 
            :events="events"
            :selected-date="selectedDate"
            @day-click="handleDayClick"
            @update-view="handleViewUpdate"
            class="w-full"
          />
        </div>

        <!-- Right Side: Events List -->
        <section class="lg:w-1/3 bg-slate-50/50 backdrop-blur-md p-6 lg:p-8 flex flex-col">
          <div class="mb-6 pb-4 border-b border-slate-200">
            <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Icon name="lucide:clock" class="text-indigo-500" />
              {{ selectedDateLabel }}
            </h3>
          </div>
          
          <div v-if="selectedEvents.length > 0" class="flex-1 overflow-y-auto pr-2 space-y-4">
            <div v-for="event in selectedEvents" :key="event.id" class="group bg-white border border-slate-100 p-4 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer" @click="openEventDetail(event)">
              <div class="flex items-start gap-4">
                <div class="bg-indigo-50 text-indigo-600 font-bold px-3 py-1 rounded-lg text-sm whitespace-nowrap group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  {{ formatTime(event.created_at) }}
                </div>
                <div>
                  <h4 class="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{{ event.title }}</h4>
                  <p v-if="event.location" class="text-sm text-slate-500 flex items-center gap-1 mt-1">
                    <Icon name="lucide:map-pin" class="w-3 h-3" /> {{ event.location }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="flex-1 flex flex-col items-center justify-center text-slate-400 gap-4">
            <Icon name="lucide:calendar-x" class="w-16 h-16 opacity-20" />
            <p class="text-center font-medium">Aucun événement prévu<br>pour ce jour.</p>
          </div>
        </section>
      </div>
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
