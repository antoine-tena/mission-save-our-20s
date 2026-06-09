export interface StargazingSpot {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    date?: string;
    notes?: string;
    created_at: string;
}

export interface CelestialBody {
    name: string;
    type: string;
    magnitude: number;
    distance?: string;
    constellation?: string;
}
