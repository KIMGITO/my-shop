import { SubscriptionProduct } from "@/types";

// Mock Data
export const subscriptionProduct: SubscriptionProduct = {
    id: 1,
    name: "Heritage Whole Milk",
    description:
        "Sourced from grass-fed A2 cows. Creamy, nutrient-rich, and delivered within 12 hours of milking.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVOBaFw4bQ4n_GpaTkxn-3JbUmXl4QxEq2OD6bQKRj9i1kMNQMaRVyb5c8SPEqrWRejO8OOcIW5Y1XJBtaXsRyuun3Y1uMpGR2-2sgEiM5lZp7l1WNfWTIgRDDlc9r2Ydk9GagClnZH6zlxnQnGvmuCBWaMcORqkJcxOTXYXHyNzXOq7q5H6Vm2NXOwnNkmQyt-ZZyUJmAM108FqhRTCnSVZdtXb_f8VedJ9ty7c0UPCJ7gJksZzzmjv3_tuLTlWA9nYXYuyxTdcFG",
    volumeOptions: ["500ml", "1 Litre", "2 Litres"],
    defaultVolume: "1 Litre",
    frequencyOptions: [
        {
            id: "daily",
            label: "Daily",
            icon: "calendar_today",
            description: "Every day delivery",
        },
        {
            id: "weekdays",
            label: "Mon - Fri",
            icon: "work",
            description: "Weekday deliveries only",
        },
        {
            id: "weekends",
            label: "Weekends",
            icon: "weekend",
            description: "Saturday & Sunday",
        },
    ],
    price: 6.5,
    isPopular: true,
};

export const KENYAN_COUNTIES = [
    "Nairobi",
    "Kiambu",
    "Machakos",
    "Kajiado",
    "Mombasa",
    "Kisumu",
    "Nakuru",
    "Thika",
    "Ruaka",
    "Limuru",
    "Ngong",
    "Ruiru",
];

export const COMMON_ESTATES = [
    "Kilimani Estate",
    "Westlands Estate",
    "Karen Estate",
    "Lavington Estate",
    "Kileleshwa Estate",
    "Hurlingham Estate",
    "Parklands Estate",
    "Lang'ata Estate",
    "South B Estate",
    "South C Estate",
    "Embakasi Estate",
    "Donholm Estate",
    "Buruburu Estate",
    "Umoja Estate",
    "Kasarani Estate",
    "Ruiru Estate",
];
