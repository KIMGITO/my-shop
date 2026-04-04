// resources/js/Pages/Dashboard.tsx
import React from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { HeroCard } from "@/Components/Dashboard/HeroCard";
import { StatCard } from "@/Components/Dashboard/StatCard";
import { WeeklySchedule } from "@/Components/Dashboard/WeeklySchedule";
import { OrderCard } from "@/Components/Dashboard/OrderCard";
// import { DashboardHeader } from "@/Components/Dashboard/DashboardHeader";
import Container from "@/Components/UI/Container";
import ReferralCard from "@/Components/UI/ReferralCard";
import ProductCard from "@/Components/UI/ProductCard";
import { products } from "@/Data/ProductData";
import ReminderCard from "@/Components/UI/ReminderCard";
import FloatingActionButton from "@/Components/Common/FloatingActionButton";
import { FaPlus } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdStars } from "react-icons/md";

export default function Dashboard() {
    const week = [
        { day: "Mon", date: "12", delivery: true },
        { day: "Tue", date: "13", delivery: false },
        { day: "Wed", date: "14", delivery: true, pending: true },
        { day: "Thu", date: "15", delivery: false },
        { day: "Fri", date: "16", delivery: true },
        { day: "Sat", date: "17", delivery: false },
        { day: "Sun", date: "18", delivery: false },
    ];

    const handleTopUp = () => {
        // Handle top up logic
        console.log("Top up clicked");
    };

    const handleCopyReferralLink = () => {
        // Copy referral link logic
        navigator.clipboard.writeText("https://kaykays.com/refer/123");
        // Show toast notification
        console.log("Link copied!");
    };

    const handleViewCalendar = () => {
        // Navigate to calendar
        console.log("View calendar clicked");
    };

    const handleOrderMenu = (orderId: string) => {
        // Handle order menu options
        console.log("Order menu clicked", orderId);
    };

    return (
        <AuthenticatedLayout header={"Header"}>
            <Head title="Dashboard - Kaykay's Milk Bar" />

            <Container>
                {/* Hero Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <HeroCard
                        className="md:col-span-2"
                        title="Rise and shine, Kaykay's."
                        description="Your fresh morning delivery is arriving in 45 minutes. Get the cookies ready!"
                    />

                    <div className="space-y-6">
                        <StatCard
                            Icon={GiTakeMyMoney}
                            variant=""
                            className="bg-white text-on-primary font-semibold"
                            title="Store Credit"
                            value="$45.00"
                            buttonText="Top Up"
                            onButtonClick={handleTopUp}
                        />

                        <StatCard
                            Icon={MdStars}
                            className="bg-primary"
                            title="Loyalty Coins"
                            value="1,250"
                            variant="primary"
                            description="250 coins until your next free liter!"
                        />
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 space-y-10">
                        {/* Weekly Schedule */}
                        <WeeklySchedule
                            week={week}
                            onViewCalendar={handleViewCalendar}
                        />

                        {/* Active Orders */}
                        <section>
                            <h4 className="text-xl font-headline font-black text-on-surface mb-6 px-2">
                                Current Orders
                            </h4>
                            <div className="space-y-4">
                                <OrderCard
                                    title="A2 Full Cream (2L)"
                                    price="8.50"
                                    tag="Active"
                                    schedule="Recurring: Mon, Wed, Fri"
                                    image="https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200"
                                    onMenuClick={() => handleOrderMenu("1")}
                                />
                                <OrderCard
                                    title="Cultured Butter"
                                    price="12.00"
                                    tag="Processing"
                                    schedule="One-time (Mon)"
                                    image="https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200"
                                    onMenuClick={() => handleOrderMenu("2")}
                                />
                            </div>
                        </section>
                    </div>

                    {/* Right Panel */}
                    <div className="lg:col-span-4 space-y-10 ">
                        <div className="md:grid md:grid-cols-3 gap-6 lg:grid-cols-1 items-center">
                            <div className="col-span-2">
                                <ReferralCard
                                    onCopyLink={handleCopyReferralLink}
                                />
                            </div>
                            <ReminderCard
                                title="You need these?"
                                maxItems={3}
                                className="bg-transparent lg:mt-10"
                                products={products}
                            />
                        </div>
                    </div>
                </div>
                <FloatingActionButton icon={<FaPlus />} />
            </Container>
        </AuthenticatedLayout>
    );
}
