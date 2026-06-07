<template>
  <aside class="carte-sidebar">
    <header class="sidebar-header">
      <h1 class="sidebar-title">Journal de Bord <Icon name="lucide:map" /></h1>
      <p class="sidebar-subtitle">{{ totalCount }} étapes enregistrées</p>
    </header>

    <div class="sidebar-tabs">
      <button :class="{ active: tab === 'photos' }" @click="tab = 'photos'">
        <Icon name="lucide:camera" /> Photos ({{ photos.length }})
      </button>
      <button :class="{ active: tab === 'movies' }" @click="tab = 'movies'">
        <Icon name="lucide:clapperboard" /> Ciné ({{ movies.length }})
      </button>
    </div>

    <div class="sidebar-scroll">
      <template v-if="tab === 'photos'">
        <div v-if="photos.length === 0" class="empty-journal">
          <div class="empty-icon"><Icon name="lucide:map-pin" /></div>
          <p>Aucune photo épinglée.</p>
        </div>
        <CartePhotoJournalItem v-for="photo in photos" :key="'photo-'+photo.id" :photo="photo" @click="$emit('focus', { type: 'photo', id: photo.id })" />
      </template>

      <template v-else>
        <div v-if="movies.length === 0" class="empty-journal">
          <div class="empty-icon"><Icon name="lucide:clapperboard" /></div>
          <p>Aucun cinéma épinglé.</p>
        </div>
        <div v-for="movie in movies" :key="'movie-'+movie.id" class="journal-movie-item" @click="$emit('focus', { type: 'movie', id: movie.id })">
          <img :src="movie.poster_url" class="mini-poster" />
          <div class="movie-info">
            <span class="title">{{ movie.title }}</span>
            <span class="location">{{ movie.location }}</span>
          </div>
        </div>
      </template>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Photo, Movie } from '~/types';

const props = defineProps<{ photos: Photo[]; movies: Movie[]; }>();
defineEmits(['focus']);

const tab = ref<'photos' | 'movies'>('photos');
const totalCount = computed(() => props.photos.length + props.movies.length);
</script>

<style scoped>
.carte-sidebar { background: white; border-right: 1px solid #efefef; display: flex; flex-direction: column; z-index: 10; box-shadow: 10px 0 30px rgba(0,0,0,0.02); }
.sidebar-header { padding: 2rem; border-bottom: 1px solid #f1f5f9; }
.sidebar-title { font-family: var(--font-display); font-size: 1.8rem; color: #1a1a1a; line-height: 1.1; margin-bottom: 0.5rem; }
.sidebar-subtitle { color: var(--clr-primary-500); font-weight: 800; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }

.sidebar-tabs { display: flex; padding: 0.5rem; background: #f8fafc; gap: 0.5rem; }
.sidebar-tabs button { flex: 1; border: none; background: none; padding: 0.8rem; border-radius: 10px; font-size: 0.75rem; font-weight: 700; color: #94a3b8; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s; }
.sidebar-tabs button.active { background: white; color: var(--clr-primary-500); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }

.sidebar-scroll { flex: 1; overflow-y: auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
.empty-journal { text-align: center; padding-top: 3rem; color: #94a3b8; }
.empty-icon { font-size: 3rem; margin-bottom: 1rem; opacity: 0.3; }

.journal-movie-item { display: flex; gap: 1rem; padding: 12px; border-radius: 12px; border: 1px solid #f1f5f9; cursor: pointer; transition: all 0.2s; }
.journal-movie-item:hover { border-color: var(--clr-primary-200); background: #fdf2ff; }
.mini-poster { width: 40px; height: 60px; object-fit: cover; border-radius: 4px; background: #f1f5f9; }
.movie-info { display: flex; flex-direction: column; justify-content: center; overflow: hidden; }
.movie-info .title { font-weight: 700; font-size: 0.9rem; color: #1a1a1a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.movie-info .location { font-size: 0.75rem; color: #94a3b8; margin-top: 2px; }
</style>
