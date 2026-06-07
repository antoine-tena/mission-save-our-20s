export interface GameType { id: number; name: string; icon: string; }
export interface GameSession {
  id: number; game_type: number; game_type_name: string; game_type_icon: string;
  date: string; amani_score: number; antoine_score: number; location: string;
  notes: string; winner: string; created_at: string;
}
export interface ScoreboardStats {
  overall: { amani_wins: number; antoine_wins: number; draws: number; };
  by_game: { game_type: string; icon: string; amani_wins: number; antoine_wins: number; total: number; }[];
}
