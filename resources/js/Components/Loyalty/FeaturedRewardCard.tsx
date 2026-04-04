import React from "react";
import Button from "@/Components/UI/Button";

interface FeaturedRewardCardProps {
    title: string;
    description: string;
    image: string;
    badge?: string;
    buttonText?: string;
    onActivate?: () => void;
}

export const FeaturedRewardCard: React.FC<FeaturedRewardCardProps> = ({
    title,
    description,
    image,
    badge = "Limited Offer",
    buttonText = "Activate Now",
    onActivate,
}) => {
    return (
        <div className="bg-primary-container p-6 md:p-8 rounded-2xl md:rounded-[2rem] text-on-primary-container relative overflow-hidden flex flex-col justify-between">
            <img
                className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
                src={image}
                alt="background"
            />
            <div className="relative z-10">
                <div className="bg-white/20 backdrop-blur-md w-fit px-2 md:px-3 py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-3 md:mb-4">
                    {badge}
                </div>
                <h3 className="text-xl md:text-3xl font-headline font-extrabold leading-none mb-2">
                    {title}
                </h3>
                <p className="text-xs md:text-sm opacity-90 font-medium max-w-xs">
                    {description}
                </p>
            </div>
            <Button
                onClick={onActivate}
                variant="primary"
                className="relative z-10 w-full mt-4 md:mt-6 py-3 md:py-4 bg-on-primary-container text-primary-container font-black rounded-xl hover:scale-[1.02] transition-transform"
            >
                {buttonText}
            </Button>
        </div>
    );
};

export default FeaturedRewardCard;
