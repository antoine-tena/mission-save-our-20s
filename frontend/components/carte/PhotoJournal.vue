<template>
  <aside class="carte-sidebar">
    <header class="sidebar-header">
      <h1 class="sidebar-title">Journal de Bord <Icon name="lucide:map" /></h1>
      <p class="sidebar-subtitle">{{ photoCount }} escales sauvegardées</p>
    </header>
    <div class="sidebar-scroll">
      <div v-if="photos.length === 0" class="empty-journal">
        <div class="empty-icon"><Icon name="lucide:map-pin" /></div>
        <p>Aucune photo épinglée.</p>
      </div>
      <CartePhotoJournalItem v-for="photo in photos" :key="photo.id" :photo="photo" @click="$emit('focus-photo', photo)" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { Photo } from '~/types';
defineProps<{ photos: Photo[]; photoCount: number; }>();
defineEmits(['focus-photo']);
</script>

<style scoped>
.carte-sidebar { background: white; border-right: 1px solid #efefef; display: flex; flex-direction: column; z-index: 10; box-shadow: 10px 0 30px rgba(0,0,0,0.02); }
.sidebar-header { padding: 2.5rem 2rem; border-bottom: 1px dashed #ddd; }
.sidebar-title { font-family: var(--font-display); font-size: 1.8rem; color: #1a1a1a; line-height: 1.1; margin-bottom: 0.5rem; }
.sidebar-subtitle { color: var(--clr-primary-500); font-weight: 800; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }
.sidebar-scroll { flex: 1; overflow-y: auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
.empty-journal { text-align: center; padding-top: 3rem; color: #999; }
.empty-icon { font-size: 3rem; margin-bottom: 1rem; }
</style>
