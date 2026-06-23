import { ref } from 'vue';
import type { MSOEvent } from '~/types';

export const useCalendar = () => {
  const api = useApi();
  const events = ref<MSOEvent[]>([]);
  const isLoading = ref(false);

  const fetchEvents = async () => {
    isLoading.value = true;
    try {
      events.value = await api.get<MSOEvent[]>('/agenda/');
    } catch (err) {
      console.error('Calendar load error:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const createEvent = async (eventData: Partial<MSOEvent>) => {
    try {
      await api.post('/agenda/', eventData);
      await fetchEvents();
      return true;
    } catch (err) {
      console.error('Calendar create error:', err);
      return false;
    }
  };

  return {
    events: readonly(events),
    isLoading,
    fetchEvents,
    createEvent
  };
};
