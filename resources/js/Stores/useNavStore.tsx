import { create } from "zustand";
import {
    NavItem,
    adminNav,
    cashierNav,
    // riderNav,
    defaultCustomerNav,
} from "@/Data/Links/NavLinks";

interface NavState {
    items: NavItem[];
    isSidebarOpen: boolean;
    // Actions
    setRoleNavigation: (role: string | undefined) => void;
    setItems: (items: NavItem[]) => void;
    toggleSidebar: () => void;
}

export const useNavStore = create<NavState>((set) => ({
    // Default to customer navigation until role is set
    items: defaultCustomerNav,
    isSidebarOpen: true,

    /**
     * Logic to switch navigation based on the user role string
     */
    setRoleNavigation: (role) => {
        let selectedItems = defaultCustomerNav;

        switch (role?.toLowerCase()) {
            case "admin":
            case "manager":
                selectedItems = adminNav;
                break;
            case "cashier":
                selectedItems = cashierNav;
                break;
            // case "rider":
            //     // Assuming you have a riderNav in your Data/Links
            //     selectedItems = riderNav || defaultCustomerNav;
            //     break;
            default:
                selectedItems = defaultCustomerNav;
                break;
        }

        set({ items: selectedItems });
    },

    setItems: (items) => set({ items }),

    toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
