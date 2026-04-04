// resources/js/Components/Layout/AuthenticatedNavbar/NavIconButton.tsx
import React from "react";

interface NavIconButtonProps {
    icon: React.ReactNode;
    onClick?: () => void;
}

export const NavIconButton: React.FC<NavIconButtonProps> = ({
    icon,
    onClick,
}) => (
    <button
        onClick={onClick}
        className="p-2 text-on-surface/60 hover:text-primary hover:bg-primary/5 rounded-full transition-all"
    >
        {icon}
    </button>
);
