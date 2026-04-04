import React from "react";
import Button from "@/Components/UI/Button";
import { cn } from "@/Utils/helpers";

interface CoinBalanceCardProps {
    totalCoins: number;
    onViewHistory?: () => void;
    className?: string;
}

export const CoinBalanceCard: React.FC<CoinBalanceCardProps> = ({
    totalCoins,
    onViewHistory,
    className,
}) => {
    return (
        <div
            className={cn(
                "glass-card p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-white/40 shadow-xl flex flex-col items-center text-center relative overflow-hidden",
                className
            )}
        >
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-container/20 rounded-full blur-2xl"></div>
            <div className="w-14 h-14 md:w-16 md:h-16 gold-gradient rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <span
                    className="material-symbols-outlined text-white text-2xl md:text-3xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                >
                    stars
                </span>
            </div>
            <div className="space-y-1">
                <p className="text-on-surface-variant font-bold text-xs md:text-sm uppercase tracking-widest">
                    Total Coins
                </p>
                <p className="text-3xl md:text-5xl font-headline font-black text-on-surface tabular-nums">
                    {totalCoins.toLocaleString()}
                </p>
            </div>
            <Button
                onClick={onViewHistory}
                variant="ghost"
                className="mt-4 md:mt-6 text-primary font-bold text-xs md:text-sm flex items-center gap-2 hover:underline"
            >
                View History
                <span className="material-symbols-outlined text-sm">
                    arrow_forward
                </span>
            </Button>
        </div>
    );
};

export default CoinBalanceCard;
