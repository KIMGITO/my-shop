import React, { ReactNode } from "react";
import { Button } from "../UI/Button";
import { cn } from "@/lib/utils"; // If you have a cn utility, otherwise use a template literal

interface FloatingActionButtonProps {
    icon: ReactNode;
    action: () => void;
    disabled?: boolean;
    className?: string;
}

export const FloatingActionButton = ({
    icon,
    action,
    disabled = false,
    className = "",
}: FloatingActionButtonProps) => {
    return (
        <Button
            variant="primary"
            onClick={action}
            disabled={disabled}
            className={`
                fixed bottom-10 right-10 
                bg-primary text-on-primary 
                p-6 rounded-full shadow-2xl 
                transition-all z-100
                ${
                    disabled
                        ? "hidden cursor-not-allowed pointer-events-none grayscale-[0.5]"
                        : "hover:scale-110 active:scale-95 cursor-pointer"
                }
                ${className}
            `}
        >
            {icon}
        </Button>
    );
};

export default FloatingActionButton;
