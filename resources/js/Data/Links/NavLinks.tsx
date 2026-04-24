// resources/js/Config/navigation.ts
import { IconType } from "react-icons";
import { AiFillProduct } from "react-icons/ai";
import { BsCash } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { FaMotorcycle, FaSitemap } from "react-icons/fa6";
import { HiOutlineReceiptTax } from "react-icons/hi";
import {
    HiOutlineUserCircle,
    HiOutlineShieldCheck,
    HiOutlineCog,
    HiOutlineCreditCard,
    HiOutlineHome,
    HiOutlineStar,
    HiOutlineTruck,
    HiMapPin,
    HiAdjustmentsHorizontal,
    HiMiniClock,
    HiOutlineMapPin,
    HiOutlineChartBar,
    HiOutlineUsers,
    HiOutlineClipboardDocumentList,
    HiOutlineShoppingBag,
    HiOutlineCube,
} from "react-icons/hi2";
import { LuBellDot } from "react-icons/lu";
import {
    MdOutlineErrorOutline,
    MdPointOfSale,
    MdShoppingCartCheckout,
    MdDashboard,
} from "react-icons/md";
import { RiUserSharedLine } from "react-icons/ri";
import { TbTransactionBitcoin } from "react-icons/tb";
import { BiSolidReport } from "react-icons/bi";

export interface NavItem {
    label: string;
    path: string;
    icon: IconType;
}

// ============================================================================
// Customer Navigation (Frontend)
// ============================================================================

export const defaultCustomerNav: NavItem[] = [
    { label: "Dashboard", path: "/dashboard", icon: HiOutlineHome },
    {
        label: "Daily Milk",
        path: "/subscriptions/delivery",
        icon: HiOutlineTruck,
    },
    { label: "Orders", path: "/orders/history", icon: HiOutlineReceiptTax },
    { label: "Billing", path: "/billing", icon: HiOutlineCreditCard },
    { label: "Rewards", path: "/loyalty", icon: HiOutlineStar },
    { label: "Settings", path: "/settings", icon: HiOutlineCog },
];

// ============================================================================
// Cashier Navigation (POS System)
// ============================================================================

export const cashierNav: NavItem[] = [
    { label: "Dashboard", path: "/cashier", icon: HiOutlineHome },
    {
        label: "Checkout",
        path: "/cashier/checkout",
        icon: MdShoppingCartCheckout,
    },
    {
        label: "Transactions",
        path: "/cashier/transactions",
        icon: TbTransactionBitcoin,
    },
    { label: "POS", path: "/pos", icon: MdPointOfSale },
];

// ============================================================================
// Admin Navigation (Backend Management)
// ============================================================================

export const adminNav: NavItem[] = [
    { label: "Dashboard", path: "/admin/dashboard", icon: MdDashboard },
    {
        label: "Inventory Analytics",
        path: "/admin/inventory/analytics",
        icon: HiOutlineChartBar,
    },

    {
        label: "Products",
        path: "/admin/inventory/products",
        icon: AiFillProduct,
    },
    { label: "POS", path: "/pos", icon: MdPointOfSale },
    {
        label: "Stock Adjustment",
        path: "/admin/inventory/adjustment",
        icon: HiAdjustmentsHorizontal,
    },
    {
        label: "Stock History",
        path: "/admin/inventory/history",
        icon: HiMiniClock,
    },
    { label: "Sales Reports", path: "/admin/sales", icon: BiSolidReport },
    { label: "Staff", path: "/admin/staff", icon: HiOutlineUsers },
    { label: "Batches", path: "/admin/inventory/batches", icon: FaSitemap },
    { label: "Suppliers", path: "/admin/suppliers", icon: HiOutlineTruck },
    {
        label: "Supplier Orders",
        path: "/admin/suppliers/orders",
        icon: MdShoppingCartCheckout,
    },
    { label: "Settings", path: "/admin/settings", icon: HiOutlineCog },
    {
        label: "Audit Logs",
        path: "/admin/audit-logs",
        icon: HiOutlineClipboardDocumentList,
    },
];

// ============================================================================
// Dispatch Navigation (Logistics & Delivery)
// ============================================================================

export const dispatchNav: NavItem[] = [
    { label: "Dashboard", path: "/dispatch", icon: HiOutlineHome },
    {
        label: "Delivery Ledger",
        path: "/dispatch/orders",
        icon: FaClipboardList,
    },
    { label: "Assign Rider", path: "/dispatch/assign", icon: RiUserSharedLine },
    { label: "Riders", path: "/dispatch/riders", icon: FaMotorcycle },
    { label: "Live Track", path: "/dispatch/track", icon: HiOutlineMapPin },
    { label: "Delivery History", path: "/dispatch/history", icon: HiMiniClock },
    {
        label: "Exceptions",
        path: "/dispatch/exceptions",
        icon: MdOutlineErrorOutline,
    },
];

// ============================================================================
// Settings Navigation (Customer Settings)
// ============================================================================

export const settingsNav: NavItem[] = [
    { label: "Profile", path: "/settings", icon: HiOutlineUserCircle },
    {
        label: "Notifications",
        path: "/settings/notifications",
        icon: LuBellDot,
    },
    { label: "Address", path: "/settings/address", icon: HiMapPin },
    {
        label: "Security",
        path: "/profile/security",
        icon: HiOutlineShieldCheck,
    },
];

// ============================================================================
// All Navigation Groups (for easy access)
// ============================================================================

export const allNavGroups = {
    customer: defaultCustomerNav,
    cashier: cashierNav,
    admin: adminNav,
    dispatch: dispatchNav,
    settings: settingsNav,
};

// ============================================================================
// Helper function to get navigation by role
// ============================================================================

export const getNavByRole = (
    role: "customer" | "cashier" | "admin" | "dispatch" | "settings",
) => {
    const navMap = {
        customer: defaultCustomerNav,
        cashier: cashierNav,
        admin: adminNav,
        dispatch: dispatchNav,
        settings: settingsNav,
    };
    return navMap[role] || defaultCustomerNav;
};
