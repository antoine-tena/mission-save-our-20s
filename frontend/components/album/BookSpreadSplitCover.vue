<template>
  <div v-if="type === 'back'" class="book-page left-page" :style="{ backgroundColor: activeAlbum?.cover_color || '#3d352e' }">
    <div 
      class="studio-book-cover-wrapper"
      :class="{ 'drag-over': isDragOver }"
      @dragover="$emit('dragover', $event)"
      @dragleave="$emit('dragleave')"
      @drop="$emit('drop', $event)"
    >
      <div class="book-spine-edge" style="border-radius: 0 4px 4px 0; left: auto; right: 0; transform: scaleX(-1);"></div>
      
      <AlbumBookCoverPhoto
        type="back"
        :photo-url="activeAlbum?.back_cover_photo_url || null"
        placeholder-text="Couverture de fin"
        description-text="Glissez-déposez une photo ici"
        :draggable="true"
        @dragstart="$emit('dragstart', $event)"
      />
      
      <div class="cover-overlay-minimal flex gap-2">
        <button v-if="activeAlbum?.back_cover_photo_url" type="button" class="delete-cover-btn-full-floating" @click.stop="$emit('delete')">
          <Icon name="lucide:trash-2" /> Retirer
        </button>
        <button type="button" class="toggle-wrap-btn-floating" @click.stop="$emit('toggle-wrap', true)">
          <Icon name="lucide:book-open" /> Rendre Enveloppante
        </button>
      </div>
    </div>
  </div>

  <div v-else class="book-page right-page" :style="{ backgroundColor: activeAlbum?.cover_color || '#3d352e' }">
    <div 
      class="studio-book-cover-wrapper"
      :class="{ 'drag-over': isDragOver }"
      @dragover="$emit('dragover', $event)"
      @dragleave="$emit('dragleave')"
      @drop="$emit('drop', $event)"
    >
      <div class="book-spine-edge"></div>
      
      <AlbumBookCoverPhoto
        type="front"
        :photo-url="activeAlbum?.cover_photo_url || null"
        placeholder-text="Couverture de début"
        description-text="Glissez-déposez une photo ici"
      />
      
      <div class="cover-overlay-minimal flex gap-2">
        <button type="button" class="delete-cover-btn-full-floating" @click.stop="$emit('delete')">
          <Icon name="lucide:trash-2" /> Retirer
      </button>
        <button type="button" class="toggle-wrap-btn-floating" @click.stop="$emit('toggle-wrap', true)">
          <Icon name="lucide:book-open" /> Rendre Enveloppante
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  activeAlbum: any;
  type: 'front' | 'back';
  isDragOver: boolean;
}>();
defineEmits(['dragover', 'dragleave', 'drop', 'delete', 'toggle-wrap', 'dragstart']);
</script>