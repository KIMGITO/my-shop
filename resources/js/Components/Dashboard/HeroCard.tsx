import React from "react";
import { cn } from "@/Utils/helpers";

interface HeroCardProps {
    image?: string;
    title: string;
    description: string;
    className?: string;
    layout?: "bottom" | "center" | "top";
    overlayType?: "gradient" | "solid" | "none";
    overlayColor?: string;
    imagePosition?: "center" | "top" | "bottom";
    showAccent?: boolean;
    titleSize?: "sm" | "md" | "lg";
    children?: React.ReactNode;
}

export const HeroCard: React.FC<HeroCardProps> = ({
    image = "https://images.unsplash.com/photo-1614018453562-77f6180ce036?w=500&auto=format&fit=crop&q=90&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRlbGl2ZXJ5fGVufDB8fDB8fHww",
    title,
    description,
    className,
    layout = "bottom",
    overlayType = "gradient",
    overlayColor = "black",
    imagePosition = "center",
    showAccent = true,
    titleSize = "lg",
    children,
}) => {
    const layoutClasses = {
        bottom: "justify-end pb-6 md:pb-10",
        center: "justify-center text-center",
        top: "justify-start pt-6 md:pt-10",
    };

    const titleSizes = {
        sm: "text-xl md:text-2xl",
        md: "text-2xl md:text-3xl",
        lg: "text-3xl md:text-5xl",
    };

    const imagePositions = {
        center: "object-center",
        top: "object-top",
        bottom: "object-bottom",
    };

    const getOverlay = () => {
        switch (overlayType) {
            case "gradient":
                return `bg-gradient-to-t from-${overlayColor}/80 via-${overlayColor}/40 to-transparent`;
            case "solid":
                return `bg-${overlayColor}/60`;
            case "none":
                return "";
            default:
                return "bg-gradient-to-t from-black/80 via-black/40 to-transparent";
        }
    };

    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-4xl flex flex-col min-h-[280px] md:min-h-80 group cursor-pointer transition-all duration-300 hover:shadow-2xl",
                layoutClasses[layout],
                className
            )}
        >
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src={image}
                    className={cn(
                        "w-full h-full object-cover transition-all duration-700 group-hover:scale-110",
                        imagePositions[imagePosition],
                        "brightness-100"
                    )}
                    alt="background"
                />

                {/* Overlay */}
                {overlayType !== "none" && (
                    <div className={cn("absolute inset-0", getOverlay())} />
                )}

                {/* Hover overlay effect */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            </div>

            {/* Content */}
            <div
                className={cn(
                    "relative z-10 px-6 md:px-10 transition-all duration-300 group-hover:translate-y-[-4px]",
                    layout === "center" && "flex flex-col items-center"
                )}
            >
                <h2
                    className={cn(
                        "font-play font-black mb-2 tracking-tight leading-tight ",
                        titleSizes[titleSize],
                        layout === "center" && "text-white"
                    )}
                >
                    {title}
                </h2>
                <p
                    className={cn(
                        "font-play italic font-medium max-w-sm text-sm md:text-base",
                        layout === "center"
                            ? "text-white/90"
                            : "text-on-surface-variant"
                    )}
                >
                    {description}
                </p>

                {showAccent && (
                    <div
                        className={cn(
                            "w-12 h-0.5 bg-primary mt-4 group-hover:w-20 transition-all duration-300",
                            layout === "center" && "mx-auto"
                        )}
                    />
                )}

                {children && <div className="mt-4">{children}</div>}
            </div>
        </div>
    );
};

export default HeroCard;
