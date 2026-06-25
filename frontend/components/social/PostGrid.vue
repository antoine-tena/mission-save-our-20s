<template>
  <div class="posts-grid">
    <div v-if="posts.length === 0" class="empty-state">
      <p>Aucune publication pour le moment.</p>
    </div>
    <div v-else class="grid-container">
      <div v-for="post in posts" :key="post.id" class="grid-item" @click="$emit('select', post)">
        <img :src="post.image_url" class="grid-img" >
        <div class="grid-overlay">
          <span class="overlay-stat">❤️ {{ post.likes_count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SocialPost } from '~/types';
defineProps<{ posts: SocialPost[] }>();
defineEmits(['select']);
</script>

<style scoped>
.grid-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; }
.grid-item { position: relative; aspect-ratio: 1; cursor: pointer; overflow: hidden; }
.grid-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.grid-item:hover .grid-img { transform: scale(1.1); }
.grid-overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,0.3);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.2s; color: white; font-weight: 800;
}
.grid-item:hover .grid-overlay { opacity: 1; }
.empty-state { text-align: center; padding: 4rem; color: var(--clr-neutral-400); }
</style>
