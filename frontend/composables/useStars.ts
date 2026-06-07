import { ref } from 'vue';
import type { StargazingSpot, CelestialBody } from '~/types';

export const useStars = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || 'http://127.0.0.1:8001/api';
  const { token } = useAuth();

  const spots = ref<StargazingSpot[]>([]);
  const isLoading = ref(false);

  const fetchSpots = async () => {
    isLoading.value = true;
    try {
      const data = await $fetch<StargazingSpot[]>(`${apiBase}/stargazing/`, {
        headers: { Authorization: `Token ${token.value}` }
      });
      spots.value = data;
    } catch (err) {
      console.error('Stars load error:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const saveSpot = async (spotData: Partial<StargazingSpot>) => {
    try {
      await $fetch(`${apiBase}/stargazing/`, {
        method: 'POST',
        headers: { Authorization: `Token ${token.value}` },
        body: spotData
      });
      await fetchSpots();
      return true;
    } catch (err) {
      console.error('Spot save error:', err);
      return false;
    }
  };

  // Mock data for stars if no API is available immediately
  const getVisibleStars = (lat: number, lon: number, date: string) => {
    return [
      { name: 'Sirius', type: 'Star', magnitude: -1.46, distance: '8.6 ly', constellation: 'Canis Major' },
      { name: 'Canopus', type: 'Star', magnitude: -0.74, distance: '310 ly', constellation: 'Carina' },
      { name: 'Rigel Kentaurus', type: 'Star', magnitude: -0.27, distance: '4.4 ly', constellation: 'Centaurus' },
      { name: 'Arcturus', type: 'Star', magnitude: -0.05, distance: '37 ly', constellation: 'Boötes' },
      { name: 'Vega', type: 'Star', magnitude: 0.03, distance: '25 ly', constellation: 'Lyra' },
    ];
  };

  return {
    spots: readonly(spots),
    isLoading,
    fetchSpots,
    saveSpot,
    getVisibleStars
  };
};
