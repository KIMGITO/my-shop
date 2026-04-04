// resources/js/Components/Layout/Footer.tsx
import React from "react";
import { Link } from "@inertiajs/react";

export const Footer: React.FC = () => {
    const footerSections = {
        shop: [
            { name: "Milk & Cream", path: "/shop" },
            { name: "Bakery", path: "/shop" },
            { name: "Butter & Eggs", path: "/shop" },
        ],
        about: [
            { name: "Our Heritage", path: "/story" },
            { name: "The Farm", path: "/farm" },
            { name: "Sustainability", path: "/sustainability" },
        ],
        support: [
            { name: "Shipping Info", path: "/shipping" },
            { name: "Manage Subscription", path: "/subscriptions" },
            { name: "Contact Us", path: "/contact" },
        ],
    };

    return (
        <footer className="bg-surface-container-lowest text-on-surface py-20 px-8 border-t border-outline-variant/20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1">
                    <div className="text-3xl font-extrabold tracking-tight font-headline mb-6">
                        Kaykay's<span className="text-primary">.</span>
                    </div>
                    <p className="text-on-surface-variant mb-8 leading-relaxed text-sm">
                        Redefining the local dairy experience through tradition
                        and innovation since 1984.
                    </p>
                    <div className="flex gap-4">
                        <span className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all cursor-pointer">
                            <span className="material-symbols-outlined text-lg">
                                public
                            </span>
                        </span>
                        <span className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all cursor-pointer">
                            <span className="material-symbols-outlined text-lg">
                                mail
                            </span>
                        </span>
                    </div>
                </div>

                {Object.entries(footerSections).map(([key, items]) => (
                    <div key={key}>
                        <h4 className="font-bold text-lg mb-8 capitalize">
                            {key}
                        </h4>
                        <ul className="space-y-4 text-on-surface-variant text-sm">
                            {items.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.path}
                                        className="hover:text-primary transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-on-surface-variant/40 text-xs">
                    © 2024 Kaykay's Milk Bar. Handcrafted with care.
                </p>
                <p className="text-on-surface-variant/40 text-xs">
                    Built for fresh mornings.
                </p>
            </div>
        </footer>
    );
};
export default Footer;
