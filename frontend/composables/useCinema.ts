import { ref, computed } from 'vue';
import type { Movie, TMDBSuggestion } from '~/types';

export const useCinema = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || 'http://127.0.0.1:8000/api';
  const { token } = useAuth();

  const movies = ref<Movie[]>([]);
  const isFetching = ref(false);
  const isSubmitting = ref(false);

  const fetchMovies = async () => {
    isFetching.value = true;
    try {
      movies.value = await $fetch<Movie[]>(`${apiBase}/cinema/movies/`, {
        headers: { Authorization: `Token ${token.value}` },
        credentials: 'include'
      });
    } catch (err) { console.error(err); } finally { isFetching.value = false; }
  };

  const searchMovies = async (query: string): Promise<TMDBSuggestion[]> => {
    if (!query || query.length < 2) return [];
    try {
      return await $fetch<TMDBSuggestion[]>(`${apiBase}/cinema/search/?query=${encodeURIComponent(query)}`, {
        headers: { Authorization: `Token ${token.value}` },
        credentials: 'include'
      });
    } catch (err) { console.error(err); return []; }
  };

  const createMovie = async (movieData: any) => {
    isSubmitting.value = true;
    try {
      await $fetch(`${apiBase}/cinema/movies/`, {
        method: 'POST',
        headers: { Authorization: `Token ${token.value}` },
        body: movieData,
        credentials: 'include'
      });
      await fetchMovies();
      return true;
    } catch (err) { console.error(err); return false; } finally { isSubmitting.value = false; }
  };

  const updateMovie = async (id: number, movieData: any) => {
    isSubmitting.value = true;
    try {
      await $fetch(`${apiBase}/cinema/movies/${id}/`, {
        method: 'PATCH', headers: { Authorization: `Token ${token.value}` }, body: movieData
      });
      await fetchMovies();
      return true;
    } catch (err) { console.error(err); return false; } finally { isSubmitting.value = false; }
  };

  const deleteMovie = async (id: number) => {
    try {
      await $fetch(`${apiBase}/cinema/movies/${id}/`, {
        method: 'DELETE', headers: { Authorization: `Token ${token.value}` }
      });
      await fetchMovies();
      return true;
    } catch (err) { console.error(err); return false; }
  };

  return { movies: readonly(movies), isFetching, isSubmitting, fetchMovies, searchMovies, createMovie, updateMovie, deleteMovie };
};
