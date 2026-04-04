// resources/js/Pages/Cart/Index.tsx
import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { Navbar } from "@/Components/Layout/Navbar";
import { Footer } from "@/Components/Layout/Footer";
import { MobileNav } from "@/Components/Layout/MobileNav";
import FloatingActionButton from "@/Components/Common/FloatingActionButton";
import CartItem from "@/Components/Cart/CartItem";
import OrderSummary from "@/Components/Cart/OrderSummary";
import { CrossSellProduct } from "@/Components/Cart/CrossSellProduct";
import { Container } from "@/Components/UI/Container";
import { Button } from "@/Components/UI/Button";

// Types
interface CartItemType {
    id: number;
    name: string;
    price: number;
    quantity: number;
    unit: string;
    image: string;
}

// Mock cart data
const mockCartItems: CartItemType[] = [
    {
        id: 1,
        name: "Whole Cream Heritage Milk",
        price: 12.5,
        quantity: 1,
        unit: "1 Gallon • Glass Bottle",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4LkGvFV1S2MQ-gsy78eK4EBE1_35s4p8TmCAKOcfpmokI0ovXfZN_15GojB5_Hb2S4fKlbu5MJ660hUU2TWu1rGKlXfswCoB3D0CTTdduqvYHPhR-vZDxaqtpv7uVeUi4tJVNb0s4W0O-qvPope7Vof9yH3p9ZZp4BUa_QDCOyhGuyl9axY21TyyvCUTTC5O4c2qTB1eqaeXgp37OpBlexk6GBo_qNs4G7m8bdOdG-sNIsCExVm_wYh_Bd4ez63d3SZzaqIt0msSE",
    },
    {
        id: 2,
        name: "Cultured Sea Salt Butter",
        price: 8.0,
        quantity: 2,
        unit: "250g • Hand Churned",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHT1Jtqz-lnwWjFdHFTJa7tkw3uqkTiWx6OHGgO-7oIPRd-9gmQuWL6vszyBwRy3PZqudR7aKaIewm4D2cPRijdKXnS3DvbJgYCx_R-Ku1igGe2OiSJV5bBB4Lxdt6vGL3D0zGiRjlN0Uu2GazTbjSS8PAI2E9s25zNDFo6Tpj9oyG8jJaMho_4jie0ee-GVpPuovm0vXgEF0yyJM9bIY8-xczWG2yDArpEIb7AkHmvCQe_AZ7cWqV1B9m1GrlWjXu5Hhu5x9wYz79",
    },
    {
        id: 3,
        name: "Wildflower Honey Chèvre",
        price: 14.0,
        quantity: 1,
        unit: "150g • Seasonal Special",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwHuJMonpflKUsj5gEaj1dvPXqZ16uxQlq9Z-cUMZzNH1h61jMZlf84ToHWV5qwGy4axGBxCZh8MKCfijgQB4sNa6SiuZ8lH7LRT3Tpd7lSFlkXX4a1ikuOXlUUTi7OktKyPSs5iYiF-tgk2pPx3f3JKhS64cB2cNS6ayO0A3TLrCABGdxOQJSvkrxwdIMzccL02WvYfCp6oKQ9o5ZVZLQd69CeRoOIXMR77kfnocosHsRS1n52v4BLqeqtxuuucblsB_5BebQW5Cb",
    },
];

// Cross-sell product
const crossSellProduct = {
    id: 6,
    name: "Farmhouse Sourdough",
    price: 7.0,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDtYtxI9830_dPB8fJIH_Hj6oKN2N77q2w1xzOWvKzU0NNVCsNpQFomvu_DR5GvHOjCS9H6VA7UE7dSMZquWZv74I2BE10KGYyKHLTlImzmIOchiMCynHLZ4yWQclTRpaBjbhAK8WMqt5SgiztdSnfm2SVbh8VB9zuLmeXf73459ud5wAp1Dh79mZy6Aq2AgExOupai9CuYCuvvbCyF2mb9ngmSmRWi2sbXymMYZEG7MBfQrsbt-5gpHxDTwBnzORwFaRTIwNTmr0y",
    description: "Freshly baked daily with our 40-year-old starter",
};

export default function CartIndex() {
    const [cartItems, setCartItems] = useState<CartItemType[]>(mockCartItems);

    const updateQuantity = (id: number, quantity: number) => {
        setCartItems((items) =>
            items.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, quantity) }
                    : item
            )
        );
    };

    const removeItem = (id: number) => {
        setCartItems((items) => items.filter((item) => item.id !== id));
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shipping = subtotal > 0 ? 5.0 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            <Head title="Cart - Kaykay's Dairy" />
            <div className="min-h-screen bg-background text-on-surface">
                <Navbar />

                <main className="py-12">
                    <Container>
                        <div className="flex flex-col gap-4 mb-12">
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
                                Your Basket
                            </h1>
                            <p className="text-on-surface-variant font-medium">
                                {itemCount === 0
                                    ? "Your cart is empty"
                                    : `You have ${itemCount} ${
                                          itemCount === 1 ? "item" : "items"
                                      } in your cart`}
                            </p>
                        </div>

                        {cartItems.length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                {/* Cart Items Section */}
                                <div className="lg:col-span-8 space-y-6">
                                    {cartItems.map((item) => (
                                        <CartItem
                                            key={item.id}
                                            item={item}
                                            onUpdateQuantity={updateQuantity}
                                            onRemove={removeItem}
                                        />
                                    ))}
                                </div>

                                {/* Summary Sidebar */}
                                <div className="lg:col-span-4 space-y-6">
                                    <OrderSummary
                                        subtotal={subtotal}
                                        shipping={shipping}
                                        tax={tax}
                                        total={total}
                                    />
                                    <CrossSellProduct
                                        product={crossSellProduct}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-surface-container-low rounded-xl">
                                <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">
                                    shopping_bag
                                </span>
                                <p className="text-on-surface-variant text-lg mb-6">
                                    Your cart is empty
                                </p>
                                <Link href="/shop">
                                    <Button size="lg">
                                        Continue Shopping
                                        <span className="material-symbols-outlined text-sm ml-2">
                                            arrow_forward
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {/* Additional Information */}
                        {cartItems.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-outline-variant/20">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="material-symbols-outlined text-3xl text-primary">
                                            local_shipping
                                        </span>
                                        <p className="font-bold text-on-surface">
                                            Free Shipping
                                        </p>
                                        <p className="text-xs text-on-surface-variant">
                                            On orders over $50
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="material-symbols-outlined text-3xl text-primary">
                                            verified
                                        </span>
                                        <p className="font-bold text-on-surface">
                                            Quality Guaranteed
                                        </p>
                                        <p className="text-xs text-on-surface-variant">
                                            Farm-fresh or your money back
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="material-symbols-outlined text-3xl text-primary">
                                            schedule
                                        </span>
                                        <p className="font-bold text-on-surface">
                                            Same Day Delivery
                                        </p>
                                        <p className="text-xs text-on-surface-variant">
                                            Order before 10 AM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Container>
                </main>

                <Footer />
                <FloatingActionButton />
                <MobileNav />
            </div>
        </>
    );
}
