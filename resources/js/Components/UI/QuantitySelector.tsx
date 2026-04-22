import React, { useState, useEffect } from "react";
import { cn } from "@/Utils/helpers";
import { HiOutlineMinus } from "react-icons/hi";
import Input from "./Input";
import AnimatedAddButton from "./AnimatedAddButton";

interface QuantitySelectorProps {
    quantity: number;
    onUpdate: (newQuantity: string) => void;
    min?: number;
    max?: number;
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    flyX?: number; 
    flyY?: number;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
    quantity,
    onUpdate,
    min = 0,
    max = 99,
    size = "md",
    disabled = false,
    flyX = 0,
    flyY,
}) => {
    const [localValue, setLocalValue] = useState<string>(String(quantity));
    // Internal state to trigger the "plus one" fly-away animation
    const [isAnimating, setIsAnimating] = useState(false);

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
        setLocalValue(e.target.value);
    };

    const handleBlur = () => {
        onUpdate(localValue === "" ? "0" : localValue);
    };

    const handleIncrease = () => {
        // Trigger the fly-away animation
        setIsAnimating(true);

        const current = parseInt(localValue, 10) || 0;
        const next = Math.min(max, Math.max(min, current + 1));
        setLocalValue(String(next));
        onUpdate(String(next));

        // Reset animation state after it completes (~700ms based on your transition)
        setTimeout(() => setIsAnimating(false), 750);
    };

    const handleDecrease = () => {
        const current = parseInt(localValue, 10) || 0;
        const next = Math.min(max, Math.max(min, current - 1));
        setLocalValue(String(next));
        onUpdate(String(next));
    };

    const defaultFlyY = size === "sm" ? -100 : -150;
    const finalFlyY = flyY !== undefined ? flyY : defaultFlyY;

    return (
        <div
            className={cn(
                "flex items-center bg-surface-container-high rounded-lg p-1 border border-transparent focus-within:border-primary transition-all",
                disabled && "opacity-50 pointer-events-none"
            )}
        >
            {/* Decrease Button */}
            <button
                type="button"
                onClick={handleDecrease}
                disabled={disabled || quantity <= min}
                className={cn(
                    sizeClasses[size],
                    "flex items-center justify-center hover:bg-surface-container-highest rounded-md transition-colors disabled:opacity-30"
                )}
            >
                <HiOutlineMinus className="text-xs" />
            </button>

            {/* Manual Input */}
            <Input
                type="number"
                height="sm"
                value={localValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={cn(
                    inputSizeClasses[size],
                    "bg-transparent text-end font-bold border-none focus:ring-0 p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                )}
                min={min}
                max={max}
            />

            {/* Animated Plus Button */}
            <div
                className={cn(
                    sizeClasses[size],
                    "flex items-center justify-center"
                )}
            >
                <AnimatedAddButton
                    onClick={handleIncrease}
                    added={isAnimating}
                    flyX={flyX}
                    flyY={finalFlyY}
                />
            </div>
        </div>
    );
};

export default QuantitySelector;
