import React from "react";
import { cn } from "@/Utils/helpers";

interface CategoryFilterProps {
    categories: { id: string; label: string }[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    activeCategory,
    onCategoryChange,
}) => {
    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={cn(
                        "px-4 md:px-6 py-1.5 md:py-2 rounded-full font-bold text-xs md:text-sm transition-all",
                        activeCategory === category.id
                            ? "bg-primary text-white"
                            : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
                    )}
                >
                    {category.label}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
