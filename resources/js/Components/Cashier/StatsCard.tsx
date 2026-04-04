import React from "react";
import { cn } from "@/Utils/helpers";
import { IconType } from "react-icons";

interface StatCardProps {
    label: string;
    value: string | number;
    icon: IconType;
    iconColor?: string;
    trend?: {
        value: number;
        direction: "up" | "down";
    };
    className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
    label,
    value,
    icon: Icon,
    iconColor = "text-primary",
    trend,
    className,
}) => {
    return (
        <div
            className={cn(
                "bg-surface-container-lowest p-6 rounded-xl shadow-sm border-l-4 border-primary",
                className
            )}
        >
            <div className="flex items-center justify-between mb-4">
                <span className="text-on-surface-variant font-label font-semibold text-sm">
                    {label}
                </span>
                <Icon className={cn("text-2xl", iconColor)} />
            </div>
            <h3 className="text-3xl font-headline font-extrabold text-on-surface">
                {value}
            </h3>
            {trend && (
                <p
                    className={cn(
                        "text-xs font-bold mt-2 flex items-center gap-1",
                        trend.direction === "up"
                            ? "text-green-600"
                            : "text-error"
                    )}
                >
                    {trend.direction === "up" ? "↑" : "↓"} {trend.value}% vs
                    yesterday
                </p>
            )}
        </div>
    );
};

export default StatCard;
