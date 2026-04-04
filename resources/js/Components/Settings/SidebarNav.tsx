import React from "react";
import { Link, usePage } from "@inertiajs/react";

interface SidebarNavProps {
    user?: {
        name: string;
        avatar?: string;
        credits?: number;
    };
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ user }) => {
    const { url } = usePage();

    const navItems = [
        { icon: "dashboard", label: "Dashboard", path: "/dashboard" },
        { icon: "shopping_bag", label: "Shop Favorites", path: "/wishlist" },
        { icon: "settings", label: "Settings", path: "/settings" },
    ];

    return (
        <aside className="fixed left-0 top-0 h-full z-40 bg-surface-container-low w-64 hidden lg:flex flex-col">
            <div className="p-8">
                <Link href="/" className="text-xl font-bold text-on-surface">
                    Kaykay's Milk Bar
                </Link>
            </div>

            <nav className="flex-1 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center gap-3 mx-2 px-4 py-3 rounded-lg transition-colors ${
                            url === item.path
                                ? "bg-primary text-on-primary"
                                : "text-on-surface-variant hover:bg-surface-container-high"
                        }`}
                    >
                        <span className="material-symbols-outlined">
                            {item.icon}
                        </span>
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            {user && (
                <div className="p-6 mt-auto border-t border-outline-variant/20">
                    <div className="flex items-center gap-3 mb-4">
                        <img
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full object-cover"
                            src={
                                user.avatar || "https://via.placeholder.com/40"
                            }
                        />
                        <div>
                            <p className="font-bold text-on-surface">
                                {user.name}
                            </p>
                            {user.credits && (
                                <p className="text-xs text-on-surface-variant">
                                    Credit: ${user.credits}
                                </p>
                            )}
                        </div>
                    </div>
                    <Link
                        href="/logout"
                        method="post"
                        className="flex items-center gap-3 text-error opacity-80 px-4 py-2 hover:bg-error/10 rounded-lg transition-colors"
                    >
                        <span className="material-symbols-outlined">
                            logout
                        </span>
                        <span>Logout</span>
                    </Link>
                </div>
            )}
        </aside>
    );
};

export default SidebarNav;
