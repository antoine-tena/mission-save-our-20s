export type WishlistStatus = 'IDEA' | 'IN_PROGRESS' | 'DONE';
export type WishlistInitiator = 'ANTOINE' | 'AMANI' | 'BOTH';

export interface WishlistItem {
    id: number;
    title: string;
    status: WishlistStatus;
    initiator: WishlistInitiator;
    link?: string;
    price?: number;
    is_favorite: boolean;
    created_at: string;
}
