import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/Components/UI/Button";
import { Badge } from "@/Components/UI/Badge";
import { Rating } from "@/Components/UI/Rating";
import { QuantitySelector } from "@/Components/UI/QuantitySelector";

interface ProductInfoProps {
    product: {
        id: number;
        name: string;
        price: number;
        unit: string;
        rating: number;
        reviews: number;
        description: string;
        badge?: string;
        inStock: boolean;
    };
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleAddToCart = () => {
        router.post("/cart/add", {
            productId: product.id,
            quantity,
        });
    };

    const handleWishlist = () => {
        setIsWishlisted(!isWishlisted);
        router.post("/wishlist/toggle", { productId: product.id });
    };

    return (
        <div className="flex flex-col">
            {product.badge && (
                <div className="mb-2">
                    <Badge variant="primary">{product.badge}</Badge>
                </div>
            )}

            <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-4">
                {product.name}
            </h1>

            <Rating
                rating={product.rating}
                totalReviews={product.reviews}
                className="mb-6"
            />

            <div className="text-3xl font-bold text-primary mb-8 tracking-tight">
                ${product.price}
                <span className="text-sm font-normal text-on-surface-variant">
                    {" "}
                    / {product.unit}
                </span>
            </div>

            <p className="text-on-surface-variant leading-relaxed mb-8">
                {product.description}
            </p>

            {product.inStock ? (
                <>
                    <div className="mb-8">
                        <span className="block text-sm font-bold text-on-surface mb-3">
                            Quantity
                        </span>
                        <QuantitySelector
                            quantity={quantity}
                            onIncrease={() => setQuantity(quantity + 1)}
                            onDecrease={() => setQuantity(quantity - 1)}
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <Button
                                onClick={handleAddToCart}
                                size="lg"
                                className="flex-1"
                            >
                                <span className="material-symbols-outlined mr-2">
                                    shopping_bag
                                </span>
                                ADD TO CART
                            </Button>
                            <Button
                                onClick={handleWishlist}
                                variant="outline"
                                size="lg"
                                className="!p-4"
                            >
                                <span
                                    className="material-symbols-outlined"
                                    style={{
                                        fontVariationSettings: isWishlisted
                                            ? "'FILL' 1"
                                            : "'FILL' 0",
                                    }}
                                >
                                    favorite
                                </span>
                            </Button>
                        </div>
                        <Button variant="ghost" size="lg">
                            Buy with ShopPay
                        </Button>
                    </div>
                </>
            ) : (
                <div className="bg-error/10 text-error p-4 rounded-lg text-center">
                    <span className="material-symbols-outlined mr-2">
                        warning
                    </span>
                    Out of Stock
                </div>
            )}
        </div>
    );
};

export default ProductInfo;
