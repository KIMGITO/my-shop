import React, { useState, useEffect } from "react";
import { cn } from "@/Utils/helpers";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import Input from "./Input";

interface QuantitySelectorProps {
    quantity: number; // The "truth" from your Cart state
    onUpdate: (newQuantity: string) => void;
    min?: number;
    max?: number;
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
    quantity,
    onUpdate,
    min = 0,
    max = 99,
    size = "md",
    disabled = false,
}) => {
    // 1. Local state handles the string typing (allowing "")
    const [localValue, setLocalValue] = useState<string>(String(quantity));

    // 2. Keep local state in sync if global quantity changes (e.g., from another component)
    useEffect(() => {
        setLocalValue(String(quantity));
    }, [quantity]);

    const sizeClasses = {
        sm: "w-7 h-7",
        md: "w-8 h-8",
        lg: "w-10 h-10",
    };

    const inputSizeClasses = {
        sm: "w-8 text-xs",
        md: "w-10 text-sm",
        lg: "w-12 text-base",
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        // Just update local state while typing; don't call onUpdate yet
        setLocalValue(val);
    };

    const handleBlur = () => {
        // 3. When the user clicks away, commit the value to global state
        // If empty, we treat as "0" (which your parent updateQuantity handles)
        onUpdate(localValue === "" ? "0" : localValue);
    };

    const handleButtonClick = (delta: number) => {
        const current = parseInt(localValue, 10) || 0;
        const next = Math.min(max, Math.max(min, current + delta));
        setLocalValue(String(next));
        onUpdate(String(next));
    };

    return (
        <div
            className={cn(
                "flex items-center bg-surface-container-high rounded-lg p-1 border border-transparent focus-within:border-primary transition-all",
                disabled && "opacity-50 pointer-events-none"
            )}
        >
            <button
                type="button"
                onClick={() => handleButtonClick(-1)}
                disabled={disabled || quantity <= min}
                className={cn(
                    sizeClasses[size],
                    "flex items-center justify-center hover:bg-surface-container-highest rounded-md transition-colors disabled:opacity-30"
                )}
            >
                <HiOutlineMinus className="text-xs" />
            </button>

            <Input
                type="number"
                height="sm"
                value={localValue === "0" && document.activeElement !== undefined ? localValue : localValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={cn(
                    inputSizeClasses[size],
                    "bg-transparent text-end font-bold border-none focus:ring-0 p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                )}
                min={min}
                max={max}
            />

            <button
                type="button"
                onClick={() => handleButtonClick(1)}
                disabled={disabled || quantity >= max}
                className={cn(
                    sizeClasses[size],
                    "flex items-center justify-center hover:bg-surface-container-highest rounded-md transition-colors"
                )}
            >
                <HiOutlinePlus className="text-xs" />
            </button>
        </div>
    );
};

export default QuantitySelector;