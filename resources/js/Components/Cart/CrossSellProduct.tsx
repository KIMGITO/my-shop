import React from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/Components/UI/Button";

interface CrossSellProductProps {
    product: {
        id: number;
        name: string;
        price: number;
        image: string;
        description?: string;
    };
}

export const CrossSellProduct: React.FC<CrossSellProductProps> = ({
    product,
}) => {
    const handleAddToCart = () => {
        router.post("/cart/add", { productId: product.id });
    };

    return (
        <div className="bg-primary-container/10 border border-primary-container/20 rounded-xl p-6">
            <p className="text-primary font-bold text-sm mb-3">
                Add a pairing?
            </p>
            <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                        className="w-full h-full object-cover"
                        src={product.image}
                        alt={product.name}
                    />
                </div>
                <div className="flex-grow">
                    <h4 className="font-bold text-on-surface text-sm">
                        {product.name}
                    </h4>
                    {product.description && (
                        <p className="text-xs text-on-surface-variant mt-1">
                            {product.description}
                        </p>
                    )}
                    <p className="text-xs text-primary font-bold mt-1">
                        +Ksh{product.price.toFixed(2)}
                    </p>
                </div>
                <Button
                    onClick={handleAddToCart}
                    variant="primary"
                    size="sm"
                    className="!rounded-full w-8 h-8 !p-0 flex items-center justify-center"
                >
                    <span className="material-symbols-outlined text-sm">
                        add
                    </span>
                </Button>
            </div>
        </div>
    );
};

export default CrossSellProduct;
