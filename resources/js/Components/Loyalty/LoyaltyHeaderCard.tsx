import React from "react";
import { Link } from "@inertiajs/react";
import Breadcrumb from "../Common/Breadcrumb";

interface LoyaltyHeaderProps {
    title?: string;
    subtitle?: string;
    breadcrumbs?: { label: string; href?: string }[];
}

export const LoyaltyHeader: React.FC<LoyaltyHeaderProps> = ({
    title = "Your Milky Fortune",
    subtitle = "Savor the rewards of being a regular. Every bottle delivered brings you closer to your next artisanal treat.",
    breadcrumbs = [
        { label: "Rewards Program" },
        { label: "My Wallet", href: "#" },
    ],
}) => {
    return (
        <header className="flex flex-col md:flex-row justify-between items-end gap-6 md:gap-8">
            <div className="max-">
                
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-play font-extrabold tracking-tighter text-on-surface leading-[1]">
                    {title}
                </h2>
                <p className="mt-4 font-play  md:mt-6 text-sm md:text-lg text-on-surface-variant leading-relaxed font-medium">
                    {subtitle}
                </p>
            </div>
        </header>
    );
};

export default LoyaltyHeader;
