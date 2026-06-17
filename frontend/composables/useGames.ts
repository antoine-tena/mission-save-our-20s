import { ref, computed } from 'vue';
import type { GameType, GameSession, ScoreboardStats } from '~/types';

export const useGames = () => {
  const api = useApi();

  const sessions = ref<GameSession[]>([]);
  const gameTypes = ref<GameType[]>([]);
  const stats = ref<ScoreboardStats | null>(null);
  const isFetching = ref(false);
  const isSubmitting = ref(false);

  const fetchAllData = async () => {
    isFetching.value = true;
    try {
      const [typesData, sessionsData, statsData] = await Promise.all([
        api.get<GameType[]>('/games/types/'),
        api.get<GameSession[]>('/games/sessions/'),
        api.get<ScoreboardStats>('/games/stats/')
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
      await api.post('/games/sessions/', sessionData);
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
