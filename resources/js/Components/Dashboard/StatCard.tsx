import React from "react";
import { cn } from "@/Utils/helpers";
import Button from "@/Components/UI/Button";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import { TbAward } from "react-icons/tb";
import { IconType } from "react-icons";

interface StatCardProps {
    title: string;
    value: string | number;
    Icon?: IconType;
    variant?: "default" | "primary";
    buttonText?: string;
    onButtonClick?: () => void;
    description?: string;
    className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    variant = "default",
    buttonText,
    onButtonClick,
    description,
    Icon ,
    className,
}) => {
    const variants = {
        default: "bg-surface-container-lowest",
        primary: "bg-primary-container",
    };

    const textColors = {
        default: "text-on-surface",
        primary: "text-on-primary-container",
    };

    return (
        <div
            className={cn(
                "rounded-[32px] p-6 shadow-sm border border-outline-variant/10 relative overflow-hidden",
                variants[variant],
                className
            )}
        >
            {Icon && (
                <div className="absolute -bottom-4 -right-4 text-8xl text-on-primary/20 "> {<Icon />} </div>
            )}
            <div className="relative z-10 ">
                <p className="text-secondary-container font-thin uppercase tracking-widest mb-1 ">
                    {title}
                </p>
                <h3
                    className={cn(
                        "text-4xl font-headline font-bold",
                        textColors[variant]
                    )}
                >
                    {value}
                </h3>
                {description && (
                    <p className="text-on-primary-container/70 text-[10px]  mt-2">
                        {description}
                    </p>
                )}
                {buttonText && (
                    <Button
                        onClick={onButtonClick}
                        variant="outline"
                        className="mt-6 w-full flex items-center justify-center gap-2 font-bold text-on-primary py-3  rounded-2xl hover:bg-primary/10 transition-colors border-gray-300"
                    >
                        <HiOutlinePlusCircle size={20} /> {buttonText}
                    </Button>
                )}
            </div>
        </div>
    );
};
export default StatCard;