import React from "react";
import { cn } from "@/Utils/helpers";
import { IconType } from "react-icons";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: IconType;
    trend?: string;
    color?: "primary" | "secondary" | "tertiary" | "error";
    className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon: Icon,
    trend,
    color = "primary",
    className,
}) => {
    const colorClasses = {
        primary: "bg-primary-container/20 text-primary",
        secondary: "bg-secondary-container/20 text-secondary",
        tertiary: "bg-tertiary-container/20 text-tertiary",
        error: "bg-error-container/20 text-error",
    };

    return (
        <div
            className={cn(
                "bg-surface-container-lowest p-5 md:p-6 rounded-2xl shadow-sm border border-outline-variant/10 flex flex-col justify-between min-h-[130px] md:min-h-[140px]",
                className
            )}
        >
            <div className="flex justify-between items-start gap-2">
                <div
                    className={cn(
                        "p-1.5 md:p-2 rounded-lg flex-shrink-0",
                        colorClasses[color]
                    )}
                >
                    <Icon className="text-xl md:text-2xl" />
                </div>
                {trend && (
                    <span className="text-[10px] md:text-xs bg-primary-container/20 text-primary px-2 py-1 rounded-full font-bold whitespace-nowrap flex-shrink-0">
                        {trend}
                    </span>
                )}
            </div>
            <div className="mt-2 md:mt-0">
                <p className="text-on-surface-variant text-[11px] md:text-sm font-semibold uppercase tracking-wider truncate">
                    {title}
                </p>
                <p className="text-2xl md:text-3xl font-bold text-on-surface truncate">
                    {value}
                </p>
            </div>
        </div>
    );
};

export default StatCard;
