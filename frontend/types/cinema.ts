export interface Movie {
  id: number;
  title: string;
  poster_url: string | null;
  date_seen: string;
  location?: string | null;
  tmdb_id?: number | null;
  overview?: string | null;
  director?: string | null;
  cast?: string | null;
  runtime?: number | null;
  genres?: string | null;
  antoine_review: string;
  antoine_rating: number | null;
  amani_review: string;
  amani_rating: number | null;
  created_at: string;
  added_by_username: string;
}

export interface TMDBSuggestion {
  id: number;
  title: string;
  release_year: string;
  poster_path: string | null;
}
