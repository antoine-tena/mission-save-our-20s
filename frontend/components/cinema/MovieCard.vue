<template>
  <article class="movie-card glass-card" :class="{ 'is-expanded': showDetails }" @click="showDetails = !showDetails">
    <div class="card-options" @click.stop>
      <button class="options-trigger" @click="showMenu = !showMenu">
        <span></span><span></span><span></span>
      </button>
      <Transition name="fade">
        <div v-if="showMenu" class="options-menu" v-click-outside="() => showMenu = false">
          <button @click="onEdit" class="menu-item">
            <span class="icon">✏️</span> Modifier
          </button>
          <button @click="onDelete" class="menu-item delete">
            <span class="icon"><Icon name="lucide:trash-2" /></span> Supprimer
          </button>
        </div>
      </Transition>
    </div>

    <CinemaMovieCardPoster :poster-url="movie.poster_url" :title="movie.title" :date="formatDate(movie.date_seen)" />
    <div class="movie-details">
      <header class="movie-header">
        <h2 class="movie-title">{{ movie.title }}</h2>
        <div class="movie-info-line">
          <NuxtLink v-if="movie.latitude" :to="`/carte?type=movie&id=${movie.id}`" class="location-link" @click.stop>
            <Icon name="lucide:map-pin" /> {{ movie.location || 'Cinéma' }}
          </NuxtLink>
          <span v-else class="location"><Icon name="lucide:map-pin" /> {{ movie.location || 'Cinéma' }}</span>
        </div>
      </header>
      
      <Transition name="expand">
        <CinemaMovieCardMetadata 
          v-if="showDetails"
          :date-seen="movie.date_seen"
          :director="movie.director" :genres="movie.genres" 
          :runtime="movie.runtime" :cast="movie.cast" :overview="movie.overview" 
        />
      </Transition>

      <CinemaMovieCardReviews
        :amani-review="movie.amani_review" :amani-rating="movie.amani_rating || 0"
        :antoine-review="movie.antoine_review" :antoine-rating="movie.antoine_rating || 0"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Movie } from '~/types';

const props = defineProps<{ movie: Movie }>();
const emit = defineEmits(['edit', 'delete']);

const showDetails = ref(false);
const showMenu = ref(false);

const formatDate = (d: string) => new Date(d).toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });

const onEdit = () => {
  showMenu.value = false;
  emit('edit', props.movie);
};

const onDelete = () => {
  showMenu.value = false;
  if (confirm('Es-tu sûr de vouloir supprimer cette séance ?')) {
    emit('delete', props.movie.id);
  }
};
</script>

<style scoped>
.movie-card { display: grid; grid-template-columns: 200px 1fr; gap: 2.5rem; background: white; padding: 1.5rem; border-radius: 20px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); margin-bottom: 2rem; cursor: pointer; position: relative; overflow: visible; }
.movie-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-xl); }
.movie-card.is-expanded { border-color: var(--clr-primary-300); }

/* Options menu */
.card-options { position: absolute; top: 1rem; right: 1rem; z-index: 10; }
.options-trigger { background: none; border: none; padding: 8px; cursor: pointer; display: flex; flex-direction: column; gap: 3px; border-radius: 50%; transition: background 0.2s; }
.options-trigger:hover { background: #f1f5f9; }
.options-trigger span { width: 4px; height: 4px; background: #94a3b8; border-radius: 50%; }

.options-menu { position: absolute; top: 100%; right: 0; background: white; border-radius: 12px; box-shadow: var(--shadow-xl); border: 1px solid #f1f5f9; min-width: 150px; padding: 6px; z-index: 20; }
.menu-item { width: 100%; display: flex; align-items: center; gap: 10px; padding: 10px 12px; border: none; background: none; font-size: 0.9rem; font-weight: 600; color: #4a5568; cursor: pointer; border-radius: 8px; transition: all 0.2s; text-align: left; }
.menu-item:hover { background: #f8fafc; color: var(--clr-primary-600); }
.menu-item.delete:hover { background: #fff5f5; color: #e53e3e; }
.menu-item .icon { font-size: 1rem; }

.movie-details { display: flex; flex-direction: column; }
.movie-header { margin-bottom: 1.5rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 1rem; }
.movie-title { font-family: var(--font-display); font-size: 2rem; color: #1a1a1a; margin-bottom: 4px; }
.movie-info-line { display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
.location-link { color: var(--clr-primary-500); text-decoration: none; transition: color 0.2s; position: relative; z-index: 2; }
.location-link:hover { color: var(--clr-primary-700); text-decoration: underline; }

/* Transition details */
.expand-enter-active, .expand-leave-active { transition: all 0.4s ease; max-height: 1000px; opacity: 1; }
.expand-enter-from, .expand-leave-to { max-height: 0; opacity: 0; margin-bottom: 0; padding-top: 0; padding-bottom: 0; overflow: hidden; }

@media (max-width: 900px) { .movie-card { grid-template-columns: 1fr; } }
</style>
