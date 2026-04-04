// resources/js/Components/UI/Container.tsx
import React from "react";
import { cn } from "@/Utils/helpers";

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export const Container: React.FC<ContainerProps> = ({
    children,
    className,
    maxWidth = "xl",
}) => {
    const maxWidthClasses = {
        sm: "max-w-screen-sm",
        md: "max-w-screen-md",
        lg: "max-w-screen-lg",
        xl: "max-w-screen-xl",
        "2xl": "max-w-screen-2xl",
        full: "max-w-full",
    };

    return (
        <div
            className={cn("mx-auto px-6", maxWidthClasses[maxWidth], className)}
        >
            {children}
        </div>
    );
};

export default Container;
