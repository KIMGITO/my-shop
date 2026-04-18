import { Config } from "ziggy-js";

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};

// ========== BASE PRODUCT ==========
export interface BaseProduct {
    id: string | number;
    name: string;
    price: number;
    image: string;
    description?: string;
    category?: string;
    sku?: string;
}

// ========== STORE / CUSTOMER FACING PRODUCT ==========
export interface Product extends BaseProduct {
    unit?: string;
    rating?: number;
    reviews?: number;
    inStock?: boolean;
    isPopular?: boolean;
    isFeatured?: boolean;
    badge?: string;
}

// ========== INVENTORY / ADMIN FACING PRODUCT ==========
export interface InventoryProduct extends BaseProduct {
    stock: number;
    shelfLife: number;
    images: ProductImage[];
    mainProductImage: string;
    status: "In Stock" | "Low Stock" | "Out of Stock";
}

export interface ProductImage {
    url: string;
    alt?: string;
    isPrimary?: boolean;
}

// ========== SUBSCRIPTION PRODUCT ==========
export interface SubscriptionProduct extends BaseProduct {
    volumeOptions: string[];
    defaultVolume: string;
    frequencyOptions: Frequency[];
}

// ========== CART ITEMS ==========
export interface CartItem extends Product {
    quantity: number;
}

export interface CashierCartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

// ========== BATCH ==========
export interface Batch {
    batchNumber: string;
    expiryDate: string;
    receiveDate: string;
    intakeQuantity: number;
    balance: number;
    isActive: boolean;
    product: {
        name?: string;
        image?: string;
    };
}

// types/index.ts
import { Config } from "ziggy-js";

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};

// ========== BASE PRODUCT ==========
export interface BaseProduct {
    id: string | number;
    name: string;
    price: number;
    description: string;
    category: string;
    sku?: string;
}

// ========== STORE / CUSTOMER FACING PRODUCT ==========
export interface Product extends BaseProduct {
    unit?: string;
    rating?: number;
    reviews?: number;
    inStock: boolean;
    isPopular?: boolean;
    isFeatured?: boolean;
    badge?: string;
    images: ProductImage[];
    shelfLife?: number;
}

// ========== INVENTORY / ADMIN FACING PRODUCT ==========
export interface InventoryProduct extends BaseProduct {
    unit?: string;
    stock: number;  // This replaces inStock
    shelfLife: number;
    images: ProductImage[];
    mainProductImage: string;
    status: "In Stock" | "Low Stock" | "Out of Stock";
    inStock?: never; // Prevent confusion
    isPopular?: boolean;
    isFeatured?: boolean;
    badge?: string;
}

export interface ProductImage {
    id?: string | number;
    url: string;
    alt?: string;
    isMain?: boolean;
    file?: File; // For uploads
}

// ========== TYPE CONVERTERS ==========
export function productToInventoryProduct(product: Product): InventoryProduct {
    const stock = product.inStock ? (product.unit === 'kg' ? 100 : 50) : 0;
    const status: InventoryProduct['status'] = 
        !product.inStock ? "Out of Stock" :
        stock < 10 ? "Low Stock" : "In Stock";
    
    const mainImage = product.images.find(img => img.isMain) || product.images[0];
    
    return {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        sku: product.sku,
        unit: product.unit,
        stock: stock,
        shelfLife: product.shelfLife || 6,
        images: product.images,
        mainProductImage: mainImage?.url || '',
        status: status,
        isPopular: product.isPopular,
        isFeatured: product.isFeatured,
        badge: product.badge,
    };
}

export function inventoryToProduct(inventoryProduct: InventoryProduct): Product {
    return {
        id: inventoryProduct.id,
        name: inventoryProduct.name,
        price: inventoryProduct.price,
        description: inventoryProduct.description,
        category: inventoryProduct.category,
        sku: inventoryProduct.sku,
        unit: inventoryProduct.unit,
        inStock: inventoryProduct.status !== 'Out of Stock',
        isPopular: inventoryProduct.isPopular,
        isFeatured: inventoryProduct.isFeatured,
        badge: inventoryProduct.badge,
        images: inventoryProduct.images,
        shelfLife: inventoryProduct.shelfLife,
        rating: 0,
        reviews: 0,
    };
}

// Rest of your types remain the same...
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


// ========== SUBSCRIPTION ==========
export interface Frequency {
    id: string;
    label: string;
    icon: string;
    description?: string;
}

// ========== ADDRESS ==========
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

// ========== ORDERS ==========
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

// ========== CASHIER ==========
export interface CashierTransaction {
    id: string;
    orderNumber: string;
    time: string;
    items: number;
    amount: number;
    status: "Success" | "Refunded" | "Pending";
    paymentMethod?: "cash" | "mpesa";
}

// ========== REWARDS & COINS ==========
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

// ========== BILLING & INVOICES ==========
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

// ========== NOTIFICATIONS ==========
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

// ========== TYPE GUARDS ==========
export function isInventoryProduct(product: BaseProduct | InventoryProduct): product is InventoryProduct {
    return 'stock' in product && 'status' in product;
}

export function isStoreProduct(product: BaseProduct | Product): product is Product {
    return 'rating' in product || 'inStock' in product;
}