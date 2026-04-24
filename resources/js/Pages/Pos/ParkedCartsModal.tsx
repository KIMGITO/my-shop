// Components/Pos/ParkedCartsModal.tsx
import { ParkedCart } from "@/Stores/usePOSCartStore";
import React, { useEffect, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { cn } from "@/Utils/helpers";
import Button from "@/Components/UI/Button";
import Badge from "@/Components/UI/Badge";

interface ParkedCartsModalProps {
    isOpen: boolean;
    parkedCarts: ParkedCart[];
    onLoadCart: (cartId: string) => void;
    onDeleteCart: (cartId: string) => void;
    onClose: () => void;
}

export const ParkedCartsModal: React.FC<ParkedCartsModalProps> = ({
    isOpen,
    parkedCarts,
    onLoadCart,
    onDeleteCart,
    onClose,
}) => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState("");

    if (!isOpen) return null;

    useEffect(() => {
        if (parkedCarts.length == 0) {
            onClose();
        }
    }, [parkedCarts.length]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-surface-container-lowest rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                {/* Header: Matching your AddAddressModal style */}
                <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center">
                    <h3 className="text-xl md:text-2xl font-bold font-headline text-on-surface">
                        Parked Carts
                    </h3>
                    <Button
                        variant="ghost"
                        className="p-2 border-0 text-2xl"
                        onClick={onClose}
                    >
                        <RiCloseLargeLine />
                    </Button>
                </div>

                {/* Content Area */}
                <div className="overflow-y-auto p-4 md:p-6 scrollbar-hidden">
                    {parkedCarts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant">
                            <span className="material-symbols-outlined text-6xl mb-4 opacity-20">
                                inventory_2
                            </span>
                            <p className="text-lg font-medium">
                                No parked carts found
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {parkedCarts.map((cart, index) => (
                                <div
                                    key={`${cart.id}-${index}`}
                                    className="group relative border border-outline-variant/20 rounded-2xl p-5 bg-surface-container-low hover:bg-surface-container transition-colors"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex-1 mr-4">
                                            {editingId === cart.id ? (
                                                <input
                                                    type="text"
                                                    value={editName}
                                                    onChange={(e) =>
                                                        setEditName(
                                                            e.target.value,
                                                        )
                                                    }
                                                    onBlur={() =>
                                                        setEditingId(null)
                                                    }
                                                    onKeyPress={(e) =>
                                                        e.key === "Enter" &&
                                                        setEditingId(null)
                                                    }
                                                    className="w-full font-bold text-lg bg-surface-container-highest border-primary rounded-lg px-2 py-1 focus:ring-2 focus:ring-primary"
                                                    autoFocus
                                                />
                                            ) : (
                                                <h4
                                                    className="font-bold text-lg text-on-surface font-headline cursor-pointer hover:text-primary transition-colors"
                                                    onDoubleClick={() => {
                                                        setEditingId(cart.id);
                                                        setEditName(cart.name);
                                                    }}
                                                    >
                                                        <div className='flex items-center gap-2'><Badge children={index + 1} className="p-0.5 px-1.5 rounded-full "  />
                                                    {`  Order ${cart.orderNumber}`}</div>
                                                </h4>
                                            )}
                                            <div className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant/60 mt-1">
                                                {new Date(
                                                    cart.parkedAt,
                                                ).toLocaleString([], {
                                                    dateStyle: "medium",
                                                    timeStyle: "short",
                                                })}
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                className="bg-primary/10 text-primary hover:bg-primary hover:text-on-primary border-0"
                                                onClick={() =>
                                                    onLoadCart(cart.id)
                                                }
                                            >
                                                Load
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-error hover:bg-error/10 border-0"
                                                onClick={() =>
                                                   onDeleteCart(cart.id)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Cart Stats */}
                                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-on-surface-variant">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">
                                                shopping_basket
                                            </span>
                                            <span>
                                                {cart.items.length} Products
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">
                                                filter_1
                                            </span>
                                            <span>
                                                {cart.items.reduce(
                                                    (sum, i) =>
                                                        sum + i.quantity,
                                                    0,
                                                )}{" "}
                                                Items
                                            </span>
                                        </div>
                                    </div>

                                    {/* Footer / Pricing */}
                                    <div className="mt-2 pt-4 border-t border-outline-variant/10 flex justify-between items-end">
                                        <div>
                                            {cart.customerName && (
                                                <div className="text-xs font-medium text-primary mb-1 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px]">
                                                        person
                                                    </span>
                                                    {cart.customerName}
                                                </div>
                                            )}
                                            <div className="text-[10px] text-on-surface-variant uppercase">
                                                Total Amount
                                            </div>
                                            <div className="font-bold text-xl text-on-surface font-headline">
                                                ${cart.total.toFixed(2)}
                                            </div>
                                        </div>
                                        <div className="text-[10px] text-right text-on-surface-variant leading-tight">
                                            Sub: ${(cart.subtotal ?? 0).toFixed(2)}
                                            <br />
                                            Tax: ${(cart.tax ?? 0).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Action */}
                <div className="p-6 border-t border-outline-variant/10">
                    <Button
                        variant="secondary"
                        className="w-full py-3 rounded-xl font-bold"
                        onClick={onClose}
                    >
                        Close Window
                    </Button>
                </div>
            </div>
        </div>
    );
};
