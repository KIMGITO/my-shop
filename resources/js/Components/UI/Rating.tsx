// resources/js/Components/UI/Rating.tsx
import React from "react";
import { cn } from "@/Utils/helpers";

interface RatingProps {
    rating: number;
    totalReviews?: number;
    size?: "sm" | "md" | "lg";
    showCount?: boolean;
    className?: string;
}

export const Rating: React.FC<RatingProps> = ({
    rating,
    totalReviews,
    size = "md",
    showCount = true,
    className,
}) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const iconSizes = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-xl",
    };

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <div className="flex text-primary">
                {[...Array(fullStars)].map((_, i) => (
                    <span
                        key={`full-${i}`}
                        className={cn(
                            "material-symbols-outlined",
                            iconSizes[size]
                        )}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                        star
                    </span>
                ))}
                {hasHalfStar && (
                    <span
                        className={cn(
                            "material-symbols-outlined",
                            iconSizes[size]
                        )}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                        star_half
                    </span>
                )}
                {[...Array(emptyStars)].map((_, i) => (
                    <span
                        key={`empty-${i}`}
                        className={cn(
                            "material-symbols-outlined",
                            iconSizes[size]
                        )}
                    >
                        star
                    </span>
                ))}
            </div>
            {showCount && totalReviews !== undefined && (
                <span className="text-sm text-on-surface-variant">
                    ({totalReviews} reviews)
                </span>
            )}
        </div>
    );
};

export default Rating;
