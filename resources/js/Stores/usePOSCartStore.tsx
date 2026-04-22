// stores/posCartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types/pos";
import axios from "axios";
import { router } from "@inertiajs/react";

export interface ParkedCart {
    id: string;
    name: string;
    items: {
        id: number | string;
        quantity: number;
        price: number;
    }[];
    subtotal: number;
    tax: number;
    total: number;
    parkedAt: Date | string;
    customerId?: string;
    notes?: string;
    orderNumber: string;
}

interface POSCartStore {
    // State
    cart: CartItem[];
    orderNumber: string;
    customerId: string;
    notes: string;
    parkedCarts: ParkedCart[];

    // Actions - Cart Management
    addToCart: (product: Product) => void;
    updateQuantity: (id: string, quantity: number) => void;
    removeItem: (id: string) => void;
    clearCart: () => Promise<void>;
    setOrderNumber: (orderNumber: string) => void;
    setCustomerId: (id: string) => void;
    setNotes: (notes: string) => void;

    // Actions - Cart Parking
    parkCurrentCart: (
        cartName: string,
        customerId?: string,
        notes?: string
    ) => Promise<string>;
    loadParkedCart: (cartId: string) => void;
    deleteParkedCart: (cartId: string) => void;
    updateParkedCartName: (cartId: string, newName: string) => void;

    // Utility & Computed
    refreshOrderNumber: () => Promise<string>;
    getSubtotal: () => number;
    getTax: (taxRate?: number) => number;
    getTotal: (taxRate?: number) => number;
    getItemCount: () => number;
    getCartSummary: () => {
        subtotal: number;
        tax: number;
        total: number;
        itemCount: number;
    };
}

export const usePOSCartStore = create<POSCartStore>()(
    persist(
        (set, get) => ({
            // Initial state
            cart: [],
            orderNumber: "",
            customerId: "",
            notes: "",
            parkedCarts: [],

            // Add to cart
            addToCart: async (product) => {
                const { cart, orderNumber, refreshOrderNumber } = get();

                if (!orderNumber) {
                    await refreshOrderNumber();
                }

                const existingItem = cart.find(
                    (item) => item.id === product.id
                );

                if (existingItem) {
                    set({
                        cart: cart.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    });
                } else {
                    set({
                        cart: [...cart, { ...product, quantity: 1 }],
                    });
                }
            },

            updateQuantity: (id, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(id);
                } else {
                    set({
                        cart: get().cart.map((item) =>
                            item.id === id ? { ...item, quantity } : item
                        ),
                    });
                }
            },

            removeItem: (id) => {
                set({ cart: get().cart.filter((item) => item.id !== id) });
            },

            clearCart: async () => {
                // Clear the cart and get a fresh order number
                // const nextNumber = await get().refreshOrderNumber();

                set({
                    cart: [],
                    customerId: "",
                    notes: "",
                    orderNumber: "",
                });
            },

            setOrderNumber: (orderNumber) => set({ orderNumber }),
            setCustomerId: (id) => set({ customerId: id }),
            setNotes: (notes) => set({ notes }),

            parkCurrentCart: async (cartName, customerId, notes) => {
                const state = get();

                if (state.cart.length === 0) {
                    throw new Error("Cannot park empty cart");
                }

                // Save current order number with parked cart
                const currentOrderNumber = state.orderNumber;

                const parkedCart: ParkedCart = {
                    id: Date.now().toString(),
                    name: cartName || `Cart ${state.parkedCarts.length + 1}`,
                    items: [
                        ...state.cart.map((item) => ({
                            id: item.id,
                            quantity: item.quantity,
                            price: item.price,
                        })),
                    ],
                    subtotal: state.getSubtotal(),
                    tax: state.getTax(),
                    total: state.getTotal(),
                    parkedAt: new Date(),
                    customerId: customerId || state.customerId,
                    notes: notes || state.notes,
                    orderNumber: currentOrderNumber,
                };

                try {
                    router.patch(route("orders.park"), parkedCart, {
                        onSuccess: (response) => {
                            console.log(response.data);
                        },
                        onError: (error) => {
                            console.log(error);
                        },
                    });
                } catch (error) {
                    console.log(error);
                    throw error;
                }

                // Get new order number for the next cart
                const nextNumber = await get().refreshOrderNumber();

                set({
                    parkedCarts: [...state.parkedCarts, parkedCart],
                    cart: [],
                    customerId: "",
                    notes: "",
                    orderNumber: "",
                });

                return parkedCart.id;
            },

            loadParkedCart: (cartId) => {
                const { parkedCarts } = get();
                const parkedCart = parkedCarts.find((c) => c.id === cartId);

                if (parkedCart) {
                    set({
                        cart: [...parkedCart.items],
                        customerId: parkedCart.customerId || "",
                        notes: parkedCart.notes || "",
                        orderNumber: parkedCart.orderNumber, // Restore order number
                    });
                    get().deleteParkedCart(cartId);
                }
            },

            deleteParkedCart: (cartId) => {
                set({
                    parkedCarts: get().parkedCarts.filter(
                        (c) => c.id !== cartId
                    ),
                });
            },

            updateParkedCartName: (cartId, newName) => {
                set({
                    parkedCarts: get().parkedCarts.map((c) =>
                        c.id === cartId ? { ...c, name: newName } : c
                    ),
                });
            },

            refreshOrderNumber: async () => {
                try {
                    const response = await axios.get(
                        "/api/v1/pos/orders/order-number"
                    );
                    const orderNumber = response.data.orderNumber;
                    set({ orderNumber: orderNumber });
                    return orderNumber;
                } catch (error) {
                    console.error("Order number fetch failed", error);
                    // Generate a temporary order number if API fails
                    const tempNumber = `TEMP-${Date.now()}`;
                    set({ orderNumber: tempNumber });
                    return tempNumber;
                }
            },

            getSubtotal: () =>
                get().cart.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                ),
            getTax: (taxRate = 0.08) => get().getSubtotal() * taxRate,
            getTotal: (taxRate = 0.08) =>
                get().getSubtotal() + get().getTax(taxRate),
            getItemCount: () =>
                get().cart.reduce((count, item) => count + item.quantity, 0),

            getCartSummary: () => {
                const subtotal = get().getSubtotal();
                const tax = get().getTax();
                const total = get().getTotal();
                const itemCount = get().getItemCount();
                return { subtotal, tax, total, itemCount };
            },
        }),
        {
            name: "pos-cart-storage",
            partialize: (state) => ({
                cart: state.cart,
                parkedCarts: state.parkedCarts.map((cart) => ({
                    ...cart,
                    orderNumber: cart.orderNumber, // Preserve order numbers for parked carts
                })),
                customerId: state.customerId,
                notes: state.notes,
                orderNumber: state.orderNumber,
            }),
        }
    )
);
