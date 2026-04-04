import React, { PropsWithChildren, ReactNode, useEffect, useRef } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { useNavStore } from "@/Stores/useNavStore";
import { cn } from "@/Utils/helpers";
import {
    TbLayoutSidebarLeftExpandFilled,
    TbLayoutSidebarRightExpandFilled,
    TbLogout,
    TbHelpCircle,
} from "react-icons/tb";
import MobileNav from "./MobileNav";
import AuthenticatedNavbar from "./AuthenticatedNavbar/AuthenticatedNavBar";
import { useThemeStore } from "@/Stores/useThemeStore";
import Breadcrumb, { BreadcrumbItem } from "../Common/Breadcrumb";
import { UserAvatar } from "../UI/UserAvatar";

export default function Authenticated({
    children,
    header,
    breadcrumb,
    active,
}: PropsWithChildren<{
    header?: ReactNode;
    breadcrumb?: BreadcrumbItem[];
    active?: string;
}>) {
    const { items, isSidebarOpen, toggleSidebar } = useNavStore();
    const { url } = usePage();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { auth } = usePage().props;
    const user = auth.user;

    const setRoleNavigation = useNavStore((state) => state.setRoleNavigation);
    useEffect(() => {
        if (user) {
            setRoleNavigation(user.role);
        }
    }, [user?.role]);

    const { isLight } = useThemeStore();
    useEffect(() => {
        if (isLight) {
            document.documentElement.classList.add("light");
        } else {
            document.documentElement.classList.remove("light");
        }
    }, [isLight]);

    const handleLogout = () => {
        router.post("/logout");
    };
    return (
        <div className="min-h-screen bg-surface-container-lowest flex flex-col h-screen overflow-hidden">
            <AuthenticatedNavbar  scrollContainerRef={scrollContainerRef}>
                {header}
            </AuthenticatedNavbar>

            <div className="flex flex-1 overflow-hidden">
                {/* Desktop Sidebar */}
                <aside
                    className={cn(
                        "hidden lg:flex flex-col bg-surface-container-lowest/80 border-outline-variant/20 transition-all duration-300 shrink-0 h-full overflow-y-auto",
                        isSidebarOpen ? "w-72" : "w-20"
                    )}
                >
                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-auto flex-nowrap scrollbar-hidden">
                        {items.map((item) => {
                            const Icon = item.icon;
                            const isActive =
                                url === item.path || active == item.path;
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={cn(
                                        "flex items-center gap-4 px-3 py-3 rounded-xl transition-all relative group",
                                        isActive
                                            ? "bg-primary text-on-primary shadow-lg"
                                            : "text-on-surface-variant hover:bg-surface-container-high"
                                    )}
                                >
                                    <Icon className="text-2xl shrink-0" />
                                    {isSidebarOpen && (
                                        <span className="font-bold text-[11px] uppercase tracking-widest">
                                            {item.label}
                                        </span>
                                    )}
                                    {/* Tooltip for collapsed state */}
                                    {!isSidebarOpen && (
                                        <div className="absolute -left-3 top-12 z-100 text-primary text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                                            {item.label}
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Sidebar User Footer */}
                    <div
                        className={cn(
                            "mt-auto border-t border-outline-variant/10 transition-all shrink-0",
                            isSidebarOpen ? "p-6" : "p-4"
                        )}
                    >
                        <div
                            className={cn(
                                "flex items-center gap-3 mb-4",
                                !isSidebarOpen && "justify-center"
                            )}
                        >
                            <UserAvatar user={user} />
                            {isSidebarOpen && (
                                <div className="overflow-hidden">
                                    <p className="font-bold text-on-surface truncate text-sm leading-tight">
                                        {user.name}
                                    </p>
                                    {user.role == "customer" && (
                                        <p className="text-[10px] text-primary font-black uppercase tracking-tighter">
                                            Credit: {" Ksh "}
                                            {(user.credits &&
                                                user.credits.toFixed(2)) ||
                                                0}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        {isSidebarOpen && user.role == "customer" && (
                            <Link
                                href="/top-up"
                                className="block w-full py-2.5 px-4 bg-primary text-on-primary text-center font-bold rounded-xl text-[10px] uppercase tracking-widest mb-6 active:scale-95 transition-all shadow-md hover:brightness-110"
                            >
                                Top Up Credit
                            </Link>
                        )}

                        <div className="space-y-1">
                            {/* Support */}
                            {user.role != "admin" && (
                                <Link
                                    href="/support"
                                    className={cn(
                                        "relative group text-on-surface-variant hover:bg-surface-container-high rounded-lg flex items-center gap-3 py-2 px-3 transition-colors",
                                        !isSidebarOpen && "justify-center"
                                    )}
                                >
                                    <div className="relative">
                                        <TbHelpCircle size={22} />
                                        {user.notifications &&
                                            user.notifications > 0 && (
                                                <span className="absolute -top-1 -right-1 bg-error text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-surface-container-low">
                                                    {user.notifications}
                                                </span>
                                            )}
                                    </div>
                                    {isSidebarOpen && (
                                        <span className="text-sm font-medium">
                                            Support
                                        </span>
                                    )}
                                </Link>
                            )}
                            {/* Log out */}
                            <div
                                onClick={() => {
                                    handleLogout();
                                }}
                                className={cn(
                                    "w-full text-error/70 cursor-pointer hover:bg-error/30 rounded-lg flex items-center gap-3 py-2 px-3 transition-colors",
                                    !isSidebarOpen && "justify-center"
                                )}
                            >
                                <TbLogout size={22} />
                                {isSidebarOpen && (
                                    <span className="text-sm font-medium">
                                        Logout
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col overflow-hidden">
                    {/* Sticky Header Section */}
                    <div className="sticky top-0 z-20 bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant/10 flex-shrink-0">
                        <div className="flex items-center">
                            <button
                                onClick={toggleSidebar}
                                className="py-2 px-4 text-primary hidden lg:block hover:brightness-150 transition-colors"
                            >
                                {isSidebarOpen ? (
                                    <TbLayoutSidebarRightExpandFilled
                                        size={24}
                                    />
                                ) : (
                                    <TbLayoutSidebarLeftExpandFilled
                                        size={24}
                                    />
                                )}
                            </button>
                            {breadcrumb && <Breadcrumb items={breadcrumb} />}
                        </div>
                    </div>

                    {/* Scrollable Content Area */}
                    <div
                        ref={scrollContainerRef}
                        className="flex-1 bg-surface-container-low/40  overflow-y-auto scroll-smooth scrollbar-hidden"
                    >
                        <div className=" mx-auto py-6 md:py-12">{children}</div>
                    </div>
                </main>
            </div>

            {/* Pass scrollContainerRef to MobileNav */}
            <MobileNav
                active={active}
                scrollContainerRef={scrollContainerRef}
            />
        </div>
    );
}
