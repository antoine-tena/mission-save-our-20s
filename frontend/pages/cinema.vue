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
      <div class="movies-timeline">
        <CinemaMovieCard 
          v-for="movie in sortedMovies" 
          :key="movie.id" 
          :movie="movie" 
          @edit="handleEditStart"
          @delete="handleDeleteMovie"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useCinema } from '~/composables/useCinema';

const { movies, isSubmitting, fetchMovies, createMovie, updateMovie, deleteMovie } = useCinema();
const showAddForm = ref(false);
const editingId = ref<number | null>(null);

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

const sortedMovies = computed(() => {
  return [...movies.value].sort((a, b) => new Date(b.date_seen).getTime() - new Date(a.date_seen).getTime());
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

onMounted(fetchMovies);
useSeoMeta({ title: 'Ciné-Journal — MSO20s' });
</script>

<style scoped>
.cinema-page { min-height: 100vh; padding-top: calc(var(--header-height) + 2rem); padding-bottom: 4rem; }
.mso-scrapbook-bg { position: fixed; inset: 0; background-color: #ffffff; background-image: radial-gradient(#ca75d611 1.5px, transparent 1.5px); background-size: 30px 30px; z-index: -1; }
.movies-timeline { display: flex; flex-direction: column; gap: 3rem; }
.slide-fade-enter-active { transition: all 0.4s ease-out; }
.slide-fade-leave-active { transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1); }
.slide-fade-enter-from, .slide-fade-leave-to { transform: translateY(-20px); opacity: 0; }
</style>
