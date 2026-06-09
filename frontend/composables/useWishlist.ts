import { ref, computed } from 'vue';
import type { WishlistItem, WishlistStatus, WishlistInitiator } from '~/types';

export const useWishlist = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || 'http://127.0.0.1:8000/api';
  const { token } = useAuth();

  const items = ref<WishlistItem[]>([]);
  const isLoading = ref(false);

  const fetchItems = async () => {
    isLoading.value = true;
    try {
      const data = await $fetch<WishlistItem[]>(`${apiBase}/wishlist/`, {
        headers: { Authorization: `Token ${token.value}` }
      });
      items.value = data;
    } catch (err) {
      console.error('Wishlist load error:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const createItem = async (itemData: Partial<WishlistItem>) => {
    try {
      await $fetch(`${apiBase}/wishlist/`, {
        method: 'POST',
        headers: { Authorization: `Token ${token.value}` },
        body: itemData
      });
      await fetchItems();
      return true;
    } catch (err) {
      console.error('Wishlist create error:', err);
      return false;
    }
  };

  const updateItem = async (id: number, itemData: Partial<WishlistItem>) => {
    try {
      await $fetch(`${apiBase}/wishlist/${id}/`, {
        method: 'PATCH',
        headers: { Authorization: `Token ${token.value}` },
        body: itemData
      });
      await fetchItems();
      return true;
    } catch (err) {
      console.error('Wishlist update error:', err);
      return false;
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await $fetch(`${apiBase}/wishlist/${id}/`, {
        method: 'DELETE',
        headers: { Authorization: `Token ${token.value}` }
      });
      items.value = items.value.filter(i => i.id !== id);
      return true;
    } catch (err) {
      console.error('Wishlist delete error:', err);
      return false;
    }
  };

  return {
    items: readonly(items),
    isLoading,
    fetchItems,
    createItem,
    updateItem,
    deleteItem
  };
};
