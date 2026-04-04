// pages/ShoppingCartPage.tsx
import React, { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import CartItem from "@/Components/UI/CartItem";
import Footer from "@/Components/Layout/Footer";
import Navbar from "@/Components/Layout/Navbar";

const mockCartItems: CartItemType[] = [
    {
        id: "1",
        name: "Whole Cream Heritage Milk",
        price: 12.5,
        unit: "1 Gallon • Glass Bottle",
        image: "https://via.placeholder.com/128x128",
        rating: 4.8,
        category: "Milk",
        quantity: 1,
    },
    {
        id: "2",
        name: "Cultured Sea Salt Butter",
        price: 8.0,
        unit: "250g • Hand Churned",
        image: "https://via.placeholder.com/128x128",
        rating: 5.0,
        category: "Butter",
        quantity: 2,
    },
];

const ShoppingCartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState(mockCartItems);
    const [voucherCode, setVoucherCode] = useState("");

    const updateQuantity = (id: string, quantity: number) => {
        setCartItems((items) =>
            items.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, quantity) }
                    : item
            )
        );
    };

    const removeItem = (id: string) => {
        setCartItems((items) => items.filter((item) => item.id !== id));
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shipping = 5.0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar cartItemCount={cartItems.length} />
            <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-12">
                <div className="flex flex-col gap-4 mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
                        Your Basket
                    </h1>
                    <p className="text-on-surface-variant font-medium">
                        You have {cartItems.length}{" "}
                        {cartItems.length === 1 ? "item" : "items"} in your
                        cart.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Cart Items */}
                    <div className="lg:col-span-8 space-y-6">
                        {cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onUpdateQuantity={updateQuantity}
                                onRemove={removeItem}
                            />
                        ))}
                        {cartItems.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-on-surface-variant">
                                    Your cart is empty
                                </p>
                                <button className="mt-4 text-primary font-bold hover:underline">
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-surface-container-low rounded-xl p-8 sticky top-24">
                            <h2 className="text-2xl font-bold text-on-surface mb-6">
                                Order Summary
                            </h2>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-on-surface-variant">
                                    <span className="font-medium">
                                        Subtotal
                                    </span>
                                    <span className="font-bold tabular-nums">
                                        ${subtotal.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-on-surface-variant">
                                    <span className="font-medium">
                                        Shipping
                                    </span>
                                    <span className="font-bold tabular-nums">
                                        ${shipping.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-on-surface-variant">
                                    <span className="font-medium">Tax</span>
                                    <span className="font-bold tabular-nums">
                                        ${tax.toFixed(2)}
                                    </span>
                                </div>
                                <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-center">
                                    <span className="text-lg font-bold text-on-surface">
                                        Total
                                    </span>
                                    <span className="text-3xl font-extrabold text-primary tabular-nums">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Voucher Section */}
                            <div className="mb-8">
                                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                                    Apply Voucher
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={voucherCode}
                                        onChange={(e) =>
                                            setVoucherCode(e.target.value)
                                        }
                                        placeholder="FRESH20"
                                        className="flex-grow bg-surface-container-high border-none rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary-container transition-all"
                                    />
                                    <button className="bg-surface-container-highest px-4 py-3 rounded-lg font-bold text-on-surface hover:bg-surface-variant transition-colors">
                                        Apply
                                    </button>
                                </div>
                            </div>

                            <button className="w-full bg-gradient-to-br from-primary-fixed to-primary-fixed-dim text-on-primary-fixed font-bold py-4 rounded-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
                                Checkout Now
                                <ArrowRight size={18} />
                            </button>

                            <div className="mt-6 flex items-center justify-center gap-2 text-on-surface-variant">
                                <ShieldCheck size={18} />
                                <span className="text-xs font-semibold">
                                    Secure Payment Guaranteed
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ShoppingCartPage;
