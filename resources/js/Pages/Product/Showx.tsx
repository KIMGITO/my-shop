// pages/ProductDetailsPage.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, Star, ShoppingBag, Truck, Leaf } from "lucide-react";
import Breadcrumb from "@/Components/UI/Breadcrumb";
import ProductCard from "@/Components/UI/ProductCard";
import QuantitySelector from "@/Components/UI/QuantitySelector";
import Footer from "@/Components/Layout/Footer";
import Navbar from "@/Components/Layout/Navbar";
import Button from "@/Components/UI/Button";

// Mock product data
const mockProduct = {
    id: "1",
    name: "Golden Hour Whole Milk",
    price: 6.5,
    unit: "1 Litre",
    rating: 4.8,
    reviews: 128,
    description:
        "Experience the unparalleled richness of Kaykay's signature whole milk. Collected at the first light of dawn, our milk retains its natural butterfat and vitamin profile through minimal processing. No antibiotics, no synthetic hormones—just pure, buttery bliss from grass-fed Jerseys.",
    images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD65NFYZaERCfQ7K4Wx5Z6qSbW2wr4AbRmbwOSDqGuOnmbJcWjr5PrAVY975PfRiLNDdMQuO6j2X4og6SQjBGjFXJEUkTafxxitb2RRqX2qWZ6JFXKhK-XdruYxWStSJdlfdJosjjYBj9XIARdRFugP9LBv4mAX5yu9lR_h4jYtIK3Y_lZpPoIkpYa-Kb6qYjwqfLtabh53RcUS0PqO4xoKIy8l5EgPdpOCzZW_yznO_5xa6Cq-uf0rnQmWyNON5KBVtYtxqb_-vAkp",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCNDltFlCG_ygFgi7F3P20H3ePDHhsIaUQTmH3Uty4Bo2KZYwUZ5QuvufNS1wIa-jQbuvJL2WL95aLonu92eEZ2SrFhB4Dkko9uCXTRPuIrQ8wh1vnbs0JWrEZbYyblNaREKfk2SSGAW1FL_VixCic-Pd5EhaLU-sRTo89glbICIPId6cTkwKQM7mOGasGqDJiqnBiePD751CGip-7U5o8_I_bWkd7QXyGsDZcU1ZXTx1zrnPvDjFvGGv9LblBtGeuBdnh_EAZP8l0t",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBOSm1ywTQfUwsUx4svUZr1GHZo2jnbTx_XgCEEUzakqWDfGR04kwZSlA9-UMZm7CbxLE7sLLt99U5EaHxkowpYlJj82-Tmrx9Om0XvaZbtTzYqmBDlI-EQlj369AabsHnnJ_qkJF2zwDHPUSIXCUwhmZ0ZXz1ICvBtISj-pTjIoTY0zKI-QoPrknfBbcq1d9LD7hAf04Qtgr9AH8DUFKAwCC15XNTas-xZlZ9A3u6CZEQtenOKzrcU2-Ho6TDSR2gEVOcVR6tm63O-",
    ],
    features: [
        {
            icon: Leaf,
            label: "100% Organic",
            description: "Certified grass-fed",
        },
        {
            icon: Truck,
            label: "Cold-Chain",
            description: "Delivered under 4°C",
        },
    ],
    badge: "Farm-To-Table",
};

const relatedProducts = [];

const ProductDetailsPage: React.FC = () => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const breadcrumbItems = [
        { label: "Shop", href: "/shop" },
        { label: "Artisanal Dairy", href: "/shop/dairy" },
        { label: mockProduct.name },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12">
                <Breadcrumb items={breadcrumbItems} />

                {/* Product Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
                    {/* Image Gallery */}
                    <div className="lg:col-span-7">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-low shadow-sm">
                                <img
                                    src={mockProduct.images[selectedImage]}
                                    alt={mockProduct.name}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                            {mockProduct.images.slice(1, 3).map((img, idx) => (
                                <div
                                    key={idx}
                                    className="aspect-square rounded-xl overflow-hidden bg-surface-container-low shadow-sm cursor-pointer"
                                    onClick={() => setSelectedImage(idx + 1)}
                                >
                                    <img
                                        src={img}
                                        alt={`${mockProduct.name} view ${
                                            idx + 2
                                        }`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="lg:col-span-5 flex flex-col">
                        {mockProduct.badge && (
                            <span className="inline-block px-3 py-1 bg-tertiary-container text-on-tertiary-container text-xs font-bold rounded-full tracking-wider uppercase mb-4 w-fit">
                                {mockProduct.badge}
                            </span>
                        )}
                        <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-4">
                            {mockProduct.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex text-primary">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={20}
                                        fill={
                                            i < Math.floor(mockProduct.rating)
                                                ? "currentColor"
                                                : "none"
                                        }
                                    />
                                ))}
                            </div>
                            <span className="text-on-surface-variant text-sm">
                                ({mockProduct.reviews} reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="text-3xl font-bold text-primary mb-8">
                            ${mockProduct.price}{" "}
                            <span className="text-sm font-normal text-on-surface-variant">
                                / {mockProduct.unit}
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-on-surface-variant leading-relaxed mb-8">
                            {mockProduct.description}
                        </p>

                        {/* Quantity Selector */}
                        <div className="mb-8">
                            <span className="block text-sm font-bold text-on-surface mb-3">
                                Quantity
                            </span>
                            <QuantitySelector
                                quantity={quantity}
                                onIncrease={() => setQuantity(quantity + 1)}
                                onDecrease={() => setQuantity(quantity - 1)}
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-6">
                            <div className="flex gap-4">
                                <Button
                                    variant="primary"
                                    className="flex flex-1 space-x-2 gap-6"
                                >
                                    <ShoppingBag size={20} />
                                    ADD TO CART
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        setIsWishlisted(!isWishlisted)
                                    }
                                    className={`p-4 bg-surface-container-highest rounded-full  transition-all ${
                                        isWishlisted
                                            ? "bg-primary/20"
                                            : "text-white font-thin"
                                    }`}
                                >
                                    <Heart
                                        size={24}
                                        fill={
                                            isWishlisted
                                                ? "currentColor"
                                                : "text-primary/20 "
                                        }
                                    />
                                </Button>
                            </div>
                            <Button
                                variant="outline"
                                className="w-full py-4 text-primary font-bold hover:underline transition-all"
                            >
                                Buy with ShopPay
                            </Button>
                        </div>

                        {/* Features */}
                        <div className="mt-12 grid grid-cols-2 gap-4">
                            {mockProduct.features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 bg-surface-container-low rounded-xl flex items-start gap-3"
                                >
                                    <feature.icon
                                        size={20}
                                        className="text-primary"
                                    />
                                    <div>
                                        <p className="text-sm font-bold">
                                            {feature.label}
                                        </p>
                                        <p className="text-xs text-on-surface-variant">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <section className="mb-24">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-extrabold text-on-surface">
                                Complete Your Breakfast
                            </h2>
                            <p className="text-on-surface-variant">
                                Hand-picked pairings for your morning ritual.
                            </p>
                        </div>
                        <button className="text-primary font-bold flex items-center gap-1 group">
                            View Catalog
                            <span className="group-hover:translate-x-1 transition-transform">
                                →
                            </span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 aspect-square">
                        {relatedProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                size="sm"
                                product={product}
                                variant="compact"
                            />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ProductDetailsPage;
