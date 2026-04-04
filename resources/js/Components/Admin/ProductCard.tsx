import React from "react";
import { cn } from "@/Utils/helpers";
import {
    HiArchiveBox,
    HiOutlinePencil,
    HiOutlineShoppingCart,
} from "react-icons/hi2";

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        sku: string;
        price: number;
        stock: number;
        image: string;
        category: string;
        badge?: string;
        status: "in_stock" | "low_stock" | "out_of_stock";
    };
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
            case "in_stock":
                return "text-secondary";
            case "low_stock":
                return "text-error";
            case "out_of_stock":
                return "text-on-surface-variant";
        }
    };

    const getStatusText = () => {
        switch (product.status) {
            case "in_stock":
                return "In Stock";
            case "low_stock":
                return "Low Stock";
            case "out_of_stock":
                return "Out of Stock";
        }
    };

    return (
        <div
            className={cn(
                "group relative bg-surface-container-lowest rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300",
                "flex flex-row md:flex-col", // List on mobile, Card on Desktop
                variant === "featured" && "md:col-span-2 lg:col-span-1"
            )}
        >
            {/* Image Section */}
            <div className="relative w-24 h-24 min-w-[6rem] md:w-full md:h-48 lg:h-64 overflow-hidden">
                <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={product.image}
                    alt={product.name}
                />
                {product.status === "out_of_stock" && (
                    <div className="absolute inset-0 bg-black/20 backdrop-grayscale"></div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-3 md:p-6 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="text-sm md:text-xl font-bold text-on-surface line-clamp-1 md:line-clamp-none">
                            {product.name}
                        </h3>
                        <span className="text-primary font-bold text-sm md:text-base ml-2">
                            ${product.price}
                        </span>
                    </div>
                    <p className="text-on-surface-variant text-[10px] md:text-sm">
                        SKU: {product.sku}
                    </p>
                </div>

                <div className="mt-2 md:mt-4 pt-2 md:pt-4 border-t border-outline-variant flex items-center justify-between">
                    <div className="flex flex-col">
                        <span
                            className={cn(
                                "text-[9px] md:text-[10px] uppercase font-bold",
                                getStatusColor()
                            )}
                        >
                            {getStatusText()}
                        </span>
                        <span className="text-sm md:text-lg font-black text-on-surface">
                            {product.stock} Units
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-1 md:gap-2">
                        <button
                            onClick={() => onEdit?.(product.id)}
                            className="p-1.5 md:p-2 rounded-lg bg-surface-container hover:bg-primary/10 text-on-surface transition-colors"
                        >
                            <HiOutlinePencil className="text-xs md:text-sm" />
                        </button>
                        <button
                            onClick={() => onArchive?.(product.id)}
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
