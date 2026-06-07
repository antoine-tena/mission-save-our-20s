import { ref, computed } from 'vue';
import type { MSOEvent } from '~/types';

export const useCalendar = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || 'http://127.0.0.1:8001/api';
  const { token } = useAuth();

  const events = ref<MSOEvent[]>([]);
  const isLoading = ref(false);

  const fetchEvents = async () => {
    isLoading.value = true;
    try {
      const data = await $fetch<MSOEvent[]>(`${apiBase}/agenda/`, {
        headers: { Authorization: `Token ${token.value}` }
      });
      events.value = data;
    } catch (err) {
      console.error('Calendar load error:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const createEvent = async (eventData: Partial<MSOEvent>) => {
    try {
      await $fetch(`${apiBase}/agenda/`, {
        method: 'POST',
        headers: { Authorization: `Token ${token.value}` },
        body: eventData
      });
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
