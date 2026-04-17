import React, { useState } from "react";
import { cn } from "@/Utils/helpers"; // Assuming your utility for class merging

type ImageShape = "circle" | "none";
type AspectRatio = "1/1" | "4/3" | "16/9" | "21/9" | "auto";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string | null | undefined;
    alt?: string;
    shape?: ImageShape;
    aspectRatio?: AspectRatio;
    fallback?: string;
    containerClassName?: string;
    /** * For specific pixel sizes like "24" or "48".
     * If provided, it overrides standard responsive classes.
     */
    customSize?: number | string;
}

const shapeClasses: Record<ImageShape, string> = {
    circle: "rounded-full",
    none: "rounded-none",
};

const aspectClasses: Record<AspectRatio, string> = {
    "1/1": "aspect-square",
    "4/3": "aspect-[4/3]",
    "16/9": "aspect-video",
    "21/9": "aspect-[21/9]",
    auto: "aspect-auto",
};

export const LazyImage: React.FC<LazyImageProps> = ({
    src,
    alt = "image",
    shape = "square",
    aspectRatio = "1/1",
    className,
    containerClassName,
    fallback = "https://res.cloudinary.com/dhekeyvop/image/upload/v1775646023/logo_qneo5y.png",
    customSize,
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Dynamic style for custom pixel sizes (e.g., 24px)
    const customStyle = customSize
        ? {
              width:
                  typeof customSize === "number"
                      ? `${customSize}px`
                      : customSize,
              height:
                  typeof customSize === "number"
                      ? `${customSize}px`
                      : customSize,
          }
        : {};

    return (
        <div
            className={cn(
                "relative overflow-hidden bg-surface-container-low flex-shrink-0",
                !customSize && aspectClasses[aspectRatio],
                shapeClasses[shape],
                containerClassName
            )}
            style={customStyle}
        >
            {/* Shimmer/Placeholder State */}
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 animate-pulse bg-surface-container-high" />
            )}

            <img
                src={hasError || !src ? fallback : src}
                alt={alt}
                loading="lazy"
                decoding="async"
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
                className={cn(
                    "w-full h-full object-cover transition-all duration-500",
                    !isLoaded ? "opacity-0 scale-95" : "opacity-100 scale-100",
                    className
                )}
                {...props}
            />
        </div>
    );
};

export default LazyImage;
