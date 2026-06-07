<template>
  <div class="wishlist-page">
    <div class="mso-scrapbook-bg"></div>

    <header class="page-header container">
      <div class="header-text">
        <h1 class="page-title">Notre Wishlist <Icon name="lucide:clipboard-list" /></h1>
        <p class="page-subtitle">Toutes ces choses qu'on veut vivre ensemble.</p>
      </div>
      <button @click="openCreateForm" class="btn-add">Ajouter une envie</button>
    </header>

    <div class="container main-content">
      <WishlistFilters 
        v-model:status="filterStatus"
        v-model:initiator="filterInitiator"
        v-model:favoritesOnly="filterFavorites"
      />

      <WishlistGrid 
        :items="filteredItems"
        @update="handleUpdate"
        @delete="handleDelete"
        @edit="openEditForm"
      />
    </div>

    <WishlistForm 
      v-if="showForm"
      :item="editingItem"
      :is-edit="!!editingItem.id"
      @close="closeForm"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { WishlistItem } from '~/types';

const { items, fetchItems, createItem, updateItem, deleteItem } = useWishlist();

const filterStatus = ref('');
const filterInitiator = ref('');
const filterFavorites = ref(false);
const showForm = ref(false);
const editingItem = ref<Partial<WishlistItem>>({});

const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchStatus = !filterStatus.value || item.status === filterStatus.value;
    const matchInitiator = !filterInitiator.value || item.initiator === filterInitiator.value;
    const matchFavorite = !filterFavorites.value || item.is_favorite;
    return matchStatus && matchInitiator && matchFavorite;
  });
});

const openCreateForm = () => {
  editingItem.value = { status: 'IDEA', initiator: 'BOTH', is_favorite: false };
  showForm.value = true;
};

const openEditForm = (item: WishlistItem) => {
  editingItem.value = { ...item };
  showForm.value = true;
};

const closeForm = () => {
  showForm.value = false;
  editingItem.value = {};
};

const handleSubmit = async (itemData: Partial<WishlistItem>) => {
  if (itemData.id) {
    await updateItem(itemData.id, itemData);
  } else {
    await createItem(itemData);
  }
  closeForm();
};

const handleUpdate = async (id: number, data: Partial<WishlistItem>) => {
  await updateItem(id, data);
};

const handleDelete = async (id: number) => {
  if (confirm('Supprimer cette envie ?')) {
    await deleteItem(id);
  }
};

onMounted(fetchItems);

useSeoMeta({ title: 'Wishlist — MSO20s' });
</script>

<style scoped>
.wishlist-page { min-height: 100vh; padding-top: calc(var(--header-height) + 3rem); padding-bottom: 6rem; }
.mso-scrapbook-bg { position: fixed; inset: 0; background-color: #ffffff; background-image: radial-gradient(#ca75d615 1.5px, transparent 1.5px); background-size: 30px 30px; z-index: -1; }
.page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; }
.page-title { font-family: var(--font-display); font-size: 3.5rem; color: var(--clr-neutral-900); letter-spacing: -1px; }
.page-subtitle { color: var(--clr-primary-500); font-weight: 700; margin-top: 0.5rem; }
.btn-add { background: #1a1a1a; color: white; border: none; padding: 10px 24px; border-radius: 50px; font-weight: 800; cursor: pointer; transition: all 0.3s; }
.btn-add:hover { background: #ca75d6; transform: translateY(-2px); }
</style>
