import { Config } from "ziggy-js";

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};

// types/index.ts
export interface Product {
    id: string | number;
    name: string;
    price: number;
    unit?: string;
    image: string;
    description: string;
    rating?: number;
    reviews?: number;
    category?: string;
    inStock?: boolean;
    isPopular?: boolean;
    isFeatured?: boolean;
    description?: string;
    badge?: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    role?: string;
    roleType: "admin" | "manager" | "cashier" | "rider" | "customer";
    credits?: number;
    notifications?: number;
    email_verified_at?: string;
}

export interface SubscriptionProduct extends Product {
    volumeOptions: string[];
    defaultVolume: string;
    frequencyOptions: Frequency[];
}

export interface Frequency {
    id: string;
    label: string;
    icon: string;
    description?: string;
}

export interface Address {
    id: string;
    name: string;
    type: "home" | "office" | "cottage" | "other";
    county: string;
    estate: string;
    street: string;
    house_number: string;
    land_mark?: string;
    phone_number: string;
    delivery_instructions?: string;
    is_default: boolean;
}

export interface Order {
    id: string;
    orderNumber: string;
    date: string;
    total: number;
    status: "delivered" | "completed" | "canceled" | "pending" | "processing";
    items: OrderItem[];
    deliveryAddress: string;
    paymentMethod: string;
}

export interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image?: string;
}

export interface OrderStatus {
    value: Order["status"];
    label: string;
    color: string;
    icon: string;
}

export interface Reward {
    id: string;
    name: string;
    description: string;
    image: string;
    cost: number;
    category: "beverages" | "bakery" | "merchandise";
}

export interface CoinBalance {
    total: number;
    nextReward: {
        name: string;
        coinsNeeded: number;
        progress: number;
    };
    rank: string;
}

export interface Transaction {
    id: string;
    date: string;
    amount: number;
    type: "earned" | "redeemed";
    description: string;
}

export interface Invoice {
    id: string;
    orderNumber: string;
    date: string;
    time: string;
    amount: number;
    status: "paid" | "refunded" | "pending" | "overdue";
    items: InvoiceItem[];
}

export interface InvoiceItem {
    name: string;
    quantity: number;
    price: number;
}

export interface BillingSummary {
    currentCycle: string;
    unpaidAmount: number;
    rewardsEarned: number;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    isRead: boolean;
    type: "delivery" | "billing" | "promotion" | "announcement";
    actionUrl?: string;
    actionText?: string;
    image?: string;
}

export interface NotificationPreference {
    id: string;
    name: string;
    description: string;
    enabled: boolean;
    category: "order" | "billing" | "marketing";
}

// resources/js/types/cashier.ts
export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    image: string;
    status: "In Stock" | "Low Stock" | "Out of Stock";
}

export interface CashierTransaction {
    id: string;
    orderNumber: string;
    time: string;
    items: number;
    amount: number;
    status: "Success" | "Refunded" | "Pending";
    paymentMethod?: "cash" | "mpesa";
}

export interface CashierCartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}
