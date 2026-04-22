import React from "react";
import { CartItem } from "./CartItem";
import Button from "../UI/Button";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

interface OrderSummaryProps {
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
    onCheckout: () => void;
    onVoid: () => void;
    onPark: () => void;
    onRemove: (id: string) => void;
    onUpdateQuantity: (id: string, quantity: string) => void;
    orderNumber: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
    items,
    subtotal,
    tax,
    total,
    onCheckout,
    onVoid,
    onPark,
    orderNumber,
    onRemove,
    onUpdateQuantity,
}) => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="w-full lg:w-96 flex flex-col bg-surface-container-highest rounded-2xl p-5 shadow-2xl h-full">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-black text-on-surface">
                    Current Order
                </h2>
                <span className="text-primary-dim font-bold text-xs bg-surface-container-low px-3 py-1 rounded-full">
                    #{orderNumber}
                </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 mb-5 pr-1">
                {items.length === 0 ? (
                    <div className="text-center py-8 text-on-surface-variant">
                        <span className="material-symbols-outlined text-4xl mb-2">
                            shopping_cart
                        </span>
                        <p className="text-sm">No items added</p>
                    </div>
                ) : (
                    items.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onUpdateQuantity={(id, quantity) => {
                                onUpdateQuantity(id, quantity);
                            }}
                            onRemove={(id) => {
                                onRemove(id);
                            }}
                        />
                    ))
                )}
            </div>

            <div className="space-y-2 pt-4 border-t-2 border-dashed border-outline-variant/30">
                <div className="flex justify-between text-on-surface-variant text-sm">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="tabular-nums">
                        Ksh{subtotal.toFixed(2)}
                    </span>
                </div>
                <div className="flex justify-between text-on-surface-variant text-sm">
                    <span>Tax (8%)</span>
                    <span className="tabular-nums">Ksh{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-end pt-2">
                    <span className="text-lg font-bold text-on-surface">
                        Total
                    </span>
                    <span className="text-2xl font-black text-primary tabular-nums">
                        Ksh{total.toFixed(2)}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 my-4">
                <Button
                    onClick={onVoid}
                    variant="ghost"
                    className="py-2.5 bg-secondary-container/20 font-bold rounded-xl hover:bg-surface-container transition-colors text-sm"
                >
                    Void
                </Button>
                <Button
                    onClick={onPark}
                    variant="outline"
                    className="py-2.5 border hover:brightness-150  font-bold rounded-xl hover:bg-surface-container transition-colors text-sm"
                >
                    Park
                </Button>
            </div>

            <Button
                onClick={onCheckout}
                disabled={items.length === 0}
                className="w-full py-4 signature-gradient  font-black rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Quick Checkout
                <MdOutlineShoppingCartCheckout />
            </Button>
        </div>
    );
};

export default OrderSummary;
