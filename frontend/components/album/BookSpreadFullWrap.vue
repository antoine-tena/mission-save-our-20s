<template>
  <div 
    class="book-page full-wrap-cover-page"
    :style="{ gridColumn: 'span 2', width: '800px', height: '520px', backgroundColor: activeAlbum?.cover_color || '#3d352e' }"
  >
    <div 
      class="studio-book-cover-wrapper full-wrap"
      :class="{ 'drag-over': isCoverDragOver }"
      @dragover="$emit('dragover', $event)"
      @dragleave="$emit('dragleave')"
      @drop="$emit('drop', $event)"
    >
      <div class="spine-line-cover"/>
      <div class="spine-glow-cover"/>
      
      <AlbumBookCoverPhoto
        type="front"
        :photo-url="activeAlbum?.cover_photo_url || null"
        placeholder-text="Couverture Enveloppante"
        description-text="Glissez-déposez une photo pour l'appliquer sur l'ensemble de la couverture"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  activeAlbum: any;
  isCoverDragOver: boolean;
}>();
defineEmits(['dragover', 'dragleave', 'drop', 'delete', 'toggle-wrap']);
</script>