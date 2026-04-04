// resources/js/Components/Layout/AuthenticatedNavbar/index.tsx
import React from "react";
import { cn } from "@/Utils/helpers";
import { useNavbarVisibility, TopNavBar, BottomNavBar, NavLink } from ".";

interface AuthenticatedNavbarProps {
    scrollContainerRef: React.RefObject<HTMLDivElement>;
    navLinks?: NavLink[];
    children?: React.ReactNode;
    showSearch?: boolean;
    showNotifications?: boolean;
    showCart?: boolean;
    showThemeToggle?: boolean;
    showAvatar?: boolean;
    className?: string;
}

export const AuthenticatedNavbar: React.FC<AuthenticatedNavbarProps> = ({
    children,
    navLinks,
    scrollContainerRef,
    showSearch = true,
    showNotifications = true,
    showCart = true,
    showThemeToggle = true,
    showAvatar = true,
    className,
}) => {
    const { isLinksVisible } = useNavbarVisibility({ scrollContainerRef });
    const hasContent = !!children || (navLinks && navLinks.length > 0);

    return (
        <header
            className={cn("sticky top-0 z-30 w-full select-none", className)}
        >
            <TopNavBar
                showSearch={showSearch}
                showNotifications={showNotifications}
                showCart={showCart}
                showThemeToggle={showThemeToggle}
                showAvatar={showAvatar}
            />

            <BottomNavBar
                isVisible={isLinksVisible}
                hasContent={hasContent}
                navLinks={navLinks}
            >
                {children}
            </BottomNavBar>
        </header>
    );
};

export default AuthenticatedNavbar;
