// resources/js/Components/Shop/CategoryList.tsx
import React from "react";
import { cn } from "@/Utils/helpers";

interface Category {
    name: string;
    count: number;
    slug: string;
}

interface CategoryListProps {
    categories: Category[];
    selectedCategory: string;
    onSelect: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
    categories,
    selectedCategory,
    onSelect,
}) => {
    return (
        <div className="flex flex-wrap md:flex-col gap-2">
            {categories.map((category) => (
                <button
                    key={category.slug}
                    onClick={() =>
                        onSelect(category.slug === "all" ? "" : category.name)
                    }
                    className={cn(
                        "flex items-center justify-between px-4 py-2 rounded-lg font-bold transition-all",
                        selectedCategory === category.name ||
                            (category.slug === "all" && !selectedCategory)
                            ? "bg-primary text-on-primary"
                            : "hover:bg-surface-container-low text-on-surface-variant"
                    )}
                >
                    <span>{category.name}</span>
                    <span className="text-xs opacity-60">{category.count}</span>
                </button>
            ))}
        </div>
    );
};

export default CategoryList;
