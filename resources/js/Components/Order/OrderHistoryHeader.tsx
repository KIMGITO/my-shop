import React from "react";

interface OrderHistoryHeaderProps {
    title?: string;
    subtitle?: string;
    badge?: string;
}

export const OrderHistoryHeader: React.FC<OrderHistoryHeaderProps> = ({
    title = "Order History",
    subtitle = "Track your artisanal dairy journey. View past deliveries, download invoices, and manage your morning routine.",
    badge = "Premium Subscriptions",
}) => {
    return (
        <div>
            <span className="text-primary font-bold  tracking-widest text-xs uppercase mb-2 block">
                {badge}
            </span>
            <h2 className="font-play text-3xl md:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight">
                {title}
            </h2>
            <p className="text-sm md:text-base font-play text-on-surface-variant mt-3 max-w-md">
                {subtitle}
            </p>
        </div>
    );
};

export default OrderHistoryHeader;
