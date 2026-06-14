import { ref, computed, type Ref } from 'vue';

export function useCinemaFilters(movies: Ref<any[]>) {
  const filters = ref({
    search: '',
    genre: '',
    ratingAmani: 0,
    ratingAntoine: 0,
    ratingGlobal: 0,
    year: '',
    sortBy: 'date-desc'
  });

  const availableGenres = computed(() => {
    const genres = new Set<string>();
    movies.value.forEach(m => {
      if (m.genres) {
        m.genres.split(', ').forEach((g: string) => genres.add(g));
      }
    });
    return Array.from(genres).sort();
  });

  const availableYears = computed(() => {
    const years = new Set<string>();
    movies.value.forEach(m => {
      years.add(new Date(m.date_seen).getFullYear().toString());
    });
    return Array.from(years).sort((a, b) => b.localeCompare(a));
  });

  const filteredMovies = computed(() => {
    return movies.value
      .filter(m => {
        const searchTerm = filters.value.search.toLowerCase();
        const matchSearch = 
          m.title.toLowerCase().includes(searchTerm) || 
          (m.director && m.director.toLowerCase().includes(searchTerm)) ||
          (m.cast && m.cast.toLowerCase().includes(searchTerm));
          
        const matchGenre = !filters.value.genre || (m.genres && m.genres.includes(filters.value.genre));
        const matchRatingAmani = m.amani_rating >= filters.value.ratingAmani;
        const matchRatingAntoine = m.antoine_rating >= filters.value.ratingAntoine;
        
        const avgRating = ((m.amani_rating || 0) + (m.antoine_rating || 0)) / 2;
        const matchRatingGlobal = avgRating >= filters.value.ratingGlobal;
        
        const matchYear = !filters.value.year || new Date(m.date_seen).getFullYear().toString() === filters.value.year;
        
        return matchSearch && matchGenre && matchRatingAmani && matchRatingAntoine && matchRatingGlobal && matchYear;
      })
      .sort((a, b) => {
        if (filters.value.sortBy === 'date-desc') return new Date(b.date_seen).getTime() - new Date(a.date_seen).getTime();
        if (filters.value.sortBy === 'date-asc') return new Date(a.date_seen).getTime() - new Date(b.date_seen).getTime();
        if (filters.value.sortBy === 'title-asc') return a.title.localeCompare(b.title);
        return 0;
      });
  });

  const resetFilters = () => {
    filters.value = { search: '', genre: '', ratingAmani: 0, ratingAntoine: 0, ratingGlobal: 0, year: '', sortBy: 'date-desc' };
  };

  return { filters, availableGenres, availableYears, filteredMovies, resetFilters };
}
