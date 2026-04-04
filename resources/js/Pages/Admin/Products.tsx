import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { ProductCard } from "@/Components/Admin/ProductCard";
import { FilterChip } from "@/Components/UI/FilterChip";
import { SearchBar } from "@/Components/UI/SearchBar";
import { ActionButton } from "@/Components/UI/ActionButton";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { HiOutlineFilter, HiOutlinePlus } from "react-icons/hi";

const mockProducts = [
    {
        id: "1",
        name: "Golden Hour Whole Milk",
        sku: "MLK-001-WH",
        price: 4.5,
        stock: 42,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhMEq9yD91DQ97JgGDncYWlo35y8HqfbtFSuWndFmqoukIvzBx7D4AxyBahsN8JdOfrC8-Gy47ZAnt_VpYmypTVWQAoAqgmVN724nE_eNKngivHW8J3RzbhMZceiD1LX2VQ3TuguLv5KWbECYsqG2o_MIzbJaAQE-iFX2Ls6jOR29qFpeI3slMshvfZvh13vLJpBeI_W6B0LBzPXoTXnEYZGXsosRJN0eVmCwhZARhfrWFIAdJ6r7PAz3RY1KEjZ2Dh6Tkb2hIuey9",
        category: "milk",
        badge: "Premium",
        status: "in_stock" as const,
    },
    {
        id: "2",
        name: "Honey Greek Yoghurt",
        sku: "YOG-HNY-500",
        price: 6.25,
        stock: 18,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOHVLY5ajzTwyDt5GEbJ30RDG64-rQ382kY_giCyhyvZ0BiQzQ3mfFU6SSItppoIgXsQk6VL3CcdHz7YSNZL8K3ScYRWlNAJBRwCXCsNXSBnA7I74pLV1Em-zZ-lKQ3WrNqFJVXI4K1gmI8ZJOJqbBOCp_h5ozbLOVX2g7W2mP6eEZziXHB2P3sMwTZMb9bwCinxv2oWuTu-2Q3ofIPwgoIX118jfM8tE49PtEj4exKNudAYzvIQ280XijnJcif0fnziXmxBEpun-B",
        category: "yoghurt",
        badge: "Organic",
        status: "in_stock" as const,
    },
    {
        id: "3",
        name: "Signature Sourdough",
        sku: "BAK-SD-02",
        price: 7.0,
        stock: 5,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBl8kDdOxZmQvamJRVW6j6sbnApf2IJSfvRT_ePeAIne-I7n-WAR9J7wqpQXp04F3tEdFFMyniSOeku77PISc1yYlGYZrZ4DLYNhCNQTEF07rUuFdhxQmtl1keDP_YcjC5uXzy6K2j3k3qPSe8rRdp9vNrVG5IxjQua5v_d1xq0K3nQ35YRe2dlu-EUctlIMhw4xbWYlSgvD4nn-dVeYLc2e3a7fx0vxvc1sM3-0x0MPQXVdUGneWMLwygz_Mh_FXb4nIfo8w__6f5a",
        category: "bakery",
        badge: "Fresh Daily",
        status: "low_stock" as const,
    },
    {
        id: "4",
        name: "Spiced Chocolate Milk",
        sku: "MLK-CHOC-500",
        price: 5.5,
        stock: 0,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAahdN79k-hM4I41t8LrD24bG4gS6yLAWiwjPcdXEOrqVHQ7F0s4Ny96SApl6kBPYr5z6hX8mCjwNo2P9txh5TUxf6flxzzXBN-M3sejFWyNt1bMdQX1J-MOlY78pFXYnGRNbDiitCfXmbKv2AP6ylYBtnGq9cAB4bu1W8Ty1GkaXpMEkawuPhwOY1OJ8Rem7d_AaX_2FjU7KcGUKcz9i-cmkPcDXwz-Ar0dIw-mZ-5d6_QcyhZQg5Lsz9_3WW5qwZnkF1KW6EQ7Ws0",
        category: "milk",
        status: "out_of_stock" as const,
    },
];

const categories = [
    { id: "all", label: "All Products", count: 24 },
    { id: "milk", label: "Milk", count: 8 },
    { id: "yoghurt", label: "Yoghurt", count: 6 },
    { id: "bakery", label: "Bakery", count: 4 },
    { id: "seasonal", label: "Seasonal", count: 6 },
];

export default function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [products] = useState(mockProducts);

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesCategory =
            activeCategory === "all" || product.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

  

    return (
        <>
            <Head title="Product Catalog - Admin" />
            <AuthenticatedLayout>
                <div className="p-6 md:p-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface mb-2">
                                Product Catalog
                            </h2>
                            <p className="text-on-surface-variant font-medium">
                                Manage your artisanal dairy and bakery
                                offerings.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <ActionButton
                                icon={HiOutlineFilter}
                                label="Filters"
                                variant="secondary"
                            />
                            <ActionButton
                                icon={HiOutlinePlus}
                                label="Add Product"
                                variant="primary"
                            />
                        </div>
                    </div>

                    {/* Category Chips */}
                    <div className="flex flex-wrap gap-3 mb-8">
                        {categories.map((cat) => (
                            <FilterChip
                                key={cat.id}
                                label={cat.label}
                                active={activeCategory === cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                count={cat.count}
                            />
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="mb-8 max-w-md">
                        <SearchBar
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={setSearchQuery}
                        />
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 gap-3 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onEdit={(id) => console.log("Edit", id)}
                                onArchive={(id) => console.log("Archive", id)}
                            />
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12">
                            <span className="material-symbols-outlined text-5xl text-on-surface-variant/40 mb-3">
                                inventory_2
                            </span>
                            <p className="text-on-surface-variant">
                                No products found
                            </p>
                        </div>
                    )}
                </div>
            </AuthenticatedLayout>
        </>
    );
}
