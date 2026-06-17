<template>
  <div class="phone-gallery-wrapper">
    <!-- Clean, minimalist square photo grid -->
    <section class="phone-gallery-grid">
      <div 
        v-for="photo in photos" 
        :key="photo.id" 
        class="gallery-square-item"
        @click="selectedPhoto = photo"
      >
        <img :src="photo.image_url" :alt="photo.titre" class="square-img" loading="lazy" />
      </div>
    </section>

    <!-- Fullscreen Lightbox Modal -->
    <Transition name="lightbox-fade">
      <div v-if="selectedPhoto" class="lightbox-overlay" @click.self="selectedPhoto = null">
        <!-- Close button -->
        <button class="lightbox-close" @click="selectedPhoto = null" title="Fermer">×</button>

        <!-- Gallery Browse Navigation -->
        <button class="gallery-nav-btn prev-arrow" @click="prevPhoto" :disabled="isFirst"><Icon name="lucide:chevron-left" /></button>
        <button class="gallery-nav-btn next-arrow" @click="nextPhoto" :disabled="isLast"><Icon name="lucide:chevron-right" /></button>

        <!-- Media frame -->
        <div class="lightbox-content-box">
          <img :src="selectedPhoto.image_url" :alt="selectedPhoto.titre" class="fullscreen-image" />
          
          <!-- Small metadata box underneath -->
          <div class="fullscreen-metadata font-sans">
            <div class="meta-header">
              <h3 class="meta-title font-serif">{{ selectedPhoto.titre }}</h3>
              <button class="meta-delete-btn" @click="triggerDelete" title="Supprimer de la galerie">
                <Icon name="lucide:trash-2" />
              </button>
            </div>
            <p v-if="selectedPhoto.description" class="meta-desc">{{ selectedPhoto.description }}</p>
            <div class="meta-small-details">
              <span>Ajouté le {{ formatDateShort(selectedPhoto.date_creation) }}</span>
              <span v-if="selectedPhoto.author_name"> • Par {{ selectedPhoto.author_name }}</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Photo } from '~/types';
import { formatDateShort } from '~/utils/formatters';

const props = defineProps<{ photos: Photo[]; }>();
const emit = defineEmits(['delete']);

const selectedPhoto = ref<Photo | null>(null);

const activeIdx = computed(() => selectedPhoto.value ? props.photos.findIndex(p => p.id === selectedPhoto.value?.id) : -1);
const isFirst = computed(() => activeIdx.value <= 0);
const isLast = computed(() => activeIdx.value === -1 || activeIdx.value >= props.photos.length - 1);

const prevPhoto = () => { if (!isFirst.value) selectedPhoto.value = props.photos[activeIdx.value - 1] || null; };
const nextPhoto = () => { if (!isLast.value) selectedPhoto.value = props.photos[activeIdx.value + 1] || null; };

const triggerDelete = () => {
  if (selectedPhoto.value) {
    emit('delete', selectedPhoto.value);
    selectedPhoto.value = null;
  }
};
</script>

<style scoped>
.phone-gallery-wrapper { width: 100%; position: relative; }

/* Clean, minimalist responsive square photo grid */
.phone-gallery-grid { 
  display: grid; 
  grid-template-columns: repeat(2, 1fr); 
  gap: 16px; 
  background: transparent; 
  width: 100%; 
}

@media (min-width: 640px) { 
  .phone-gallery-grid { grid-template-columns: repeat(3, 1fr); } 
}
@media (min-width: 1024px) { 
  .phone-gallery-grid { grid-template-columns: repeat(4, 1fr); } 
}
@media (min-width: 1280px) { 
  .phone-gallery-grid { grid-template-columns: repeat(5, 1fr); } 
}

.gallery-square-item { 
  aspect-ratio: 1; 
  width: 100%; 
  overflow: hidden; 
  cursor: pointer; 
  background: #e2e8f0; 
  position: relative; 
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.02);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.gallery-square-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.06);
}
.square-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.gallery-square-item:hover .square-img { transform: scale(1.04); filter: brightness(0.95); }

/* Fullscreen Lightbox */
.lightbox-overlay { position: fixed; inset: 0; background: rgba(10, 9, 8, 0.95); backdrop-filter: blur(12px); z-index: 3000; display: flex; flex-direction: column; align-items: center; justify-content: center; animation: overlayFadeIn 0.3s; }
.lightbox-close { position: absolute; top: 1.5rem; right: 1.5rem; background: none; border: none; color: rgba(255,255,255,0.7); font-size: 2.2rem; cursor: pointer; transition: color 0.2s; z-index: 3010; }
.lightbox-close:hover { color: white; }

.gallery-nav-btn { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: white; width: 46px; height: 46px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; cursor: pointer; transition: all 0.2s; z-index: 3005; }
.gallery-nav-btn:hover:not(:disabled) { background: rgba(255,255,255,0.15); transform: translateY(-50%) scale(1.05); }
.gallery-nav-btn:disabled { opacity: 0.25; cursor: not-allowed; }
.prev-arrow { left: 2rem; }
.next-arrow { right: 2rem; }

.lightbox-content-box { display: flex; flex-direction: column; align-items: center; max-width: 800px; width: 90%; gap: 1.2rem; }
.fullscreen-image { max-height: 68vh; max-width: 100%; object-fit: contain; border-radius: 4px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); }

.fullscreen-metadata { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 1.2rem; border-radius: 12px; width: 100%; text-align: left; box-sizing: border-box; }
.meta-header { display: flex; justify-content: space-between; align-items: center; }
.meta-title { font-size: 1.15rem; font-weight: 800; color: white; margin: 0; }
.meta-delete-btn { background: none; border: none; color: #f56565; cursor: pointer; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; padding: 4px; transition: transform 0.2s; }
.meta-delete-btn:hover { transform: scale(1.1); }
.meta-desc { font-size: 0.85rem; color: rgba(255,255,255,0.7); margin: 0.5rem 0 0 0; line-height: 1.5; }
.meta-small-details { font-size: 0.7rem; color: rgba(255,255,255,0.4); margin-top: 0.6rem; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700; }

.lightbox-fade-enter-active, .lightbox-fade-leave-active { transition: opacity 0.25s ease; }
.lightbox-fade-enter-from, .lightbox-fade-leave-to { opacity: 0; }
</style>