// resources/js/Components/UI/Icon.tsx
import React from "react";
import { cn } from "@/Utils/helpers";

interface IconProps {
    icon: string;
    className?: string;
    fill?: boolean;
    size?: "sm" | "md" | "lg";
}

export const Icon: React.FC<IconProps> = ({
    icon,
    className,
    fill = false,
    size = "md",
}) => {
    const sizes = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-2xl",
    };

    return (
        <span
            className={cn("material-symbols-outlined", sizes[size], className)}
            style={{
                fontVariationSettings: fill ? "'FILL' 1" : "'FILL' 0",
            }}
        >
            {icon}
        </span>
    );
};
