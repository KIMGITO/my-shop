// resources/js/Pages/Cashier/Checkout.tsx
import React, { useState, useEffect, useRef } from "react";
import { Head, router } from "@inertiajs/react";
import { CashierCartItem } from "@/types";
import {
    HiOutlineDevicePhoneMobile,
    HiOutlineCheckCircle,
    HiOutlineTrash,
    HiOutlinePlus,
    HiOutlineMinus,
} from "react-icons/hi2";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { HiOutlineCash } from "react-icons/hi";

const mockCart: CashierCartItem[] = [
    { id: "1", name: "Whole Milk - 1L", price: 4.5, quantity: 2 },
    { id: "2", name: "Artisan Butter - 250g", price: 3.25, quantity: 1 },
    { id: "3", name: "Greek Yogurt - 500g", price: 5.0, quantity: 1 },
];

export default function CashierCheckout() {
    const [cart, setCart] = useState<CashierCartItem[]>(mockCart);
    const [receivedAmount, setReceivedAmount] = useState<number | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<
        "cash" | "mpesa" | "both"
    >("cash");
    const [cashAmount, setCashAmount] = useState<number | null>(null);
    const [mpesaAmount, setMpesaAmount] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // Calculate totals based on payment method
    const getTotalPaid = () => {
        if (paymentMethod === "cash") return receivedAmount || 0;
        if (paymentMethod === "mpesa") return receivedAmount || 0;
        return (cashAmount || 0) + (mpesaAmount || 0);
    };

    const totalPaid = getTotalPaid();
    const change = totalPaid - subtotal;
    const isFullyPaid = totalPaid >= subtotal;

    // Focus input on mount
    useEffect(() => {
        inputRef.current?.focus();
    }, [paymentMethod]);

    const handleQuantityChange = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCart(
            cart.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleRemoveItem = (id: string) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    const handleCompleteSale = () => {
        router.post("/cashier/transaction", {
            cart,
            total: subtotal,
            paymentMethod,
            cashAmount:
                paymentMethod === "cash" || paymentMethod === "both"
                    ? paymentMethod === "cash"
                        ? receivedAmount
                        : cashAmount
                    : null,
            mpesaAmount:
                paymentMethod === "mpesa" || paymentMethod === "both"
                    ? paymentMethod === "mpesa"
                        ? receivedAmount
                        : mpesaAmount
                    : null,
            change: change > 0 ? change : 0,
        });
    };

    const formatMoney = (amount: number) => {
        return `KES ${amount.toFixed(2)}`;
    };

    return (
        <>
            <Head title="Checkout - Cashier" />
            <AuthenticatedLayout >
                <div className="p-6 max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8 flex justify-between items-end flex-wrap gap-4">
                        <div>
                            <h1 className="text-3xl font-headline font-extrabold text-on-surface mb-1">
                                Checkout
                            </h1>
                            <p className="text-on-surface-variant">
                                Order #KB-8829 •{" "}
                                {cart.reduce((sum, i) => sum + i.quantity, 0)}{" "}
                                items
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs uppercase tracking-wider text-on-surface-variant mb-1">
                                Total Due
                            </p>
                            <p className="text-4xl font-black text-primary">
                                {formatMoney(subtotal)}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Cart Section */}
                        <div className="lg:col-span-7">
                            <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden">
                                <div className="p-5 border-b border-surface-container-low">
                                    <h2 className="font-bold text-lg">
                                        Cart Items
                                    </h2>
                                </div>
                                <div className="divide-y divide-surface-container-low">
                                    {cart.map((item) => (
                                        <div
                                            key={item.id}
                                            className="p-5 flex items-center justify-between gap-4"
                                        >
                                            <div className="flex-1">
                                                <p className="font-medium">
                                                    {item.name}
                                                </p>
                                                <p className="text-sm text-on-surface-variant">
                                                    {formatMoney(item.price)}{" "}
                                                    each
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-2 bg-surface-container-low rounded-lg p-1">
                                                    <button
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                item.id,
                                                                item.quantity -
                                                                    1
                                                            )
                                                        }
                                                        className="p-1 hover:bg-surface-container rounded transition-colors"
                                                    >
                                                        <HiOutlineMinus className="text-sm" />
                                                    </button>
                                                    <span className="w-8 text-center font-medium">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                item.id,
                                                                item.quantity +
                                                                    1
                                                            )
                                                        }
                                                        className="p-1 hover:bg-surface-container rounded transition-colors"
                                                    >
                                                        <HiOutlinePlus className="text-sm" />
                                                    </button>
                                                </div>
                                                <p className="font-bold w-24 text-right">
                                                    {formatMoney(
                                                        item.price *
                                                            item.quantity
                                                    )}
                                                </p>
                                                <button
                                                    onClick={() =>
                                                        handleRemoveItem(
                                                            item.id
                                                        )
                                                    }
                                                    className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                                                >
                                                    <HiOutlineTrash className="text-lg" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Payment Section */}
                        <div className="lg:col-span-5">
                            <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-6">
                                <h2 className="font-bold text-lg mb-4">
                                    Payment
                                </h2>

                                {/* Payment Method Selection */}
                                <div className="grid grid-cols-3 gap-3 mb-6">
                                    <button
                                        onClick={() => setPaymentMethod("cash")}
                                        className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all border-2 ${
                                            paymentMethod === "cash"
                                                ? "border-primary bg-primary/5"
                                                : "border-transparent bg-surface-container-low hover:bg-surface-container"
                                        }`}
                                    >
                                        <HiOutlineCash className="text-2xl" />
                                        <span className="text-sm font-medium">
                                            Cash
                                        </span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            setPaymentMethod("mpesa")
                                        }
                                        className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all border-2 ${
                                            paymentMethod === "mpesa"
                                                ? "border-primary bg-primary/5"
                                                : "border-transparent bg-surface-container-low hover:bg-surface-container"
                                        }`}
                                    >
                                        <HiOutlineDevicePhoneMobile className="text-2xl" />
                                        <span className="text-sm font-medium">
                                            M-Pesa
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod("both")}
                                        className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all border-2 ${
                                            paymentMethod === "both"
                                                ? "border-primary bg-primary/5"
                                                : "border-transparent bg-surface-container-low hover:bg-surface-container"
                                        }`}
                                    >
                                        <div className="flex gap-1">
                                            <HiOutlineCash className="text-xl" />
                                            <HiOutlineDevicePhoneMobile className="text-xl" />
                                        </div>
                                        <span className="text-sm font-medium">
                                            Both
                                        </span>
                                    </button>
                                </div>

                                {/* Cash Input */}
                                {(paymentMethod === "cash" ||
                                    paymentMethod === "both") && (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-on-surface-variant mb-2">
                                            Cash Amount
                                        </label>
                                        <input
                                            ref={
                                                paymentMethod === "cash"
                                                    ? inputRef
                                                    : undefined
                                            }
                                            type="number"
                                            value={
                                                paymentMethod === "cash"
                                                    ? receivedAmount || ""
                                                    : cashAmount || ""
                                            }
                                            onChange={(e) => {
                                                const val = parseFloat(
                                                    e.target.value
                                                );
                                                if (paymentMethod === "cash") {
                                                    setReceivedAmount(
                                                        isNaN(val) ? null : val
                                                    );
                                                } else {
                                                    setCashAmount(
                                                        isNaN(val) ? null : val
                                                    );
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === "Enter" &&
                                                    isFullyPaid
                                                ) {
                                                    handleCompleteSale();
                                                }
                                            }}
                                            placeholder="0.00"
                                            className="w-full px-4 py-3 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary text-on-surface text-lg"
                                            step="0.01"
                                        />
                                    </div>
                                )}

                                {/* M-Pesa Input */}
                                {(paymentMethod === "mpesa" ||
                                    paymentMethod === "both") && (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-on-surface-variant mb-2">
                                            M-Pesa Amount
                                        </label>
                                        <input
                                            ref={
                                                paymentMethod === "mpesa"
                                                    ? inputRef
                                                    : undefined
                                            }
                                            type="number"
                                            value={
                                                paymentMethod === "mpesa"
                                                    ? receivedAmount || ""
                                                    : mpesaAmount || ""
                                            }
                                            onChange={(e) => {
                                                const val = parseFloat(
                                                    e.target.value
                                                );
                                                if (paymentMethod === "mpesa") {
                                                    setReceivedAmount(
                                                        isNaN(val) ? null : val
                                                    );
                                                } else {
                                                    setMpesaAmount(
                                                        isNaN(val) ? null : val
                                                    );
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === "Enter" &&
                                                    isFullyPaid
                                                ) {
                                                    handleCompleteSale();
                                                }
                                            }}
                                            placeholder="0.00"
                                            className="w-full px-4 py-3 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary text-on-surface text-lg"
                                            step="0.01"
                                        />
                                    </div>
                                )}

                                {/* Summary */}
                                <div className="pt-4 border-t border-surface-container-low space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-on-surface-variant">
                                            Total Due
                                        </span>
                                        <span className="font-bold">
                                            {formatMoney(subtotal)}
                                        </span>
                                    </div>
                                    {paymentMethod === "both" &&
                                        (cashAmount || mpesaAmount) && (
                                            <>
                                                {cashAmount &&
                                                    cashAmount > 0 && (
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-on-surface-variant">
                                                                Cash
                                                            </span>
                                                            <span>
                                                                {formatMoney(
                                                                    cashAmount
                                                                )}
                                                            </span>
                                                        </div>
                                                    )}
                                                {mpesaAmount &&
                                                    mpesaAmount > 0 && (
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-on-surface-variant">
                                                                M-Pesa
                                                            </span>
                                                            <span>
                                                                {formatMoney(
                                                                    mpesaAmount
                                                                )}
                                                            </span>
                                                        </div>
                                                    )}
                                                <div className="flex justify-between pt-2 border-t border-surface-container-low">
                                                    <span className="font-medium">
                                                        Total Paid
                                                    </span>
                                                    <span className="font-bold text-primary">
                                                        {formatMoney(totalPaid)}
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    {change > 0 && isFullyPaid && (
                                        <div className="flex justify-between pt-2">
                                            <span className="text-on-surface-variant">
                                                Change
                                            </span>
                                            <span className="font-bold text-secondary">
                                                {formatMoney(change)}
                                            </span>
                                        </div>
                                    )}
                                    {totalPaid < subtotal && totalPaid > 0 && (
                                        <div className="text-xs text-error text-center pt-2">
                                            Remaining:{" "}
                                            {formatMoney(subtotal - totalPaid)}
                                        </div>
                                    )}
                                </div>

                                {/* Complete Button */}
                                <button
                                    onClick={handleCompleteSale}
                                    disabled={!isFullyPaid || totalPaid === 0}
                                    className={`w-full mt-6 py-4 rounded-xl font-bold text-lg transition-all ${
                                        isFullyPaid && totalPaid > 0
                                            ? "premium-gradient text-on-primary-container shadow-lg hover:scale-[1.02] active:scale-95"
                                            : "bg-surface-container-high text-on-surface-variant cursor-not-allowed"
                                    }`}
                                >
                                    Complete Sale
                                    {isFullyPaid && totalPaid > 0 && (
                                        <HiOutlineCheckCircle className="inline ml-2 text-xl" />
                                    )}
                                </button>

                                {/* Keyboard Hint */}
                                <p className="text-xs text-center text-on-surface-variant mt-4">
                                    Press{" "}
                                    <kbd className="px-2 py-1 bg-surface-container-low rounded text-xs">
                                        Enter
                                    </kbd>{" "}
                                    to complete sale
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
