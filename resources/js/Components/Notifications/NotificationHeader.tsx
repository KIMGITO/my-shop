import React from "react";

interface NotificationsHeaderProps {
    title?: string;
    subtitle?: string;
    badge?: string;
}

export const NotificationsHeader: React.FC<NotificationsHeaderProps> = ({
    title = "Notifications",
    subtitle = "Control how you receive fresh updates from the dairy farm. Manage your delivery alerts and farm-fresh promotions.",
    badge = "Personalization",
}) => {
    return (
        <header className="mb-8 md:mb-12">
            <span className="text-primary font-bold tracking-widest text-[10px] md:text-xs uppercase mb-2 block">
                {badge}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-black font-play text-on-surface     leading-none mb-3 md:mb-4">
                {title}
            </h2>
            <p className="text-sm md:text-lg text-on-surface-variant max-w-xl font-play font-medium leading-relaxed">
                {subtitle}
            </p>
        </header>
    );
};

export default NotificationsHeader;
