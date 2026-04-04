import React from "react";
import { cn } from "@/Utils/helpers";
import {
    HiOutlineLocationMarker,
    HiOutlineClock,
    HiOutlineArrowRight,
} from "react-icons/hi";

interface OrderCardProps {
    order: {
        id: string;
        orderNumber: string;
        title: string;
        amount: number;
        items: number;
        distance: string;
        timeAgo: string;
        priority?: "normal" | "high";
        itemsIcons: string[];
    };
    onViewDetails?: (id: string) => void;
    draggable?: boolean;
}

export const OrderCard: React.FC<OrderCardProps> = ({
    order,
    onViewDetails,
    draggable = true,
}) => {
    const priorityColor =
        order.priority === "high" ? "border-error" : "border-primary";

    return (
        <div
            className={cn(
                "bg-surface-container-lowest p-5 rounded-xl border-l-4 hover:shadow-lg transition-all group",
                priorityColor,
                draggable && "cursor-grab active:cursor-grabbing"
            )}
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1 block">
                        {order.orderNumber}
                    </span>
                    <h3 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                        {order.title}
                    </h3>
                </div>
                <div className="text-right">
                    <p className="text-sm font-bold text-on-surface">
                        ${order.amount.toFixed(2)}
                    </p>
                    <p className="text-[10px] text-on-surface-variant">
                        {order.items} items
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-on-surface-variant mb-4">
                <div className="flex items-center gap-1">
                    <HiOutlineLocationMarker className="text-sm" />
                    <span>{order.distance} away</span>
                </div>
                <div className="flex items-center gap-1">
                    <HiOutlineClock className="text-sm" />
                    <span>Placed {order.timeAgo}</span>
                </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-surface-container-low">
                <div className="flex -space-x-2">
                    {order.itemsIcons.map((icon, idx) => (
                        <div
                            key={idx}
                            className="w-6 h-6 rounded-full border-2 border-white bg-tertiary-container flex items-center justify-center text-[10px] font-bold"
                        >
                            {icon}
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => onViewDetails?.(order.id)}
                    className="text-primary font-bold text-xs flex items-center gap-1 hover:underline"
                >
                    View Details
                    <HiOutlineArrowRight className="text-xs" />
                </button>
            </div>
        </div>
    );
};
