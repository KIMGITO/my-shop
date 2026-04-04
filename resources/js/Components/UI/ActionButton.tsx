import React from "react";
import { cn } from "@/Utils/helpers";
import { IconType } from "react-icons";

interface ActionButtonProps {
    icon: IconType;
    label?: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md";
    className?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
    icon: Icon,
    label,
    onClick,
    variant = "primary",
    size = "md",
    className,
}) => {
    const variants = {
        primary:
            "bg-primary brightness-80  text-on-primary-container shadow-md hover:shadow-lg hover:brightness-110",
        secondary:
            "bg-secondary border hover:brightness-150 text-on-surface ",
        outline: "border-2 border-primary text-primary hover:bg-primary/5",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-5 py-2.5 text-sm",
    };

    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 rounded-xl font-semibold transition-all active:scale-95",
                variants[variant],
                sizes[size],
                className
            )}
        >
            <Icon className="text-lg" />
            {label && <span>{label}</span>}
        </button>
    );
};
