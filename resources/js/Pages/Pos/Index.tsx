// pages/pos/index.tsx
import React, { useState, useMemo } from "react";
import { Head, router } from "@inertiajs/react";
import { Product } from "@/types/pos";
import { HiOutlineSearch, HiOutlineUser } from "react-icons/hi";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import ProductCard from "@/Components/Pos/ProductCard";
import { OrderSummary } from "@/Components/Pos/OrderSummary";
import ProductFilters from "@/Components/Pos/ProductFiler";
import { usePOSCartStore } from "@/Stores/usePOSCartStore";
import { ParkedCartsModal } from "./ParkedCartsModal";
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";
import Select from "@/Components/UI/Select";

const categories = [
    { id: "all", name: "All Items" },
    { id: "milk", name: "Milk" },
    { id: "bakery", name: "Bakery" },
    { id: "yoghurt", name: "Yoghurt" },
];

export default function PosIndex({
    POSProducts,
    isParkedModelOpen = false,
}: {
    POSProducts: Product[];
    isParkedModelOpen: boolean;
}) {
    const {
        cart,
        orderNumber,
        customerId,
        notes,
        parkedCarts,
        addToCart,
        updateQuantity,
        removeItem,
        voidOrder, // Logic fix: for DB cleanup
        setCustomerId,
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
    const [sortBy, setSortBy] = useState<"name" | "price" | "popular">("popular");
    const [showParkedModal, setShowParkedModal] = useState(isParkedModelOpen);
    const [parkCartName, setParkCartName] = useState("");
    const [showParkConfirmation, setShowParkConfirmation] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const subtotal = getSubtotal();
    const tax = getTax(0.08);
    const total = getTotal(0.08);
    const itemCount = getItemCount();


    console.log("POSProducts",POSProducts);
    
    const filteredProducts = useMemo(() => {
        let products = [...POSProducts];
        if (activeCategory !== "all") products = products.filter((p) => p.category === activeCategory);
        if (searchQuery) products = products.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

        switch (sortBy) {
            case "name": products.sort((a, b) => a.name.localeCompare(b.name)); break;
            case "price": products.sort((a, b) => a.price - b.price); break;
            case "popular": products.sort((a, b) => (b.frequency || 0) - (a.frequency || 0)); break;
        }
        return products;
    }, [activeCategory, searchQuery, sortBy, POSProducts]);

    const handleCheckout = async () => {
        if (cart.length === 0) return alert("Cannot checkout empty cart");
        if (!orderNumber) return alert("No order number available.");

        if (confirm(`Process order ${orderNumber} for $${total.toFixed(2)}?`)) {
            setIsProcessing(true);
            router.post(route("orders.checkout"), {
                orderNumber,
                customerId,
                notes,
                items: cart.map((item) => ({
                    batch_id: item.id,
                    quantity: item.quantity,
                    price: item.price,
                })),
                subtotal,
                tax,
                total,
                status: "completed",
            }, {
                onFinish: () => setIsProcessing(false),
            });
        }
    };

    const handleVoid = () => {
        if (confirm("This will clear the cart and release any held stock in the database. Continue?")) {
            voidOrder(); // Clears Zustand AND notifies Backend
        }
    };

    const handlePark = () => {
        if (cart.length === 0) return alert("Cannot pack empty cart");
        setShowParkConfirmation(true);
    };

    const confirmPark = async () => {
        try {
            setIsProcessing(true);
            // Logic fix: parkCurrentCart now handles the router sync and store clearing
            await parkCurrentCart(parkCartName || `Cart ${new Date().toLocaleTimeString()}`);
            setShowParkConfirmation(false);
            setParkCartName("");
            setShowParkedModal(true);
        } catch (error) {
            alert("Failed to pack cart");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleLoadParkedCart = (cartId: string) => {
        if (cart.length > 0 && !window.confirm("Current cart will be cleared. Continue?")) return;
        
        console.log(cartId);
        loadParkedCart(cartId, POSProducts);
        setShowParkedModal(false);
    };

    return (
        <>
            <Head title="POS - Kaykay's Milk Bar" />
            <AuthenticatedLayout>
                <div className="h-full flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="mb-4 grid grid-cols-2 gap-2">
                            <Select
                                label="Select Customer"
                                value={customerId}
                                onChange={(value) => setCustomerId(value?.toString() || "")}
                                options={[
                                    { id: 1, value: 1, label: "Martin Mukundi (Interlocking Blocks)" },
                                    { id: 2, value: 2, label: "Silvia Nyakio" },
                                    { id: 3, value: 3, label: "Daniel Simiyu" },
                                ]}
                                placeholder="Search for customer..."
                                Icon={HiOutlineUser}
                                size="sm"
                            />
                            <Input
                                type="textarea"
                                label="Order note"
                                placeholder="Order Notes (optional)"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>

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

                        <ProductFilters
                            categories={categories}
                            activeCategory={activeCategory}
                            onCategoryChange={setActiveCategory}
                            sortBy={sortBy}
                            onSortChange={setSortBy}
                        />

                        {parkedCarts.length > 0 && (
                            <Button
                                onClick={() => setShowParkedModal(true)}
                                className="mb-4 px-4 py-2 bg-primary/90 rounded-lg text-sm flex items-center justify-between hover:brightness-110"
                            >
                                <span>📦 Parked Carts</span>
                                <span className="bg-secondary text-white px-2 py-0.5 rounded-full text-xs">
                                    {parkedCarts.length}
                                </span>
                            </Button>
                        )}

                        <div className="flex-1 overflow-y-auto pb-20 lg:pb-0">
                            <div className="hidden lg:grid grid-cols-2 xl:grid-cols-3 gap-4">
                                {filteredProducts.map((product) => (
                                    <ProductCard 
                                    key={product.id} product={product} onAddToCart={addToCart} variant="grid" />
                                ))}
                            </div>
                            <div className="lg:hidden space-y-2">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} onAddToCart={addToCart} variant="list" />
                                ))}
                            </div>
                        </div>
                    </div>

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
                            isProcessing={isProcessing}
                        />
                    </div>
                </div>

                {showParkConfirmation && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-surface-container-lowest rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col border border-outline-variant/10">
                            <div className="px-6 py-4 border-b border-outline-variant/10">
                                <h3 className="text-xl font-bold font-headline text-on-surface">Pack Current Cart</h3>
                                <p className="text-sm text-on-surface-variant mt-1">Order #{orderNumber} will be saved</p>
                            </div>
                            <div className="p-6 space-y-4">
                                <Input
                                    label="Cart Reference"
                                    type="text"
                                    placeholder="e.g., Table 4"
                                    value={parkCartName}
                                    onChange={(e) => setParkCartName(e.target.value)}
                                    autoFocus
                                />
                                <div className="bg-primary/5 rounded-2xl p-4 flex justify-between items-center border border-primary/10">
                                    <span className="text-sm font-medium text-on-surface-variant">{itemCount} items</span>
                                    <div className="text-lg font-bold text-primary">${total.toFixed(2)}</div>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-surface-container-low/50 flex gap-3">
                                <Button variant="ghost" className="flex-1" onClick={() => setShowParkConfirmation(false)}>Cancel</Button>
                                <Button variant="primary" className="flex-1" onClick={confirmPark} disabled={isProcessing}>Pack Cart</Button>
                            </div>
                        </div>
                    </div>
                )}

                {showParkedModal && (
                    <ParkedCartsModal
                        isOpen={showParkedModal}
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