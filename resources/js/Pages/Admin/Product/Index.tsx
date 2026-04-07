import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { ProductCard } from "@/Components/Admin/ProductCard";
import { FilterChip } from "@/Components/UI/FilterChip";
import { SearchBar } from "@/Components/UI/SearchBar";
import { ActionButton } from "@/Components/UI/ActionButton";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { HiOutlineFilter, HiOutlinePlus } from "react-icons/hi";
import { Product } from "@/types";
import ProductFormModal from "./ProductFormModal";

// ... (products remains same)
const products = [
    {
        id: "1",
        name: "Golden Hour Whole Milk",
        sku: "MLK-001-WH",
        price: 450,
        unit: "1L",
        stock: 42,
        image: "https://images.unsplash.com/photo-1563636619-e9107da5a163?auto=format&fit=crop&w=800&q=80",
        category: "milk",
        badge: "Premium",
        status: "in_stock",
        description:
            "Farm-fresh whole milk with a rich, creamy finish. Non-homogenized to preserve natural flavor.",
        isFeatured: true,
    },
    {
        id: "2",
        name: "Honey Greek Yoghurt",
        sku: "YOG-HNY-500",
        price: 625,
        unit: "500g",
        stock: 18,
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
        category: "yoghurt",
        badge: "Organic",
        status: "in_stock",
        description:
            "Thick, strained Greek yoghurt infused with organic wildflower honey.",
        isPopular: true,
    },
    {
        id: "3",
        name: "Signature Sourdough",
        sku: "BAK-SD-02",
        price: 700,
        unit: "Loaf",
        stock: 5,
        image: "https://images.unsplash.com/photo-1585478259715-876a6a81b244?auto=format&fit=crop&w=800&q=80",
        category: "bakery",
        badge: "Fresh Daily",
        status: "low_stock",
        description:
            "36-hour fermented sourdough with a blistered crust and airy crumb.",
    },
    {
        id: "4",
        name: "Spiced Chocolate Milk",
        sku: "MLK-CHOC-500",
        price: 550,
        unit: "500ml",
        stock: 0,
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80",
        category: "milk",
        status: "out_of_stock",
        description:
            "Belgian cocoa blended with cinnamon and nutmeg for a warming treat.",
    },
    {
        id: "5",
        name: "Salted Butter Croissant",
        sku: "BAK-CR-01",
        price: 250,
        unit: "Piece",
        stock: 12,
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
        category: "bakery",
        status: "in_stock",
        description:
            "Flaky, multi-layered pastry made with high-fat European-style butter.",
    },
    {
        id: "6",
        name: "Wild Berry Kefir",
        sku: "YOG-KEF-BER",
        price: 480,
        unit: "330ml",
        stock: 25,
        image: "https://images.unsplash.com/photo-1571212215005-e506f3db2751?auto=format&fit=crop&w=800&q=80",
        category: "seasonal",
        badge: "Probiotic",
        status: "in_stock",
        description:
            "Effervescent probiotic drink fermented with real mountain berries.",
    },
];
const categories = [
    { id: "all", label: "All Products", count: 24 },
    { id: "milk", label: "Milk", count: 8 },
    { id: "yoghurt", label: "Yoghurt", count: 6 },
    { id: "bakery", label: "Bakery", count: 4 },
    { id: "seasonal", label: "Seasonal", count: 6 },
];

export default function ProductsPage({
    products,
    modalOpen = false,
}: {
        modalOpen: boolean;
        products: Product[];
}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(modalOpen);
    const [dataForEdit, setDataForEdit] = useState<Product | null>(null);

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesCategory =
            activeCategory === "all" || product.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const handleAddProduct = () => {
        setDataForEdit(null);
        setIsModalOpen(true);
    };

    const handleEdit = (product: any) => {
        setDataForEdit(product);
        setIsModalOpen(true);
    };

    return (
        <>
            <Head title="Product Catalog - Admin" />
            <AuthenticatedLayout>
                <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface mb-2">
                                Product Catalog
                            </h2>
                        </div>
                        <div className="flex gap-3">
                            <ActionButton
                                icon={HiOutlinePlus}
                                onClick={handleAddProduct}
                                label="Add Product"
                                variant="primary"
                            />
                        </div>
                    </div>

                    {/* FIX: Passing cat.id as key and cat.label as label string */}
                    {/* --- Change this section in your ProductsPage --- */}

                    <div className="flex flex-wrap gap-3 mb-8">
                        {categories.map((cat) => (
                            <FilterChip
                                key={cat.id}
                                label={cat.label}
                                count={cat.count}
                                active={activeCategory === cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                            />
                        ))}
                    </div>

                    <div className="mb-8 max-w-md">
                        <SearchBar
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={setSearchQuery}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onEdit={() => handleEdit(product)}
                                onArchive={(id) => console.log("Archive", id)}
                            />
                        ))}
                    </div>

                    <ProductFormModal
                        isOpen={isModalOpen}
                        initialData={dataForEdit}
                        onClose={() => setIsModalOpen(false)}
                    />
                </div>
            </AuthenticatedLayout>
        </>
    );
}
