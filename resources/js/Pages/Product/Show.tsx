// resources/js/Pages/Product/Show.tsx
import React, { useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Navbar } from "@/Components/Layout/Navbar";
import { Footer } from "@/Components/Layout/Footer";
import { MobileNav } from "@/Components/Layout/MobileNav";
import { FloatingActionButton } from "@/Components/Common/FloatingActionButton";
import Breadcrumb from "@/Components/Common/Breadcrumb";
import Container from "@/Components/UI/Container";
import Button from "@/Components/UI/Button";
import Badge from "@/Components/UI/Badge";
import Rating from "@/Components/UI/Rating";
import QuantitySelector from "@/Components/UI/QuantitySelector";
import ProductImageGallery from "@/Components/Product/ProductImageGallery";
import RelatedProducts from "@/Components/Product/RelatedProducts";

// Mock product data - in real app, this would come from backend
const getProductData = (id: string) => {
    const products = {
        "1": {
            id: 1,
            name: "Golden Hour Whole Milk",
            price: 6.5,
            unit: "1 Litre",
            rating: 4.8,
            reviews: 128,
            description:
                "Experience the unparalleled richness of Kaykay's signature whole milk. Collected at the first light of dawn, our milk retains its natural butterfat and vitamin profile through minimal processing. No antibiotics, no synthetic hormones—just pure, buttery bliss from grass-fed Jerseys.",
            shortDescription:
                "Premium whole milk from grass-fed Jersey cows, collected at dawn for maximum freshness and creaminess.",
            images: [
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDTtrE2do7hTtyPYVnUva_HYUTDfCw7yP3cXOiPMU4R2_znmUG3WW8WvmiPAs23qLuaokEeej8IHF5yY-S8vfG7pulAK47UIndO0sc0D6TyKk6NnbndznsFSNQT0d4V0OIrNC9AB2EhnX7Jgcio67YbdGzgBc7cmxG5531gca1xU4YJp97ppbHD8IjvZNJuaPse0G56d1D3U-MK346Fp9s-TTmIvUQ_p63gOa7gfoEMfI9_DVqjvIjXGbp65ojSsPAsRP-F_xUUdvLW",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuB1P6ExcCmjp97zxC64Iwt-LPrwVd5JJJDEM2dapUn4ZfscdgxpLQVQv-w2ddLyE9ZsL5hYvuzrlDOcZATzm00DQZdqeKlJcoj-e1KKyem-aE7xVd5yN45jpWai31OGnYMRRwccsR3DRaKvet80yrAA_hGuOcjCIJ_FXnihOz1b8FIT6nYYiqa5g4PleP0L3n0aJQZTqaCyr6a9ZGPUAeETUxEk-tb4X3CUGFHnQ7nDpHGaV0jLWHvRhLd2ixiBsBUEOAmVhzqc-ES_",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCBUY6RXIs3YLtW_5Bpw-7maErqTszv69tDwB28FCw8jhNRotpHBrQKyzbZ2bbURpCiaOeKBnPIV9foaLIfZjfNu1wt-gmjsrThtxQpeXrmqr-wBzSQ0JCn-JEJVnffCrMzRtsQ9CNCaLcefO9OtS1K29BvkU1pkYlarC9pf5U2vdOBHgumTx9wEvcDK9PNZnfqMEWesNisqCEgcr4mFKcfl_yaItcPw5bKLy0SGNVMGSP5I0v9hfCijCie3vhe4X70JQSBRCiH55NA",
            ],
            category: "Milk",
            inStock: true,
            badge: "Farm-To-Table",
            features: [
                {
                    icon: "eco",
                    label: "100% Organic",
                    description: "Certified grass-fed",
                },
                {
                    icon: "local_shipping",
                    label: "Cold-Chain",
                    description: "Delivered under 4°C",
                },
                {
                    icon: "recycling",
                    label: "Sustainable",
                    description: "Reusable glass bottles",
                },
                {
                    icon: "nutrition",
                    label: "High Protein",
                    description: "8g per serving",
                },
            ],
            nutritionalInfo: {
                servingSize: "1 cup (240ml)",
                calories: 150,
                totalFat: "8g",
                protein: "8g",
                calcium: "30%",
            },
        },
    };

    return products[id as keyof typeof products] || products["1"];
};

// Related products
const relatedProducts = [
    {
        id: 2,
        name: "Double Heavy Cream",
        price: 4.25,
        description: "250ml Jar",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD65NFYZaERCfQ7K4Wx5Z6qSbW2wr4AbRmbwOSDqGuOnmbJcWjr5PrAVY975PfRiLNDdMQuO6j2X4og6SQjBGjFXJEUkTafxxitb2RRqX2qWZ6JFXKhK-XdruYxWStSJdlfdJosjjYBj9XIARdRFugP9LBv4mAX5yu9lR_h4jYtIK3Y_lZpPoIkpYa-Kb6qYjwqfLtabh53RcUS0PqO4xoKIy8l5EgPdpOCzZW_yznO_5xa6Cq-uf0rnQmWyNON5KBVtYtxqb_-vAkp",
        rating: 4.9,
        isPopular: true,
    },
    {
        id: 3,
        name: "Cultured Sea Salt Butter",
        price: 8.0,
        description: "200g Block",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNDltFlCG_ygFgi7F3P20H3ePDHhsIaUQTmH3Uty4Bo2KZYwUZ5QuvufNS1wIa-jQbuvJL2WL95aLonu92eEZ2SrFhB4Dkko9uCXTRPuIrQ8wh1vnbs0JWrEZbYyblNaREKfk2SSGAW1FL_VixCic-Pd5EhaLU-sRTo89glbICIPId6cTkwKQM7mOGasGqDJiqnBiePD751CGip-7U5o8_I_bWkd7QXyGsDZcU1ZXTx1zrnPvDjFvGGv9LblBtGeuBdnh_EAZP8l0t",
        rating: 5.0,
    },
    {
        id: 4,
        name: "Signature Greek Yogurt",
        price: 5.5,
        description: "500g Tub",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOSm1ywTQfUwsUx4svUZr1GHZo2jnbTx_XgCEEUzakqWDfGR04kwZSlA9-UMZm7CbxLE7sLLt99U5EaHxkowpYlJj82-Tmrx9Om0XvaZbtTzYqmBDlI-EQlj369AabsHnnJ_qkJF2zwDHPUSIXCUwhmZ0ZXz1ICvBtISj-pTjIoTY0zKI-QoPrknfBbcq1d9LD7hAf04Qtgr9AH8DUFKAwCC15XNTas-xZlZ9A3u6CZEQtenOKzrcU2-Ho6TDSR2gEVOcVR6tm63O-",
        rating: 4.8,
        inStock: false,
    },
    {
        id: 5,
        name: "Small Batch Oat Milk",
        price: 7.25,
        description: "1L Bottle",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdFCOHdh1n_HSpGXmqZmzC9mwU6JFwWDZcWewQf0_1dEq5nCsorJCp4v5vUbj313a1rpuNTlrvkd7YE1pZ-g84jQ0tV9z3SdBqBdXogcNauabFkFKydKmaVFnfQUhY1fg08elG2QEnupJjVhw-c1JOBL_EjfUCevSmlu0RD7b83YQ3uVef0o2HmPP8SWWV4XifiLO_GxVLUkIfD-IX0KjpSk1CMd0BYU-QPl15GwFJQBTzQ0yeFQR8Q0uLB44U7bXBNnzobN1tK4_Q",
        rating: 4.7,
    },
];

// Product Features Component
const ProductFeatures: React.FC<{
    features: Array<{ icon: string; label: string; description: string }>;
}> = ({ features }) => {
    return (
        <div className="mt-12 grid grid-cols-2 gap-4">
            {features.map((feature, idx) => (
                <div
                    key={idx}
                    className="p-4 bg-surface-container-low rounded-xl flex items-start gap-3"
                >
                    <span className="material-symbols-outlined text-primary">
                        {feature.icon}
                    </span>
                    <div>
                        <p className="text-sm font-bold">{feature.label}</p>
                        <p className="text-xs text-on-surface-variant">
                            {feature.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Main Product Detail Page
export default function ProductShow() {
    const { id } = usePage().props as { id: string };
    const product = getProductData(id);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const breadcrumbItems = [
        { label: "Shop", href: "/shop" },
        {
            label: product.category,
            href: `/shop?category=${product.category.toLowerCase()}`,
        },
        { label: product.name },
    ];

    const handleAddToCart = () => {
        router.post("/cart/add", {
            productId: product.id,
            quantity,
        });
    };

    const handleWishlist = () => {
        setIsWishlisted(!isWishlisted);
        router.post("/wishlist/toggle", { productId: product.id });
    };

    return (
        <>
            <Head title={`${product.name} - Kaykay's Dairy`} />
            <div className="min-h-screen bg-background text-on-surface">
                <Navbar />

                <main className="py-12">
                    <Container>
                        <Breadcrumb items={breadcrumbItems} />

                        {/* Product Hero Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
                            {/* Image Gallery */}
                            <div className="lg:col-span-7">
                                <ProductImageGallery
                                    images={product.images}
                                    productName={product.name}
                                />
                            </div>

                            {/* Product Info */}
                            <div className="lg:col-span-5 flex flex-col">
                                {product.badge && (
                                    <div className="mb-2">
                                        <Badge variant="primary">
                                            {product.badge}
                                        </Badge>
                                    </div>
                                )}

                                <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-4">
                                    {product.name}
                                </h1>

                                <Rating
                                    rating={product.rating}
                                    totalReviews={product.reviews}
                                    className="mb-6"
                                />

                                <div className="text-3xl font-bold text-primary mb-8 tracking-tight">
                                    ${product.price}
                                    <span className="text-sm font-normal text-on-surface-variant">
                                        {" "}
                                        / {product.unit}
                                    </span>
                                </div>

                                <p className="text-on-surface-variant leading-relaxed mb-8">
                                    {product.description}
                                </p>

                                {/* Quantity Selector */}
                                <div className="mb-8">
                                    <span className="block text-sm font-bold text-on-surface mb-3">
                                        Quantity
                                    </span>
                                    <QuantitySelector
                                        quantity={quantity}
                                        onIncrease={() =>
                                            setQuantity(quantity + 1)
                                        }
                                        onDecrease={() =>
                                            setQuantity(quantity - 1)
                                        }
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex gap-4">
                                        <Button
                                            variant="primary"
                                            onClick={handleAddToCart}
                                            size="lg"
                                            className="flex-1"
                                        >
                                            <span className="material-symbols-outlined mr-2">
                                                shopping_bag
                                            </span>
                                            ADD TO CART
                                        </Button>
                                        <Button
                                            onClick={handleWishlist}
                                            variant="outline"
                                            size="lg"
                                            className={`p-4 ${
                                                isWishlisted
                                                    ? "bg-primary/20"
                                                    : ""
                                            } `}
                                        >
                                            <span
                                                className="material-symbols-outlined "
                                                style={{
                                                    fontVariationSettings:
                                                        isWishlisted
                                                            ? "'FILL' 1"
                                                            : "'FILL' 0",
                                                }}
                                            >
                                                favorite
                                            </span>
                                        </Button>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="flex "
                                        size="lg"
                                    >
                                        Buy with ShopPay
                                    </Button>
                                </div>

                                {/* Product Features */}
                                <ProductFeatures features={product.features} />
                            </div>
                        </div>

                        {/* Related Products */}
                        <RelatedProducts products={relatedProducts} />
                    </Container>
                </main>

                <Footer />
                <FloatingActionButton />
                <MobileNav />
            </div>
        </>
    );
}
