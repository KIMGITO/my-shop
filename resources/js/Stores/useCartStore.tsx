import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    unit: string;
    sku?: string;
    maxQuantity?: number;
}

interface CartStore {
    items: CartItem[];
    isLoading: boolean;
    error: string | null;

    // Actions
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;

    // Getters
    getTotalItems: () => number;
    getTotalPrice: () => number;
    getItemCount: (productId: string) => number;
    getItemById: (id: string) => CartItem | undefined;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isLoading: false,
            error: null,

            addItem: (item) => {
                const existingItem = get().items.find((i) => i.id === item.id);

                if (existingItem) {
                    const newQuantity = Math.min(
                        existingItem.quantity + item.quantity,
                        item.maxQuantity || 99
                    );
                    set({
                        items: get().items.map((i) =>
                            i.id === item.id
                                ? { ...i, quantity: newQuantity }
                                : i
                        ),
                    });
                } else {
                    set({ items: [...get().items, item] });
                }
            },

            removeItem: (id) => {
                set({ items: get().items.filter((item) => item.id !== id) });
            },

            updateQuantity: (id, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(id);
                } else {
                    set({
                        items: get().items.map((item) =>
                            item.id === id ? { ...item, quantity } : item
                        ),
                    });
                }
            },

            clearCart: () => set({ items: [] }),

            getTotalItems: () => {
                return get().items.reduce(
                    (total, item) => total + item.quantity,
                    0
                );
            },

            getTotalPrice: () => {
                return get().items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                );
            },

            getItemCount: (productId) => {
                const item = get().items.find((i) => i.productId === productId);
                return item?.quantity || 0;
            },

            getItemById: (id) => {
                return get().items.find((i) => i.id === id);
            },
        }),
        {
            name: "cart-storage",
        }
    )
);
