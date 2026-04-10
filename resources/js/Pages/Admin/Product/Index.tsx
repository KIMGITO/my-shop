import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { ProductCard } from "@/Components/Admin/ProductCard";
import { FilterChip } from "@/Components/UI/FilterChip";
import { SearchBar } from "@/Components/UI/SearchBar";
import { ActionButton } from "@/Components/UI/ActionButton";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { HiOutlineFilter, HiOutlinePlus } from "react-icons/hi";
import { Product } from "@/types";
import ProductFormModal from "./ProductFormModal";
import { ImageItem } from "@/Components/UI/MultipleImagesUpload";
import FloatingActionButton from "@/Components/Common/FloatingActionButton";

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
    console.log("products", products);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(modalOpen);
    const [dataForEdit, setDataForEdit] = useState<Product | null>(null);

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.category &&
                product.category
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())) ||
            (product.sku &&
                product.sku.toLowerCase().includes(searchQuery.toLowerCase()));
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

    const handleDelete = (id: number | string) => {
        if (
            confirm(
                "Are you sure you want to delete this product? All associated images will be removed."
            )
        ) {
            router.delete(route("admin.inventory.products.destroy", id), {
                onStart: () => {
                    // Optional: Start a global loading bar or local state
                },
                onSuccess: () => {
                    console.log("Product deleted successfully");
                },
                onError: (errors) => {
                    // Handle any server-side errors
                    alert(
                        "Failed to delete product: " + Object.values(errors)[0]
                    );
                },
                preserveScroll: true, // Keeps the user at the same scroll position
            });
        }
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
                    </div>

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
                                onArchive={(id) => handleDelete(id)}
                            />
                        ))}
                    </div>

                    <ProductFormModal
                        isOpen={isModalOpen}
                        initialData={dataForEdit}
                        onClose={() => setIsModalOpen(false)}
                    />
                </div>

                <FloatingActionButton
                    disabled={isModalOpen}
                    icon={<HiOutlinePlus />}
                    action={handleAddProduct}
                />
            </AuthenticatedLayout>
        </>
    );
}
