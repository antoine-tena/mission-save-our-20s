<template>
  <div class="cinema-page">
    <div class="mso-scrapbook-bg"></div>
    <CinemaHeader :show-form="showAddForm" @toggle="showAddForm = !showAddForm" />

    <div class="container main-content">
      <Transition name="slide-fade">
        <CinemaMovieForm 
          v-if="showAddForm" 
          v-model="newMovie" 
          :is-submitting="isSubmitting" 
          :is-editing="!!editingId" 
          @submit="handleAddMovie" 
          @cancel="handleCancelEdit"
        />
      </Transition>

      <CinemaMovieFilters 
        v-model:search="filters.search"
        v-model:genre="filters.genre"
        v-model:ratingAmani="filters.ratingAmani"
        v-model:ratingAntoine="filters.ratingAntoine"
        v-model:ratingGlobal="filters.ratingGlobal"
        v-model:year="filters.year"
        v-model:sortBy="filters.sortBy"
        :available-genres="availableGenres"
        :available-years="availableYears"
        :total-results="filteredMovies.length"
        @reset="resetFilters"
      />

      <div class="movies-timeline">
        <CinemaMovieCard 
          v-for="movie in filteredMovies" 
          :key="movie.id" 
          :id="'movie-' + movie.id"
          :movie="movie" 
          @edit="handleEditStart"
          @delete="handleDeleteMovie"
        />
        <div v-if="filteredMovies.length === 0" class="empty-state">
          <Icon name="lucide:search-x" class="empty-icon" />
          <p>Aucun film ne correspond à tes critères...</p>
          <button @click="resetFilters" class="btn-reset">Réinitialiser les filtres</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useCinema } from '~/composables/useCinema';

const { movies, isSubmitting, fetchMovies, createMovie, updateMovie, deleteMovie } = useCinema();
const showAddForm = ref(false);
const editingId = ref<number | null>(null);
const route = useRoute();

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
      m.genres.split(', ').forEach(g => genres.add(g));
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

const newMovie = ref({
  tmdb_id: null as number | null,
  title: '',
  date_seen: new Date().toISOString().slice(0, 16),
  location: '',
  latitude: null as number | null,
  longitude: null as number | null,
  antoine_review: '',
  antoine_rating: 0,
  amani_review: '',
  amani_rating: 0
});

const handleAddMovie = async () => {
  if (editingId.value) {
    if (await updateMovie(editingId.value, newMovie.value)) {
      showAddForm.value = false;
      resetForm();
    }
  } else {
    if (await createMovie(newMovie.value)) {
      showAddForm.value = false;
      resetForm();
    }
  }
};

const handleEditStart = (movie: any) => {
  editingId.value = movie.id;
  newMovie.value = {
    tmdb_id: movie.tmdb_id,
    title: movie.title,
    date_seen: movie.date_seen.slice(0, 16),
    location: movie.location || '',
    latitude: movie.latitude,
    longitude: movie.longitude,
    antoine_review: movie.antoine_review,
    antoine_rating: movie.antoine_rating,
    amani_review: movie.amani_review,
    amani_rating: movie.amani_rating
  };
  showAddForm.value = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleCancelEdit = () => {
  showAddForm.value = false;
  resetForm();
};

const handleDeleteMovie = async (id: number) => {
  await deleteMovie(id);
};

const resetForm = () => {
  editingId.value = null;
  newMovie.value = { tmdb_id: null, title: '', date_seen: new Date().toISOString().slice(0, 16), location: '', latitude: null, longitude: null, antoine_review: '', antoine_rating: 0, amani_review: '', amani_rating: 0 };
};

onMounted(async () => {
  await fetchMovies();
  if (route.query.id) {
    setTimeout(() => {
      const element = document.getElementById('movie-' + route.query.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('highlight-movie');
      }
    }, 500);
  }
});

useSeoMeta({ title: 'Ciné-Journal — MSO20s' });
</script>

<style scoped>
.cinema-page { min-height: 100vh; padding-top: calc(var(--header-height) + 2rem); padding-bottom: 4rem; }
.mso-scrapbook-bg { position: fixed; inset: 0; background-color: #ffffff; background-image: radial-gradient(#ca75d611 1.5px, transparent 1.5px); background-size: 30px 30px; z-index: -1; }
.movies-timeline { display: flex; flex-direction: column; gap: 3rem; }
.slide-fade-enter-active { transition: all 0.4s ease-out; }
.slide-fade-leave-active { transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1); }
.slide-fade-enter-from, .slide-fade-leave-to { transform: translateY(-20px); opacity: 0; }
.empty-state { text-align: center; padding: 5rem 2rem; color: #94a3b8; }
.empty-icon { font-size: 4rem; margin-bottom: 1.5rem; opacity: 0.3; }
.btn-reset { background: #1a1a1a; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 12px; font-weight: 700; cursor: pointer; margin-top: 1rem; }
:deep(.highlight-movie) { outline: 3px solid #ca75d6; outline-offset: 10px; animation: pulse-highlight 2s infinite; }
@keyframes pulse-highlight { 0% { outline-color: rgba(202, 117, 214, 0.8); } 50% { outline-color: rgba(202, 117, 214, 0.2); } 100% { outline-color: rgba(202, 117, 214, 0.8); } }
</style>
