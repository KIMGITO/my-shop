import React from "react";
import { cn } from "@/Utils/helpers";

interface SettingsSectionProps {
    title: string;
    description: string;
    icon: string;
    children: React.ReactNode;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
    title,
    description,
    icon,
    children,
}) => {
    return (
        <div
            className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm"
            id={title.toLowerCase().replace(/\s+/g, "-")}
        >
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h4 className="text-2xl font-extrabold font-headline tracking-tight">
                        {title}
                    </h4>
                    <p className="text-on-surface-variant text-sm mt-1">
                        {description}
                    </p>
                </div>
                <span className="material-symbols-outlined text-primary text-3xl">
                    {icon}
                </span>
            </div>
            {children}
        </div>
    );
};
