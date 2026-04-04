import React from "react";
import { cn } from "@/Utils/helpers";

interface SalesChartProps {
    data: number[];
    labels: string[];
    title?: string;
}

export const SalesChart: React.FC<SalesChartProps> = ({
    data,
    labels,
    title = "Sales Activity by Hour",
}) => {
    const maxValue = Math.max(...data);

    return (
        <div className="bg-surface-container-low p-6 md:p-8 rounded-2xl">
            <h2 className="text-xl md:text-2xl font-headline font-bold text-on-surface mb-6 md:mb-8">
                {title}
            </h2>
            <div className="h-48 md:h-64 flex items-end justify-between gap-2 md:gap-4 px-2 md:px-4">
                {data.map((value, i) => (
                    <div
                        key={i}
                        className="flex-1 flex flex-col items-center gap-2 group"
                    >
                        <div
                            className={cn(
                                "w-full rounded-t-lg transition-all duration-300",
                                i === 2 || i === 5
                                    ? "bg-primary-container"
                                    : "bg-surface-container-highest group-hover:bg-primary"
                            )}
                            style={{ height: `${(value / maxValue) * 100}%` }}
                        />
                        <span className="text-[8px] md:text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">
                            {labels[i]}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SalesChart;
