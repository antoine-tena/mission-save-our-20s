<template>
  <BaseModal
    :show="modelValue"
    title="Nouveau Livre de Souvenirs"
    icon="lucide:book-open"
    max-width="max-w-md"
    @close="$emit('update:modelValue', false)"
  >
    <form class="create-form" @submit.prevent="handleCreate">
      <div class="form-group">
        <label>Nom de l'album</label>
        <input v-model="formTitle" type="text" placeholder="Ex: Notre escapade dans le Queyras..." required >
      </div>
      <div class="form-group">
        <label>Description (optionnelle)</label>
        <textarea v-model="formDesc" placeholder="Quelques mots pour retracer l'histoire..." rows="3"/>
      </div>
      <div class="form-group">
        <label>Photo de Couverture</label>
        <div class="custom-file-upload">
          <input id="cover-file-input" type="file" accept="image/*" @change="e => formCover = (e.target as HTMLInputElement).files?.[0] || null" >
          <label for="cover-file-input" class="file-label">
            <Icon name="lucide:image" />
            <span>{{ formCover ? formCover.name : 'Sélectionner une photo' }}</span>
          </label>
        </div>
      </div>
      <div class="modal-actions-row">
        <button type="button" class="btn-cancel" @click="$emit('update:modelValue', false)">Annuler</button>
        <button type="submit" class="btn-submit" :disabled="isCreating">
          <Icon :name="isCreating ? 'lucide:loader-2' : 'lucide:save'" :class="{ 'spin': isCreating }" />
          <span>Créer le carnet</span>
        </button>
      </div>
    </form>
  </BaseModal>
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

<style scoped>
.create-form { display: flex; flex-direction: column; gap: 1.2rem; }
.form-group { display: flex; flex-direction: column; gap: 4px; }
.form-group label { font-size: 0.8rem; font-weight: 800; color: #718096; text-transform: uppercase; letter-spacing: 0.05em; }
input[type="text"], textarea { padding: 10px; border: 1px solid #edf2f7; border-radius: 8px; width: 100%; outline: none; }
input[type="text"]:focus, textarea:focus { border-color: #ca75d6; }
.custom-file-upload { position: relative; }
.custom-file-upload input[type="file"] { display: none; }
.file-label { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; border: 2px dashed #edf2f7; border-radius: 8px; cursor: pointer; transition: all 0.2s; color: #718096; font-weight: 700; font-size: 0.9rem; }
.file-label:hover { border-color: #ca75d6; color: #ca75d6; background: #fff0f9; }
.modal-actions-row { display: flex; gap: 1rem; margin-top: 1rem; }
.btn-cancel { flex: 1; padding: 10px; border-radius: 8px; background: #edf2f7; color: #4a5568; font-weight: 700; cursor: pointer; border: none; transition: background 0.2s; }
.btn-cancel:hover { background: #e2e8f0; }
.btn-submit { flex: 1.5; padding: 10px; border-radius: 8px; background: #1a1a1a; color: white; font-weight: 800; cursor: pointer; border: none; display: flex; align-items: center; justify-content: center; gap: 6px; transition: background 0.2s; }
.btn-submit:hover:not(:disabled) { background: #ca75d6; }
.btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
.spin { animation: spin 1s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>
