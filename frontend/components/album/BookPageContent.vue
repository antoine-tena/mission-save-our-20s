<template>
  <div class="page-content-wrapper select-none">
    <!-- If Text-Only Layout -->
    <div v-if="page.layout_type === 'text-only'" class="text-only-layout">
      <textarea 
        v-model="page.description" 
        placeholder="Ajouter vos mémoires..." 
        class="page-textarea font-serif" 
        rows="6"
        @save="val => onDescBlur(val)"
      />
    </div>

    <!-- Grid Layout with slots -->
    <div v-else class="slots-grid" :style="gridStyles">
      <div 
        v-for="sIdx in slotsCount" 
        :key="sIdx" 
        class="photo-slot"
        :class="{ 'drag-over': activeDragOverSlot === sIdx - 1 }"
        :style="getSlotItemStyle(sIdx - 1)"
        @dragover="onDragOver($event, sIdx - 1)" 
        @dragleave="onDragLeave(sIdx - 1)"
        @drop="onDrop($event, sIdx - 1)"
      >
        <AlbumPolaroidPhoto 
          v-if="getPhotoAtSlot(sIdx - 1)" 
          :photo="getPhotoAtSlot(sIdx - 1)"
          :page-id="page.id"
        />
        <div v-else class="empty-slot-placeholder">
          <Icon name="lucide:image" class="text-2xl opacity-35" /><span>Glisser photo</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';

const props = defineProps<{ page: any; }>();
const { updatePageField, fetchAlbumDetail, activeAlbum, draggedPhotoId, draggedSourcePageId } = useAlbumEditorStore();

const activeDragOverSlot = ref<number | null>(null);

const getPhotoAtSlot = (slotIdx: number) => {
  return props.page.photos?.find((p: any) => p.order === slotIdx) || null;
};

const slotsCount = computed(() => {
  const layoutType = props.page.layout_type;
  if (layoutType === 'full' || layoutType === 'scrapbook') return 1;
  if (layoutType === 'mosaic') return 3;
  if (layoutType === 'text-only') return 0;
  if (layoutType.startsWith('grid-')) {
    return parseInt(layoutType.split('-')[1]) || 1;
  }
  return 1;
});

const gridStyles = computed(() => {
  const count = slotsCount.value;
  if (count === 0) return {};
  if (count === 1) return { gridTemplateColumns: '1fr' };
  if (count === 2) return { gridTemplateColumns: '1fr 1fr', gap: '1rem' };
  if (count === 3) return { gridTemplateColumns: '1.2fr 1fr', gridTemplateRows: '1fr 1fr', gap: '0.6rem' };
  if (count === 4) return { gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '0.6rem' };
  if (count === 5) return { gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1.2fr 1fr', gap: '0.5rem' };
  if (count === 6) return { gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '0.5rem' };
  return { gridTemplateColumns: 'repeat(auto-fit, minmax(65px, 1fr))', gap: '0.4rem' };
});

const getSlotItemStyle = (sIdx: number) => {
  const count = slotsCount.value;
  if (count === 3 && sIdx === 0) return { gridRow: 'span 2', height: '100%' };
  if (count === 5 && sIdx === 0) return { gridColumn: 'span 2', height: '100%' };
  return {};
};

const onDescBlur = (val: string) => updatePageField(props.page.id, 'description', val);

const onDragOver = (e: DragEvent, slotIdx: number) => {
  e.preventDefault();
  activeDragOverSlot.value = slotIdx;
};

const onDragLeave = (slotIdx: number) => {
  if (activeDragOverSlot.value === slotIdx) {
    activeDragOverSlot.value = null;
  }
};

const onDrop = async (e: DragEvent, slotIdx: number) => {
  activeDragOverSlot.value = null;
  const droppedIdRaw = e.dataTransfer?.getData('text/plain');
  if (!droppedIdRaw || !/^\d+$/.test(droppedIdRaw)) return;
  const draggedId = parseInt(droppedIdRaw, 10);
  if (draggedPhotoId.value === null || draggedPhotoId.value !== draggedId) return;

  try {
    const config = useRuntimeConfig();
    const token = useCookie<string | null>('auth_token');
    const existingPhoto = getPhotoAtSlot(slotIdx);

    if (draggedSourcePageId.value !== null) {
      if (existingPhoto) {
        const originalPhoto = activeAlbum.value?.pages.flatMap(p => p.photos).find(ph => ph.id === draggedPhotoId.value);
        const originalOrder = originalPhoto ? originalPhoto.order : 0;
        await $fetch(`${config.public.apiBase}/photos/${existingPhoto.id}/`, {
          method: 'PATCH', headers: { Authorization: `Token ${token.value}` }, body: { page: draggedSourcePageId.value, order: originalOrder }
        });
      }
      await $fetch(`${config.public.apiBase}/photos/${draggedPhotoId.value}/`, {
        method: 'PATCH', headers: { Authorization: `Token ${token.value}` }, body: { page: props.page.id, order: slotIdx }
      });
    } else {
      if (existingPhoto) {
        await $fetch(`${config.public.apiBase}/photos/${existingPhoto.id}/`, {
          method: 'PATCH', headers: { Authorization: `Token ${token.value}` }, body: { page: null, order: 0 }
        });
      }
      await $fetch(`${config.public.apiBase}/photos/${draggedPhotoId.value}/`, {
        method: 'PATCH', headers: { Authorization: `Token ${token.value}` }, body: { page: props.page.id, order: slotIdx, duplicate: true }
      });
    }
    await fetchAlbumDetail(props.page.album, true);
  } catch (err) { console.error(err); }
  finally { 
    draggedPhotoId.value = null; 
    draggedSourcePageId.value = null; 
    activeDragOverSlot.value = null;
  }
};
</script>

<style scoped>
.page-content-wrapper { flex: 1; display: flex; flex-direction: column; justify-content: center; overflow: hidden; max-height: 335px; width: 100%; }
.text-only-layout { display: flex; align-items: center; justify-content: center; padding: 1rem; }
.page-textarea { border: none; outline: none; background: transparent; width: 100%; font-size: 0.95rem; color: #52473e; resize: none; text-align: center; line-height: 1.8; }

.slots-grid { display: grid; width: 100%; height: 100%; align-content: center; max-height: 330px; overflow: hidden; }
.photo-slot { aspect-ratio: 4/3; border: 1.5px dashed rgba(197,168,128,0.25); background: rgba(197,168,128,0.01); border-radius: 12px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.25s; overflow: visible; min-height: 0; position: relative; }
.photo-slot:hover { border-color: #6366f1; background: rgba(99,102,241,0.02); }
.photo-slot.drag-over { border-color: #6366f1; background: rgba(99,102,241,0.08); transform: scale(1.02); }
.empty-slot-placeholder { display: flex; flex-direction: column; align-items: center; gap: 4px; color: #8c7e6e; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
</style>