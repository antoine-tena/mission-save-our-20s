<template>
  <div class="min-h-screen pt-[calc(var(--header-height)+3rem)] pb-24 bg-slate-50 overflow-hidden relative selection:bg-fuchsia-200">
    <!-- Animated modern background -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[5%] right-[10%] w-[30rem] h-[30rem] bg-fuchsia-300/20 rounded-full blur-[100px] animate-pulse" style="animation-duration: 7s;"></div>
      <div class="absolute bottom-[10%] left-[5%] w-[40rem] h-[40rem] bg-indigo-300/20 rounded-full blur-[120px] animate-pulse" style="animation-duration: 9s;"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <header class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <h1 class="font-display text-5xl md:text-6xl font-bold text-slate-800 tracking-tight flex items-center gap-4">
            Notre Wishlist <Icon name="lucide:clipboard-list" class="text-fuchsia-500 w-12 h-12" />
          </h1>
          <p class="text-fuchsia-600 font-semibold mt-2 text-lg uppercase tracking-widest">Toutes ces choses qu'on veut vivre ensemble.</p>
        </div>
        <button @click="openCreateForm" class="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-fuchsia-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:shadow-fuchsia-500/30 flex items-center gap-2 self-start md:self-end">
          <Icon name="lucide:plus" class="w-5 h-5" /> Ajouter une envie
        </button>
      </header>

      <div class="flex flex-col xl:flex-row gap-8">
        <div class="xl:w-1/4">
          <div class="sticky top-[calc(var(--header-height)+2rem)] backdrop-blur-xl bg-white/60 border border-white/50 p-6 rounded-3xl shadow-xl">
            <h3 class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Icon name="lucide:filter" class="w-5 h-5 text-fuchsia-500"/> Filtres</h3>
            <WishlistFilters 
              v-model:status="filterStatus"
              v-model:initiator="filterInitiator"
              v-model:favoritesOnly="filterFavorites"
            />
          </div>
        </div>

        <div class="xl:w-3/4">
          <WishlistGrid 
            :items="filteredItems"
            @update="handleUpdate"
            @delete="handleDelete"
            @edit="openEditForm"
            class="backdrop-blur-md bg-white/40 p-6 rounded-3xl border border-white/40 shadow-lg"
          />
        </div>
      </div>
    </div>

    <!-- Modal Form -->
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
import { useWishlist } from '~/composables/useWishlist';

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
