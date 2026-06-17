export interface User { id: number; username: string; email: string; avatar_url?: string | null; }
export interface AuthResponse { token: string; user: User; }
