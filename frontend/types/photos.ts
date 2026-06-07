export interface Photo {
  id: number; author_name: string | null; titre: string;
  description: string | null; image_url: string;
  latitude: number | null; longitude: number | null; date_creation: string;
}

export interface PhotoFormState { titre: string; description: string; fichier: File | null; apercu: string | null; }
export interface PhotoFormErrors { titre: string; fichier: string; description: string; global: string; }
