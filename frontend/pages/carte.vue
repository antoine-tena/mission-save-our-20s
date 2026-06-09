<template>
  <div class="mso-carte">
    <div class="mso-scrapbook-bg"></div>
    <div class="carte-layout">
      <CartePhotoJournal 
        :photos="localizedPhotos" 
        :movies="localizedMovies"
        @focus="item => mapComponent?.focusOn(item.type, item.id)" 
      />
      <CarteInteractiveMap ref="mapComponent" :photos="localizedPhotos" :movies="localizedMovies" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
const { photos, fetchPhotos } = usePhotos();
const { movies, fetchMovies } = useCinema();
const mapComponent = ref();
const localizedPhotos = computed(() => photos.value.filter(p => p.latitude !== null && p.longitude !== null));
const localizedMovies = computed(() => movies.value.filter(m => m.latitude !== null && m.longitude !== null));

const route = useRoute();
onMounted(async () => {
  await Promise.all([fetchPhotos(), fetchMovies()]);
  
  // Handle auto-focus from query params
  const { type, id } = route.query;
  if (type && id) {
    // Wait a bit for map to be ready
    setTimeout(() => {
      mapComponent.value?.focusOn(type as string, parseInt(id as string));
    }, 500);
  }
});
useSeoMeta({ title: 'Notre Carte — MSO20s' });
</script>

<style scoped>
.mso-carte { height: 100vh; padding-top: var(--header-height); overflow: hidden; }
.mso-scrapbook-bg { position: fixed; inset: 0; background-color: #ffffff; background-image: radial-gradient(#ca75d615 1.5px, transparent 1.5px); background-size: 30px 30px; z-index: -1; }
.carte-layout { display: grid; grid-template-columns: 350px 1fr; height: 100%; }
@media (max-width: 900px) { .carte-layout { grid-template-columns: 1fr; grid-template-rows: 300px 1fr; } }
</style>
