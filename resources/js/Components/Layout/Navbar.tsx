import React, { useState, useEffect, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import { ThemeToggler } from "../Common/ThemeToggler";
import { UserAvatar } from "../UI/UserAvatar";
import { cn } from "@/Utils/helpers";
import {
    HiOutlineShoppingBag,
    HiOutlineMagnifyingGlass,
    HiOutlineUserCircle,
    HiOutlineChevronDown,
} from "react-icons/hi2";
import { HiOutlineLogout } from "react-icons/hi";

const Navbar: React.FC = () => {
    const { url } = usePage();
    const { auth } = usePage().props as any; // Using 'as any' if types aren't globally defined yet
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    // Scroll & Visibility State
    const [isVisible, setIsVisible] = useState(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const navLinks = [
        { name: "Shop", path: "/shop" },
        { name: "Subscriptions", path: "/subscriptions" },
        { name: "Our Story", path: "/story" },
        { name: "Wholesale", path: "/wholesale" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            // If we are at the top (scrollY < 10), keep it visible
            if (window.scrollY < 10) {
                setIsVisible(true);
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                return;
            }

            if (window.innerWidth < 768) {
                setIsVisible(true);
                if (timeoutRef.current) clearTimeout(timeoutRef.current);

                timeoutRef.current = setTimeout(() => {
                    setIsVisible(false);
                }, 2000);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full flex flex-col md:flex-row md:items-center bg-surface/90 backdrop-blur-md border-b border-outline-variant/20">
            <nav className="flex justify-between items-center w-full px-4 md:px-12 py-3 z-20 bg-inherit">
                <Link
                    href="/"
                    className="text-xl md:text-2xl font-black text-on-surface font-headline"
                >
                    Kaykay's<span className="text-primary">.</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8 mx-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            className={cn(
                                "text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
                                url === link.path
                                    ? "text-primary"
                                    : "text-on-surface-variant/70 hover:text-primary"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <button className="p-2 hover:bg-primary/5 rounded-full text-on-surface-variant">
                        <HiOutlineMagnifyingGlass className="text-xl md:text-2xl" />
                    </button>

                    <Link
                        href="/cart"
                        className="p-2 hover:bg-primary/5 rounded-full text-on-surface-variant relative"
                    >
                        <HiOutlineShoppingBag className="text-xl md:text-2xl" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-surface"></span>
                    </Link>

                    <ThemeToggler />

                    <div className="relative ml-1">
                        {auth?.user ? (
                            <button
                                onClick={() =>
                                    setIsUserMenuOpen(!isUserMenuOpen)
                                }
                                className="flex items-center gap-1 p-1 pr-2 rounded-full hover:bg-surface-container-high transition-all"
                            >
                                <UserAvatar user={auth.user} />
                                <HiOutlineChevronDown
                                    className={cn(
                                        "text-xs transition-transform",
                                        isUserMenuOpen && "rotate-180"
                                    )}
                                />
                            </button>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="p-2 text-primary rounded-full transition-colors"
                            >
                                <HiOutlineUserCircle className="text-2xl md:text-3xl hover:scale-110 transition-transform" />
                            </Link>
                        )}

                        {/* Dropdown */}
                        {isUserMenuOpen && auth?.user && (
                            <div className="absolute right-0 mt-3 w-48 bg-surface border border-outline-variant/30 rounded-2xl shadow-xl py-2 overflow-hidden animate-in fade-in zoom-in duration-200">
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-on-surface hover:bg-primary/5"
                                >
                                    Dashboard
                                </Link>
                                <hr className="border-outline-variant/20 my-1" />
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-error hover:bg-error/5 text-left"
                                >
                                    <HiOutlineLogout className="mr-2" /> Sign
                                    Out
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Row */}
            <div
                className={cn(
                    "w-full md:hidden bg-surface/80 border-t border-outline-variant/10 overflow-x-auto scrollbar-hide transition-all duration-500 ease-in-out transform",
                    isVisible
                        ? "max-h-20 opacity-100 translate-y-0"
                        : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
                )}
            >
                <div className="flex items-center justify-start gap-6 px-6 py-3 min-w-max">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            className={cn(
                                "text-[10px] font-black uppercase tracking-tighter transition-all",
                                url === link.path
                                    ? "text-primary"
                                    : "text-on-surface-variant/60"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
