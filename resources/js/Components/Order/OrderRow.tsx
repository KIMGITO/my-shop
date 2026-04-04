import React from "react";
import { cn } from "@/Utils/helpers";
import { Order } from "@/types";

interface OrderRowProps {
    order: Order;
    onViewDetails: (orderId: string) => void;
    onDownloadInvoice: (orderId: string) => void;
}

export const OrderRow: React.FC<OrderRowProps> = ({
    order,
    onViewDetails,
    onDownloadInvoice,
}) => {
    const getStatusConfig = (status: Order["status"]) => {
        const configs = {
            delivered: {
                color: "bg-green-500",
                label: "Delivered",
                bgClass: "bg-green-500/10",
                textClass: "text-green-700",
            },
            completed: {
                color: "bg-green-500",
                label: "Completed",
                bgClass: "bg-green-500/10",
                textClass: "text-green-700",
            },
            canceled: {
                color: "bg-error",
                label: "Canceled",
                bgClass: "bg-error/10",
                textClass: "text-error",
            },
            pending: {
                color: "bg-yellow-500",
                label: "Pending",
                bgClass: "bg-yellow-500/10",
                textClass: "text-yellow-700",
            },
            processing: {
                color: "bg-blue-500",
                label: "Processing",
                bgClass: "bg-blue-500/10",
                textClass: "text-blue-700",
            },
        };
        return configs[status] || configs.pending;
    };

    const statusConfig = getStatusConfig(order.status);
    const isCanceled = order.status === "canceled";

    const getOrderIcon = () => {
        if (isCanceled) return "cancel";
        if (order.status === "delivered") return "local_shipping";
        if (order.status === "processing") return "package_2";
        return "inventory_2";
    };

    return (
        <div
            className={cn(
                "grid grid-cols-12 gap-4 px-4 md:px-8 py-4 md:py-6 items-center hover:bg-surface-container-low/50 transition-colors group",
                !isCanceled && "cursor-pointer"
            )}
        >
            {/* Order Details */}
            <div className="col-span-12 md:col-span-5 flex items-center gap-3 md:gap-4 mb-3 md:mb-0">
                <div
                    className={cn(
                        "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                        isCanceled
                            ? "bg-surface-container-high opacity-50"
                            : "bg-surface-container-high"
                    )}
                >
                    <span
                        className={cn(
                            "material-symbols-outlined",
                            isCanceled
                                ? "text-on-surface-variant"
                                : "text-primary"
                        )}
                    >
                        {getOrderIcon()}
                    </span>
                </div>
                <div className="flex-1 min-w-0">
                    <p
                        className={cn(
                            "font-bold text-on-surface text-sm md:text-base truncate",
                            isCanceled && "opacity-50 line-through"
                        )}
                    >
                        {order.items[0]?.name || "Order Items"}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                        Order #{order.orderNumber} • {order.date}
                    </p>
                </div>
            </div>

            {/* Status */}
            <div className="col-span-6 md:col-span-2">
                <span
                    className={cn(
                        "inline-flex items-center gap-1 px-2 md:px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                        statusConfig.bgClass,
                        statusConfig.textClass
                    )}
                >
                    <span
                        className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            statusConfig.color
                        )}
                    ></span>
                    {statusConfig.label}
                </span>
            </div>

            {/* Total */}
            <div className="col-span-6 md:col-span-2 text-right">
                <p
                    className={cn(
                        "font-headline font-bold text-base md:text-lg",
                        isCanceled
                            ? "text-on-surface-variant"
                            : "text-on-surface"
                    )}
                >
                    KSH {order.total.toLocaleString()}
                </p>
            </div>

            {/* Actions */}
            <div className="col-span-12 md:col-span-3 flex justify-end gap-2 mt-3 md:mt-0">
                <button
                    onClick={() => onViewDetails(order.id)}
                    className="p-2 text-primary hover:bg-primary-container/20 rounded-lg transition-colors"
                    title="View Details"
                >
                    <span className="material-symbols-outlined">
                        open_in_new
                    </span>
                </button>
                {!isCanceled && (
                    <button
                        onClick={() => onDownloadInvoice(order.id)}
                        className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors"
                        title="Download Invoice"
                    >
                        <span className="material-symbols-outlined">
                            file_download
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default OrderRow;
