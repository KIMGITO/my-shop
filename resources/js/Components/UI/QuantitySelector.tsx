// resources/js/Components/UI/QuantitySelector.tsx
import React from "react";
import { cn } from "@/Utils/helpers";

interface QuantitySelectorProps {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    min?: number;
    max?: number;
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
    quantity,
    onIncrease,
    onDecrease,
    min = 1,
    max = 99,
    size = "md",
    disabled = false,
}) => {
    const sizeClasses = {
        sm: "w-6 h-6 text-xs",
        md: "w-8 h-8 text-sm",
        lg: "w-10 h-10 text-base",
    };

    const textSizeClasses = {
        sm: "px-2 text-sm",
        md: "px-4 text-base",
        lg: "px-6 text-lg",
    };

    return (
        <div className="flex items-center bg-background rounded-lg p-1">
            <button
                onClick={onDecrease}
                disabled={disabled || quantity <= min}
                className={cn(
                    sizeClasses[size],
                    "flex items-center justify-center hover:bg-surface-container-high rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                )}
            >
                <span className="material-symbols-outlined text-sm">
                    remove
                </span>
            </button>
            <span
                className={cn(
                    textSizeClasses[size],
                    "font-bold text-on-surface text-center min-w-[40px]"
                )}
            >
                {quantity}
            </span>
            <button
                onClick={onIncrease}
                disabled={disabled || quantity >= max}
                className={cn(
                    sizeClasses[size],
                    "flex items-center justify-center hover:bg-surface-container-high rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                )}
            >
                <span className="material-symbols-outlined text-sm">add</span>
            </button>
        </div>
    );
};

export default QuantitySelector;
