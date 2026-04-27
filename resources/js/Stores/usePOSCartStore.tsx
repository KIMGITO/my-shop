// stores/usePOSCartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types/pos";
import axios from "axios";
import { router } from "@inertiajs/react";

export interface ParkedCart {
    id: string;
    name: string;
    items: any[];
    subtotal: number;
    tax: number;
    total: number;
    parkedAt: Date | string;
    customerId?: string;
    notes?: string;
    orderNumber: string;
}

interface POSCartStore {
    cart: CartItem[];
    orderNumber: string;
    customerId: string;
    notes: string;
    parkedCarts: ParkedCart[];
    addToCart: (product: Product) => void;
    updateQuantity: (id: string, quantity: number) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    voidOrder: () => void; // Added for DB cleanup
    setOrderNumber: (orderNumber: string) => void;
    setCustomerId: (id: string) => void;
    setNotes: (notes: string) => void;
    parkCurrentCart: (cartName: string) => Promise<void>;
    loadParkedCart: (cartId: string, allProducts: Product[]) => void;
    unpackCart: (cartId:string) => void;
    deleteParkedCart: (cartId: string) => void;
    refreshOrderNumber: () => Promise<string>;
    getSubtotal: () => number;
    getTax: (taxRate?: number) => number;
    getTotal: (taxRate?: number) => number;
    getItemCount: () => number;
}

export const usePOSCartStore = create<POSCartStore>()(
    persist(
        (set, get) => ({
            cart: [],
            orderNumber: "",
            customerId: "",
            notes: "",
            parkedCarts: [],

            addToCart: async (product) => {
    const { cart, orderNumber, refreshOrderNumber } = get();
    if (!orderNumber) await refreshOrderNumber();

    // Use a consistent ID check (forcing string comparison)
    const existingItem = cart.find((item) => String(item.id) === String(product.id));
    
    if (existingItem) {
        set({
            cart: cart.map((item) =>
                String(item.id) === String(product.id) 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
            ),
        });
    } else {
        set({ cart: [...cart, { ...product, quantity: 1 }] });
    }
},

            updateQuantity: (id, quantity) => {
                set({
                    cart: quantity <= 0 
                        ? get().cart.filter((item) => item.id !== id)
                        : get().cart.map((item) => item.id === id ? { ...item, quantity } : item),
                });
            },

            removeItem: (id) => set({ cart: get().cart.filter((item) => item.id !== id) }),

            clearCart: () => set({ cart: [], customerId: "", notes: "", orderNumber: "" }),

            voidOrder: () => {
                const { orderNumber, clearCart } = get();
                if (orderNumber) {
                    router.delete(route("orders.void", { orderNumber: orderNumber }));
                }
                clearCart();
            },

            setOrderNumber: (orderNumber) => set({ orderNumber }),
            setCustomerId: (id) => set({ customerId: id }),
            setNotes: (notes) => set({ notes }),


            parkCurrentCart: async (cartName) => {
                const state = get();
                
                const parkedCartPayload = {
                    orderNumber: state.orderNumber,
                    name: cartName,
                    customerId: state.customerId,
                    notes: state.notes,
                    items: state.cart.map((item) => ({
                        batch_id: Number(item.id),
                        quantity: item.quantity,
                        price: item.price,
                    })),
                    // Ensure these are explicitly calculated and saved
                    subtotal: state.getSubtotal(),
                    tax: state.getTax(),
                    total: state.getTotal(),
                };

                router.patch(route("orders.pack"), parkedCartPayload, {
                    onSuccess: () => {
                        set((prev) => ({
                            parkedCarts: [
                                ...prev.parkedCarts.filter(c => c.orderNumber !== state.orderNumber), 
                                { 
                                    ...parkedCartPayload, 
                                    id: state.orderNumber, 
                                    parkedAt: new Date().toISOString() 
                                } as any
                            ],
                            cart: [],
                            orderNumber: "",
                            customerId: "",
                            notes: ""
                        }));
                    }
                });
            },

             loadParkedCart: (cartId, allProducts) => {
                const { parkedCarts, unpackCart, cart: currentCart } = get();
                const parked = parkedCarts.find((c) => c.id === cartId);

                if (parked) {
                    const hydratedItems = parked.items.map(pItem => {
                        const originalProduct = allProducts.find(p => Number(p.id) === Number(pItem.batch_id));
                        
                        if (!originalProduct) {
                            console.warn(`Product with ID ${pItem.batch_id} not found`);
                        }

                        return {
                            ...originalProduct,
                            id: pItem.batch_id.toString(), // Ensure this matches your store's ID format
                            quantity: pItem.quantity,
                            price: pItem.price,
                        };
                    });

                    set({
                        cart: hydratedItems, 
                        customerId: parked.customerId || "",
                        notes: parked.notes || "",
                        orderNumber: parked.orderNumber,
                    });
                    
                    router.patch(route("orders.unpark", { orderNumber: parked.orderNumber }));
                    unpackCart(cartId);
                }
            },

            deleteParkedCart: (cartId) => {

                router.delete(route('orders.packed.delete',cartId),{
                    onSuccess: () => {
                        get().unpackCart(cartId)
                    },
                    onError:()=>{
                        console.log('failed ');
                    }
                })
            },

            unpackCart:(cartId) => {
                set({ parkedCarts: get().parkedCarts.filter((c) => c.id !== cartId) });
            },

            refreshOrderNumber: async () => {
                const response = await axios.get("/api/v1/pos/orders/order-number");
                const num = response.data.orderNumber;
                set({ orderNumber: num });

                console.log('response', num)
                return num;
            },

            getSubtotal: () => get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
            getTax: (taxRate = 0.08) => get().getSubtotal() * taxRate,
            getTotal: (taxRate = 0.08) => get().getSubtotal() + get().getTax(taxRate),
            getItemCount: () => get().cart.reduce((count, item) => count + item.quantity, 0),
        }),
        { name: "pos-cart-storage" }
    )
);