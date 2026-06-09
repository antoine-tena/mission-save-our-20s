<template>
  <div 
    class="book-page full-wrap-cover-page"
    :style="{ gridColumn: 'span 2', width: '640px', height: '440px', backgroundColor: activeAlbum?.cover_color || '#3d352e' }"
  >
    <div 
      class="studio-book-cover-wrapper full-wrap"
      :class="{ 'drag-over': isCoverDragOver }"
      @dragover="$emit('dragover', $event)"
      @dragleave="$emit('dragleave')"
      @drop="$emit('drop', $event)"
    >
      <div class="spine-line-cover"></div>
      <div class="spine-glow-cover"></div>
      
      <AlbumBookCoverPhoto
        type="front"
        :photo-url="activeAlbum?.cover_photo_url || null"
        placeholder-text="Couverture Enveloppante"
        description-text="Glissez-déposez une photo pour l'appliquer sur l'ensemble de la couverture"
        @delete="$emit('delete')"
        @toggle-wrap="$emit('toggle-wrap', $event)"
      />

      <!-- Left page overlay (back cover part) -->
      <div v-if="!activeAlbum?.show_cover_photo" class="cover-overlay-minimal left-overlay flex flex-col gap-2">
        <button type="button" class="delete-cover-btn-full-floating" @click.stop="$emit('delete')">
          <Icon name="lucide:trash-2" /> Retirer
        </button>
        <button type="button" class="toggle-wrap-btn-floating" @click.stop="$emit('toggle-wrap', false)">
          <Icon name="lucide:columns" /> Séparer en 2 couvertures
        </button>
      </div>

      <!-- Right page overlay (front cover part) -->
      <div v-if="!activeAlbum?.show_cover_photo" class="cover-overlay-minimal right-overlay flex flex-col gap-2">
        <button type="button" class="delete-cover-btn-full-floating" @click.stop="$emit('delete')">
          <Icon name="lucide:trash-2" /> Retirer
        </button>
        <button type="button" class="toggle-wrap-btn-floating" @click.stop="$emit('toggle-wrap', false)">
          <Icon name="lucide:columns" /> Séparer en 2 couvertures
        </button>
      </div>
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