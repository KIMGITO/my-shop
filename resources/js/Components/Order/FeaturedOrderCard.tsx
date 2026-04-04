import React from "react";
import Button from "@/Components/UI/Button";
import { cn } from "@/Utils/helpers";
import { Order } from "@/types";

interface FeaturedOrderCardProps {
    order: Order;
    onViewDetails: (orderId: string) => void;
    onDownloadInvoice: (orderId: string) => void;
}

export const FeaturedOrderCard: React.FC<FeaturedOrderCardProps> = ({
    order,
    onViewDetails,
    onDownloadInvoice,
}) => {
    return (
        <div className="relative group overflow-hidden rounded-3xl bg-surface-container-lowest shadow-[0_8px_24px_rgba(19,14,0,0.03)] transition-all hover:shadow-[0_12px_32px_rgba(19,14,0,0.06)]">
            <div className="flex flex-col lg:flex-row">
                {/* Image Section */}
                <div className="lg:w-1/3 relative h-48 lg:h-auto overflow-hidden">
                    <img
                        alt="Fresh Milk"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg4RwGHFdbSyrvPaNq_8HJFkdewOBWGsWfU_co844iFelir_3XXlMVaJBjGlUbC4K3ddMS88-KVIriA177hC88WE1m45Nne6JiaxSUEzwiEmd7a1Embhk1vmGJ8OEzEzHUQ_Q8ATWu7qiFZVjn7TckRs-AGlHh0KERHXTU_Nlk4N1NlQGZkCUBsRhXbg9U8Dlz_LWP8vnRCOlYuEyZEiAd7zfQ-ROJGnlj6QLpNxVhPMvH3pOPPWyjLN3phJTXt8VHMlDihxvnuIn3"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:hidden"></div>
                    <div className="absolute bottom-4 left-4 lg:hidden">
                        <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-bold">
                            LATEST ORDER
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-2/3 p-6 md:p-8 flex flex-col justify-between">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                        <div>
                            <div className="hidden lg:block mb-2">
                                <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                                    LATEST ORDER
                                </span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-headline font-bold text-on-surface">
                                {order.items[0]?.name ||
                                    "The Farmhouse Morning Pack"}
                            </h3>
                            <p className="text-sm text-on-surface-variant font-medium mt-1">
                                Order #{order.orderNumber} • {order.date}
                            </p>
                        </div>
                        <div className="text-right">
                            <span className="text-2xl md:text-3xl font-headline font-black text-on-surface">
                                KSH {order.total.toLocaleString()}
                            </span>
                            <div className="flex items-center gap-1 text-green-700 justify-end mt-1">
                                <span
                                    className="material-symbols-outlined text-sm"
                                    style={{
                                        fontVariationSettings: "'FILL' 1",
                                    }}
                                >
                                    check_circle
                                </span>
                                <span className="text-xs font-bold uppercase tracking-wider">
                                    {order.status === "delivered"
                                        ? "Delivered"
                                        : order.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 md:mt-8 flex flex-wrap gap-3 items-center">
                        <Button
                            onClick={() => onViewDetails(order.id)}
                            variant="primary"
                            className="flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined">
                                visibility
                            </span>
                            View Details
                        </Button>
                        <Button
                            onClick={() => onDownloadInvoice(order.id)}
                            variant="secondary"
                            className="flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined">
                                download
                            </span>
                            Download Invoice
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedOrderCard;
