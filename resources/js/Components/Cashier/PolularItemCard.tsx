// resources/js/Components/Cashier/PopularItemCard.tsx
import React from "react";
import { Link } from "@inertiajs/react";
import { IconType } from "react-icons";

interface PopularItemCardProps {
    title: string;
    description: string;
    revenue: string;
    image: string;
    linkTo: string;
    icon?: IconType;
    badge?: string;
}

export const PopularItemCard: React.FC<PopularItemCardProps> = ({
    title,
    description,
    revenue,
    image,
    linkTo,
    icon: Icon,
    badge = "MOST POPULAR",
}) => {
    return (
        <div className="bg-surface-container-highest  rounded-2xl overflow-hidden relative flex flex-col shadow-2xl">
            <div className="p-6 md:p-8 relative z-10 flex-1">
                <span className="bg-white dark:bg-white/20 backdrop-blur-md px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-bold dark:text-primary mb-3 md:mb-4 inline-block">
                    {badge}
                </span>
                <div className="flex items-start justify-between text-primary ">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-headline font-extrabold text-primary light:text-on-primary-container leading-tight">
                            {title}
                        </h2>
                        <p className="mt-2 md:mt-4 light:text-on-primary-container text-xs md:text-sm max-w-[180px]">
                            {description}
                        </p>
                        <p className="mt-3 text-lg font-bold light:text-on-primary-container">
                            {revenue}
                        </p>
                    </div>
                    {Icon && (
                        <Icon className="text-3xl text-on-primary-container/60" />
                    )}
                </div>
                <div className="mt-6 md:mt-8">
                    <Link
                        href={linkTo}
                        className="bg-on-primary-container text-white px-4 md:px-6 py-1.5 md:py-2 rounded-lg font-bold text-xs md:text-sm shadow-lg inline-block hover:scale-105 transition-transform"
                    >
                        View Details
                    </Link>
                </div>
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] w-32 h-32 md:w-48 md:h-48 opacity-90 rotate-12">
                <img
                    className="w-full h-full object-cover rounded-full"
                    src={image}
                    alt={title}
                />
            </div>
        </div>
    );
};

export default PopularItemCard;
