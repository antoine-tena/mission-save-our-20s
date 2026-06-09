<template>
  <div class="wishlist-filters glass-card">
    <div class="filter-group">
      <label>Statut</label>
      <select :value="status" @change="$emit('update:status', ($event.target as HTMLSelectElement).value)">
        <option value="">Tous</option>
        <option value="IDEA">Idée</option>
        <option value="IN_PROGRESS">En cours</option>
        <option value="DONE">Réalisé</option>
      </select>
    </div>

    <div class="filter-group">
      <label>Initiateur</label>
      <select :value="initiator" @change="$emit('update:initiator', ($event.target as HTMLSelectElement).value)">
        <option value="">Tous</option>
        <option value="BOTH">Ensemble</option>
        <option value="ANTOINE">Antoine</option>
        <option value="AMANI">Amani</option>
      </select>
    </div>

    <div class="filter-group checkbox">
      <label>
        <input type="checkbox" :checked="favoritesOnly" @change="$emit('update:favoritesOnly', ($event.target as HTMLInputElement).checked)" />
        Coups de cœur ❤️
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  status: string;
  initiator: string;
  favoritesOnly: boolean;
}>();

defineEmits(['update:status', 'update:initiator', 'update:favoritesOnly']);
</script>

<style scoped>
.wishlist-filters {
  display: flex;
  gap: var(--space-6);
  padding: var(--space-4) var(--space-6);
  margin-bottom: var(--space-8);
  flex-wrap: wrap;
  align-items: center;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.filter-group.checkbox {
  flex-direction: row;
  align-items: center;
  margin-top: 1.2rem;
}

.filter-group label {
  font-size: var(--text-xs);
  font-weight: var(--fw-bold);
  color: var(--clr-neutral-500);
  text-transform: uppercase;
}

select {
  padding: 8px 12px;
  border: 1px solid var(--clr-neutral-200);
  border-radius: var(--radius-md);
  background: white;
}
</style>
