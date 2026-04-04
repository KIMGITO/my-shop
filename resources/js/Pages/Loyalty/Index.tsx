import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import Container from "@/Components/UI/Container";
import CategoryFilter from "@/Components/Loyalty/CategoryFilter";
import CoinBalanceCard from "@/Components/Loyalty/CoinBalance";
import FeaturedRewardCard from "@/Components/Loyalty/FeaturedRewardCard";
import LoyaltyHeader from "@/Components/Loyalty/LoyaltyHeaderCard";
import ProgressCard from "@/Components/Loyalty/ProgressCard";
import VoucherCard from "@/Components/Loyalty/VoucherCard";
import { Reward } from "@/types";

// Mock Data
const mockRewards: Reward[] = [
    {
        id: "1",
        name: "Artisan Yogurt Pot",
        description:
            "Redeem for any flavor of our small-batch probiotic yogurt pots.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6My8IpCQyoaoQHbz2JaAMBzIpO9JT3nEdcZVECM8Da-QHNCYGRT-tg-q9JqfNbm1QG2iFh0OV6Z2Qa30rIsryCiBzFT6oMCX06OfXqUzSRVXGO5C41SGNfwfkJ9ed20O-mk2_KrGMyLU5rcHafrhpFE8wiZ4dryc7J2tcNO_FanHiMVQDjOr0EIna1rSb-e2XlzpPR1kynroBkcKa6afKYHliQGiPutjUg9YUNmCAodQYAWl4Cdvkt2bZ_b-8bN5OtZRnyhv_PsnX",
        cost: 300,
        category: "beverages",
    },
    {
        id: "2",
        name: "The Cookie Bundle",
        description:
            "A baker's half-dozen of our signature sea-salt chocolate chip cookies.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVCup7IfTTWVaYxPdRD8T7CK7u1oaskf2E6PzSVIRpzU-L3cxqWwyIFD36N_9QKLHO7FxjuzQecb3edsnGz7mygCFCjD1COFkM3MPbV5qRj5iTkOZbXN73Rt6bjwvxcm2k-3vxpKThmuypb1vCzTn_A0_wPMxIo2qPgb_uvxYJlL6CDGQ5EUZP6bz2pX9IJn98URdS6reuFhPUv8BREqgGjw-YL6AzByuXNtJYMrsyDTTby2ZabgqvfxgfohyyrOiDWUmFybGwI_pO",
        cost: 500,
        category: "bakery",
    },
    {
        id: "3",
        name: "Canvas Market Tote",
        description:
            "High-quality, eco-friendly tote bag for your weekend farm market trips.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVWo8L4ZnWUYtAGY_QYP7MRHHPJBOXLd04yepDaqDrkgJTtxkKxZjQAAg1wBPKv7Bf0kgLBb5valwu5lY65qS0rGWIbt-asyZbvS1VKoXt-jPO5qNnE_M_ARZrVoR0bjI9cWK38jTul3UfXX3-aTz8j-Nl4zmNa15gguYOf-ICuuqUkAGdGQXLLRXM6ObB0121dLH3x0UrO177h4NW4WA2m4g8ndueHdqhWAJfEZ_Wqwtp_OmuE5hFhvBSfXof34zI7q2tsWI7JywK",
        cost: 1200,
        category: "merchandise",
    },
];

const categories = [
    { id: "all", label: "All" },
    { id: "beverages", label: "Beverages" },
    { id: "bakery", label: "Bakery" },
    { id: "merchandise", label: "Merchandise" },
];

export default function LoyaltyPage() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [totalCoins] = useState(1250);
    const [nextReward] = useState({
        name: "Free Half-Gallon Organic Whole Milk",
        coinsNeeded: 250,
        progress: 83.3, // 1250/1500 * 100
    });

    const filteredRewards = mockRewards.filter((reward) =>
        activeCategory === "all" ? true : reward.category === activeCategory
    );

    const handleRedeem = (rewardId: string) => {
        console.log("Redeeming reward:", rewardId);
        // Implement redemption logic
    };

    const handleActivateOffer = () => {
        console.log("Activating limited offer");
        // Implement activation logic
    };

    const handleViewHistory = () => {
        router.visit("/loyalty/history");
    };

    return (
        <>
            <Head title="Loyalty & Rewards - Kaykay's Dairy" />
            <AuthenticatedLayout breadcrumb={[
                        { label: "Rewards & Loyalty" },
                        { label: "My Wallet" },
                    ]}>
                <Container>
                    {/* Header Section */}
                    <div className="mb-8 md:mb-12">
                        <LoyaltyHeader />
                    </div>

                    {/* Balance & Progress Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 mb-8 md:mb-12">
                        <CoinBalanceCard
                            totalCoins={totalCoins}
                            onViewHistory={handleViewHistory}
                        />
                        <ProgressCard
                            nextRewardName={nextReward.name}
                            coinsNeeded={nextReward.coinsNeeded}
                            progress={nextReward.progress}
                            totalCoins={totalCoins}
                            message="You're in the top 5% of milk enthusiasts this month! Keep it up!"
                        />
                        <FeaturedRewardCard
                            title="Double Point Weekends"
                            description="Earn 2x coins on all premium cream deliveries through Sunday."
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuCprmefCIy8s_f9x72EQdwa6ygiwgg-laX5ZGWtyejjE7JUI4syY49svkJfrEGyrUsjmvc8ooHmMz2EEhr7-WwKoLfjKVAzKkguVMFrmqP4hZ8l_CVH2ojeOtvxKhMENRn-L3DNVME62_utLV7uJnM-mw-XykRyy0ZVjqPXJLinpViZC6urshGzydTIAqf8meOLMo24Mo2s47hthN-n5jm130kJ-VLzf5kwslUkWL6aMPsD7UIPZafMK8ndNtNsN2TuiIC5AZu0xGBv"
                            onActivate={handleActivateOffer}
                        />
                    </div>

                    {/* Vouchers Section */}
                    <section className="space-y-5 md:space-y-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <h3 className="text-2xl md:text-3xl font-headline font-bold text-on-surface">
                                Redeemable Vouchers
                            </h3>
                            <CategoryFilter
                                categories={categories}
                                activeCategory={activeCategory}
                                onCategoryChange={setActiveCategory}
                            />
                        </div>

                        {/* Vouchers Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
                            {filteredRewards.map((reward) => (
                                <VoucherCard
                                    key={reward.id}
                                    reward={reward}
                                    onRedeem={handleRedeem}
                                />
                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredRewards.length === 0 && (
                            <div className="text-center py-12">
                                <span className="material-symbols-outlined text-5xl text-on-surface-variant/40 mb-3">
                                    redeem
                                </span>
                                <p className="text-on-surface-variant">
                                    No vouchers available in this category
                                </p>
                            </div>
                        )}
                    </section>
                </Container>
            </AuthenticatedLayout>
        </>
    );
}
