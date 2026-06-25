<template>
  <div class="photo-tray-sidebar">
    <div class="tray-header">
      <div class="tray-header-titles">
        <h4 class="tray-title font-sans">{{ photos.length }} photos disponibles</h4>
      </div>
      <button 
        v-if="photos.length > 0"
        type="button" 
        class="clear-tray-btn"
        @click="onClearPhotos"
      >
        <Icon name="lucide:trash-2" class="clear-icon" /> Vider
      </button>
    </div>

    <!-- Scrollable 2-by-2 columns grid container -->
    <div class="tray-grid-scroll">
      <!-- Quick Mass Upload Trigger -->
      <div class="tray-upload-btn-card" @click="triggerFileInput">
        <Icon name="lucide:cloud-upload" class="upload-icon" />
        <span>Uploader</span>
        <input ref="fileInput" type="file" multiple class="hidden" accept="image/*" @change="handleMassFileChange" >
      </div>

      <!-- Drag and Drop items queue -->
      <div v-for="(q, qIdx) in uploadQueue" :key="qIdx" class="tray-shimmer-item">
        <img :src="q.previewUrl" class="shimmer-img" >
        <Icon v-if="q.status === 'uploading'" name="lucide:loader-2" class="spin status-loader" />
      </div>

      <!-- Standing raw photos (rendered 2x2 in columns) -->
      <div 
        v-for="photo in photos" 
        :key="photo.id" 
        class="tray-photo-card polaroid-tray-style"
        draggable="true" 
        @dragstart="onDragStart($event, photo.id)"
      >
        <img :src="photo.image_url" class="tray-img" >
        <div class="tray-polaroid-edge"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';
import { usePhotos } from '~/composables/usePhotos';

const props = defineProps<{
  photos: any[];
  pageId?: number;
}>();

const { uploadQueue, uploadPhotosToPage, draggedPhotoId, draggedSourcePageId, fetchAlbumDetail, activeAlbum } = useAlbumEditorStore();
const { fetchPhotos, clearAllPhotos } = usePhotos();
const fileInput = ref<HTMLInputElement>();

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleMassFileChange = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    await uploadPhotosToPage(props.pageId, files);
    await fetchPhotos();
  }
};

const onDragStart = (e: DragEvent, id: number) => {
  draggedPhotoId.value = id;
  draggedSourcePageId.value = null; // Came from tray
  e.dataTransfer?.setData('text/plain', id.toString());
};

const onClearPhotos = async () => {
  if (confirm('Voulez-vous vider TOUTES les photos de la bibliothèque (partie gauche) ? Les photos déjà placées dans l\'album ne seront pas touchées.')) {
    await clearAllPhotos();
    if (activeAlbum.value) {
      await fetchAlbumDetail(activeAlbum.value.id, true);
    }
  }
};
</script>

<style scoped>
.photo-tray-sidebar { display: flex; flex-direction: column; flex: 1; min-height: 0; width: 100%; border-top: 1px solid #f3f0ea; padding-top: 1.5rem; margin-top: 1rem; }
.tray-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.tray-header-titles { display: flex; flex-direction: column; gap: 2px; }
.tray-title { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #8c7e6e; letter-spacing: 1px; margin: 0; }
.photo-counter { font-size: 0.65rem; font-weight: 700; color: #c5a880; background: #faf9f6; padding: 2px 8px; border-radius: 50px; width: fit-content; }

.clear-tray-btn { display: flex; align-items: center; gap: 4px; font-size: 0.65rem; font-weight: 800; color: #ef4444; background: #fef2f2; border: 1px solid rgba(239, 68, 68, 0.15); border-radius: 6px; padding: 4px 8px; cursor: pointer; text-transform: uppercase; letter-spacing: 0.5px; transition: all 0.2s; }
.clear-tray-btn:hover { background: #fee2e2; color: #b91c1c; border-color: rgba(239, 68, 68, 0.3); transform: translateY(-1px); }
.clear-icon { font-size: 0.75rem; }

.tray-grid-scroll { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; overflow-y: auto; padding: 4px; flex: 1; min-height: 0; align-content: start; }

.tray-upload-btn-card { aspect-ratio: 1; border-radius: 12px; border: 2px dashed #c5a880; background: #faf9f6; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; color: #8c7e6e; gap: 4px; transition: all 0.2s; }
.tray-upload-btn-card:hover { background: white; border-color: #6366f1; color: #6366f1; }
.upload-icon { font-size: 1.5rem; }
.tray-upload-btn-card span { font-size: 0.75rem; font-weight: 700; }
.hidden { display: none; }

.tray-shimmer-item { aspect-ratio: 1; border-radius: 12px; overflow: hidden; position: relative; background: #e2e8f0; }
.shimmer-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.4; filter: blur(2px); }
.status-loader { position: absolute; inset: 0; margin: auto; font-size: 1.5rem; color: #2d2a26; }

.polaroid-tray-style { aspect-ratio: 1; border-radius: 8px; overflow: hidden; cursor: grab; position: relative; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 4px 8px rgba(0,0,0,0.05); transition: all 0.3s; background: white; padding: 4px 4px 12px 4px; }
.polaroid-tray-style:hover { transform: translateY(-4px) rotate(-1.5deg); box-shadow: 0 8px 16px rgba(0,0,0,0.1); }
.tray-img { width: 100%; height: 100%; object-fit: cover; border-radius: 2px; }
.tray-polaroid-edge { position: absolute; bottom: 0; left: 0; right: 0; height: 10px; background: white; }

.spin { animation: spin 1s linear infinite; }
@keyframes spin { 100% { transform: rotate(360deg); } }
</style>