import React from "react";

interface CategoryPerformanceRowProps {
    name: string;
    description: string;
    revenue: string;
    percentage: string;
    image: string;
}

export const CategoryPerformanceRow: React.FC<CategoryPerformanceRowProps> = ({
    name,
    description,
    revenue,
    percentage,
    image,
}) => {
    return (
        <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-lg">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-surface-container rounded overflow-hidden">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <p className="font-bold text-on-surface">{name}</p>
                    <p className="text-xs text-on-surface-variant">
                        {description}
                    </p>
                </div>
            </div>
            <div className="text-right">
                <p className="font-bold text-primary">{revenue}</p>
                <p className="text-[10px] font-bold text-on-surface-variant">
                    {percentage}
                </p>
            </div>
        </div>
    );
};
