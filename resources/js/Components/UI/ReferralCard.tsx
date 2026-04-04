import React from "react";
import Button from "@/Components/UI/Button";

interface ReferralCardProps {
    onCopyLink?: () => void;
}

export const ReferralCard: React.FC<ReferralCardProps> = ({ onCopyLink }) => {
    return (
        <div className="bg-mist-500/95 text-surface p-8 rounded-[30px] relative overflow-hidden group">
            <h4 className="text-2xl font-headline font-bold mb-2">
                Refer a Neighbor
            </h4>
            <p className="text-white text-base mb-6 font-play font-extralight text-[16px] tracking-wide  ">
                Give $10, Get $10. Spread the creamy goodness.
            </p>
            <Button
                onClick={onCopyLink}
                variant="primary"
                className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold text-sm w-full group-hover:scale-[1.02] transition-transform"
            >
                Copy Invite Link
            </Button>
        </div>
    );
};
export default ReferralCard;