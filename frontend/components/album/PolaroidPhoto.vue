<template>
  <div 
    :data-photo-id="photo.id"
    class="polaroid-frame shadow-md"
    :class="{ 'cropping-active': croppingPhotoId === photo.id }"
    :draggable="croppingPhotoId !== photo.id"
    :style="{
      width: croppingPhotoId === photo.id ? tempWidth + 'px' : (photo.custom_width ? photo.custom_width + 'px' : '100%'),
      height: croppingPhotoId === photo.id ? tempHeight + 'px' : (photo.custom_height ? photo.custom_height + 'px' : '100%')
    }"
    @dragstart="onDragStart($event)"
    @dblclick="startCropping"
  >
    <div v-if="croppingPhotoId !== photo.id" class="washi-tape"></div>
    
    <div 
      class="image-crop-container"
      @mousedown="croppingPhotoId === photo.id ? onCropMouseDown($event) : null"
    >
      <img 
        :src="photo.image_url" 
        class="slot-image font-sans" 
        :style="getImageStyle()"
      />
    </div>

    <button 
      v-if="croppingPhotoId !== photo.id" 
      type="button" 
      class="delete-photo-btn" 
      @click.stop="deletePhoto"
    >
      <Icon name="lucide:x" />
    </button>

    <!-- Crop Controls -->
    <AlbumCropToolbar v-if="croppingPhotoId === photo.id" v-model="tempCropScale" />

    <!-- Resize Handles -->
    <template v-if="croppingPhotoId === photo.id">
      <div class="resize-handle resize-handle-r" @mousedown="startResizing($event, 'r')"></div>
      <div class="resize-handle resize-handle-b" @mousedown="startResizing($event, 'b')"></div>
      <div class="resize-handle resize-handle-se" @mousedown="startResizing($event, 'se')">
        <Icon name="lucide:arrow-down-right" class="text-[8px] text-gray-400" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';
import { usePhotoCrop } from '~/composables/usePhotoCrop';

const props = defineProps<{ photo: any; pageId: number }>();
const { fetchAlbumDetail, draggedPhotoId, draggedSourcePageId } = useAlbumEditorStore();

const {
  croppingPhotoId,
  tempCropScale,
  tempWidth,
  tempHeight,
  startCropping: _startCropping,
  onCropMouseDown,
  startResizing,
  getImageStyle: _getImageStyle,
} = usePhotoCrop();

const startCropping = () => _startCropping(props.photo, `.polaroid-frame[data-photo-id="${props.photo.id}"]`);
const getImageStyle = () => _getImageStyle(props.photo);

const onDragStart = (e: DragEvent) => {
  draggedPhotoId.value = props.photo.id;
  draggedSourcePageId.value = props.pageId;
  e.dataTransfer?.setData('text/plain', props.photo.id.toString());
};

const deletePhoto = async () => {
  if (confirm('Retirer cette photo de la page ?')) {
    try {
      const config = useRuntimeConfig();
      const token = useCookie<string | null>('auth_token');
      await $fetch(`${config.public.apiBase}/photos/${props.photo.id}/`, {
        method: 'PATCH', headers: { Authorization: `Token ${token.value}` }, body: { page: null, order: 0 }
      });
      await fetchAlbumDetail(props.pageId, true);
    } catch (err) { console.error(err); }
  }
};
</script>

<style scoped>
.polaroid-frame { width: 100%; height: 100%; background: #ffffff; border-radius: 4px; padding: 6px 6px 18px 6px; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 6px 16px rgba(0,0,0,0.06); position: relative; display: flex; flex-direction: column; overflow: hidden; transform: rotate(-1deg); min-height: 0; cursor: grab; transition: transform 0.3s, box-shadow 0.3s; }
.polaroid-frame.cropping-active { transform: none !important; z-index: 50; box-shadow: 0 10px 25px rgba(99,102,241,0.25); border-color: rgba(99,102,241,0.4); cursor: default; overflow: visible !important; }
.washi-tape { position: absolute; top: -14px; left: 50%; transform: translateX(-50%) rotate(-2deg); width: 55px; height: 22px; background-color: rgba(220, 210, 190, 0.45); backdrop-filter: blur(1px); border-left: 2px dashed rgba(0,0,0,0.03); border-right: 2px dashed rgba(0,0,0,0.03); z-index: 5; pointer-events: none; }
.image-crop-container { width: 100%; height: 100%; overflow: hidden; position: relative; background: #f7f6f2; border-radius: 2px; }
.slot-image { width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
.polaroid-frame.cropping-active .image-crop-container { cursor: grab; }
.polaroid-frame.cropping-active .image-crop-container:active { cursor: grabbing; }
.delete-photo-btn { position: absolute; top: 10px; right: 10px; background: rgba(239, 68, 68, 0.9); border: none; color: white; width: 20px; height: 20px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 10px; z-index: 10; opacity: 0; transition: opacity 0.2s; }
.polaroid-frame:hover .delete-photo-btn { opacity: 1; }

.resize-handle { position: absolute; z-index: 110; background: transparent; transition: background 0.2s; }
.resize-handle:hover { background: rgba(99,102,241,0.2); }
.resize-handle-r { top: 0; right: 0; bottom: 0; width: 6px; cursor: col-resize; }
.resize-handle-b { left: 0; right: 0; bottom: 0; height: 6px; cursor: row-resize; }
.resize-handle-se { right: 2px; bottom: 2px; width: 14px; height: 14px; cursor: nwse-resize; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.03); border-radius: 3px; }
.resize-handle-se:hover { background: #6366f1; color: white; }
</style>