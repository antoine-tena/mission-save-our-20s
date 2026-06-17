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

export interface RichPostAttachment {
  id: number;
  file_name: string;
  file_type: 'IMAGE' | 'VIDEO' | 'PDF' | 'OTHER';
  caption: string | null;
  location: string | null;
  file_url: string;
}

export interface RichPost {
  id: number;
  author: User;
  title: string | null;
  caption: string | null;
  location: string | null;
  created_at: string;
  attachments: RichPostAttachment[];
  event_date: string | null;
  event_time: string | null;
  weather_info: string | null;
  likes_count: number;
  is_liked_by_me: boolean;
  is_bookmarked_by_me: boolean;
}

