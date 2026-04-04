import React from "react";
import { Icon } from "@/Components/UI/Icon";
import { Button } from "@/Components/UI/Button";
import { Badge } from "@/Components/UI/Badge";
import { ShopProduct } from "./type";
import { router } from "@inertiajs/react";

interface ProductCardProps {
    product: ShopProduct;
    variant?: "featured" | "default";
}

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    variant = "default",
}) => {
    if (variant === "featured") {
        return (
            <div className="lg:col-span-2 group relative overflow-hidden rounded-xl bg-surface-container-low transition-all hover:shadow-2xl">
                <div
                    className="aspect-[16/9] w-full overflow-hidden cursor-pointer"
                    onClick={() => router.get(`/product/${product.id}`)}
                >
                    <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={product.image}
                        alt={product.name}
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
                            <h2 className="font-headline text-2xl font-bold text-on-surface">
                                {product.name}
                            </h2>
                        </div>
                        <span className="text-2xl font-black text-primary">
                            ${product.price}
                        </span>
                    </div>
                    <p className="text-on-surface-variant mb-6 max-w-md">
                        {product.description}
                    </p>
                    <Button
                        onClick={() => router.get("/cart")}
                        className="flex items-center gap-2"
                    >
                        Add to Cart
                        <Icon icon="arrow_forward" size="sm" />
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="group bg-surface-container-low rounded-xl overflow-hidden transition-all hover:-translate-y-1">
            <div
                className="aspect-square relative cursor-pointer"
                onClick={() => router.get(`/product/${product.id}`)}
            >
                <img
                    className="w-full h-full object-cover"
                    src={product.image}
                    alt={product.name}
                />
                {product.isPopular && (
                    <div className="absolute top-4 right-4">
                        <Badge>Popular</Badge>
                    </div>
                )}
            </div>
            <div className="p-6">
                <h3 className="font-headline font-bold text-lg text-on-surface mb-1">
                    {product.name}
                </h3>
                <p className="text-sm text-on-surface-variant mb-4">
                    {product.description}
                </p>
                <div className="flex justify-between items-center">
                    <span className="font-bold text-on-surface">
                        ${product.price}
                    </span>
                    <button
                        onClick={() => router.get("/cart")}
                        className="p-2 rounded-full bg-surface-container-high text-primary hover:bg-primary transition-colors hover:text-on-primary"
                    >
                        <Icon icon="add_shopping_cart" />
                    </button>
                </div>
            </div>
        </div>
    );
};
