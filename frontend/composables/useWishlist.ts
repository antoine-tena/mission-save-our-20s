import { ref, computed } from 'vue';
import type { WishlistItem, WishlistStatus, WishlistInitiator } from '~/types';

export const useWishlist = () => {
  const api = useApi();

  const items = ref<WishlistItem[]>([]);
  const isLoading = ref(false);

  const fetchItems = async () => {
    isLoading.value = true;
    try {
      items.value = await api.get<WishlistItem[]>('/wishlist/');
    } catch (err) {
      console.error('Wishlist load error:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const createItem = async (itemData: Partial<WishlistItem>) => {
    try {
      await api.post('/wishlist/', itemData);
      await fetchItems();
      return true;
    } catch (err) {
      console.error('Wishlist create error:', err);
      return false;
    }
  };

  const updateItem = async (id: number, itemData: Partial<WishlistItem>) => {
    try {
      await api.patch(`/wishlist/${id}/`, itemData);
      await fetchItems();
      return true;
    } catch (err) {
      console.error('Wishlist update error:', err);
      return false;
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await api.delete(`/wishlist/${id}/`);
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
