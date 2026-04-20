import React, { useState } from "react";
import { cn } from "@/Utils/helpers";
import { Product } from "@/types/pos";
import { HiOutlineShoppingCart, HiOutlineStar } from "react-icons/hi2";
import { MdAddShoppingCart, MdOutlinePlusOne } from "react-icons/md";
import Button from "../UI/Button";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedAddButton from "../UI/AnimatedAddButton";

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
    variant?: "grid" | "list";
}

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onAddToCart,
    variant = "grid",
}) => {

    const [added, setAdded] = useState(false);
    const handleClick = () => {
        onAddToCart(product);
        setAdded(true);

        setTimeout(() => {
            setAdded(false);
        }, 300);
    };
    if (variant === "list") {
        return (
            <div className="flex items-center gap-3 p-3 bg-surface-container-lowest rounded-xl hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h4 className="font-bold text-on-surface truncate">{product.name}</h4>
                        {product.isOrganic && (
                            <span className="text-[8px] bg-tertiary-container text-on-tertiary-container px-1.5 py-0.5 rounded-full">Organic</span>
                        )}
                    </div>
                    <p className="text-xs text-on-surface-variant">{product.unit}</p>
                    <p className="text-sm font-bold text-primary">${product.price.toFixed(2)}</p>
                </div>
                    <AnimatedAddButton flyX={-120} flyY={500} added={added} onClick={() => handleClick()} />

            </div>
        );
    }
    
    return (
        <div className="bg-surface-container-lowest p-4 rounded-xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-all group">
            <div className="relative h-32 rounded-lg overflow-hidden bg-surface-container">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.isOrganic && (
                    <span className="absolute top-2 right-2 bg-tertiary-container text-on-tertiary-container text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Organic
                    </span>
                )}
                {product.isPopular && (
                    <span className="absolute top-2 left-2 bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <HiOutlineStar className="text-xs" /> Popular
                    </span>
                )}
            </div>
            <div>
                <h3 className="font-bold text-on-surface">{product.name}</h3>
                <p className="text-xs text-on-surface-variant">{product.unit}</p>
            </div>
            <div className="flex items-center justify-between mt-auto">
                <span className="text-lg font-black text-primary">${product.price.toFixed(2)}</span>
                <AnimatedAddButton added={added} onClick={() => handleClick()} />
            </div>
        </div>
    );
};

export default ProductCard;