import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/Components/UI/Button";
import { Input } from "@/Components/UI/Input";

interface OrderSummaryProps {
    subtotal: number;
    shipping: number;
    tax?: number;
    total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
    subtotal,
    shipping,
    tax = 0,
    total,
}) => {
    const [voucherCode, setVoucherCode] = useState("");
    const [voucherError, setVoucherError] = useState("");

    const handleApplyVoucher = () => {
        if (!voucherCode) {
            setVoucherError("Please enter a voucher code");
            return;
        }
        // Apply voucher logic here
        router.post("/apply-voucher", { code: voucherCode });
    };

    const handleCheckout = () => {
        router.post("/checkout");
    };

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
                {tax > 0 && (
                    <div className="flex justify-between text-on-surface-variant">
                        <span className="font-medium">Tax</span>
                        <span className="font-bold tabular-nums">
                            ${tax.toFixed(2)}
                        </span>
                    </div>
                )}
                <div className="pt-4 border-t border-outline-variant flex justify-between items-center">
                    <span className="text-lg font-bold text-on-surface">
                        Total
                    </span>
                    <span className="text-3xl font-extrabold text-primary tabular-nums">
                        ${total.toFixed(2)}
                    </span>
                </div>
            </div>

            {/* Voucher Section */}
            <div className="mb-8">
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                    Apply Voucher
                </label>
                <div className="flex gap-2">
                    <Input
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        placeholder="FRESH20"
                        error={voucherError}
                        className="flex-grow"
                    />
                    <Button
                        onClick={handleApplyVoucher}
                        variant="secondary"
                        size="sm"
                    >
                        Apply
                    </Button>
                </div>
            </div>

            <Button onClick={handleCheckout} fullWidth size="lg">
                Checkout Now
                <span className="material-symbols-outlined text-sm ml-2">
                    arrow_forward
                </span>
            </Button>

            <div className="mt-6 flex items-center justify-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-lg">
                    verified_user
                </span>
                <span className="text-xs font-semibold">
                    Secure Payment Guaranteed
                </span>
            </div>
        </div>
    );
};

export default OrderSummary;
