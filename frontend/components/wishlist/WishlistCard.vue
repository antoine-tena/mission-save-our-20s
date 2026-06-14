<template>
  <div class="wishlist-card glass-card" :class="{ 'is-favorite': item.is_favorite }">
    <div class="card-header">
      <span class="initiator-badge" :class="item.initiator.toLowerCase()">
        {{ initiatorLabel }}
      </span>
      <button class="favorite-btn" @click="$emit('update', { is_favorite: !item.is_favorite })">
        <Icon :name="item.is_favorite ? 'lucide:heart' : 'lucide:heart'" :class="{ 'filled': item.is_favorite }" />
      </button>
    </div>

    <h3 class="item-title">{{ item.title }}</h3>
    
    <div class="item-meta">
      <span class="status-pill" :class="item.status.toLowerCase()">
        {{ statusLabel }}
      </span>
      <span v-if="item.price" class="price">{{ item.price }}€</span>
    </div>

    <div class="card-footer">
      <a v-if="item.link" :href="item.link" target="_blank" class="link-btn">Voir le lien</a>
      <div class="actions">
        <button class="action-btn edit" @click="$emit('edit', item)">
          <Icon name="lucide:pencil" />
        </button>
        <button class="action-btn delete" @click="$emit('delete')">
          <Icon name="lucide:trash-2" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WishlistItem } from '~/types';

const props = defineProps<{
  item: WishlistItem;
}>();

defineEmits(['update', 'delete', 'edit']);

const initiatorLabel = computed(() => {
  const map = { 'ANTOINE': 'Antoine', 'AMANI': 'Amani', 'BOTH': 'Ensemble' };
  return map[props.item.initiator];
});

const statusLabel = computed(() => {
  const map = { 'IDEA': 'Idée', 'IN_PROGRESS': 'En cours', 'DONE': 'Réalisé' };
  return map[props.item.status];
});
</script>

<style scoped>
.wishlist-card {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  position: relative;
  transition: transform var(--transition-normal);
}

.wishlist-card:hover {
  transform: translateY(-5px);
}

.is-favorite {
  border: 2px solid var(--clr-primary-400);
  box-shadow: 0 10px 25px rgba(202, 117, 214, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.initiator-badge {
  font-size: var(--text-xs);
  font-weight: var(--fw-bold);
  padding: 4px 10px;
  border-radius: var(--radius-full);
}

.initiator-badge.antoine { background: #ebf8ff; color: #2b6cb0; }
.initiator-badge.amani { background: #fff0f9; color: #c40e75; }
.initiator-badge.both { background: #f3e5f5; color: #ca75d6; }

.item-title {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  color: var(--clr-neutral-900);
}

.status-pill {
  font-size: var(--text-xs);
  padding: 4px 8px;
  border-radius: var(--radius-md);
}

.status-pill.idea { background: var(--clr-neutral-100); color: var(--clr-neutral-600); }
.status-pill.in_progress { background: #fffaf0; color: #b7791f; }
.status-pill.done { background: var(--clr-success-light); color: var(--clr-success-dark); }

.card-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.link-btn {
  font-size: var(--text-xs);
  color: var(--clr-primary-500);
  font-weight: var(--fw-bold);
  text-decoration: underline;
}

.favorite-btn, .action-btn {
  background: none;
  border: none;
  cursor: pointer;
}

.favorite-btn { color: #cbd5e0; transition: all 0.2s; }
.favorite-btn .filled { color: #ff4d6d; }
.favorite-btn:hover { transform: scale(1.2); }
.action-btn { color: #94a3b8; font-size: 0.9rem; margin-left: 8px; }
.action-btn:hover { color: var(--clr-primary-500); }
.action-btn.delete:hover { color: #f56565; }
</style>
