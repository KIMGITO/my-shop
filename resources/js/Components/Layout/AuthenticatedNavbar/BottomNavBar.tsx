import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { cn } from "@/Utils/helpers";
import type { BottomNavBarProps, NavLink } from "./types";

const DEFAULT_NAV_LINKS: NavLink[] = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Subscriptions", path: "/subscriptions" },
    { name: "History", path: "/history" },
    { name: "Rewards", path: "/rewards" },
];

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
    isVisible,
    hasContent,
    navLinks,
    children,
}) => {
    const { url } = usePage();
    const activeNavLinks = navLinks || DEFAULT_NAV_LINKS;

    if (!hasContent) return null;

    return (
        <div
            className={cn(
                "relative z-10 transition-all duration-300",
                !isVisible
                    ? "max-lg:-translate-y-full max-lg:opacity-0"
                    : "translate-y-0 opacity-100"
            )}
        >
            <div className="bg-surface-container-lowest/90 backdrop-blur-lg border-b border-outline-variant/10 shadow-sm overflow-hidden">
                <nav
                    className={cn(
                        "max-w-7xl mx-auto flex items-center gap-2 sm:gap-3 py-2.5 overflow-x-auto scrollbar-hidden scroll-smooth",
                        "justify-start md:justify-center px-6 sm:px-10"
                    )}
                >
                    {children
                        ? children
                        : activeNavLinks.map((link) => (
                              <NavLinkItem
                                  key={link.path}
                                  link={link}
                                  isActive={url === link.path || !!link.active}
                              />
                          ))}

                    {/* Invisible spacer for mobile scroll */}
                    <div className="w-4 shrink-0 md:hidden" />
                </nav>
            </div>
        </div>
    );
};

interface NavLinkItemProps {
    link: NavLink;
    isActive: boolean;
}

const NavLinkItem: React.FC<NavLinkItemProps> = ({ link, isActive }) => (
    <Link
        href={link.path}
        className={cn(
            "text-[10px] font-black uppercase tracking-[0.15em] px-4 sm:px-5 py-2 rounded-full transition-all border shrink-0",
            isActive
                ? "text-primary bg-primary/5 border-primary/20 shadow-sm"
                : "text-on-surface/40 border-transparent hover:text-primary hover:bg-surface-variant/5"
        )}
    >
        {link.name}
    </Link>
);
