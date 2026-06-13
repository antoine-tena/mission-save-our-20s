import { ref } from 'vue';
import type { AlbumData } from '~/types/album';

export const activeAlbum = ref<AlbumData | null>(null);
export const isLoading = ref(false);
export const uploadQueue = ref<{ file: File; previewUrl: string; status: 'pending' | 'uploading' | 'success' | 'failed' }[]>([]);
export const draggedPhotoId = ref<number | null>(null);
export const draggedSourcePageId = ref<number | null>(null);
export const isSidebarCollapsed = ref(false);
export const activeSidebarTab = ref('photos');
export const focusedPhotoId = ref<number | null>(null);
export const activePageIdx = ref(0);
export const croppingPhotoId = ref<number | null>(null);
export const tempCropScale = ref(1.0);
export const canvasZoom = ref(100);
