<template>
  <BaseModal
    :show="true"
    :title="isEdit ? 'Modifier une envie' : 'Ajouter une envie'"
    icon="lucide:heart"
    max-width="max-w-md"
    @close="$emit('close')"
  >
    <form @submit.prevent="$emit('submit', localItem)">
      <div class="form-group">
        <label>Titre</label>
        <input v-model="localItem.title" type="text" required placeholder="Ex: Voyage au Japon" >
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Qui ?</label>
          <select v-model="localItem.initiator">
            <option value="BOTH">Ensemble</option>
            <option value="ANTOINE">Antoine</option>
            <option value="AMANI">Amani</option>
          </select>
        </div>
        <div class="form-group">
          <label>Statut</label>
          <select v-model="localItem.status">
            <option value="IDEA">Idée</option>
            <option value="IN_PROGRESS">En cours</option>
            <option value="DONE">Réalisé</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Prix estimé</label>
          <input v-model.number="localItem.price" type="number" step="0.01" placeholder="0.00" >
        </div>
        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input v-model="localItem.is_favorite" type="checkbox" >
            Coup de cœur ❤️
          </label>
        </div>
      </div>

      <div class="form-group">
        <label>Lien (URL)</label>
        <input v-model="localItem.link" type="url" placeholder="https://..." >
      </div>

      <div class="form-actions-row">
        <button type="button" class="btn-secondary" @click="$emit('close')">Annuler</button>
        <button type="submit" class="btn-primary">Sauvegarder</button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { WishlistItem } from '~/types';

const props = defineProps<{
  item: Partial<WishlistItem>;
  isEdit: boolean;
}>();

defineEmits(['submit', 'close']);

const localItem = ref({ ...props.item });
</script>

<style scoped>
.form-group { display: flex; flex-direction: column; gap: 4px; margin-bottom: 1rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-group label { font-size: 0.8rem; font-weight: 800; color: #718096; }
input, select { padding: 10px; border: 1px solid #edf2f7; border-radius: 8px; width: 100%; outline: none; }
input:focus, select:focus { border-color: #ca75d6; }
.checkbox-group { justify-content: center; align-items: flex-start; padding-top: 1.5rem; }
.checkbox-label { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; font-weight: 700; color: #4a5568; cursor: pointer; }
.form-actions-row { display: flex; gap: 1rem; margin-top: 1.5rem; }
.btn-primary { flex: 1; background: #1a1a1a; color: white; padding: 10px; border: none; border-radius: 8px; font-weight: 800; cursor: pointer; transition: background 0.2s; }
.btn-primary:hover { background: #ca75d6; }
.btn-secondary { flex: 1; background: #edf2f7; color: #4a5568; padding: 10px; border: none; border-radius: 8px; cursor: pointer; transition: background 0.2s; }
.btn-secondary:hover { background: #e2e8f0; }
</style>
