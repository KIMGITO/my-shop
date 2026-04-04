import React from "react";
import Button from "@/Components/UI/Button";
import { Reward } from "@/types";

interface VoucherCardProps {
    reward: Reward;
    onRedeem: (rewardId: string) => void;
}

export const VoucherCard: React.FC<VoucherCardProps> = ({
    reward,
    onRedeem,
}) => {
    return (
        <div className="group bg-surface-container-lowest rounded-2xl md:rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
            <div className="h-40 md:h-48 overflow-hidden relative">
                <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    src={reward.image}
                    alt={reward.name}
                />
                <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/90 backdrop-blur px-2 md:px-4 py-1 rounded-full text-[10px] md:text-xs font-black text-primary">
                    {reward.cost} COINS
                </div>
            </div>
            <div className="p-5 md:p-8 flex-1 flex flex-col">
                <h4 className="text-lg md:text-xl font-headline font-bold text-on-surface mb-2">
                    {reward.name}
                </h4>
                <p className="text-xs md:text-sm text-on-surface-variant mb-4 md:mb-6 flex-1">
                    {reward.description}
                </p>
                <Button
                    onClick={() => onRedeem(reward.id)}
                    variant="outline"
                    className="w-full py-3 md:py-4 border-2 border-primary text-primary font-black rounded-xl hover:bg-primary hover:text-white transition-all"
                >
                    Redeem Voucher
                </Button>
            </div>
        </div>
    );
};

export default VoucherCard;
