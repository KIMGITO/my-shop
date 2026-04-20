import React, { useState, useMemo } from "react";
import { Head } from "@inertiajs/react";
import { CartItem, Product } from "@/types/pos";
import { HiOutlineSearch } from "react-icons/hi";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import ProductCard from "@/Components/Pos/ProductCard";
import { OrderSummary } from "@/Components/Pos/OrderSummary";
import ProductFilters from "@/Components/Pos/ProductFiler";

// Mock Products
const mockProducts: Product[] = [
    {
        id: "1",
        name: "Artisan Whole Milk",
        price: 4.5,
        unit: "1 Liter",
        category: "milk",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbrUrsKylM_X5SDNDHk3RUYOzWadg3e0CyCNA87jIIv_ocl3We12TNZZZALH3PUEUJFkoKU0WokFa8c1Cni4je3ypvORB2xNs3SW6_9PBq1ryBU-KhXgYzziAA7JdhqIdhQtqJC5xHddPMp55hquOnQmL9BFxdlrhGG3jR3FtBf9avkQz8D4hl7SelZwIHDFLmpaqwFrKAzdhjdRbAwiAozuM70f9qeUMQeYeDX3ccZ8AMtyABUNNMaaTt4LaQquYYAd0FG8d_iE41",
        isOrganic: true,
        isPopular: true,
        frequency: 25,
    },
    {
        id: "2",
        name: "Butter Croissant",
        price: 3.25,
        unit: "Each",
        category: "bakery",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZPqxHrGDlQxB6zXGieyEGUTyXnNVRCd8U5KfrNk0E40nhTMMTgZerTWj2RlSLJf_K0SfR1qhgZ3gqUFRfJzLDO0jRZzzDXr0CXU3nQi3VNYX11cf0RGVBn06immGY5rkq_raEb-VW9wABqil5zL7lvoQ7n-FO8s7iJmPfBt1bW6c3cOqAD97OK-YFiJG0QuT7-EnbBRIVal2HxbC7sF1rtFYGQvASPjqP8E1aMd6wm5_nUS_Q3vVu_vvJEIQ5eZGodlExpfo8i8FB",
        isPopular: true,
        frequency: 18,
    },
    {
        id: "3",
        name: "Honey Greek Yogurt",
        price: 6.8,
        unit: "500g",
        category: "yoghurt",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCGZVjioCZTMbC8axa6pJM2OFp5G8xNblXurWmyAD85P2JRVvll5DTKGCywER46CrkD15R9EM9O40K67SsqX3qz77ZWW2Aiup5A7qLBX--AmDAoskwaNLh4Jq8KYsxhLligmTvHYRsdGy2w1195Qxsh4WFBEb1-1ZWhGNPbiQWpoA68fESP9ULymQugqYaCHB2rdsOxxoxdasb_pu6R1winECecBvC9-1adAKGC2V-95aApcAaOeiu4KTMttB58EZAEcYQGqapgPlq",
        isOrganic: true,
        isPopular: true,
        frequency: 30,
    },
    {
        id: "4",
        name: "Double Cocoa Milk",
        price: 5.2,
        unit: "500ml",
        category: "milk",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2yxpTFL1PWD463dBXXsN-4j2A18WqMLoksO3RzAJuwKy-TJTILVm-RTV58Dpt2svTAqKKUGSrhqA9fWzS5pZMrsOlulvnbCzMcIiTWH4hgGmZNAG9fG3JFO2vaUyn5BP09EYHjhSVy1T5LkkwVK4Em8bhA1RrvzQmoqBePj3sQTULCG-J21nOjDW0uvDsjoICFVW7tOEB0kPXf1FcI5lAEp6MbacygOU-Gb7eC_aaKu4h0EXD52M1X1df-FPRqFtXjvSf4TcE1-cW",
        frequency: 12,
    },
    {
        id: "5",
        name: "Sourdough Loaf",
        price: 7.5,
        unit: "Each",
        category: "bakery",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUq3r_lJcpUxr1v1vzIcqqYtmFx9j5zAT7UXUCEMcnartl4feXayyNTaphLY6W4i-Kk3jb1W7xDXLGL8gzP6PEupioPZbJi_vrfeHjM6jhGjwpliTPxX8N7h-vTsK5lmk5m7RmAuk4oZdcNg-ORYz9l8pdGdW_fe4l5MwVtGCDxk-6fiUz_eHxDHFnmXUCoA7vAjcwuW8J5O6HeRpkRIB3ej87_JF2V2nGaTGF_Fj0ovmdbrjv7aR16f8xNkjXIllzGFl78tbcfnUx",
        isPopular: true,
        frequency: 22,
    },
    {
        id: "6",
        name: "Honey Greek Yogurt",
        price: 6.8,
        unit: "500g",
        category: "yoghurt",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCGZVjioCZTMbC8axa6pJM2OFp5G8xNblXurWmyAD85P2JRVvll5DTKGCywER46CrkD15R9EM9O40K67SsqX3qz77ZWW2Aiup5A7qLBX--AmDAoskwaNLh4Jq8KYsxhLligmTvHYRsdGy2w1195Qxsh4WFBEb1-1ZWhGNPbiQWpoA68fESP9ULymQugqYaCHB2rdsOxxoxdasb_pu6R1winECecBvC9-1adAKGC2V-95aApcAaOeiu4KTMttB58EZAEcYQGqapgPlq",
        isOrganic: true,
        isPopular: true,
        frequency: 30,
    },
    {
        id: "7",
        name: "Double Cocoa Milk",
        price: 5.2,
        unit: "500ml",
        category: "milk",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2yxpTFL1PWD463dBXXsN-4j2A18WqMLoksO3RzAJuwKy-TJTILVm-RTV58Dpt2svTAqKKUGSrhqA9fWzS5pZMrsOlulvnbCzMcIiTWH4hgGmZNAG9fG3JFO2vaUyn5BP09EYHjhSVy1T5LkkwVK4Em8bhA1RrvzQmoqBePj3sQTULCG-J21nOjDW0uvDsjoICFVW7tOEB0kPXf1FcI5lAEp6MbacygOU-Gb7eC_aaKu4h0EXD52M1X1df-FPRqFtXjvSf4TcE1-cW",
        frequency: 12,
    },
    {
        id: "8",
        name: "Sourdough Loaf",
        price: 7.5,
        unit: "Each",
        category: "bakery",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUq3r_lJcpUxr1v1vzIcqqYtmFx9j5zAT7UXUCEMcnartl4feXayyNTaphLY6W4i-Kk3jb1W7xDXLGL8gzP6PEupioPZbJi_vrfeHjM6jhGjwpliTPxX8N7h-vTsK5lmk5m7RmAuk4oZdcNg-ORYz9l8pdGdW_fe4l5MwVtGCDxk-6fiUz_eHxDHFnmXUCoA7vAjcwuW8J5O6HeRpkRIB3ej87_JF2V2nGaTGF_Fj0ovmdbrjv7aR16f8xNkjXIllzGFl78tbcfnUx",
        isPopular: true,
        frequency: 22,
    },
];

const categories = [
    { id: "all", name: "All Items" },
    { id: "milk", name: "Milk" },
    { id: "bakery", name: "Bakery" },
    { id: "yoghurt", name: "Yoghurt" },
];

export default function PosIndex() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [sortBy, setSortBy] = useState<"name" | "price" | "popular">(
        "popular"
    );
    const [orderNumber] = useState(
        () => `POS-${Math.floor(Math.random() * 10000)}`
    );

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (id: string, quantity: number) => {
        setCart((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const removeItem = (id: string) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const filteredProducts = useMemo(() => {
        let products = [...mockProducts];

        // Filter by category
        if (activeCategory !== "all") {
            products = products.filter((p) => p.category === activeCategory);
        }

        // Filter by search
        if (searchQuery) {
            products = products.filter((p) =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort
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

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    const handleCheckout = () => {
        console.log("Checkout", { cart, subtotal, tax, total });
        // Navigate to checkout or process order
    };

    const handleVoid = () => {
        if (confirm("Clear entire order?")) {
            setCart([]);
        }
    };

    const handlePark = () => {
        console.log("Park order", cart);
        // Save to parked orders
        setCart([]);
    };

    return (
        <>
            <Head title="POS - Kaykay's Milk Bar" />
            <AuthenticatedLayout>
                <div className="h-full flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
                    <div className="flex-1 flex flex-col overflow-hidden ">
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

                        {/* Products Grid/List - Responsive */}
                        <div className="flex-1 overflow-y-auto pb-20 lg:pb-0">
                            {/* Desktop Grid (lg and up) */}
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

                            {/* Mobile List (below lg) */}
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

                    {/* Order Summary - Sticky on desktop, fixed on mobile */}
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
                        />
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
