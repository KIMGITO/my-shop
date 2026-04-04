import { useState, useEffect } from "react";
import type { UseNavbarVisibilityProps } from "./types";

export const useNavbarVisibility = ({
    scrollContainerRef,
}: UseNavbarVisibilityProps) => {
    const [isLinksVisible, setIsLinksVisible] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    useEffect(() => {
        const scrollElement = scrollContainerRef.current;
        if (!scrollElement) return;

        const handleScroll = () => {
            const currentScrollTop = scrollElement.scrollTop;
            const isScrollingUp = currentScrollTop < lastScrollTop;
            const isAtTop = currentScrollTop < 5;

            setIsLinksVisible(isScrollingUp || isAtTop);
            setLastScrollTop(currentScrollTop);
        };

        scrollElement.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => scrollElement.removeEventListener("scroll", handleScroll);
    }, [lastScrollTop, scrollContainerRef]);

    return { isLinksVisible };
};
