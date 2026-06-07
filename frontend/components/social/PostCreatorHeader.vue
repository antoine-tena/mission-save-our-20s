<template>
  <div class="creator-header">
    <img :src="avatar || '/default-avatar.png'" class="small-avatar" />
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
.creator-input { flex: 1; border: none; background: #f7fafc; border-radius: 12px; padding: 12px; resize: none; height: 80px; font-family: inherit; }
</style>
