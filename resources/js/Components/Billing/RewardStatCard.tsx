import React from "react";
import { cn } from "@/Utils/helpers";

interface RewardsStatCardProps {
    rewardsEarned: number;
    className?: string;
}

export const RewardsStatCard: React.FC<RewardsStatCardProps> = ({
    rewardsEarned,
    className,
}) => {
    return (
        <div
            className={cn(
                "md:col-span-4 bg-surface-container-highest rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col justify-center items-center text-center ",
                className
            )}
        >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-tertiary-container rounded-full flex items-center justify-center mb-3 md:mb-4">
                <span className="material-symbols-outlined text-primary text-2xl md:text-4xl">
                    military_tech
                </span>
            </div>
            <h4 className="text-3xl md:text-4xl font-headline font-black text-on-surface">
                {rewardsEarned.toLocaleString()}
            </h4>
            <p className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-on-surface-variant">
                Rewards Earned
            </p>
        </div>
    );
};

export default RewardsStatCard;
