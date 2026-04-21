// stores/posCartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types/pos";

export interface ParkedCart {
    id: string;
    name: string;
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
    parkedAt: Date | string;
    customerName?: string;
    notes?: string;
    orderNumber?: string;
}

interface POSCartStore {
    // Active cart
    cart: CartItem[];
    orderNumber: string;
    customerName: string;
    notes: string;

    // Parked carts
    parkedCarts: ParkedCart[];

    // Actions - Cart Management
    addToCart: (product: Product) => void;
    updateQuantity: (id: string, quantity: number) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    setOrderNumber: (orderNumber: string) => void;
    setCustomerName: (name: string) => void;
    setNotes: (notes: string) => void;

    // Actions - Cart Parking
    parkCurrentCart: (
        cartName: string,
        customerName?: string,
        notes?: string
    ) => string;
    loadParkedCart: (cartId: string) => void;
    deleteParkedCart: (cartId: string) => void;
    updateParkedCartName: (cartId: string, newName: string) => void;

    // Computed values
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

    // Utility
    generateOrderNumber: () => string;
}

export const usePOSCartStore = create<POSCartStore>()(
    persist(
        (set, get) => ({
            // Initial state
            cart: [],
            orderNumber: `POS-${Math.floor(Math.random() * 10000)}`,
            customerName: "",
            notes: "",
            parkedCarts: [],

            // Add to cart
            addToCart: (product) => {
                const { cart } = get();
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

            // Update quantity
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

            // Remove item
            removeItem: (id) => {
                set({ cart: get().cart.filter((item) => item.id !== id) });
            },

            // Clear cart
            clearCart: () => {
                set({
                    cart: [],
                    customerName: "",
                    notes: "",
                    orderNumber: get().generateOrderNumber(),
                });
            },

            // Set order number
            setOrderNumber: (orderNumber) => set({ orderNumber }),

            // Set customer name
            setCustomerName: (name) => set({ customerName: name }),

            // Set notes
            setNotes: (notes) => set({ notes }),

            // Park current cart
            parkCurrentCart: (cartName, customerName, notes) => {
                const {
                    cart,
                    getSubtotal,
                    getTax,
                    getTotal,
                    orderNumber,
                    parkedCarts,
                    customerName: currentCustomer,
                    notes: currentNotes,
                } = get();

                if (cart.length === 0) {
                    throw new Error("Cannot park empty cart");
                }

                const subtotal = getSubtotal();
                const tax = getTax();
                const total = getTotal();

                const parkedCart: ParkedCart = {
                    id: Date.now().toString(),
                    name: cartName || `Cart ${parkedCarts.length + 1}`,
                    items: [...cart],
                    subtotal,
                    tax,
                    total,
                    parkedAt: new Date(),
                    customerName: customerName || currentCustomer,
                    notes: notes || currentNotes,
                    orderNumber: orderNumber,
                };

                set({
                    parkedCarts: [...parkedCarts, parkedCart],
                    cart: [],
                    customerName: "",
                    notes: "",
                    orderNumber: get().generateOrderNumber(),
                });

                return parkedCart.id;
            },

            // Load parked cart
            loadParkedCart: (cartId) => {
                const { parkedCarts } = get();
                const parkedCart = parkedCarts.find(
                    (cart) => cart.id === cartId
                );

                if (parkedCart) {
                    set({
                        cart: [...parkedCart.items],
                        customerName: parkedCart.customerName || "",
                        notes: parkedCart.notes || "",
                        orderNumber:
                            parkedCart.orderNumber ||
                            get().generateOrderNumber(),
                    });

                    // Optionally remove from parked carts (uncomment if you want to remove when loaded)
                    // get().deleteParkedCart(cartId);
                }
            },

            // Delete parked cart
            deleteParkedCart: (cartId) => {
                set({
                    parkedCarts: get().parkedCarts.filter(
                        (cart) => cart.id !== cartId
                    ),
                });
            },

            // Update parked cart name
            updateParkedCartName: (cartId, newName) => {
                set({
                    parkedCarts: get().parkedCarts.map((cart) =>
                        cart.id === cartId ? { ...cart, name: newName } : cart
                    ),
                });
            },

            // Computed values
            getSubtotal: () => {
                return get().cart.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                );
            },

            getTax: (taxRate = 0.08) => {
                return get().getSubtotal() * taxRate;
            },

            getTotal: (taxRate = 0.08) => {
                return get().getSubtotal() + get().getTax(taxRate);
            },

            getItemCount: () => {
                return get().cart.reduce(
                    (count, item) => count + item.quantity,
                    0
                );
            },

            getCartSummary: () => {
                const subtotal = get().getSubtotal();
                const tax = get().getTax();
                const total = get().getTotal();
                const itemCount = get().getItemCount();

                return { subtotal, tax, total, itemCount };
            },

            // Generate new order number
            generateOrderNumber: () => {
                return `POS-${Math.floor(Math.random() * 10000)}`;
            },
        }),
        {
            name: "pos-cart-storage",
            partialize: (state) => ({
                cart: state.cart,
                parkedCarts: state.parkedCarts.map((cart) => ({
                    ...cart,
                    parkedAt: cart.parkedAt.toString(),
                })),
                customerName: state.customerName,
                notes: state.notes,
            }),
        }
    )
);

