import React from "react";
import Button from "@/Components/UI/Button";
import { cn } from "@/Utils/helpers";

interface ProTipCardProps {
    title: string;
    description: string;
    buttonText?: string;
    onButtonClick?: () => void;
    className?: string;
}

export const ProTipCard: React.FC<ProTipCardProps> = ({
    title,
    description,
    buttonText = "Upgrade Now",
    onButtonClick,
    className,
}) => {
    return (
        <div
            className={cn(
                "md:col-span-8 bg-surface-container-highest rounded-2xl md:rounded-3xl p-6 md:p-8 relative overflow-hidden group",
                className
            )}
        >
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <span className="px-2 md:px-3 py-1 bg-primary-container text-on-primary-container text-[8px] md:text-[10px] font-bold rounded-full uppercase tracking-wider inline-block">
                        Pro Tip
                    </span>
                    <h3 className="text-xl md:text-3xl font-headline font-bold text-on-surface leading-tight mt-3 md:mt-4">
                        {title}
                    </h3>
                    <p className="text-sm md:text-base text-on-surface-variant mt-1 md:mt-2 max-w-sm">
                        {description}
                    </p>
                </div>
                <Button
                    onClick={onButtonClick}
                    variant="primary"
                    className="mt-5 md:mt-8 px-5 md:px-6 py-2 md:py-3   rounded-xl w-fit font-bold hover:scale-105 transition-transform"
                >
                    {buttonText}
                </Button>
            </div>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 md:w-64 md:h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
        </div>
    );
};

export default ProTipCard;
