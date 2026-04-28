// ProductsPage.tsx (updated)
import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { ProductCard } from "@/Components/Admin/ProductCard";
import { FilterChip } from "@/Components/UI/FilterChip";
import { SearchBar } from "@/Components/UI/SearchBar";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { HiOutlinePlus, HiPlus } from "react-icons/hi";
import { Product } from "@/types";
import ProductFormModal from "./ProductFormModal";
import FloatingActionButton from "@/Components/Common/FloatingActionButton";
import Button from "@/Components/UI/Button";
import CategoryModal from "./CategoryModal";

interface Category {
    id: number | string;
    name: string;
    description: string | null;
    label?: string;
    count?: number;
}

export default function ProductsPage({
    products,
    categories: initialCategories,
    modalOpen = false,
}: {
    modalOpen: boolean;
    products: Product[];
    categories: Category[];
}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(modalOpen);
    const [dataForEdit, setDataForEdit] = useState<Product | null>(null);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    
    const [categories, setCategories] = useState<Category[]>(initialCategories);

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
                onStart: () => {},
                onSuccess: () => {
                    console.log("Product deleted successfully");
                },
                    onError: (errors) => {
                    alert(
                        "Failed to delete product: " + Object.values(errors)[0]
                    );
                },
                preserveScroll: true,
            });
        }
    };

    const handleCreateCategory = (newCategory: Category) => {
        setCategories((prev) => [...prev, newCategory]);
        // Optionally refresh products if needed
        router.reload({ only: ["products"] });
    };

    const handleUpdateCategory = (updatedCategory: Category) => {
        setCategories((prev) =>
            prev.map((cat) =>
                cat.id === updatedCategory.id ? updatedCategory : cat
            )
        );
        // Reload products to update category names in product list
        router.reload({ only: ["products"] });
    };

    const handleEditCategory = (category: Category) => {
        setEditingCategory(category);
        setIsCategoryModalOpen(true);
    };

    // Transform categories for FilterChip display
    const displayCategories = [
    { id: "all", label: "All Products", count: products.length },
    ...(categories ? categories.map(cat => ({
        id: cat.name.toLowerCase(),
        label: cat.name,
        count: products.filter(p => p.category === cat.name).length
    })) : [])
];

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

                    <div className="flex flex-wrap gap-3 mb-8 items-center">
                        {displayCategories.map((cat) => (
                            <FilterChip
                                key={cat.id}
                                label={cat.label}
                                count={cat.count}
                                active={activeCategory === cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                            />
                        ))}
                        <Button
                            className="rounded-full p-4 hover:bg-primary/60 hover:text-secondary"
                            variant="outline"
                            onClick={() => {
                                setEditingCategory(null);
                                setIsCategoryModalOpen(true);
                            }}
                        >
                            <HiPlus />
                        </Button>
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

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-on-surface-variant">
                                No products found matching your criteria.
                            </p>
                        </div>
                    )}

                    <ProductFormModal
                        isOpen={isModalOpen}
                        initialData={dataForEdit}
                        onClose={() => setIsModalOpen(false)}
                    />

                    <CategoryModal
                        isOpen={isCategoryModalOpen}
                        categories={categories}
                        selectedCategory={null}
                        editingCategory={editingCategory}
                        onClose={() => {
                            setIsCategoryModalOpen(false);
                            setEditingCategory(null);
                        }}
                        onSelectCategory={(categoryName) => {
                            // Auto-select the category filter when a category is selected
                            const category = categories && categories.find(c => c.name === categoryName);
                            if (category) {
                                setActiveCategory(category.name.toLowerCase());
                            }
                        }}
                        onCategoryCreated={handleCreateCategory}
                        onCategoryUpdated={handleUpdateCategory}
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