<template>
  <div class="creator-card glass-card">
    <SocialPostCreatorHeader :avatar="avatar" :caption="caption" @update:caption="$emit('update:caption', $event)" />
    
    <div v-if="preview" class="creator-preview">
      <img :src="preview" class="preview-img" />
      <button class="remove-preview" @click="$emit('removeFile')">×</button>
    </div>

    <div class="creator-footer">
      <button class="btn-icon-label" @click="triggerFileInput">
        <Icon name="lucide:image" />
        Photo
      </button>
      <input ref="fileInput" type="file" class="hidden" accept="image/*" @change="$emit('fileChange', $event)" />
      <button class="btn-primary-glow" :disabled="!hasFile || isSubmitting" @click="$emit('submit')">
        {{ isSubmitting ? 'Publication...' : 'Publier' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
defineProps<{ avatar?: string | null; caption: string; preview: string | null; hasFile: boolean; isSubmitting: boolean; }>();
defineEmits(['update:caption', 'fileChange', 'removeFile', 'submit']);
const fileInput = ref<HTMLInputElement | null>(null);
const triggerFileInput = () => fileInput.value?.click();
</script>

<style scoped>
.glass-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; margin-bottom: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
.creator-preview { position: relative; margin-bottom: 1rem; border-radius: 12px; overflow: hidden; aspect-ratio: 16 / 9; }
.preview-img { width: 100%; height: 100%; object-fit: cover; }
.remove-preview { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.5); color: white; border: none; width: 24px; height: 24px; border-radius: 50%; cursor: pointer; }
.creator-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid #f1f5f9; }
.btn-icon-label { display: flex; align-items: center; gap: 8px; background: none; border: none; color: #4a5568; font-weight: 600; cursor: pointer; }
.btn-primary-glow { background: var(--clr-primary-500); color: white; border: none; padding: 8px 24px; border-radius: 10px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 14px rgba(202, 117, 214, 0.4); }
.btn-primary-glow:disabled { opacity: 0.5; }
.hidden { display: none; }
</style>
