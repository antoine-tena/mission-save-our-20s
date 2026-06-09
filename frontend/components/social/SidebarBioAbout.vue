<template>
  <div class="glass-card bio-card">
    <h3 class="sidebar-title">À propos</h3>
    <div v-if="!isEditing" class="bio-display">
      <p class="bio-text">{{ bio || "Cet aventurier n'a pas encore écrit sa légende..." }}</p>
      <button v-if="isOwnProfile" class="btn-text-only" @click="$emit('startEdit')">Modifier la bio</button>
    </div>
    <div v-else class="bio-editor">
      <textarea v-model="localBio" class="bio-edit-input" maxlength="500"></textarea>
      <button class="btn-save-mini" @click="$emit('save', localBio)">Enregistrer</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps<{ bio: string; isEditing: boolean; isOwnProfile: boolean }>();
const emit = defineEmits(['startEdit', 'save']);
const localBio = ref(props.bio);
watch(() => props.bio, (n) => localBio.value = n);
</script>

<style scoped>
.glass-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; margin-bottom: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
.sidebar-title { font-size: 14px; font-weight: 700; color: #4a5568; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; }
.bio-text { font-size: 14px; line-height: 1.6; color: #4a5568; margin-bottom: 1rem; }
.bio-edit-input { width: 100%; min-height: 100px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; font-family: inherit; margin-bottom: 1rem; }
.btn-text-only { background: none; border: none; color: var(--clr-primary-500); font-weight: 600; font-size: 0.8rem; cursor: pointer; padding: 0; }
.btn-save-mini { background: var(--clr-primary-500); color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer; }
</style>
