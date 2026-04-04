import React from "react";
import Button from "@/Components/UI/Button";

interface UpgradeCardProps {
    title: string;
    description: string;
    buttonText: string;
    onUpgrade: () => void;
}

export const UpgradeCard: React.FC<UpgradeCardProps> = ({
    title,
    description,
    buttonText,
    onUpgrade,
}) => {
    return (
        <div className="editorial-gradient p-6 md:p-8 bg-surface-container-lowest rounded-2xl md:rounded-[2rem] text-primary-dark relative group">
            <span className="material-symbols-outlined text-3xl md:text-4xl mb-3 md:mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
                stars
            </span>
            <h4 className="text-xl md:text-2xl font-black font-headline mb-2 leading-tight">
                {title}
            </h4>
            <p className="text-xs md:text-sm opacity-90 mb-5 md:mb-6 font-medium">
                {description}
            </p>
            <Button
                onClick={onUpgrade}
                variant="primary"
                className="px-5 md:px-6 py-2 md:py-3  text-shadow-transparent font-bold rounded-xl text-xs md:text-sm transition-transform active:scale-95"
            >
                {buttonText}
            </Button>
        </div>
    );
};

export default UpgradeCard;