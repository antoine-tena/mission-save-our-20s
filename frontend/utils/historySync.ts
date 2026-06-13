import type { AlbumData } from '~/types/album';

export const syncAlbumFields = async (oldState: AlbumData, newState: AlbumData, headers: any, apiBase: string) => {
  const albumDiff: any = {};
  const albumFields = [
    'title', 'description', 'cover_color', 'show_cover_photo', 'is_full_wrap',
    'cover_crop_x', 'cover_crop_y', 'cover_crop_scale',
    'back_cover_crop_x', 'back_cover_crop_y', 'back_cover_crop_scale'
  ];
  albumFields.forEach(f => {
    if ((newState as any)[f] !== (oldState as any)[f]) {
      albumDiff[f] = (newState as any)[f];
    }
  });
  if (Object.keys(albumDiff).length > 0) {
    await $fetch(`${apiBase}/photos/albums/${newState.id}/`, {
      method: 'PATCH',
      headers,
      body: albumDiff
    });
  }
};

export const syncPageFields = async (oldPages: any[], newPages: any[], headers: any, apiBase: string) => {
  for (const newPage of newPages) {
    const oldPage = oldPages.find(p => p.id === newPage.id);
    if (!oldPage) continue;
    const pageDiff: any = {};
    const pageFields = ['title', 'description', 'layout_type', 'background_color', 'sticker', 'is_auto_color', 'order'];
    pageFields.forEach(f => {
      if (newPage[f] !== oldPage[f]) {
        pageDiff[f] = newPage[f];
      }
    });
    if (Object.keys(pageDiff).length > 0) {
      await $fetch(`${apiBase}/photos/pages/${newPage.id}/`, {
        method: 'PATCH',
        headers,
        body: pageDiff
      });
    }
  }
};

export const syncPhotoFields = async (oldPages: any[], newPages: any[], headers: any, apiBase: string) => {
  const oldPhotoPageMap = new Map<number, number | null>();
  const oldPhotosMap = new Map<number, any>();
  oldPages.forEach(p => {
    p.photos.forEach((ph: any) => {
      oldPhotoPageMap.set(ph.id, p.id);
      oldPhotosMap.set(ph.id, ph);
    });
  });

  const newPhotoPageMap = new Map<number, number | null>();
  const newPhotosMap = new Map<number, any>();
  newPages.forEach(p => {
    p.photos.forEach((ph: any) => {
      newPhotoPageMap.set(ph.id, p.id);
      newPhotosMap.set(ph.id, ph);
    });
  });

  const allPhotoIds = new Set([...oldPhotosMap.keys(), ...newPhotosMap.keys()]);

  for (const photoId of allPhotoIds) {
    const oldPhoto = oldPhotosMap.get(photoId);
    const newPhoto = newPhotosMap.get(photoId);
    const oldPageId = oldPhotoPageMap.get(photoId) ?? null;
    const newPageId = newPhotoPageMap.get(photoId) ?? null;

    const photoDiff: any = {};

    if (newPageId !== oldPageId) {
      photoDiff.page = newPageId;
    }

    if (newPhoto) {
      const fieldsToCheck = [
        'crop_x', 'crop_y', 'crop_scale', 
        'custom_width', 'custom_height', 
        'custom_x', 'custom_y', 'caption', 'order'
      ];
      fieldsToCheck.forEach(f => {
        const oldVal = oldPhoto ? oldPhoto[f] : undefined;
        const newVal = newPhoto[f];
        if (newVal !== oldVal) {
          photoDiff[f] = newVal;
        }
      });
    }

    if (Object.keys(photoDiff).length > 0) {
      await $fetch(`${apiBase}/photos/${photoId}/`, {
        method: 'PATCH',
        headers,
        body: photoDiff
      });
    }
  }
};

export const syncPageOrder = async (oldPages: any[], newPages: any[], albumId: number, headers: any, apiBase: string) => {
  const oldIds = oldPages.map(p => p.id);
  const newIds = newPages.map(p => p.id);
  if (JSON.stringify(oldIds) !== JSON.stringify(newIds)) {
    await $fetch(`${apiBase}/photos/albums/${albumId}/reorder/`, {
      method: 'POST',
      headers,
      body: { page_ids: newIds }
    });
  }
};

export const syncChanges = async (oldState: AlbumData, newState: AlbumData, headers: any, apiBase: string) => {
  try {
    await syncAlbumFields(oldState, newState, headers, apiBase);
    await syncPageFields(oldState.pages, newState.pages, headers, apiBase);
    await syncPhotoFields(oldState.pages, newState.pages, headers, apiBase);
    await syncPageOrder(oldState.pages, newState.pages, newState.id, headers, apiBase);
  } catch (err) {
    console.error('Failed to sync history state to backend:', err);
  }
};
