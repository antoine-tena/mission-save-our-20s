<template>
  <div class="creator-header">
    <img v-if="avatar" :src="avatar" class="small-avatar" />
    <div v-else class="small-avatar fallback-avatar-small">
      <Icon name="lucide:user" class="fallback-icon-small" />
    </div>
    <textarea 
      :value="caption" 
      placeholder="Quoi de neuf dans votre mission ?" 
      class="creator-input"
      @input="$emit('update:caption', ($event.target as HTMLTextAreaElement).value)"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
defineProps<{ avatar?: string | null; caption: string }>();
defineEmits(['update:caption']);
</script>

<style scoped>
.creator-header { display: flex; gap: 16px; margin-bottom: 16px; }
.small-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
.fallback-avatar-small { background: #fff0f9; color: #ca75d6; display: flex; align-items: center; justify-content: center; }
.fallback-icon-small { font-size: 1.1rem; }
.creator-input { flex: 1; border: none; background: #f7fafc; border-radius: 12px; padding: 12px; resize: none; height: 80px; font-family: inherit; }
</style>
