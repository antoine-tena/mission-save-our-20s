import { ref, computed, type Ref } from 'vue';
import type { MSOEvent } from '~/types';

export function useCalendarView(events: Ref<MSOEvent[]>) {
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

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  return {
    selectedDate, showModal, modalMode, modalEvents, viewDate, monthName, currentYear,
    selectedEvents, selectedDateLabel, handleDayClick, handleViewUpdate, openAddEvent, openEventDetail, formatTime
  };
}