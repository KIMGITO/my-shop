import React from "react";
import { ShoppingCart, Star } from "lucide-react";
import { Product } from "../../types";
import { router } from "@inertiajs/react";
import Button from "./Button";

interface ProductCardProps {
    product: Product;
    variant?: "default" | "compact" | "featured";
    size?: "xs" | "sm" | "md" | "lg";
    onAddToCart?: (product: Product) => void;
    hideRating?: boolean; // New prop to hide rating on xs
    hideUnit?: boolean; // New prop to hide unit on xs
    showAddButton?: boolean; // New prop to control add button visibility
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    variant = "default",
    size = "md",
    onAddToCart,
    hideRating = false,
    hideUnit = false,
    showAddButton = true,
}) => {
    const sizeConfigs = {
        xs: {
            container: "w-28", // Square card
            image: "aspect-square",
            title: "text-[10px] font-thin",
            price: "text-[10px]",
            padding: "p-0.5",
            iconSize: 12,
            imageSize: "w-full",
            ratingSize: 8,
        },
        sm: {
            container: "w-36",
            image: "aspect-square",
            title: "text-xs font-bold",
            price: "text-xs",
            padding: "p-2",
            iconSize: 14,
            imageSize: "w-full",
            ratingSize: 10,
        },
        md: {
            container: "w-full",
            image: "aspect-square",
            title: "text-base font-bold",
            price: "text-lg",
            padding: "p-4",
            iconSize: 18,
            imageSize: "w-full",
            ratingSize: 14,
        },
        lg: {
            container: "w-full max-w-2xl",
            image: "aspect-video",
            title: "text-2xl font-bold",
            price: "text-3xl",
            padding: "p-6",
            iconSize: 22,
            imageSize: "w-full",
            ratingSize: 16,
        },
    };

    const config = sizeConfigs[size];

    const renderRating = (iconSize = 14) => {
        if (hideRating) return null;

        const fullStars = Math.floor(product.rating);
        const hasHalfStar = product.rating % 1 >= 0.5;

        return (
            <div className="flex items-center gap-0.5">
                {[...Array(fullStars)].map((_, i) => (
                    <Star
                        key={i}
                        size={iconSize}
                        className="fill-primary text-primary"
                    />
                ))}
                {hasHalfStar && (
                    <Star
                        size={iconSize}
                        className="fill-primary text-primary opacity-50"
                    />
                )}
                {size !== "xs" && size !== "sm" && (
                    <span className="text-[10px] font-bold text-on-surface-variant ml-0.5">
                        {product.rating}
                    </span>
                )}
            </div>
        );
    };

    const handleProductClick = () => {
        router.visit(`/product/${product.id}`);
    };

    const handleAddToCartClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onAddToCart?.(product);
    };

    // Featured Variant - Full width with description and badge
    if (variant === "featured") {
        return (
            <div
                className="lg:col-span-2 group relative overflow-hidden rounded-xl bg-surface-container-low transition-all hover:shadow-2xl cursor-pointer"
                onClick={handleProductClick}
            >
                <div className="aspect-[16/9] w-full overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
                <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            {product.badge && (
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2 block">
                                    {product.badge}
                                </span>
                            )}
                            <h2 className="font-headline md:text-2xl font-bold text-on-surface">
                                {product.name}
                            </h2>
                        </div>
                        <span className="text-2xl font-black text-primary">
                            ${product.price}
                        </span>
                    </div>
                    <p className="text-on-surface-variant mb-6 max-w-md">
                        {product.description ||
                            "Premium artisanal dairy product from Kaykay's farm."}
                    </p>
                    <Button
                        variant="primary"
                        className="px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all hover:gap-4 active:scale-95"
                        onClick={handleAddToCartClick}
                    >
                        Add to Cart
                        <span className="material-symbols-outlined text-sm">
                            arrow_forward
                        </span>
                    </Button>
                </div>
            </div>
        );
    }

    // Compact Variant - Smaller, no unit text
    if (variant === "compact") {
        return (
            <div
                className={`group bg-surface-container-lowest ${config.padding} rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer ${config.container}`}
                onClick={handleProductClick}
            >
                <div
                    className={`${config.image} rounded-lg overflow-hidden bg-surface-container mb-2 relative`}
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.isPopular && size !== "xs" && (
                        <div className="absolute top-1 right-1 bg-primary px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase text-on-primary">
                            Popular
                        </div>
                    )}
                </div>

                <div className="space-y-0.5">
                    <h4 className={`${config.title} text-on-surface truncate`}>
                        {product.name}
                    </h4>
                    {size !== "xs" && (
                        <div className="flex justify-between items-center pt-0.5">
                            <span
                                className={`${config.price} font-extrabold text-primary`}
                            >
                                ${product.price}
                            </span>
                            {renderRating(config.ratingSize)}
                        </div>
                    )}
                    {size === "xs" && (
                        <div className="flex justify-between items-center pt-0.5">
                            <span className="font-extrabold text-primary text-[10px]">
                                ${product.price}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div
            className={`group bg-surface-container-lowest ${config.padding} rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer ${config.container}`}
            onClick={handleProductClick}
        >
            <div
                className={`${config.image} rounded-lg overflow-hidden bg-surface-container mb-2 relative`}
            >
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.isPopular && size !== "xs" && (
                    <div className="absolute top-2 right-2 bg-primary px-2 py-0.5 rounded-full text-[8px] md:text-[10px] font-bold uppercase text-on-primary">
                        Popular
                    </div>
                )}
                {product.inStock && showAddButton && size !== "xs" && (
                    <button
                        onClick={handleAddToCartClick}
                        className="absolute bottom-2 right-2 p-1.5 md:p-2 bg-primary/80 backdrop-blur rounded-lg text-on-primary hover:bg-primary transition-all"
                    >
                        <ShoppingCart size={config.iconSize} />
                    </button>
                )}
                {product.inStock && showAddButton && size === "xs" && (
                    <button
                        onClick={handleAddToCartClick}
                        className="absolute bottom-1 right-1 p-1 bg-primary/80 backdrop-blur rounded-md text-on-primary hover:bg-primary transition-all"
                    >
                        <ShoppingCart size={10} />
                    </button>
                )}
            </div>

            <div className="space-y-0.5">
                <h4 className={`${config.title} text-on-surface truncate`}>
                    {product.name}
                </h4>
                {!hideUnit && size !== "xs" && (
                    <p className="text-[10px] md:text-xs text-on-surface-variant truncate">
                        {product.unit}
                    </p>
                )}
                {size === "xs" && !hideUnit && (
                    <p className="text-[8px] text-on-surface-variant truncate">
                        {product.unit}
                    </p>
                )}

                <div className="flex justify-between items-center pt-0.5">
                    <span
                        className={`${config.price} font-extrabold text-primary`}
                    >
                        ${product.price}
                    </span>
                    {!hideRating && renderRating(config.ratingSize)}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
