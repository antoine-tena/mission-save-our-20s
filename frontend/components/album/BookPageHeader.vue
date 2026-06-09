<template>
  <div class="page-header-minimal">
    <!-- Floating Gold Stamp Icon -->
    <div v-if="page.sticker" class="page-stamp-seal-badge animate-bounce">
      <Icon :name="page.sticker" class="stamp-badge-icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  page: any;
}>();
</script>

<style scoped>
.page-header-minimal {
  position: relative;
  height: 24px;
  width: 100%;
  margin-bottom: 0.8rem;
  box-sizing: border-box;
}

.page-stamp-seal-badge {
  position: absolute;
  top: -4px;
  right: 0rem;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: 1.5px dashed #c5a880;
  color: #c5a880;
  box-shadow: 0 4px 8px rgba(0,0,0,0.03);
}

.stamp-badge-icon {
  font-size: 0.85rem;
}
</style>