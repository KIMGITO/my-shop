import React from "react";

interface CartSummaryProps {
    subtotal: number;
    shipping: number;
    total: number;
    itemCount: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({
    subtotal,
    shipping,
    total,
    itemCount,
}) => {
    return (
        <div className="bg-surface-container-low rounded-xl p-8 sticky top-24">
            <h2 className="text-2xl font-bold text-on-surface mb-6">
                Order Summary
            </h2>
            <div className="space-y-4 mb-8">
                <div className="flex justify-between text-on-surface-variant">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-bold tabular-nums">
                        ${subtotal.toFixed(2)}
                    </span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                    <span className="font-medium">Shipping</span>
                    <span className="font-bold tabular-nums">
                        ${shipping.toFixed(2)}
                    </span>
                </div>
                <div className="pt-4 border-t border-outline-variant flex justify-between items-center">
                    <span className="text-lg font-bold text-on-surface">
                        Total
                    </span>
                    <span className="text-3xl font-extrabold text-primary tabular-nums">
                        ${total.toFixed(2)}
                    </span>
                </div>
            </div>
            <p className="text-xs text-on-surface-variant text-center mt-4">
                Shipping calculated at checkout
            </p>
        </div>
    );
};

export default CartSummary;
