import { User } from './auth';

export interface Profile {
  id: number; user: User; bio: string; status: string;
  avatar_url: string | null; cover_url: string | null;
  friends_count: number; points: number;
}

export interface SocialPost {
  id: number; author: User; image: string; image_url: string;
  caption: string; created_at: string; likes_count: number; is_liked: boolean;
}

export interface FriendRequest {
  id: number; from_user: User; to_user: User; created_at: string; accepted: boolean;
}
