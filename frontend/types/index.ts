export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Photo {
  id: number;
  titre: string;
  description: string | null;
  image_url: string;
  date_creation: string;
}

export interface PhotoFormState {
  titre: string;
  description: string;
  fichier: File | null;
  apercu: string | null;
}

export interface PhotoFormErrors {
  titre: string;
  fichier: string;
  description: string;
  global: string;
}
