import React from "react";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import { Product } from "../../types";
import { router } from "@inertiajs/react";
import Button from "./Button";
import { SmartBadge } from "./SmartBadge";

interface ProductCardProps {
    product: Product;
    variant?: "default" | "compact" | "featured";
    size?: "xs" | "sm" | "md" | "lg";
    onAddToCart?: (product: Product) => void;
    hideRating?: boolean;
    hideUnit?: boolean;
    showAddButton?: boolean;
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
    
    // Centralized styling maps to keep the TSX clean
    const sizeConfigs = {
        xs: { container: "w-28", title: "text-[10px]", price: "text-[11px]", img: "h-24", badge: "text-[7px] px-1" },
        sm: { container: "w-36", title: "text-xs", price: "text-sm", img: "h-32", badge: "text-[8px] px-1.5" },
        md: { container: "w-full", title: "text-base", price: "text-lg", img: "aspect-square", badge: "text-[10px] px-2" },
        lg: { container: "w-full max-w-2xl", title: "text-xl", price: "text-2xl", img: "aspect-video", badge: "text-xs px-3" },
    };

    const config = sizeConfigs[size];

    const handleAction = (e: React.MouseEvent, type: 'view' | 'add') => {
        e.stopPropagation();
        if (type === 'view') router.get(route('shop.product',product.id));
        else onAddToCart?.(product);
    };

    const getBadgeType = (): "ribbon" | "flag" | "seal" | null => {
    const text = (product.badge || "").toLowerCase();

    if (text.includes("sale") || text.includes("off")) return "ribbon";
    if (text.includes("new")) return "flag";
    if (text.includes("popular") || product.isPopular) return "seal";

    return null;
};
    // Sub-component: Rating
    const Rating = () => {
        if (hideRating || size === "xs") return null;
        return (
            <div className="flex items-center gap-0.5 text-amber-500">
                <Star size={size === "sm" ? 10 : 14} className="fill-current" />
                <span className="text-[10px] font-bold text-on-surface-variant">{product.rating}</span>
            </div>
        );
    };

    // --- VARIANT: FEATURED ---
    if (variant === "featured") {
        return (
            <div 
                onClick={(e) => handleAction(e, 'view')}
                className="group relative grid md:grid-cols-2 gap-0 overflow-hidden rounded-2xl bg-surface-container-low border border-outline-variant hover:shadow-xl transition-all cursor-pointer"
            >
                <div className="relative aspect-video md:aspect-auto overflow-hidden">
                    {getBadgeType() && (
                <SmartBadge
                    text={product.badge || (product.isPopular ? "Popular" : "")}
                    type={'flag'}
                    
                />
)}
                    <img src={product.mainProductImage} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" alt={product.name} />
                </div>
                <div className="p-6 md:p-10 flex flex-col justify-center">
                    <h2 className="text-3xl font-black text-on-surface mb-2 leading-tight">{product.name}</h2>
                    <p className="text-on-surface-variant mb-6 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                        <span className="text-3xl font-black text-primary">Ksh {product.price}</span>
                        <Button variant="primary" onClick={(e) => handleAction(e, 'add')} className="rounded-full px-6">
                            Add to Cart <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // --- VARIANT: DEFAULT & COMPACT ---
    return (
        <div 
            onClick={(e) => handleAction(e, 'view')}
            className={`group relative flex flex-col bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden transition-all hover:border-primary/50 hover:shadow-md cursor-pointer ${config.container}`}
        >
            <div className={`relative ${config.img} overflow-hidden bg-surface-container`}>
                {getBadgeType() && (
    <SmartBadge
        text={product.badge || (product.isPopular ? "Popular" : "")}
        type={'ribbon'}
        variant="red"
    />
)}
                <img 
                    src={product.mainProductImage} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    alt={product.name} 
                />
                
                {showAddButton && product.inStock && (
                    <button 
                        onClick={(e) => handleAction(e, 'add')}
                        className="absolute bottom-2 right-2 p-2 bg-white/90 backdrop-blur-md text-primary rounded-full shadow-lg hover:bg-primary hover:text-white transition-all scale-0 group-hover:scale-100 origin-bottom-right"
                    >
                        <ShoppingCart size={size === "xs" ? 14 : 18} />
                    </button>
                )}
            </div>

            <div className="p-3 flex flex-col flex-grow">
                <div className="flex justify-between items-start gap-2 mb-1">
                    <h4 className={`${config.title} font-bold text-on-surface line-clamp-1 group-hover:text-primary transition-colors`}>
                        {product.name}
                    </h4>
                    <Rating />
                </div>

                {!hideUnit && (
                    <span className="text-[10px] text-on-surface-variant mb-2">{product.unit}</span>
                )}

                <div className="mt-auto pt-2 border-t border-outline-variant/50">
                    <span className={`${config.price} font-black text-primary`}>
                        Ksh {product.price}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;