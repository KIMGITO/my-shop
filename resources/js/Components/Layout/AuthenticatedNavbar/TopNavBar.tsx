// resources/js/Components/Layout/AuthenticatedNavbar/TopNavBar.tsx
import { usePage } from "@inertiajs/react";
import React from "react";
import { Link } from "@inertiajs/react";
import { HiOutlineBell, HiOutlineShoppingBag } from "react-icons/hi2";
import { HiOutlineSearch } from "react-icons/hi";
import { UserAvatar } from "../../UI/UserAvatar";
import ThemeToggler from "../../Common/ThemeToggler";
import { useCartStore } from "@/Stores/useCartStore";
import type { TopNavBarProps } from "./types";
import { NavIconButton } from "./NavIconButton";

export const TopNavBar: React.FC<TopNavBarProps> = ({
    showSearch = true,
    showNotifications = true,
    showCart = true,
    showThemeToggle = true,
    showAvatar = true,
}) => {
    const { auth } = usePage().props as any;
    const user = auth?.user;
    const { getTotalItems } = useCartStore();
    const cartItemCount = getTotalItems?.() || 0;

    return (
        <div className="bg-surface-container-lowest/80  backdrop-blur-xl border-b border-outline-variant/10 relative z-20 ">
            <div className="flex  justify-between items-center w-full px-4 sm:px-6 py-3 max-w-7xl mx-auto">
                <Link
                    href="/"
                    className="text-xl sm:text-2xl font-black text-primary tracking-tighter font-headline shrink-0"
                >
                    Kaykay's<span className="text-on-surface">.</span>
                </Link>

                {/* Right Side Icons */}
                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                    {showSearch && (
                        <NavIconButton icon={<HiOutlineSearch size={20} />} />
                    )}

                    {showNotifications && (
                        <div className="relative">
                            <NavIconButton icon={<HiOutlineBell size={20} />} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full border-2 border-surface-container-lowest" />
                        </div>
                    )}

                    {showCart && (
                        <Link
                            href="/cart"
                            className="p-2 relative text-on-surface/60 hover:text-primary transition-all"
                        >
                            <HiOutlineShoppingBag size={20} />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-black min-w-[18px] h-[18px] flex items-center justify-center rounded-full shadow-sm">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                    )}

                    <div className="hidden sm:block h-6 w-[1px] bg-outline-variant/20 mx-1" />

                    {showThemeToggle && <ThemeToggler />}
                    {showAvatar && user && <UserAvatar user={user} />}
                </div>
            </div>
        </div>
    );
};

