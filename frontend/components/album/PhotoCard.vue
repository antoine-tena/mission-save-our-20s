<template>
  <article class="polaroid" :style="{ '--rotation': rotation, '--delay': delay }">
    <div class="polaroid__wrapper">
      <div class="polaroid__img-box">
        <img :src="photo.image_url" :alt="photo.titre" loading="lazy" >
        <div class="polaroid__overlay">
          <button class="btn-delete" @click.stop="$emit('delete', photo)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
          </button>
        </div>
      </div>
      <AlbumPhotoCardContent :photo="photo" />
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Photo } from '~/types';
defineProps<{ photo: Photo; rotation: string; delay: string; }>();
defineEmits<{ (e: 'delete', photo: Photo): void; }>();
</script>

<style scoped>
.polaroid { opacity: 0; transform: translateY(20px) rotate(var(--rotation)); animation: fadeInUp 0.6s var(--delay) forwards ease-out; }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0) rotate(var(--rotation)); } }
.polaroid__wrapper { background: white; padding: 1rem 1rem 3rem 1rem; box-shadow: 0 15px 35px rgba(0,0,0,0.06); border: 1px solid #f0f0f0; transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.polaroid:hover .polaroid__wrapper { transform: translateY(-10px) scale(1.02) rotate(0deg); box-shadow: 0 25px 50px rgba(0,0,0,0.1); z-index: 10; }
.polaroid__img-box { aspect-ratio: 1; overflow: hidden; background: #f8f8f8; position: relative; cursor: zoom-in; }
.polaroid__img-box img { width: 100%; height: 100%; object-fit: cover; filter: contrast(1.05) saturate(1.1); }
.polaroid__overlay { position: absolute; top: 10px; right: 10px; opacity: 0; transition: opacity 0.3s; }
.polaroid:hover .polaroid__overlay { opacity: 1; }
.btn-delete { background: rgba(255,255,255,0.9); color: #ff4d4d; border: none; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
</style>
