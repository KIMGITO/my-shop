import React from "react";
import { cn } from "@/Utils/helpers";

interface ProgressCardProps {
    nextRewardName: string;
    coinsNeeded: number;
    progress: number; // 0-100 percentage
    totalCoins: number;
    message?: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
    nextRewardName,
    coinsNeeded,
    progress,
    totalCoins,
    message,
}) => {
    return (
        <div className="lg:col-span-2 bg-surface-container-lowest p-6 md:p-8 rounded-2xl md:rounded-[2rem] flex flex-col justify-between min-h-[280px] md:min-h-[320px]">
            <div>
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6 md:mb-8">
                    <div>
                        <h3 className="text-xl md:text-2xl font-headline font-bold text-on-surface">
                            Next Reward
                        </h3>
                        <p className="text-sm md:text-base text-on-surface-variant font-medium">
                            {nextRewardName}
                        </p>
                    </div>
                    <span className="bg-surface-container-high px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold text-on-surface whitespace-nowrap">
                        {coinsNeeded} coins to go
                    </span>
                </div>

                {/* Progress Track */}
                <div className="relative pt-6 md:pt-8">
                    <div className="w-full h-3 md:h-4 bg-surface-container-low rounded-full overflow-hidden">
                        <div
                            className="h-full gold-gradient rounded-full relative transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute right-0 top-0 h-full w-6 md:w-8 bg-white/20 blur-sm"></div>
                        </div>
                    </div>
                    <div className="flex justify-between mt-3 md:mt-4 text-[10px] md:text-xs font-black text-on-surface-variant uppercase tracking-tighter">
                        <span>0 Coins</span>
                        <span>500 Coins</span>
                        <span>1000 Coins</span>
                        <span className="text-primary">1500 Coins</span>
                    </div>
                </div>
            </div>

            {message && (
                <div className="mt-6 md:mt-8 flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-surface-container-low rounded-xl md:rounded-2xl">
                    <span className="material-symbols-outlined text-primary">
                        auto_awesome
                    </span>
                    <p className="text-xs md:text-sm font-medium">{message}</p>
                </div>
            )}
        </div>
    );
};

export default ProgressCard;
