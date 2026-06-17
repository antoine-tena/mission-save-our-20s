import { ref, computed } from 'vue';
import type { Movie, TMDBSuggestion } from '~/types';

export const useCinema = () => {
  const api = useApi();

  const movies = ref<Movie[]>([]);
  const isFetching = ref(false);
  const isSubmitting = ref(false);

  const fetchMovies = async () => {
    isFetching.value = true;
    try {
      movies.value = await api.get<Movie[]>('/cinema/movies/');
    } catch (err) { console.error(err); } finally { isFetching.value = false; }
  };

  const searchMovies = async (query: string): Promise<TMDBSuggestion[]> => {
    if (!query || query.length < 2) return [];
    try {
      return await api.get<TMDBSuggestion[]>(`/cinema/search/?query=${encodeURIComponent(query)}`);
    } catch (err) { console.error(err); return []; }
  };

  const createMovie = async (movieData: any) => {
    isSubmitting.value = true;
    try {
      await api.post('/cinema/movies/', movieData);
      await fetchMovies();
      return true;
    } catch (err) { console.error(err); return false; } finally { isSubmitting.value = false; }
  };

  const updateMovie = async (id: number, movieData: any) => {
    isSubmitting.value = true;
    try {
      await api.patch(`/cinema/movies/${id}/`, movieData);
      await fetchMovies();
      return true;
    } catch (err) { console.error(err); return false; } finally { isSubmitting.value = false; }
  };

  const deleteMovie = async (id: number) => {
    try {
      await api.delete(`/cinema/movies/${id}/`);
      await fetchMovies();
      return true;
    } catch (err) { console.error(err); return false; }
  };

  return { movies: readonly(movies), isFetching, isSubmitting, fetchMovies, searchMovies, createMovie, updateMovie, deleteMovie };
};
