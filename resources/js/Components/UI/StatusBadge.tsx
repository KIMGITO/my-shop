import React from "react";
import { cn } from "@/Utils/helpers";
import { IconType } from "react-icons";

interface StatusBadgeProps {
    status:
        | "active"
        | "expiring_soon"
        | "expired"
        | "depleted"
        | "sent"
        | "draft"
        | "fulfilled"
        | "partial";
    size?: "sm" | "md";
    showDot?: boolean;
    icon?: IconType;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
    status,
    size = "md",
    showDot = true,
}) => {
    const configs = {
        active: {
            color: "bg-green-100 text-green-700",
            dotColor: "bg-green-500",
            label: "Active",
        },
        expiring_soon: {
            color: "bg-error-container/20 text-error-dim",
            dotColor: "bg-error",
            label: "Expiring Soon",
            icon: "schedule",
        },
        expired: {
            color: "bg-error text-on-error",
            dotColor: "bg-error",
            label: "Expired",
        },
        depleted: {
            color: "bg-surface-container-highest text-on-surface-variant",
            dotColor: "bg-on-surface-variant",
            label: "Depleted",
        },
        sent: {
            color: "bg-primary-container text-on-primary-container",
            dotColor: "bg-primary",
            label: "Sent",
        },
        draft: {
            color: "bg-surface-container text-on-surface-variant",
            dotColor: "bg-on-surface-variant",
            label: "Draft",
        },
        fulfilled: {
            color: "bg-green-100 text-green-700",
            dotColor: "bg-green-500",
            label: "Fulfilled",
        },
        partial: {
            color: "bg-secondary-container text-on-secondary-container",
            dotColor: "bg-secondary",
            label: "Partially Received",
        },
    };

    const config = configs[status];
    const sizeClasses = {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-3 py-1 text-xs",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full font-bold",
                sizeClasses[size],
                config.color
            )}
        >
            {showDot && (
                <span
                    className={cn("w-1.5 h-1.5 rounded-full", config.dotColor)}
                ></span>
            )}
            {config.icon && (
                <span className="material-symbols-outlined text-[14px]">
                    {config.icon}
                </span>
            )}
            {config.label}
        </span>
    );
};
