// resources/js/Components/UI/Badge.tsx
import React from "react";
import { cn } from "@/Utils/helpers";

interface BadgeProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "success" | "warning";
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = "primary",
    className,
}) => {
    const variants = {
        primary: "bg-primary text-on-primary",
        secondary: "bg-surface-container-high text-on-surface",
        success: "bg-green-500 text-white",
        warning: "bg-yellow-500 text-black",
    };

    return (
        <span
            className={cn(
                "inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
};

export default Badge;
