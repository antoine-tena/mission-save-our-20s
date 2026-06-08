<template>
  <div class="glass-card status-card">
    <h3 class="sidebar-title">Humeur du moment</h3>
    <p v-if="!isOwnProfile" class="status-display">{{ status || 'Pas d\'humeur particulière...' }}</p>
    <input 
      v-else
      v-model="localStatus" 
      class="status-input" 
      placeholder="Quelle est votre vibe ?"
      @blur="$emit('save', localStatus)"
      @keyup.enter="$emit('save', localStatus)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps<{ status: string; isOwnProfile: boolean }>();
defineEmits(['save']);
const localStatus = ref(props.status);
watch(() => props.status, (n) => localStatus.value = n);
</script>

<style scoped>
.glass-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; margin-bottom: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
.sidebar-title { font-size: 14px; font-weight: 700; color: #4a5568; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; }
.status-input { width: 100%; border: none; background: #f7fafc; padding: 8px 12px; border-radius: 8px; font-size: 14px; }
.status-display { font-size: 14px; color: #4a5568; font-style: italic; }
</style>
