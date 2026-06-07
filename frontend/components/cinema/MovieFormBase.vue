<template>
  <div class="form-base">
    <!-- Movie Search -->
    <div class="search-container">
      <label>Rechercher un film</label>
      <input v-model="movieQuery" @input="onMovieInput" type="text" placeholder="Tapez le titre..." class="search-input" />
      <div v-if="movieSuggestions.length > 0" class="suggestions-list">
        <div v-for="s in movieSuggestions.slice(0, 5)" :key="s.id" class="suggestion-item" @click="selectMovie(s)">
          <img v-if="s.poster_path" :src="'https://image.tmdb.org/t/p/w92' + s.poster_path" class="mini-poster" />
          <div class="suggestion-info">
            <span class="title">{{ s.title }}</span>
            <span class="year">{{ s.release_year }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Location Search -->
    <div class="search-container">
      <label>Lieu du cinéma</label>
      <input v-model="locationQuery" @input="onLocationInput" type="text" placeholder="Nom du cinéma ou ville..." class="search-input" />
      <div v-if="locationSuggestions.length > 0" class="suggestions-list">
        <div v-for="(loc, idx) in locationSuggestions" :key="idx" class="suggestion-item" @click="selectLocation(loc)">
          <div class="suggestion-info">
            <span class="title">{{ loc.display_name }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="details-row">
      <div class="form-group">
        <label>Date & Heure</label>
        <input :value="dateSeen" @input="$emit('update:dateSeen', ($event.target as HTMLInputElement).value)" type="datetime-local" required />
      </div>
      <div class="form-group">
        <label>Coordonnées (Auto)</label>
        <div class="coord-display">
          {{ latitude ? latitude.toFixed(4) : '?' }}, {{ longitude ? longitude.toFixed(4) : '?' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { TMDBSuggestion } from '~/types';

const props = defineProps<{ 
  dateSeen: string; 
  location: string; 
  title?: string;
  latitude?: number | null; 
  longitude?: number | null 
}>();
const emit = defineEmits(['update:dateSeen', 'update:location', 'update:latitude', 'update:longitude', 'select']);

const { searchMovies } = useCinema();
const movieQuery = ref(props.title || '');
const movieSuggestions = ref<TMDBSuggestion[]>([]);
let movieTimeout: any = null;

const locationQuery = ref(props.location);
const locationSuggestions = ref<any[]>([]);
let locationTimeout: any = null;

watch(() => props.title, (newTitle) => {
  if (newTitle !== undefined) movieQuery.value = newTitle || '';
});

watch(() => props.location, (newLoc) => {
  locationQuery.value = newLoc || '';
});

const onMovieInput = () => {
  clearTimeout(movieTimeout);
  movieTimeout = setTimeout(async () => {
    movieSuggestions.value = await searchMovies(movieQuery.value);
  }, 300);
};

const selectMovie = (s: TMDBSuggestion) => {
  movieQuery.value = s.title;
  movieSuggestions.value = [];
  emit('select', s);
};

const onLocationInput = () => {
  clearTimeout(locationTimeout);
  locationTimeout = setTimeout(async () => {
    if (locationQuery.value.length < 3) return;
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationQuery.value)}&limit=5`);
      locationSuggestions.value = await res.json();
    } catch (e) {
      console.error('Location search error:', e);
    }
  }, 500);
};

const selectLocation = (loc: any) => {
  locationQuery.value = loc.display_name;
  locationSuggestions.value = [];
  emit('update:location', loc.display_name);
  emit('update:latitude', parseFloat(loc.lat));
  emit('update:longitude', parseFloat(loc.lon));
};
</script>

<style scoped>
.search-container { position: relative; margin-bottom: 1.5rem; }
.search-input { width: 100%; padding: 0.8rem; border: 2px solid #edf2f7; border-radius: 10px; font-size: 1rem; }
.suggestions-list { position: absolute; top: 100%; left: 0; right: 0; background: white; border-radius: 12px; box-shadow: var(--shadow-xl); z-index: 100; overflow: hidden; margin-top: 5px; max-height: 300px; overflow-y: auto; }
.suggestion-item { display: flex; gap: 1rem; padding: 10px; cursor: pointer; transition: background 0.2s; border-bottom: 1px solid #f0f0f0; }
.suggestion-item:hover { background: #f8faff; }
.mini-poster { width: 30px; height: 45px; border-radius: 4px; object-fit: cover; }
.suggestion-info { display: flex; flex-direction: column; justify-content: center; }
.suggestion-info .title { font-weight: 700; font-size: 0.85rem; }
.suggestion-info .year { font-size: 0.75rem; color: #999; }
.details-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem; }
.form-group label { display: block; font-weight: 800; font-size: 0.75rem; text-transform: uppercase; color: #718096; margin-bottom: 0.5rem; }
.form-group input { width: 100%; padding: 0.8rem; border: 2px solid #edf2f7; border-radius: 10px; font-family: inherit; }
.coord-display { padding: 0.8rem; background: #f7fafc; border-radius: 10px; font-size: 0.85rem; color: #718096; border: 2px solid #edf2f7; text-align: center; }
</style>
