<template>
  <div class="cinema-page">
    <div class="mso-scrapbook-bg"></div>
    <PageHero
      title="Ciné-Journal"
      icon="lucide:clapperboard"
      icon-class="text-rose-500"
      subtitle-class="text-rose-600"
    >
      <template #subtitle>
        Nos critiques étanches & indépendantes <Icon name="lucide:popcorn" />
      </template>
      <template #actions>
        <button 
          @click="showAddForm = !showAddForm" 
          class="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-rose-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:shadow-rose-500/30 flex items-center gap-2" 
          :class="{ '!bg-rose-600 !shadow-rose-500/30': showAddForm }"
        >
          <Icon :name="showAddForm ? 'lucide:x' : 'lucide:plus'" class="w-5 h-5" />
          <span>{{ showAddForm ? 'Fermer' : 'Ajouter un film' }}</span>
        </button>
      </template>
    </PageHero>

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
        v-if="!editingId"
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

      <div v-if="!editingId" class="movies-timeline">
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
import { useCinemaFilters } from '~/composables/useCinemaFilters';

const { movies, isSubmitting, fetchMovies, createMovie, updateMovie, deleteMovie } = useCinema();
const showAddForm = ref(false);
const editingId = ref<number | null>(null);
const route = useRoute();

const { filters, availableGenres, availableYears, filteredMovies, resetFilters } = useCinemaFilters(movies);

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
@import '~/assets/css/cinema.css';
</style>
