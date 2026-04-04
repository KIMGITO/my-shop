import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    image: string;
    unit: string;
    addedAt: string;
}

interface WishlistStore {
    items: WishlistItem[];
    isLoading: boolean;

    // Actions
    addItem: (item: Omit<WishlistItem, "addedAt">) => void;
    removeItem: (id: string) => void;
    toggleItem: (item: Omit<WishlistItem, "addedAt">) => boolean;
    clearWishlist: () => void;

    // Getters
    isInWishlist: (productId: string) => boolean;
    getWishlistCount: () => number;
    getItemById: (id: string) => WishlistItem | undefined;
}

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],
            isLoading: false,

            addItem: (item) => {
                const exists = get().isInWishlist(item.productId);
                if (!exists) {
                    set({
                        items: [
                            ...get().items,
                            { ...item, addedAt: new Date().toISOString() },
                        ],
                    });
                }
            },

            removeItem: (id) => {
                set({ items: get().items.filter((item) => item.id !== id) });
            },

            toggleItem: (item) => {
                const exists = get().isInWishlist(item.productId);
                if (exists) {
                    const existingItem = get().items.find(
                        (i) => i.productId === item.productId
                    );
                    if (existingItem) {
                        get().removeItem(existingItem.id);
                    }
                    return false;
                } else {
                    get().addItem(item);
                    return true;
                }
            },

            clearWishlist: () => set({ items: [] }),

            isInWishlist: (productId) => {
                return get().items.some((item) => item.productId === productId);
            },

            getWishlistCount: () => {
                return get().items.length;
            },

            getItemById: (id) => {
                return get().items.find((item) => item.id === id);
            },
        }),
        {
            name: "wishlist-storage",
        }
    )
);
