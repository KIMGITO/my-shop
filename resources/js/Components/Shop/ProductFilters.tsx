// resources/js/Components/Shop/ProductFilters.tsx
import React from "react";
import CategoryList from "./CategoryList";
import { ShopStatus } from "./ShopStatus";

interface ProductFiltersProps {
    categories: Array<{ name: string; count: number; slug: string }>;
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
    categories,
    selectedCategory,
    onCategoryChange,
}) => {
    return (
        <aside className="w-full md:w-64 space-y-10">
            <section>
                <h3 className="font-headline text-lg font-bold mb-6 text-on-surface">
                    Categories
                </h3>
                <CategoryList
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelect={onCategoryChange}
                />
            </section>

            <ShopStatus/>
        </aside>
    );
};

export default ProductFilters;
