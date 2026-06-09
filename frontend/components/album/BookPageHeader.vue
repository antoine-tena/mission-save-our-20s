<template>
  <div class="page-header-minimal">
    <div class="page-number font-sans">Page {{ pageNum }}</div>
    
    <!-- Floating Gold Stamp Icon -->
    <div v-if="page.sticker" class="page-stamp-seal-badge animate-bounce">
      <Icon :name="page.sticker" class="stamp-badge-icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  page: any;
  pageNum: number;
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

.page-number {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  color: #b3a79a;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
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