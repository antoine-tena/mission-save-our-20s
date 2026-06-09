<template>
  <Transition name="fade">
    <div v-if="modelValue" class="modal-overlay" @click.self="$emit('update:modelValue', false)">
      <div class="modal-card glass-card">
        <h2 class="title-serif font-serif">Nouveau Livre de Souvenirs</h2>
        <form @submit.prevent="handleCreate" class="create-form">
          <div class="form-group">
            <label>Nom de l'album</label>
            <input v-model="formTitle" type="text" placeholder="Ex: Notre escapade dans le Queyras..." required />
          </div>
          <div class="form-group">
            <label>Description (optionnelle)</label>
            <textarea v-model="formDesc" placeholder="Quelques mots pour retracer l'histoire..." rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>Photo de Couverture</label>
            <div class="custom-file-upload">
              <input type="file" accept="image/*" @change="e => formCover = (e.target as HTMLInputElement).files?.[0] || null" id="cover-file-input" />
              <label for="cover-file-input" class="file-label">
                <Icon name="lucide:image" />
                <span>{{ formCover ? formCover.name : 'Sélectionner une photo' }}</span>
              </label>
            </div>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="$emit('update:modelValue', false)">Annuler</button>
            <button type="submit" class="btn-submit" :disabled="isCreating">
              <Icon :name="isCreating ? 'lucide:loader-2' : 'lucide:save'" :class="{ 'spin': isCreating }" />
              <span>Créer le carnet</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(['update:modelValue', 'created']);

const { createNewAlbum } = useAlbumEditorStore();

const formTitle = ref('');
const formDesc = ref('');
const formCover = ref<File | null>(null);
const isCreating = ref(false);

const handleCreate = async () => {
  if (!formTitle.value.trim()) return;
  isCreating.value = true;
  try {
    const alb = await createNewAlbum(formTitle.value, formDesc.value, formCover.value);
    if (alb) {
      formTitle.value = '';
      formDesc.value = '';
      formCover.value = null;
      emit('created', alb);
      emit('update:modelValue', false);
    }
  } catch (err) {
    console.error(err);
  } finally {
    isCreating.value = false;
  }
};
</script>