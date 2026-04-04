import React, {
    useState,
    useEffect,
    useMemo,
    useRef,
    useLayoutEffect,
} from "react";
import { Link, usePage } from "@inertiajs/react";
import { useNavStore } from "@/Stores/useNavStore";
import { cn } from "@/Utils/helpers";

interface MobileNavProps {
    active?: string;
    scrollContainerRef: React.RefObject<HTMLDivElement>;
}

export const MobileNav: React.FC<MobileNavProps> = ({
    scrollContainerRef,
    active,
}) => {
    const { items } = useNavStore();
    const { url } = usePage();
    const navRef = useRef<HTMLDivElement>(null);

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    // 1. REORDER: [Left Items, ACTIVE, Right Items]
    const reorderedItems = useMemo(() => {
        if (!items || items.length === 0) return [];

        const currentIndex = items.findIndex(
            (item) => url === item.path || item.path === active
        );

        if (currentIndex === -1) return items;

        const newItems = [...items];
        const activeItem = newItems.splice(currentIndex, 1)[0];
        const centerIndex = Math.floor(newItems.length / 2);
        newItems.splice(centerIndex, 0, activeItem);

        return newItems;
    }, [items, url, active]);

    // 2. Centering Logic
    useLayoutEffect(() => {
        const activeEl = navRef.current?.querySelector('[data-active="true"]');
        if (activeEl) {
            activeEl.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            });
        }
    }, [reorderedItems]);

    // 3. Visibility logic tied to Main Content Scroll
    useEffect(() => {
        const scrollElement = scrollContainerRef?.current || window;

        const handleScroll = () => {
            const currentScrollTop = scrollContainerRef?.current
                ? scrollContainerRef.current.scrollTop
                : window.scrollY;
            setIsVisible(
                currentScrollTop < lastScrollTop || currentScrollTop < 5
            );

            setLastScrollTop(currentScrollTop);
        };

        scrollElement.addEventListener("scroll", handleScroll, {
            passive: true,
        });
        return () => scrollElement.removeEventListener("scroll", handleScroll);
    }, [lastScrollTop, scrollContainerRef]);

    if (!items || items.length === 0) return null;

    return (
        <nav
            className={cn(
                "lg:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 pb-safe",
                "bg-surface-container-low/95 backdrop-blur-md border-t border-outline-variant/10 rounded-t-2xl shadow-2xl",
                isVisible ? "translate-y-0" : "translate-y-full"
            )}
        >
            <div
                ref={navRef}
                className="flex items-center overflow-x-auto hide-scrollbar py-2 gap-2 scroll-smooth"
                style={{ paddingLeft: "35%", paddingRight: "35%" }}
            >
                {reorderedItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = url === item.path || item.path === active;

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            data-active={isActive}
                            className={cn(
                                "flex flex-col items-center justify-center transition-all duration-500 flex-shrink-0",
                                isActive
                                    ? "min-w-[70px] scale-110"
                                    : "min-w-[58px] opacity-50 scale-95"
                            )}
                        >
                            <div
                                className={cn(
                                    "w-9 h-9 flex items-center justify-center rounded-xl transition-all",
                                    isActive
                                        ? "bg-primary text-on-primary shadow-lg ring-2 ring-primary/20"
                                        : "text-on-surface-variant bg-surface-variant/10"
                                )}
                            >
                                <Icon size={isActive ? 20 : 18} />
                            </div>

                            <span
                                className={cn(
                                    "text-[9px] font-black uppercase tracking-tighter mt-1 transition-colors",
                                    isActive
                                        ? "text-primary"
                                        : "text-on-surface-variant/60"
                                )}
                            >
                                {item.label.substring(0, 6)}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};
export default MobileNav;
