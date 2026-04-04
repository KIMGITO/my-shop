// resources/js/Pages/Shop/Index.tsx
import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { cn } from "@/Utils/helpers";
import { FloatingActionButton } from "@/Components/Common/FloatingActionButton";
import { Footer } from "@/Components/Layout/Footer";
import { MobileNav } from "@/Components/Layout/MobileNav";
import { Navbar } from "@/Components/Layout/Navbar";

// Types
interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    isPopular?: boolean;
    isFeatured?: boolean;
    badge?: string;
}

// Mock products data
const products: Product[] = [
    {
        id: 1,
        name: "Whole Cream Heritage Milk",
        price: 4.5,
        description:
            "Non-homogenized, pasture-raised milk with a thick cream top. Collected daily at sunrise.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0FS5WbNfomAdynTi15XEm_dtJfn6KeP0Q8ERn4mMnRcsZ6mpOpvAEuC5XnUcGOhDhAHRWgjdDutGZZ2RzCQ5Y6QY304UMqKINO46E0mOBwhEvJr--bIQ91BKoC44mGGgO14ulnPHOQYBd3_2dw95njBDWaQvN1XjLv6vsLKPA8_GRX32eVKK5Qy2Ry1WFww2qz1jIvKppM-MerU3G49WC8F1wRog3-N2WsZmvuEZ2hWB00u409kjFxuju99TPTJOE7msMRNUbprUr",
        category: "Milk",
        isFeatured: true,
        badge: "Weekly Special",
    },
    {
        id: 2,
        name: "Clover Honey Yoghurt",
        price: 6.2,
        description: "Triple-strained for maximum silkiness.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCb1K-FSm78wfr8l4EsQ7H-cqFTWZiUEbl1BRlv7BoBTZc8_Eo9f12fMyIyZToYb-nblmUYPetAVK5BQZfl8RXOmXjkVn9j9HZNPSbTXoyUiLq23crULfxLpcbTGtW_v9JZuwSrG0iD7k2KIzwis_Iyc9MIxN0C8kO0Lvv2q6LK4eNzU0l7TBRu8uLxdgBGpzJqh-r_y9TrM7VKk39MM_sfPQSklPMJsk2NoaaQZp8rLIImOwubOkYuaJ2X8F0f_xyX5RhvQMtTGnWu",
        category: "Yoghurt",
        isPopular: true,
    },
    {
        id: 3,
        name: "Country Sourdough",
        price: 5.8,
        description: "Artisanal farm fresh goodness.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDazdYAkWK2aIrZrjy6a_WSthDa1wlmC03EaOBq-04G2MIOoFdOK0NeWAC05uEZbadlfUpzcuopR8vC3HX7QshjswTgWuNCkkmroF-WV7zV1bJGkH7xZIHLzSKSNLhOlJAcF3WPGGb-OIFN8E7Y30b3JQNmUAdnF5YatuleR3SqNTdj83MvfM1D2bcKH_cIBORD6CY4L_Pc0k4UhkcwIOy2mMI3ia_H77FItct-MayC8HnEI3bLqDG0aLGrbX4PoLry54_9wf941MGR",
        category: "Bread",
    },
    {
        id: 4,
        name: "Traditional Spiced Mala",
        price: 3.9,
        description: "Artisanal farm fresh goodness.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPQ3JRsuTntdPqZ0nNefZJH5B3OyYKPKvwkz2a7M-cYPLOb5jhC-9eM_OyXFIbT04UlTVK9go_SrYSMqXsoZ1x8KQLLk6qwmg7zbqkcf8Y_egmcyNp8fq--VHHmHFKQVtIx1GpWcFlcSwARSzoWYAqmXbuSidMIb8YLP6b1bKReeDMGcayZQEmoHmvpsL6exwaUbNwYxP5jSYXtncThsdhbiLzyRDB4ZCS-OlKyP8ZpPSYR_M8FpKCY12nwDMH7igQvTNdC27pbQtm",
        category: "Mala",
    },
    {
        id: 5,
        name: "Double Cream Choco Cake",
        price: 12.5,
        description: "Made with 100% farm-fresh butter.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsp0q98K078o0jMNO6OLl2uTugtzrz9ZBPGLMIGPxUkdAVruukryrkASZhq6rKBbcIYagEVIg2KX4en4gWpR_pqJIJK3U6q_fKJf3vghZlG0G_9YrlMfXv_2J3iRfFEsmqAyzDmSr927KRJW02KDGEmTSEFjQVBTllNwlg-8frfxrwXP4x9YmSNslbli3KfmIz2b-RHcobF4XSYVBox_pxVpezMCIBc3j6JtEuPSkvs3poE2v6FxTwnkPIPmXF5pfKEz_8wbbED2MS",
        category: "Cakes",
    },
];

const categories = [
    { name: "All Products", count: 24, slug: "all" },
    { name: "Milk", count: 8, slug: "milk" },
    { name: "Mala", count: 4, slug: "mala" },
    { name: "Yoghurt", count: 6, slug: "yoghurt" },
    { name: "Bread", count: 3, slug: "bread" },
    { name: "Cakes", count: 3, slug: "cakes" },
];

// Product Card Component
const ProductCard: React.FC<{
    product: Product;
    variant?: "featured" | "default";
}> = ({ product, variant = "default" }) => {
    const handleAddToCart = () => {
        router.post("/cart/add", { productId: product.id });
    };

    const handleProductClick = () => {
        router.visit(`/product/${product.id}`);
    };

    if (variant === "featured") {
        return (
            <div className="lg:col-span-2 group relative overflow-hidden rounded-xl bg-surface-container-low transition-all hover:shadow-2xl">
                <div
                    className="aspect-[16/9] w-full overflow-hidden cursor-pointer"
                    onClick={handleProductClick}
                >
                    <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={product.image}
                        alt={product.name}
                    />
                </div>
                <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            {product.badge && (
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2 block">
                                    {product.badge}
                                </span>
                            )}
                            <h2 className="font-headline text-2xl font-bold text-on-surface">
                                {product.name}
                            </h2>
                        </div>
                        <span className="text-2xl font-black text-primary">
                            ${product.price}
                        </span>
                    </div>
                    <p className="text-on-surface-variant mb-6 max-w-md">
                        {product.description}
                    </p>
                    <button
                        onClick={handleAddToCart}
                        className="premium-gradient text-on-primary px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all hover:gap-4 active:scale-95"
                    >
                        Add to Cart
                        <span className="material-symbols-outlined text-sm">
                            arrow_forward
                        </span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="group bg-surface-container-low rounded-xl overflow-hidden transition-all hover:-translate-y-1">
            <div
                className="aspect-square relative cursor-pointer"
                onClick={handleProductClick}
            >
                <img
                    className="w-full h-full object-cover"
                    src={product.image}
                    alt={product.name}
                />
                {product.isPopular && (
                    <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase text-on-primary">
                        Popular
                    </div>
                )}
            </div>
            <div className="p-6">
                <h3 className="font-headline font-bold text-lg text-on-surface mb-1">
                    {product.name}
                </h3>
                <p className="text-sm text-on-surface-variant mb-4 line-clamp-2">
                    {product.description}
                </p>
                <div className="flex justify-between items-center">
                    <span className="font-bold text-on-surface">
                        ${product.price}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        className="p-2 rounded-full bg-surface-container-high text-primary hover:bg-primary transition-colors hover:text-on-primary"
                    >
                        <span className="material-symbols-outlined">
                            add_shopping_cart
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// Filter Sidebar Component
const FilterSidebar: React.FC<{
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}> = ({ selectedCategory, onCategoryChange }) => {
    return (
        <aside className="w-full md:w-64 space-y-10">
            <section>
                <h3 className="font-headline text-lg font-bold mb-6 text-on-surface">
                    Categories
                </h3>
                <div className="flex flex-wrap md:flex-col gap-2">
                    {categories.map((category) => (
                        <button
                            key={category.slug}
                            onClick={() =>
                                onCategoryChange(
                                    category.slug === "all" ? "" : category.name
                                )
                            }
                            className={cn(
                                "flex items-center justify-between px-4 py-2 rounded-lg font-bold transition-all",
                                selectedCategory === category.name ||
                                    (category.slug === "all" &&
                                        !selectedCategory)
                                    ? "bg-primary text-on-primary"
                                    : "hover:bg-surface-container-low text-on-surface-variant"
                            )}
                        >
                            <span>{category.name}</span>
                            <span className="text-xs opacity-60">
                                {category.count}
                            </span>
                        </button>
                    ))}
                </div>
            </section>

            <section className="bg-surface-container-low rounded-xl p-6">
                <h4 className="font-headline text-sm font-bold mb-2 uppercase tracking-wider text-primary">
                    Farm Status
                </h4>
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <p className="text-xs font-medium text-on-surface-variant leading-relaxed">
                        Fresh batches arriving every 4 hours.
                    </p>
                </div>
            </section>
        </aside>
    );
};

// Main Shop Page
export default function ShopIndex() {
    const [selectedCategory, setSelectedCategory] = useState("");

    const filteredProducts = selectedCategory
        ? products.filter((p) => p.category === selectedCategory)
        : products;

    const featuredProduct = filteredProducts.find((p) => p.isFeatured);
    const regularProducts = filteredProducts.filter((p) => !p.isFeatured);

    return (
        <>
            <Head title="Shop - Kaykay's Dairy" />
            <div className="min-h-screen bg-background text-on-surface">
                <Navbar />
                <main className="max-w-7xl mx-auto px-6 py-12">
                    <div className="flex flex-col md:flex-row gap-12">
                        <FilterSidebar
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                        />

                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
                                <div>
                                    <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface mb-2">
                                        The Milk Ledger
                                    </h1>
                                    <p className="text-on-surface-variant">
                                        Handpicked artisanal dairy, delivered
                                        from Kaykay's farm.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {featuredProduct && (
                                    <ProductCard
                                        product={featuredProduct}
                                        variant="featured"
                                    />
                                )}
                                {regularProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </div>

                            {filteredProducts.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-on-surface-variant">
                                        No products found in this category.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
                <Footer />
                <FloatingActionButton />
                <MobileNav />
            </div>
        </>
    );
}
