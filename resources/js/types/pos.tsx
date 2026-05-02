export interface Product {
    id: string;
    name: string;
    price: number;
    unit: string;
    category: "milk" | "bakery" | "yoghurt" | "other";
    image: string;
    isOrganic?: boolean;
    isPopular?: boolean;
    frequency?: number;
    availableQuantity: number;
    reservedQuantity: number;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Order {
    id: string;
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
    timestamp: Date;
}
