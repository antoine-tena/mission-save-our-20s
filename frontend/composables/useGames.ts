import { ref, computed } from 'vue';
import type { GameType, GameSession, ScoreboardStats } from '~/types';

export const useGames = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || 'http://127.0.0.1:8000/api';
  const { token } = useAuth();

  const sessions = ref<GameSession[]>([]);
  const gameTypes = ref<GameType[]>([]);
  const stats = ref<ScoreboardStats | null>(null);
  const isFetching = ref(false);
  const isSubmitting = ref(false);

  const fetchAllData = async () => {
    isFetching.value = true;
    try {
      const headers = { Authorization: `Token ${token.value}` };
      const [typesData, sessionsData, statsData] = await Promise.all([
        $fetch<GameType[]>(`${apiBase}/games/types/`, { headers }),
        $fetch<GameSession[]>(`${apiBase}/games/sessions/`, { headers }),
        $fetch<ScoreboardStats>(`${apiBase}/games/stats/`, { headers })
      ]);
      gameTypes.value = typesData;
      sessions.value = sessionsData;
      stats.value = statsData;
    } catch (err) {
      console.error('Erreur lors du chargement des données de jeux:', err);
    } finally {
      isFetching.value = false;
    }
  };

  const createSession = async (sessionData: any) => {
    isSubmitting.value = true;
    try {
      await $fetch(`${apiBase}/games/sessions/`, {
        method: 'POST',
        headers: { Authorization: `Token ${token.value}` },
        body: sessionData
      });
      await fetchAllData();
      return true;
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la session:', err);
      return false;
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    sessions: readonly(sessions),
    gameTypes: readonly(gameTypes),
    stats: readonly(stats),
    isFetching,
    isSubmitting,
    fetchAllData,
    createSession
  };
};
