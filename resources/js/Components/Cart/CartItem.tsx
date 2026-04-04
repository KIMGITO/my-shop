// resources/js/Components/Cart/CartItem.tsx
import React from "react";
import { router } from "@inertiajs/react";
import QuantitySelector from "@/Components/UI/QuantitySelector";

interface CartItemProps {
    item: {
        id: number;
        name: string;
        price: number;
        quantity: number;
        unit: string;
        image: string;
    };
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
    item,
    onUpdateQuantity,
    onRemove,
}) => {
    const handleProductClick = () => {
        router.visit(`/product/${item.id}`);
    };

    return (
        <div className="bg-surface-container-low p-6 rounded-xl flex flex-col md:flex-row gap-6">
            <div
                className="w-full md:w-32 h-32 rounded-lg overflow-hidden bg-background flex-shrink-0 cursor-pointer"
                onClick={handleProductClick}
            >
                <img
                    className="w-full h-full object-cover"
                    src={item.image}
                    alt={item.name}
                />
            </div>
            <div className="flex-grow flex flex-col justify-between">
                <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                        <h3
                            className="text-xl font-bold text-on-surface cursor-pointer hover:text-primary transition-colors"
                            onClick={handleProductClick}
                        >
                            {item.name}
                        </h3>
                        <p className="text-sm text-on-surface-variant font-medium">
                            {item.unit}
                        </p>
                    </div>
                    <span className="text-xl font-bold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                    </span>
                </div>
                <div className="flex flex-wrap justify-between items-center gap-4 mt-4">
                    <QuantitySelector
                        quantity={item.quantity}
                        onIncrease={() =>
                            onUpdateQuantity(item.id, item.quantity + 1)
                        }
                        onDecrease={() =>
                            onUpdateQuantity(item.id, item.quantity - 1)
                        }
                        size="sm"
                    />
                    <button
                        onClick={() => onRemove(item.id)}
                        className="flex items-center gap-1 text-error text-sm font-bold hover:underline"
                    >
                        <span className="material-symbols-outlined text-sm">
                            delete
                        </span>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
