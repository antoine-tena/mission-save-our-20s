<template>
  <TransitionGroup
    tag="section"
    name="staggered-list"
    class="mso-gallery"
  >
    <PhotoCard
      v-for="(photo, index) in photos"
      :key="photo.id"
      :photo="photo"
      :rotation="`${(index % 3 - 1) * 2}deg`"
      :delay="`${index * 0.1}s`"
      @delete="$emit('delete', $event)"
    />
  </TransitionGroup>
</template>

<script setup lang="ts">
import type { Photo } from '~/types';

defineProps<{
  photos: Photo[];
}>();

defineEmits<{
  (e: 'delete', photo: Photo): void;
}>();
</script>

<style scoped>
.mso-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 3rem;
}
</style>
