<template>
  <div class="cover-container" :style="coverStyle" @click="$emit('edit')">
    <div class="cover-overlay">
      <span class="cover-hint">Changer la couverture</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{ coverUrl: string | null | undefined }>();
defineEmits(['edit']);
const coverStyle = computed(() => ({
  backgroundImage: props.coverUrl ? `url(${props.coverUrl})` : 'linear-gradient(45deg, #ca75d6, #eec0c6)',
  backgroundSize: 'cover', backgroundPosition: 'center'
}));
</script>

<style scoped>
.cover-container { height: 320px; position: relative; cursor: pointer; overflow: hidden; }
.cover-overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,0.1);
  display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s;
}
.cover-container:hover .cover-overlay { opacity: 1; }
.cover-hint { color: white; background: rgba(0,0,0,0.5); padding: 8px 16px; border-radius: 20px; font-size: 14px; }
</style>
