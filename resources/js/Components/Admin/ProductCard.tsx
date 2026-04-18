// ProductCard.tsx
import React from "react";
import { cn } from "@/Utils/helpers";
import { HiArchiveBox, HiOutlinePencil } from "react-icons/hi2";
import LazyImage from "../UI/LazyImage";
import { InventoryProduct } from "@/types";

interface ProductCardProps {
    product: InventoryProduct;  
    onEdit?: (id: string) => void;
    onArchive?: (id: string) => void;
    variant?: "default" | "featured";
}

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onEdit,
    onArchive,
    variant = "default",
}) => {
    const getStatusColor = () => {
        switch (product.status) {
            case "In Stock":
                return "text-secondary";
            case "Low Stock":
                return "text-error";
            case "Out of Stock":
                return "text-gray-500";
        }
    };

    const getStatusText = () => {
        switch (product.status) {
            case "In Stock":
                return "In Stock";
            case "Low Stock":
                return "Low Stock";
            case "Out of Stock":
                return "Out of Stock";
        }
    };

    const getStockBg = () => {
        switch (product.status) {
            case "Low Stock":
                return "bg-error/5 border border-error/20";
            case "Out of Stock":
                return "bg-surface-container-high opacity-80 grayscale-[0.5]";
            case "In Stock":
            default:
                return "bg-surface-container-lowest";
        }
    };

    return (
        <div
            className={cn(
                "group relative rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300",
                "flex flex-row md:flex-col",
                variant === "featured" && "md:col-span-2 lg:col-span-1",
                getStockBg()
            )}
        >
            <div className="relative w-24 h-24 min-w-[6rem] md:w-full md:h-48 lg:h-64 overflow-hidden">
                <LazyImage
                    src={product.mainProductImage}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.status !== "Out of Stock" && product.badge && (
                    <div className="absolute top-2 left-2 z-10">
                        <span className="bg-primary text-on-primary text-[10px] md:text-xs font-bold px-2 py-1 rounded-full shadow-sm uppercase tracking-wider">
                            {product.badge}
                        </span>
                    </div>
                )}
                {product.status === "Out of Stock" && (
                    <div className="absolute inset-0 bg-black/10 backdrop-grayscale" />
                )}
            </div>

            <div className="p-3 md:p-6 flex-1 flex flex-col justify-between overflow-hidden">
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm md:text-xl capitalize font-bold text-on-surface truncate md:line-clamp-2">
                            {product.name}
                        </h3>
                        <span className="text-primary font-bold text-sm md:text-base ml-2 truncate">
                            Ksh {product.price}
                        </span>
                    </div>
                    <p className="text-on-surface-variant text-[10px] text-end font-semibold truncate">
                        {product.sku}
                    </p>
                    <p className="text-on-surface-variant text-[10px] border p-2 rounded border-dashed md:text-sm truncate">
                        <span className="uppercase font-semibold">{product.category}</span>:{" "}
                        <span className="text-xs leading-loose italic capitalize">
                            {product.description}
                        </span>
                    </p>
                </div>

                <div className="mt-2 md:mt-4 pt-2 md:pt-4 border-t border-outline-variant flex items-center justify-between">
                    <div className="flex flex-col truncate">
                        <span
                            className={cn(
                                "text-[9px] md:text-[10px] uppercase font-bold truncate",
                                getStatusColor()
                            )}
                        >
                            {getStatusText()}
                        </span>
                        <span className="text-sm md:text-lg font-black text-on-surface truncate">
                            {product.stock} {product.unit}
                        </span>
                    </div>

                    <div className="flex gap-1 md:gap-2 flex-shrink-0">
                        <button
                            onClick={() => onEdit?.(product.id.toString())}
                            className="p-1.5 md:p-2 rounded-lg bg-surface-container hover:bg-primary/10 text-on-surface transition-colors"
                        >
                            <HiOutlinePencil className="text-xs md:text-sm" />
                        </button>
                        <button
                            onClick={() => onArchive?.(product.id.toString())}
                            className="p-1.5 md:p-2 rounded-lg bg-surface-container hover:bg-error/10 text-error transition-colors"
                        >
                            <HiArchiveBox className="text-xs md:text-sm" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};