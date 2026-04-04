// resources/js/Components/Layout/AuthenticatedNavbar/types.ts
export interface NavLink {
    name: string;
    path: string;
    active?: boolean;
}

export interface TopNavBarProps {
    showSearch?: boolean;
    showNotifications?: boolean;
    showCart?: boolean;
    showThemeToggle?: boolean;
    showAvatar?: boolean;
}

export interface BottomNavBarProps {
    isVisible: boolean;
    hasContent: boolean;
    navLinks?: NavLink[];
    children?: React.ReactNode;
}

export interface UseNavbarVisibilityProps {
    scrollContainerRef: React.RefObject<HTMLDivElement>;
}
