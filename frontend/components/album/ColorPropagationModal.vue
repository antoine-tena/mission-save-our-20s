<template>
  <div class="color-modal-overlay" @click.self="$emit('close')">
    <div class="modal-sheet glass-card">
      <header class="sheet-header">
        <h3 class="font-serif">Dupliquer la Couleur</h3>
        <p class="subtitle">Sélectionnez les pages qui recevront la couleur : <span class="color-badge font-mono" :style="{ backgroundColor: color }">{{ color }}</span></p>
      </header>

      <div class="pages-list-container">
        <div v-for="(p, index) in pagesToSelect" :key="p.id" class="page-checkbox-item">
          <input 
            :id="'chk-' + p.id" 
            v-model="selectedPageIds" 
            type="checkbox" 
            :value="p.id" 
            class="mso-checkbox"
          >
          <label :for="'chk-' + p.id" class="font-sans checkbox-label">
            <span class="p-num">Page {{ index + 1 }}</span>
            <span v-if="p.title" class="p-title"> - {{ p.title }}</span>
          </label>
        </div>
      </div>

      <footer class="sheet-footer">
        <button type="button" class="btn-cancel" @click="$emit('close')">Annuler</button>
        <button type="button" class="btn-apply" :disabled="selectedPageIds.length === 0" @click="applyColor">
          Appliquer ({{ selectedPageIds.length }})
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';

const props = defineProps<{
  pageId: number;
  color: string;
}>();

const emit = defineEmits(['close']);

const { activeAlbum, updatePageField } = useAlbumEditorStore();
const selectedPageIds = ref<number[]>([]);

const pagesToSelect = computed(() => {
  return activeAlbum.value?.pages.filter(p => p.id !== props.pageId) || [];
});

const applyColor = async () => {
  for (const id of selectedPageIds.value) {
    await updatePageField(id, 'background_color', props.color);
  }
  emit('close');
};
</script>

<style scoped>
.color-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(8px); z-index: 2500; display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
.modal-sheet { max-width: 440px; width: 100%; padding: 2.5rem; background: white; border-radius: 20px; border: 1px solid rgba(197, 168, 128, 0.2); box-shadow: 0 30px 60px rgba(0,0,0,0.12); }
.sheet-header { margin-bottom: 1.5rem; border-b: 1px solid #f3f0ea; padding-bottom: 1rem; }
.sheet-header h3 { font-size: 1.3rem; font-weight: 800; color: #2d2a26; }
.subtitle { font-size: 0.8rem; color: #8c7e6e; margin-top: 0.4rem; }
.color-badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-weight: 700; color: #1e1b18; font-size: 0.75rem; border: 1px solid rgba(0,0,0,0.1); margin-left: 4px; }

.pages-list-container { max-height: 200px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.8rem; padding: 4px; margin-bottom: 1.5rem; }
.page-checkbox-item { display: flex; align-items: center; gap: 10px; cursor: pointer; }
.mso-checkbox { width: 16px; height: 16px; accent-color: #6366f1; cursor: pointer; }
.checkbox-label { font-size: 0.85rem; cursor: pointer; color: #52473e; }
.p-num { font-weight: 700; color: #2d2a26; }
.p-title { color: #8c7e6e; font-style: italic; }

.sheet-footer { display: flex; gap: 1rem; border-top: 1px solid #f3f0ea; padding-top: 1.2rem; }
.sheet-footer button { flex: 1; padding: 12px; border-radius: 50px; font-weight: 800; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; border: none; }
.btn-cancel { background: #f3f0ea; color: #52473e; }
.btn-cancel:hover { background: #e0d9cf; }
.btn-apply { background: #2d2a26; color: white; }
.btn-apply:hover:not(:disabled) { background: #6366f1; }
.btn-apply:disabled { opacity: 0.5; cursor: not-allowed; }
</style>