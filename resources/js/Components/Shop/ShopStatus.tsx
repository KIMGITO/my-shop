// resources/js/Components/Shop/ShopStatus.tsx
import React from "react";
import { cn } from "@/Utils/helpers";

export type ShopStatusType =
    | "open"
    | "closed"
    | "new-arrivals"
    | "new-bakery"
    | "limited-stock"
    | "sale"
    | "preorder"
    | "busy";

interface ShopStatusConfig {
    icon: string;
    title: string;
    color: string;
    pulseColor: string;
    message: string;
}

const statusConfig: Record<ShopStatusType, ShopStatusConfig> = {
    open: {
        icon: "storefront",
        title: "We're Open",
        color: "text-green-600",
        pulseColor: "bg-green-500",
        message: "Fresh batch.",
    },
    closed: {
        icon: "storefront",
        title: "Currently Closed",
        color: "text-red-600",
        pulseColor: "bg-red-500",
        message: "We'll be back tomorrow at 6:00 AM.",
    },
    "new-arrivals": {
        icon: "inventory_2",
        title: "New Arrivals",
        color: "text-primary",
        pulseColor: "bg-primary",
        message: "Check out our latest farm-fresh products!",
    },
    "new-bakery": {
        icon: "bakery_dining",
        title: "Fresh from the Oven",
        color: "text-tertiary",
        pulseColor: "bg-tertiary",
        message: "New artisanal breads and pastries just baked!",
    },
    "limited-stock": {
        icon: "warning",
        title: "Limited Stock",
        color: "text-error",
        pulseColor: "bg-error",
        message: "Hurry! These items are selling fast.",
    },
    sale: {
        icon: "local_offer",
        title: "Special Offer",
        color: "text-secondary",
        pulseColor: "bg-secondary",
        message: "Save on select dairy products this week!",
    },
    preorder: {
        icon: "schedule",
        title: "Pre-Order Now",
        color: "text-primary",
        pulseColor: "bg-primary",
        message: "Secure your batch before it's gone.",
    },
    busy: {
        icon: "speed",
        title: "High Demand",
        color: "text-warning",
        pulseColor: "bg-yellow-500",
        message: "Expect delivery delays of 15-30 minutes.",
    },
};

interface ShopStatusProps {
    status?: ShopStatusType;
    customMessage?: string;
    customTitle?: string;
    showIcon?: boolean;
    className?: string;
}

export const ShopStatus: React.FC<ShopStatusProps> = ({
    status = "open",
    customMessage,
    customTitle,
    showIcon = true,
    className,
}) => {
    const config = statusConfig[status];

    return (
        <section
            className={cn("bg-surface-container-low rounded-xl p-6", className)}
        >
            {showIcon && (
                <div className="flex items-center gap-2 mb-3">
                    <span
                        className={cn(
                            "material-symbols-outlined text-sm",
                            config.color
                        )}
                    >
                        {config.icon}
                    </span>
                    <h4 className="font-headline text-sm font-bold uppercase tracking-wider text-primary">
                        {customTitle || config.title}
                    </h4>
                </div>
            )}

            {!showIcon && (
                <h4 className="font-headline text-sm font-bold mb-2 uppercase tracking-wider text-primary">
                    {customTitle || config.title}
                </h4>
            )}

            <div className="flex items-center gap-3">
                <div
                    className={cn(
                        "w-2 h-2 rounded-full animate-pulse",
                        config.pulseColor
                    )}
                ></div>
                <p className="text-xs font-medium text-on-surface-variant leading-relaxed">
                    {customMessage || config.message}
                </p>
            </div>
        </section>
    );
};

// Individual status components for convenience
export const ShopOpen: React.FC<Partial<ShopStatusProps>> = (props) => (
    <ShopStatus status="open" {...props} />
);

export const ShopClosed: React.FC<Partial<ShopStatusProps>> = (props) => (
    <ShopStatus status="closed" {...props} />
);

export const NewArrivals: React.FC<Partial<ShopStatusProps>> = (props) => (
    <ShopStatus status="new-arrivals" {...props} />
);

export const NewBakery: React.FC<Partial<ShopStatusProps>> = (props) => (
    <ShopStatus status="new-bakery" {...props} />
);

export const LimitedStock: React.FC<Partial<ShopStatusProps>> = (props) => (
    <ShopStatus status="limited-stock" {...props} />
);

export const ShopSale: React.FC<Partial<ShopStatusProps>> = (props) => (
    <ShopStatus status="sale" {...props} />
);

export const PreOrder: React.FC<Partial<ShopStatusProps>> = (props) => (
    <ShopStatus status="preorder" {...props} />
);

export const ShopBusy: React.FC<Partial<ShopStatusProps>> = (props) => (
    <ShopStatus status="busy" {...props} />
);
