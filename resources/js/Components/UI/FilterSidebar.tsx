// components/ui/FilterSidebar.tsx
import React, { useState } from "react";

interface FilterSidebarProps {
    categories: Array<{ name: string; count: number }>;
    onCategoryChange: (category: string) => void;
    onPriceRangeChange: (min: number, max: number) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
    categories,
    onCategoryChange,
    onPriceRangeChange,
}) => {
    const [priceRange, setPriceRange] = useState(1000);
    const [selectedCategory, setSelectedCategory] = useState("All Products");

    const handlePriceChange = (value: number) => {
        setPriceRange(value);
        onPriceRangeChange(0, value);
    };

    return (
        <aside className="w-full md:w-64 space-y-10">
            {/* Categories */}
            <section>
                <h3 className="font-headline text-lg font-bold mb-6 text-on-surface">
                    Categories
                </h3>
                <div className="flex flex-wrap md:flex-col gap-2">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            onClick={() => {
                                setSelectedCategory(category.name);
                                onCategoryChange(
                                    category.name === "All Products"
                                        ? ""
                                        : category.name
                                );
                            }}
                            className={`flex items-center justify-between px-4 py-2 rounded-lg font-bold transition-all ${
                                selectedCategory === category.name
                                    ? "bg-primary-fixed text-on-primary-fixed"
                                    : "hover:bg-surface-container-low text-on-surface-variant"
                            }`}
                        >
                            <span>{category.name}</span>
                            <span className="text-xs opacity-60">
                                {category.count}
                            </span>
                        </button>
                    ))}
                </div>
            </section>

            {/* Price Range */}
            <section>
                <h3 className="font-headline text-lg font-bold mb-6 text-on-surface">
                    Price Range
                </h3>
                <div className="space-y-4">
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange}
                        onChange={(e) =>
                            handlePriceChange(parseInt(e.target.value))
                        }
                        className="w-full h-1.5 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between items-center text-sm font-semibold text-on-surface-variant">
                        <span>$0</span>
                        <span>${priceRange}+</span>
                    </div>
                </div>
            </section>

            {/* Farm Status */}
            <section className="bg-surface-container-low rounded-xl p-6">
                <h4 className="font-headline text-sm font-bold mb-2 uppercase tracking-wider text-primary">
                    Farm Status
                </h4>
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></div>
                    <p className="text-xs font-medium text-on-surface-variant leading-relaxed">
                        Fresh batches arriving from the paddock every 4 hours.
                    </p>
                </div>
            </section>
        </aside>
    );
};

export default FilterSidebar;
