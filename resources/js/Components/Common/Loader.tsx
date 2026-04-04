import React from "react";
import { cn } from "@/Utils/helpers";

interface LoaderProps {
    size?: "sm" | "md" | "lg";
    fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ size = "md", fullScreen = false }) => {
    const sizes = {
        sm: "w-5 h-5",
        md: "w-8 h-8",
        lg: "w-12 h-12",
    };

    const loader = (
        <div className="flex justify-center items-center">
            <div
                className={cn(
                    "border-4 border-primary border-t-transparent rounded-full animate-spin",
                    sizes[size]
                )}
            />
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
                {loader}
            </div>
        );
    }

    return loader;
};

export default Loader;
