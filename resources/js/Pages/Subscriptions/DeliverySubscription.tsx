import React, { useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import Container from "@/Components/UI/Container";
import Button from "@/Components/UI/Button";
import Badge from "@/Components/UI/Badge";
import { cn } from "@/Utils/helpers";
import { SubscriptionProduct } from "@/types";
import { subscriptionProduct } from "@/Data/DeliveryData";
import CalendarWidget from "@/Widgets/CalendarWidget";
import { FrequencySelector } from "@/Components/FrequencySelector";
import { VolumeSelector } from "@/Components/VolumeSelector";

interface Frequency {
    id: string;
    label: string;
    icon: string;
    description?: string;
}

// Upsell Card Component
const UpsellCard: React.FC = () => {
    const handleBrowse = () => {
        router.visit("/shop?category=bread");
    };

    return (
        <div className="bg-primary-fixed/10 p-6 rounded-xl border border-primary-container/20">
            <h4 className="font-headline font-bold mb-2">Need Fresh Bread?</h4>
            <p className="text-sm text-on-surface-variant mb-4">
                Add artisanal sourdough to your weekend deliveries for just
                $6.50.
            </p>
            <Button
                onClick={handleBrowse}
                variant="outline"
                className="w-full py-2 bg-white text-on-surface font-bold text-xs rounded-lg shadow-sm"
            >
                Browse Bakery Add-ons
            </Button>
        </div>
    );
};

// Subscription Product Card Component
const SubscriptionProductCard: React.FC<{ product: SubscriptionProduct }> = ({
    product,
}) => {
    const [selectedVolume, setSelectedVolume] = useState(product.defaultVolume);
    const [selectedFrequency, setSelectedFrequency] = useState(
        product.frequencyOptions[0].id
    );

    const handleUpdate = () => {
        router.post("/subscriptions/update", {
            productId: product.id,
            volume: selectedVolume,
            frequency: selectedFrequency,
        });
    };

    return (
        <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row">
            <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
                {product.isPopular && (
                    <div className="absolute top-4 left-4">
                        <Badge
                            variant="primary"
                            className="font-headline font-bold text-xs px-3 py-1.5 uppercase tracking-widest"
                        >
                            Most Popular
                        </Badge>
                    </div>
                )}
            </div>

            <div className="p-8 md:w-1/2 flex flex-col justify-center">
                <h2 className="font-headline text-2xl font-bold mb-2">
                    {product.name}
                </h2>
                <p className="text-on-surface-variant text-sm mb-6">
                    {product.description}
                </p>

                <div className="space-y-6">
                    <VolumeSelector
                        options={product.volumeOptions}
                        selected={selectedVolume}
                        onChange={setSelectedVolume}
                    />

                    <FrequencySelector
                        options={product.frequencyOptions}
                        selected={selectedFrequency}
                        onChange={setSelectedFrequency}
                    />
                </div>
            </div>
        </div>
    );
};

// Action Bar Component
const ActionBar: React.FC = () => {
    const handleUpdate = () => {
        router.post("/subscriptions/update", {
            // Subscription data
        });
    };

    return (
        <div className="bg-surface-container-low p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-primary-container">
                        local_shipping
                    </span>
                </div>
                <div>
                    <p className="font-bold">Next Delivery: Tomorrow</p>
                    <p className="text-xs text-on-surface-variant">
                        Arriving before 7:00 AM at your doorstep
                    </p>
                </div>
            </div>
            <Button
                onClick={handleUpdate}
                variant="primary"
                size="lg"
                className="premium-gradient text-on-primary-fixed font-headline font-bold px-8 py-3 rounded-xl shadow-lg"
            >
                Update Subscription
            </Button>
        </div>
    );
};

// Floating Action Button Component
const FloatingActionButton: React.FC = () => {
    const handleAdd = () => {
        router.visit("/shop");
    };

    return (
        <button
            onClick={handleAdd}
            className="fixed bottom-24 right-6 lg:bottom-12 lg:right-12 w-16 h-16 rounded-full premium-gradient text-on-primary-fixed flex items-center justify-center shadow-2xl z-40 hover:scale-105 active:scale-90 transition-transform"
        >
            <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
            >
                add
            </span>
        </button>
    );
};

// Header Component
const SubscriptionsHeader: React.FC = () => {
    return (
        <div className="flex items-center gap-6">
            <Link
                href="/dashboard"
                className="text-on-surface-variant/70 hover:text-primary font-medium transition-colors"
            >
                Dashboard
            </Link>
            <Link
                href="/subscriptions"
                className="text-primary font-bold border-b-2 border-primary pb-1"
            >
                Subscriptions
            </Link>
            <Link
                href="/history"
                className="text-on-surface-variant/70 hover:text-primary font-medium transition-colors"
            >
                History
            </Link>
            <Link
                href="/rewards"
                className="text-on-surface-variant/70 hover:text-primary font-medium transition-colors"
            >
                Rewards
            </Link>
        </div>
    );
};

// Main Page Component
export default function DeliverySubscription() {
    const [selectedDeliveryDate, setSelectedDeliveryDate] =
        useState<Date | null>(null);
    const [deliverySchedule, setDeliverySchedule] = useState<Date[]>([]);

    const handleDateSelect = (date: Date) => {
        console.log("Selected date:", date);
        setSelectedDeliveryDate(date);
    };

    const handleAddDelivery = (date: Date) => {
        console.log("Adding delivery for:", date);
        setDeliverySchedule((prev) => [...prev, date]);
        // API call to schedule delivery
    };
    return (
        <AuthenticatedLayout header={<SubscriptionsHeader />}>
            <Head title="Subscriptions - Kaykay's Milk Bar" />

            <Container>
                {/* Hero Section */}
                <div className="mb-16">
                    <h1 className="font-play text-5xl md:text-6xl font-extrabold tracking-tight text-on-surface mb-4">
                        Your Daily{" "}
                        <span className="text-primary-container">Golden</span>{" "}
                        Ritual
                    </h1>
                    <p className="text-lg text-on-surface-variant max-w-2xl font-play leading-relaxed">
                        Tailor your delivery experience. Choose your volume, set
                        your frequency, and let the farm fresh goodness arrive
                        at your doorstep exactly when you need it.
                    </p>
                </div>

                {/* Asymmetric Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column - Subscription Management */}
                    <div className="lg:col-span-7 space-y-8">
                        <SubscriptionProductCard
                            product={subscriptionProduct}
                        />
                        <ActionBar />
                    </div>

                    {/* Right Column - Calendar & Summary */}
                    <div className="lg:col-span-5 space-y-6">
                        <CalendarWidget
                            deliveryDays={[1, 2, 3, 4, 6, 7, 8, 9, 10, 30]}
                            scheduledDates={deliverySchedule}
                            onDateSelect={handleDateSelect}
                            onAddDelivery={handleAddDelivery}
                            monthlyTotal={126.5}
                        />
                        <UpsellCard />
                    </div>
                </div>
            </Container>

            <FloatingActionButton />
        </AuthenticatedLayout>
    );
}
