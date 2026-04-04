import React from "react";
import { CartItem as CartItemType } from "@/types/pos";
import { HiOutlineMinus, HiOutlinePlus, HiOutlineTrash } from "react-icons/hi2";

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
    item,
    onUpdateQuantity,
    onRemove,
}) => {
    return (
        <div className="flex items-center gap-3 bg-surface-container-lowest p-3 rounded-xl">
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-bold text-on-surface truncate">
                    {item.name}
                </p>
                <p className="text-primary text-sm font-black">
                    ${item.price.toFixed(2)}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <div className="flex items-center bg-surface-container-high rounded-lg p-1">
                    <button
                        onClick={() =>
                            onUpdateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container-highest rounded-md transition-colors"
                        disabled={item.quantity <= 1}
                    >
                        <HiOutlineMinus className="text-sm" />
                    </button>
                    <span className="w-8 text-center font-bold text-sm">
                        {item.quantity}
                    </span>
                    <button
                        onClick={() =>
                            onUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container-highest rounded-md transition-colors"
                    >
                        <HiOutlinePlus className="text-sm" />
                    </button>
                </div>
                <button
                    onClick={() => onRemove(item.id)}
                    className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                >
                    <HiOutlineTrash className="text-lg" />
                </button>
            </div>
        </div>
    );
};

export default CartItem;
