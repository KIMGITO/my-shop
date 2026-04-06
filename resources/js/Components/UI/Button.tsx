// resources/js/Components/UI/Button.tsx
import React from "react";
import { cn } from "@/Utils/helpers";
import { BiLoaderCircle } from "react-icons/bi";
import { TbLoader3 } from "react-icons/tb";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    className,
    loading = false,
    ...props
}) => {
    const variants = {
        primary: "bg-primary text-on-primary  hover:brightness-130",
        secondary:
            "bg-surface-container-high text-on-surface hover:bg-surface-container-low",
        outline: "border border-primary text-primary hover:bg-primary/10",
        ghost: "text-on-surface-variant hover:text-primary",
        danger: " hover:text-red-200 border border-red-200 text-red-500/40  hover:bg-red-500/20",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    return (
        <button
            className={cn(
                "rounded-full font-semibold  transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center",
                variants[variant],
                sizes[size],
                fullWidth && "w-full",
                className
            )}
            {...props}
        >
            {!loading && children}
            {loading && <TbLoader3 className="animate-spin mx-2 font-extrabold" />}
        </button>
    );
};

export default Button;
