<template>
  <div 
    v-if="activeAlbum?.show_cover_photo" 
    class="book-cover-image-container"
    :class="{ 'cropping-active': isCropping }"
    @dblclick.stop="startCropping"
    @mousedown="isCropping ? onCropMouseDown($event) : null"
  >
    <div class="book-cover-image" :draggable="draggable" @dragstart="$emit('dragstart', $event)">
      <img 
        v-if="photoUrl" 
        :src="photoUrl" 
        :alt="type === 'front' ? 'Couverture' : 'Couverture de fin'" 
        :style="getImageStyle()"
        class="cover-img-elem"
      />
      <div v-else class="empty-cover-placeholder-studio-full">
        <Icon name="lucide:cloud-upload" class="empty-icon-studio-full" />
        <p>{{ placeholderText }}</p>
        <span>{{ descriptionText }}</span>
      </div>
      <div v-if="!isCropping" class="cover-wash" :style="washStyle"></div>
    </div>

    <!-- Crop Controls Overlay -->
    <AlbumCropToolbar v-if="isCropping" v-model="tempCropScale" style="bottom: 16px; left: 16px; right: 16px;" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';
import { usePhotoCrop } from '~/composables/usePhotoCrop';

const props = defineProps<{
  type: 'front' | 'back';
  photoUrl: string | null;
  placeholderText: string;
  descriptionText: string;
  draggable?: boolean;
}>();

const emit = defineEmits(['dragstart']);

const { activeAlbum } = useAlbumEditorStore();
const {
  croppingPhotoId,
  tempCropScale,
  startCropping: _startCropping,
  onCropMouseDown,
  getImageStyle: _getImageStyle,
} = usePhotoCrop();

const isCropping = computed(() => croppingPhotoId.value === (props.type === 'front' ? -1 : -2));

const washStyle = computed(() => {
  if (props.type === 'back') {
    return { background: 'linear-gradient(to left, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 5%, transparent 12%)' };
  }
  return {};
});

const startCropping = () => {
  if (!activeAlbum.value || !props.photoUrl) return;
  const mockPhoto = {
    id: props.type === 'front' ? -1 : -2,
    crop_x: props.type === 'front' ? activeAlbum.value.cover_crop_x : activeAlbum.value.back_cover_crop_x,
    crop_y: props.type === 'front' ? activeAlbum.value.cover_crop_y : activeAlbum.value.back_cover_crop_y,
    crop_scale: props.type === 'front' ? activeAlbum.value.cover_crop_scale : activeAlbum.value.back_cover_crop_scale,
    is_cover: true,
    cover_type: props.type
  };
  _startCropping(mockPhoto, '.book-cover-image-container.cropping-active');
};

const getImageStyle = () => {
  if (!activeAlbum.value) return {};
  const mockPhoto = {
    id: props.type === 'front' ? -1 : -2,
    crop_x: props.type === 'front' ? activeAlbum.value.cover_crop_x : activeAlbum.value.back_cover_crop_x,
    crop_y: props.type === 'front' ? activeAlbum.value.cover_crop_y : activeAlbum.value.back_cover_crop_y,
    crop_scale: props.type === 'front' ? activeAlbum.value.cover_crop_scale : activeAlbum.value.back_cover_crop_scale,
  };
  return _getImageStyle(mockPhoto);
};
</script>

<style scoped>
.book-cover-image-container:hover .cover-overlay-minimal { opacity: 1; }
.book-cover-image-container { width: 100%; height: 100%; position: absolute; inset: 0; z-index: 1; }
.book-cover-image-container.cropping-active { z-index: 50; box-shadow: 0 10px 25px rgba(99,102,241,0.25); border: 1px solid rgba(99,102,241,0.4); }
.book-cover-image { width: 100%; height: 100%; position: absolute; inset: 0; overflow: hidden; }
.cover-img-elem { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.85) sepia(0.08); pointer-events: none; }
.cover-wash { position: absolute; inset: 0; background: linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 5%, transparent 12%); z-index: 2; pointer-events: none; }
.empty-cover-placeholder-studio-full { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #52473e; color: #ebdcd0; gap: 8px; padding: 2rem; text-align: center; box-sizing: border-box; }
.empty-icon-studio-full { font-size: 2.2rem; color: #ebdcd0; opacity: 0.5; }
.empty-cover-placeholder-studio-full p { font-size: 0.8rem; font-weight: 800; color: #ebdcd0; margin: 0; }
.empty-cover-placeholder-studio-full span { font-size: 0.65rem; color: #c5a880; }
</style>