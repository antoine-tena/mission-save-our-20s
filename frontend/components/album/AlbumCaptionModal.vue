<template>
  <Transition name="fade">
    <div v-if="isOpen && photo" class="caption-modal-overlay" @click.self="closeModal">
      <div class="caption-modal glass-card">
        <h4>Légende pour la Photo du Slot {{ slotIdx + 1 }}</h4>
        <img :src="photo.image_url" class="caption-preview-img" >
        <textarea 
          v-model="tempCaption" 
          placeholder="Écrivez une petite légende ou anecdote pour cette photo..." 
          rows="3" 
          class="caption-textarea"
        />
        <div class="caption-actions">
          <button type="button" class="btn-cancel" @click="closeModal">Annuler</button>
          <button type="button" class="btn-save" @click="saveCaption">Sauvegarder</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{ 
  isOpen: boolean; 
  photo: any; 
  slotIdx: number; 
  albumId: number; 
}>();
const emit = defineEmits(['close', 'saved']);

const tempCaption = ref('');

watch(() => props.isOpen, (newVal) => {
  if (newVal && props.photo) {
    tempCaption.value = props.photo.caption || '';
  }
});

const closeModal = () => {
  emit('close');
};

const saveCaption = async () => {
  if (props.photo) {
    try {
      const { recordHistory } = useAlbumHistory();
      recordHistory();
      const api = useApi();
      await api.patch(`/photos/${props.photo.id}/`, { caption: tempCaption.value });
      emit('saved');
      closeModal();
    } catch (err) {
      console.error(err);
    }
  }
};
</script>