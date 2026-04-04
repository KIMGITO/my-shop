import React from "react";
import { cn } from "@/Utils/helpers";

interface Category {
    id: string;
    name: string;
    icon?: string;
}

interface ProductFiltersProps {
    categories: Category[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
    sortBy: "name" | "price" | "popular";
    onSortChange: (sort: "name" | "price" | "popular") => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
    categories,
    activeCategory,
    onCategoryChange,
    sortBy,
    onSortChange,
}) => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => onCategoryChange(cat.id)}
                        className={cn(
                            "px-4 py-1.5 rounded-full text-sm font-semibold transition-all",
                            activeCategory === cat.id
                                ? "bg-primary-fixed text-on-primary-fixed"
                                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
                        )}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
            <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as any)}
                className="px-3 py-1.5 bg-surface-container-low rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary"
            >
                <option value="popular">Most Popular</option>
                <option value="name">Name A-Z</option>
                <option value="price">Price: Low to High</option>
            </select>
        </div>
    );
};

export default ProductFilters;
