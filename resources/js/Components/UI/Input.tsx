import React from "react";
import { cn } from "@/Utils/helpers";
import { IconType } from "react-icons";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    Icon?: IconType;
    disabled?: boolean;
    height?: "sm" | "md" | "lg" | "xl"; // Added sm and md
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    Icon,
    height = "sm",
    className,
    disabled,
    id,
    ...props
}) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    // Defined smaller scales: 40px (sm), 48px (md), 56px (lg), 64px (xl)
    const heightClasses = {
        sm: "h-10 text-sm",
        md: "h-12",
        lg: "h-14",
        xl: "h-16 text-lg",
    };

    return (
        <div className="space-y-1.5 w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className="text-xs font-bold text-on-surface-variant px-1 uppercase tracking-wider"
                >
                    {label}
                </label>
            )}
            <div className="relative flex items-center">
                {Icon && (
                    <span className="absolute left-4 flex items-center justify-center text-on-surface-variant pointer-events-none">
                        <span className="material-symbols-outlined text-xl">
                            <Icon className="text-xl"/>
                        </span>
                    </span>
                )}
                <input
                    id={inputId}
                    disabled={disabled}
                    className={cn(
                        "w-full px-4 rounded-xl bg-surface-container-high border-none transition-all text-on-surface font-medium",
                        "focus:bg-surface-container-highest focus:ring-2 focus:ring-primary/20 focus:outline-none",
                        heightClasses[height],
                        Icon ? "pl-12" : "pl-4",
                        error ? "ring-2 ring-error" : "",
                        className,
                        disabled ? 'bg-gray-400/50':''
                    )}
                    {...props}
                />
            </div>
            {error && (
                <p className="text-error text-[12px] mt-1 px-1">{error}</p>
            )}
        </div>
    );
};

export default Input;
