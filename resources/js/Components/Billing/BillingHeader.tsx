import React from "react";
import { Link } from "@inertiajs/react";
import { cn } from "@/Utils/helpers";

interface BillingHeaderProps {
    title?: string;
    subtitle?: string;
    breadcrumbs?: { label: string; href?: string }[];
    currentCycle?: string;
    unpaidAmount?: number;
}

export const BillingHeader: React.FC<BillingHeaderProps> = ({
    title = "Milk Ledger.",
    subtitle = "Manage your artisanal subscriptions and download your monthly dairy statements.",
    currentCycle = "Oct '23",
    unpaidAmount = 12.4,
}) => {
    return (
        <header className="max-w-6xl mx-auto mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-2">
              
                <h2 className="text-3xl md:text-5xl font-play lg:text-6xl font-black  tracking-tighter text-on-surface leading-none">
                    {title}
                </h2>
                <p className="text-sm md:text-lg font-play text-on-surface-variant max-w-md font-medium">
                    {subtitle}
                </p>
            </div>

            <div className="flex items-center gap-3 md:gap-4 bg-surface-container-low p-1.5 md:p-2 rounded-xl md:rounded-2xl shadow-sm">
                <div className="px-3 md:px-6 py-1.5 md:py-2 border-r border-outline-variant/20 text-center">
                    <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                        Current Cycle
                    </p>
                    <p className="text-base md:text-xl font-headline font-extrabold text-on-surface">
                        {currentCycle}
                    </p>
                </div>
                <div className="px-3 md:px-6 py-1.5 md:py-2 text-center">
                    <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                        Unpaid
                    </p>
                    <p className="text-base md:text-xl font-headline font-extrabold text-error">
                        ${unpaidAmount.toFixed(2)}
                    </p>
                </div>
            </div>
        </header>
    );
};

export default BillingHeader;
