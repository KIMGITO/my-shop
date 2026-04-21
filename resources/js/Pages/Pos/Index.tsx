// pages/pos/index.tsx
import React, { useState, useMemo, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import { Product } from "@/types/pos";
import { HiOutlineSearch } from "react-icons/hi";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import ProductCard from "@/Components/Pos/ProductCard";
import { OrderSummary } from "@/Components/Pos/OrderSummary";
import ProductFilters from "@/Components/Pos/ProductFiler";
import { usePOSCartStore } from "@/Stores/usePOSCartStore";
import { ParkedCartsModal } from "./ParkedCartsModal";
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";

// Mock Products (same as yours)


const categories = [
    { id: "all", name: "All Items" },
    { id: "milk", name: "Milk" },
    { id: "bakery", name: "Bakery" },
    { id: "yoghurt", name: "Yoghurt" },
];

export default function PosIndex({POSProducts}:{POSProducts:Product[]}) {
    // Use Zustand store instead of local state
    const {
        cart,
        orderNumber,
        customerName,
        notes,
        parkedCarts,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        setCustomerName,
        setNotes,
        parkCurrentCart,
        loadParkedCart,
        deleteParkedCart,
        getSubtotal,
        getTax,
        getTotal,
        getItemCount,
    } = usePOSCartStore();

    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [sortBy, setSortBy] = useState<"name" | "price" | "popular">(
        "popular"
    );
    const [showParkedModal, setShowParkedModal] = useState(false);
    const [parkCartName, setParkCartName] = useState("");
    const [showParkConfirmation, setShowParkConfirmation] = useState(false);

    // Get computed values from store
    const subtotal = getSubtotal();
    const tax = getTax(0.08);
    const total = getTotal(0.08);
    const itemCount = getItemCount();

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let products = [...POSProducts];

        if (activeCategory !== "all") {
            products = products.filter((p) => p.category === activeCategory);
        }

        if (searchQuery) {
            products = products.filter((p) =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        switch (sortBy) {
            case "name":
                products.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "price":
                products.sort((a, b) => a.price - b.price);
                break;
            case "popular":
                products.sort(
                    (a, b) => (b.frequency || 0) - (a.frequency || 0)
                );
                break;
        }

        return products;
    }, [activeCategory, searchQuery, sortBy]);

    const handleCheckout = () => {
        console.log("Checkout", {
            cart,
            orderNumber,
            customerName,
            notes,
            subtotal,
            tax,
            total,
        });

        if (confirm(`Process order ${orderNumber} for $${total.toFixed(2)}?`)) {
            // Process order
            router.get(route('cashier.checkout'));
            // clearCart();
        }
    };

    const handleVoid = () => {
        if (confirm("Clear entire order?")) {
            clearCart();
        }
    };

    const handlePark = () => {
        if (cart.length === 0) {
            alert("Cannot park empty cart");
            return;
        }
        setShowParkConfirmation(true);
    };

    const confirmPark = () => {
        try {
            parkCurrentCart(
                parkCartName || `Cart ${new Date().toLocaleTimeString()}`,
                customerName,
                notes
            );
            setShowParkConfirmation(false);
            setParkCartName("");
        } catch (error) {
            alert("Failed to park cart");
        }
    };

    const handleLoadParkedCart = (cartId: string) => {
        if (cart.length > 0) {
            const confirm = window.confirm(
                "Current cart will be cleared. Continue?"
            );
            if (!confirm) return;
        }
        loadParkedCart(cartId);
        deleteParkedCart(cartId);
        setShowParkedModal(false);
    };

    return (
        <>
            <Head title="POS - Kaykay's Milk Bar" />
            <AuthenticatedLayout>
                <div className="h-full flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
                    {/* Left Side - Products */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* Customer Info Bar */}
                        <div className="mb-4 grid grid-cols-2 gap-2">
                            <input
                                type="text"
                                placeholder="Customer Name (optional)"
                                value={customerName}
                                onChange={(e) =>
                                    setCustomerName(e.target.value)
                                }
                                className="px-3 py-2 bg-surface-container-high border-none rounded-lg text-sm"
                            />
                            <input
                                type="text"
                                placeholder="Order Notes (optional)"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="px-3 py-2 bg-surface-container-high border-none rounded-lg text-sm"
                            />
                        </div>

                        {/* Search Bar */}
                        <div className="relative mb-4">
                            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search milk, yogurt, bakery..."
                                className="w-full pl-10 pr-4 py-2.5 bg-surface-container-high border-none rounded-xl text-sm focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        {/* Filters */}
                        <ProductFilters
                            categories={categories}
                            activeCategory={activeCategory}
                            onCategoryChange={setActiveCategory}
                            sortBy={sortBy}
                            onSortChange={setSortBy}
                        />

                        {/* Parked Carts Indicator */}
                        {parkedCarts.length > 0 && (
                            <Button
                                onClick={() => setShowParkedModal(true)}
                                className="mb-4 px-4 py-2 bg-primary/90  rounded-lg text-sm flex items-center justify-between hover:brightness-110"
                            >
                                <span>📦 Parked Carts</span>
                                <span className="bg-secondary text-white px-2 py-0.5 rounded-full text-xs">
                                    {parkedCarts.length}
                                </span>
                            </Button>
                        )}

                        {/* Products Grid/List */}
                        <div className="flex-1 overflow-y-auto pb-20 lg:pb-0">
                            <div className="hidden lg:grid grid-cols-2 xl:grid-cols-3 gap-4">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onAddToCart={addToCart}
                                        variant="grid"
                                    />
                                ))}
                            </div>

                            <div className="lg:hidden space-y-2">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onAddToCart={addToCart}
                                        variant="list"
                                    />
                                ))}
                            </div>

                            {filteredProducts.length === 0 && (
                                <div className="text-center py-12 text-on-surface-variant">
                                    <span className="material-symbols-outlined text-5xl mb-2">
                                        search_off
                                    </span>
                                    <p>No products found</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side - Order Summary */}
                    <div className="lg:sticky lg:top-0 lg:h-[calc(100vh-6rem)]">
                        <OrderSummary
                            items={cart}
                            subtotal={subtotal}
                            tax={tax}
                            total={total}
                            onCheckout={handleCheckout}
                            onVoid={handleVoid}
                            onPark={handlePark}
                            orderNumber={orderNumber}
                            onUpdateQuantity={updateQuantity}
                            onRemove={removeItem}
                        />
                    </div>
                </div>

                {/* Park Cart Confirmation Modal */}
                {showParkConfirmation && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-surface-container-lowest rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col border border-outline-variant/10">
                            {/* Header */}
                            <div className="px-6 py-4 border-b border-outline-variant/10">
                                <h3 className="text-xl font-bold font-headline text-on-surface">
                                    Park Current Cart
                                </h3>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-4">
                                <div className="space-y-1.5">
                                    <Input
                                        label="Cart Reference"
                                        type="text"
                                        placeholder="e.g., Table 4 or Customer Name"
                                        value={parkCartName}
                                        onChange={(e) =>
                                            setParkCartName(e.target.value)
                                        }
                                        className="w-full px-4 py-3 bg-surface-container-high border-none rounded-xl text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary transition-all"
                                        autoFocus
                                    />
                                </div>

                                {/* Quick Summary Card */}
                                <div className="bg-primary/5 rounded-2xl p-2 flex justify-between items-center border border-primary/10">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">
                                            shopping_basket
                                        </span>
                                        <span className="text-sm font-medium text-on-surface-variant">
                                            {itemCount}{" "}
                                            {itemCount === 1 ? "Item" : "Items"}
                                        </span>
                                    </div>
                                    <div className="text-lg font-bold text-primary font-headline">
                                        ${total.toFixed(2)}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="px-6 py-4 bg-surface-container-low/50 flex gap-3">
                                <Button
                                    variant="ghost"
                                    className="flex-1 py-3 border-0 text-on-surface-variant hover:bg-surface-container-highest"
                                    onClick={() =>
                                        setShowParkConfirmation(false)
                                    }
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="primary"
                                    className="flex-1 p-1 shadow-lg shadow-primary/20"
                                    onClick={confirmPark}
                                >
                                    Park Cart
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
                {/* Parked Carts Modal */}
                {showParkedModal && (
                    <ParkedCartsModal
                        isOpen
                        parkedCarts={parkedCarts}
                        onLoadCart={handleLoadParkedCart}
                        onDeleteCart={deleteParkedCart}
                        onClose={() => setShowParkedModal(false)}
                    />
                )}
            </AuthenticatedLayout>
        </>
    );
}
