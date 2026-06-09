export interface PhotoData {
  id: number;
  image_url: string;
  titre: string;
  description: string;
  caption: string;
  order: number;
  crop_x: number;
  crop_y: number;
  crop_scale: number;
  custom_width: number | null;
  custom_height: number | null;
}

export interface PageData {
  id: number;
  album: number;
  title: string;
  description: string;
  date: string | null;
  location: string | null;
  layout_type: 'full' | 'scrapbook' | 'mosaic' | 'text-only' | string;
  background_color: string;
  sticker: string | null;
  order: number;
  photos: PhotoData[];
}

export interface AlbumData {
  id: number;
  title: string;
  description: string;
  cover_photo_url: string | null;
  back_cover_photo_url: string | null;
  is_full_wrap: boolean;
  cover_color: string;
  show_cover_photo: boolean;
  cover_crop_x: number;
  cover_crop_y: number;
  cover_crop_scale: number;
  back_cover_crop_x: number;
  back_cover_crop_y: number;
  back_cover_crop_scale: number;
  pages: PageData[];
}