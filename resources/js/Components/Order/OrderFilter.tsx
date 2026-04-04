import React from "react";
import { cn } from "@/Utils/helpers";

interface OrderFiltersProps {
    activeFilter: string;
    onFilterChange: (filter: string) => void;
    activePeriod: string;
    onPeriodChange: (period: string) => void;
}

const filters = ["All Orders", "Delivered", "Processing", "Canceled"];
const periods = ["Last 30 Days", "Last 6 Months", "This Year", "All Time"];

export const OrderFilters: React.FC<OrderFiltersProps> = ({
    activeFilter,
    onFilterChange,
    activePeriod,
    onPeriodChange,
}) => {
    return (
        <div className="flex flex-wrap gap-3">
            <div className="bg-surface-container-low px-4 py-2 rounded-xl flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">
                    filter_list
                </span>
                <select
                    value={activeFilter}
                    onChange={(e) => onFilterChange(e.target.value)}
                    className="bg-transparent text-sm font-bold text-on-surface focus:outline-none"
                >
                    {filters.map((filter) => (
                        <option key={filter} value={filter}>
                            {filter}
                        </option>
                    ))}
                </select>
            </div>
            <div className="bg-surface-container-low px-4 py-2 rounded-xl flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">
                    calendar_month
                </span>
                <select
                    value={activePeriod}
                    onChange={(e) => onPeriodChange(e.target.value)}
                    className="bg-transparent text-sm font-bold text-on-surface focus:outline-none"
                >
                    {periods.map((period) => (
                        <option key={period} value={period}>
                            {period}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default OrderFilters;
