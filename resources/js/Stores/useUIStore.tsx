import { create } from "zustand";

interface UIStore {
    // Modal states
    isCartDrawerOpen: boolean;
    isSearchModalOpen: boolean;
    isMobileMenuOpen: boolean;
    isWishlistDrawerOpen: boolean;

    // Loading states
    isLoading: boolean;
    isPageLoading: boolean;

    // Toast/Notification
    toast: {
        message: string;
        type: "success" | "error" | "info" | "warning";
        isVisible: boolean;
    } | null;

    // Actions
    toggleCartDrawer: () => void;
    openCartDrawer: () => void;
    closeCartDrawer: () => void;

    toggleSearchModal: () => void;
    openSearchModal: () => void;
    closeSearchModal: () => void;

    toggleMobileMenu: () => void;
    openMobileMenu: () => void;
    closeMobileMenu: () => void;

    toggleWishlistDrawer: () => void;

    setLoading: (loading: boolean) => void;
    setPageLoading: (loading: boolean) => void;

    showToast: (
        message: string,
        type: "success" | "error" | "info" | "warning"
    ) => void;
    hideToast: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
    // Initial states
    isCartDrawerOpen: false,
    isSearchModalOpen: false,
    isMobileMenuOpen: false,
    isWishlistDrawerOpen: false,
    isLoading: false,
    isPageLoading: false,
    toast: null,

    // Cart Drawer actions
    toggleCartDrawer: () =>
        set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),
    openCartDrawer: () => set({ isCartDrawerOpen: true }),
    closeCartDrawer: () => set({ isCartDrawerOpen: false }),

    // Search Modal actions
    toggleSearchModal: () =>
        set((state) => ({ isSearchModalOpen: !state.isSearchModalOpen })),
    openSearchModal: () => set({ isSearchModalOpen: true }),
    closeSearchModal: () => set({ isSearchModalOpen: false }),

    // Mobile Menu actions
    toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    openMobileMenu: () => set({ isMobileMenuOpen: true }),
    closeMobileMenu: () => set({ isMobileMenuOpen: false }),

    // Wishlist Drawer actions
    toggleWishlistDrawer: () =>
        set((state) => ({ isWishlistDrawerOpen: !state.isWishlistDrawerOpen })),

    // Loading actions
    setLoading: (loading) => set({ isLoading: loading }),
    setPageLoading: (loading) => set({ isPageLoading: loading }),

    // Toast actions
    showToast: (message, type) => {
        set({ toast: { message, type, isVisible: true } });
        setTimeout(() => {
            set({ toast: null });
        }, 5000);
    },
    hideToast: () => set({ toast: null }),
}));
