<template>
  <div class="wishlist-form-overlay" @click.self="$emit('close')">
    <div class="wishlist-form card glass-card">
      <h2 class="form-title">{{ isEdit ? 'Modifier' : 'Ajouter' }} une envie</h2>
      
      <form @submit.prevent="$emit('submit', localItem)">
        <div class="form-group">
          <label>Titre</label>
          <input v-model="localItem.title" type="text" required placeholder="Ex: Voyage au Japon" />
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
            <input v-model.number="localItem.price" type="number" step="0.01" placeholder="0.00" />
          </div>
          <div class="form-group checkbox-group">
            <label>
              <input v-model="localItem.is_favorite" type="checkbox" />
              Coup de cœur ❤️
            </label>
          </div>
        </div>

        <div class="form-group">
          <label>Lien (URL)</label>
          <input v-model="localItem.link" type="url" placeholder="https://..." />
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" @click="$emit('close')">Annuler</button>
          <button type="submit" class="btn-primary">Sauvegarder</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WishlistItem } from '~/types';

const props = defineProps<{
  item: Partial<WishlistItem>;
  isEdit: boolean;
}>();

const emit = defineEmits(['submit', 'close']);

const localItem = ref({ ...props.item });
</script>

<style scoped>
.wishlist-form-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.4);
  display: flex; align-items: center; justify-content: center; z-index: 1000;
}
.wishlist-form { width: 90%; max-width: 500px; padding: 2rem; }
.form-title { font-family: var(--font-display); margin-bottom: 1.5rem; text-align: center; }
.form-group { display: flex; flex-direction: column; gap: 4px; margin-bottom: 1rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-group label { font-size: 0.8rem; font-weight: 800; color: #718096; }
input, select { padding: 10px; border: 1px solid #edf2f7; border-radius: 8px; }
.checkbox-group { justify-content: center; }
.form-actions { display: flex; gap: 1rem; margin-top: 1rem; }
.btn-primary { flex: 1; background: #1a1a1a; color: white; padding: 10px; border: none; border-radius: 8px; font-weight: 800; cursor: pointer; }
.btn-secondary { flex: 1; background: #edf2f7; color: #4a5568; padding: 10px; border: none; border-radius: 8px; cursor: pointer; }
</style>
