import React from "react";
import { cn } from "@/Utils/helpers";
import { IconType } from "react-icons";

interface KPICardProps {
    title: string;
    value: string | number;
    icon: IconType;
    trend?: { value: number; direction: "up" | "down" };
    color?: "primary" | "secondary" | "tertiary" | "error";
    subtitle?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
    title,
    value,
    icon: Icon,
    trend,
    color = "primary",
    subtitle,
}) => {
    const colorClasses = {
        primary: "bg-primary/10 text-primary",
        secondary: "bg-secondary/10 text-secondary",
        tertiary: "bg-tertiary/10 text-tertiary",
        error: "bg-error/10 text-error",
    };

    return (
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 relative overflow-hidden group">
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-stone-500 font-bold text-xs uppercase tracking-widest">
                        {title}
                    </span>
                    <div className={cn("p-2 rounded-lg", colorClasses[color])}>
                        <Icon className="text-xl" />
                    </div>
                </div>
                <div className="text-3xl font-black font-headline">{value}</div>
                {trend && (
                    <div
                        className={cn(
                            "flex items-center gap-1 mt-2 text-sm font-bold",
                            trend.direction === "up"
                                ? "text-green-600"
                                : "text-error"
                        )}
                    >
                        <span className="material-symbols-outlined text-sm">
                            {trend.direction === "up"
                                ? "trending_up"
                                : "trending_down"}
                        </span>
                        <span>{trend.value}% vs last month</span>
                    </div>
                )}
                {subtitle && (
                    <p className="text-xs text-on-surface-variant mt-2">
                        {subtitle}
                    </p>
                )}
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
                <Icon className="text-8xl" />
            </div>
        </div>
    );
};
