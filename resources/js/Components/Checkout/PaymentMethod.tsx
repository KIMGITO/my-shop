import React, { useState } from "react";

interface PaymentMethodProps {
    onSelect?: (method: string) => void;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({ onSelect }) => {
    const [selected, setSelected] = useState("mpesa");

    const methods = [
        { id: "mpesa", icon: "smartphone", label: "M-Pesa" },
        { id: "card", icon: "credit_card", label: "Credit Card" },
        { id: "cash", icon: "payments", label: "Cash" },
    ];

    return (
        <section>
            <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-primary">
                    payments
                </span>
                <h2 className="font-headline text-2xl font-bold text-on-surface">
                    Payment Method
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {methods.map((method) => (
                    <div
                        key={method.id}
                        onClick={() => {
                            setSelected(method.id);
                            onSelect?.(method.id);
                        }}
                        className={`cursor-pointer p-6 rounded-xl transition-all ${
                            selected === method.id
                                ? "bg-surface-container-highest border-2 border-primary ring-2 ring-primary ring-offset-2 ring-offset-background"
                                : "bg-surface-container-low hover:bg-surface-container"
                        }`}
                    >
                        <div className="flex flex-col gap-4">
                            <span
                                className={`material-symbols-outlined text-3xl ${
                                    selected === method.id
                                        ? "text-primary"
                                        : "text-on-surface-variant"
                                }`}
                            >
                                {method.icon}
                            </span>
                            <span
                                className={`font-bold ${
                                    selected === method.id
                                        ? "text-on-surface"
                                        : "text-on-surface-variant"
                                }`}
                            >
                                {method.label}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PaymentMethod;
