import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Layout/Navbar";
import Footer from "@/Components/Layout/Footer";
import {MobileNav} from "@/Components/Layout/MobileNav";
import FloatingActionButton from "@/Components/Common/FloatingActionButton";
import ProductFilters from "@/Components/Shop/ProductFilters";
import ProductGrid from "@/Components/Shop/ProductGrid";
import Container from "@/Components/UI/Container";
import { categories, products } from "@/Data/ProductData";

// Mock products data


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

                <main className="py-12">
                    <Container>
                        <div className="flex flex-col md:flex-row gap-12">
                            {/* Filters Sidebar */}
                            <ProductFilters
                                categories={categories}
                                selectedCategory={selectedCategory}
                                onCategoryChange={setSelectedCategory}
                            />

                            {/* Products Grid */}
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
                                    <div>
                                        <h1 className="font-play text-4xl font-extrabold tracking-tight text-on-surface mb-2">
                                            The Milk Ledger
                                        </h1>
                                        <p className="text-on-surface-variant">
                                            Handpicked artisanal dairy,
                                            delivered from Kaykay's farm.
                                        </p>
                                    </div>
                                    <div className="text-sm text-on-surface-variant">
                                        {filteredProducts.length} products
                                    </div>
                                </div>

                                <ProductGrid
                                    products={regularProducts}
                                    featuredProduct={featuredProduct}
                                />

                                {filteredProducts.length === 0 && (
                                    <div className="text-center py-12">
                                        <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">
                                            search_off
                                        </span>
                                        <p className="text-on-surface-variant text-lg">
                                            No products found in this category.
                                        </p>
                                        <button
                                            onClick={() =>
                                                setSelectedCategory("")
                                            }
                                            className="mt-4 text-primary font-bold hover:underline"
                                        >
                                            View all products
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Container>
                </main>

                <Footer />
                <FloatingActionButton />
                <MobileNav />
            </div>
        </>
    );
}
