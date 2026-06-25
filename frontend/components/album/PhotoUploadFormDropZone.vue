<template>
  <div
    class="drop-zone"
    :class="{
      'drop-zone--dragging': isDragging,
      'drop-zone--filled': !!apercu,
      'drop-zone--error': hasError,
    }"
    @click="triggerFileInput"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="handleDrop"
  >
    <Transition name="fade" mode="out-in">
      <div v-if="apercu" class="drop-zone__preview">
        <img :src="apercu" alt="Aperçu" class="preview-img" >
        <button type="button" class="remove-btn" @click.stop="$emit('remove')">×</button>
      </div>
      <div v-else class="drop-zone__placeholder">
        <div class="upload-icon">
          <Icon name="lucide:camera" />
        </div>
        <p><strong>Déposez</strong> votre photo ici</p>
        <span class="hint">JPG, PNG ou WebP</span>
      </div>
    </Transition>
    <input ref="fileInput" type="file" class="hidden" accept="image/*" @change="$emit('change', $event)" >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{ apercu: string | null; hasError: boolean }>();
const emit = defineEmits(['change', 'remove', 'drop']);
const isDragging = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const triggerFileInput = () => fileInput.value?.click();
const handleDrop = (e: DragEvent) => {
  isDragging.value = false;
  const file = e.dataTransfer?.files[0];
  if (file) emit('drop', file);
};
</script>

<style scoped>
.drop-zone {
  aspect-ratio: 16 / 9; border: 2.5px dashed #ca75d644; border-radius: 15px;
  display: flex; align-items: center; justify-content: center; cursor: pointer;
  background: #fafafa; transition: all 0.3s; overflow: hidden; margin-bottom: 2rem;
}
.drop-zone:hover, .drop-zone--dragging { border-color: var(--clr-primary-500); background: #ca75d608; }
.drop-zone__placeholder { text-align: center; color: #999; }
.upload-icon { font-size: 3rem; margin-bottom: 10px; }
.preview-img { width: 100%; height: 100%; object-fit: cover; }
.remove-btn {
  position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.5);
  color: white; border: none; width: 24px; height: 24px; border-radius: 50%; cursor: pointer;
}
.hidden { display: none; }
</style>
