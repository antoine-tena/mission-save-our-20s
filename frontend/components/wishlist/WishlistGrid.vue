<template>
  <div class="wishlist-grid">
    <div v-if="items.length === 0" class="empty-state">
      <div class="empty-icon">✨</div>
      <p>Aucune idée pour le moment. Lançons un projet !</p>
    </div>
    <div v-else class="grid-container">
      <WishlistCard 
        v-for="item in items" 
        :key="item.id" 
        :item="item" 
        @update="$emit('update', item.id, $event)"
        @delete="$emit('delete', item.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WishlistItem } from '~/types';

defineProps<{
  items: WishlistItem[];
}>();

defineEmits<{
  (e: 'update', id: number, data: Partial<WishlistItem>): void;
  (e: 'delete', id: number): void;
}>();
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-6);
}

.empty-state {
  text-align: center;
  padding: var(--space-20) 0;
  color: var(--clr-neutral-400);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: var(--space-4);
}
</style>
