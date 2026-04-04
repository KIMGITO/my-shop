// components/ui/CartItem.tsx
import React from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import { CartItem as CartItemType } from "../../types";

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
    item,
    onUpdateQuantity,
    onRemove,
}) => {
    return (
        <div className="bg-surface-container-lowest p-6 rounded-xl flex flex-col md:flex-row gap-6 transition-all duration-300">
            <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden bg-surface-container flex-shrink-0">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-grow flex flex-col justify-between">
                <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-on-surface">
                            {item.name}
                        </h3>
                        <p className="text-sm text-tertiary font-medium">
                            {item.unit}
                        </p>
                    </div>
                    <span className="text-xl font-bold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                    </span>
                </div>
                <div className="flex flex-wrap justify-between items-center gap-4 mt-4">
                    <div className="flex items-center bg-surface-container-low rounded-lg p-1">
                        <button
                            onClick={() =>
                                onUpdateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-high rounded transition-colors"
                            disabled={item.quantity <= 1}
                        >
                            <Minus size={14} />
                        </button>
                        <span className="px-4 font-bold text-on-surface min-w-[40px] text-center">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() =>
                                onUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-high rounded transition-colors"
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                    <button
                        onClick={() => onRemove(item.id)}
                        className="flex items-center gap-1 text-error text-sm font-bold hover:underline"
                    >
                        <Trash2 size={14} />
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
