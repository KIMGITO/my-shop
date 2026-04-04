import React, { useEffect, useState } from "react";
import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import Container from "@/Components/UI/Container";
import NotificationCard from "@/Components/Notifications/NotificationCard";
import PreferenceGroup from "@/Components/Notifications/PreferenceGroup";
import UpgradeCard from "@/Components/Notifications/UpgradeCard";
import NotificationsHeader from "@/Components/Notifications/NotificationHeader";
import { NotificationPreference, Notification } from "@/types";
import { useNavStore } from "@/Stores/useNavStore";
import { settingsNav } from "@/Data/Links/NavLinks";

// Mock Data
const mockNotifications: Notification[] = [
    {
        id: "1",
        title: "Milk has landed!",
        message:
            "Your order #8842 consisting of 2L Whole Milk and 500g Salted Butter has been delivered to your front porch.",
        time: "JUST NOW",
        isRead: false,
        type: "delivery",
        actionText: "View Delivery Photo",
        actionUrl: "/orders/8842/photo",
    },
    {
        id: "2",
        title: "Low Balance Alert",
        message:
            "Your account balance is currently $8.40. Please top up to avoid interruptions to your weekend delivery.",
        time: "2 HOURS AGO",
        isRead: true,
        type: "billing",
        actionText: "Top Up Now",
        actionUrl: "/billing/topup",
    },
    {
        id: "3",
        title: "Happy Anniversary!",
        message:
            "You've been with Kaykay's for 1 year! We've added 500 Loyalty points to your account as a thank you.",
        time: "YESTERDAY",
        isRead: true,
        type: "announcement",
        actionText: "See Loyalty Dashboard",
        actionUrl: "/loyalty",
    },
    {
        id: "4",
        title: "New Farm Special: Organic Oats",
        message:
            "Introducing our artisanal stone-ground oats, the perfect pairing for our fresh whole milk. Available now in Subscriptions.",
        time: "OCT 14",
        isRead: true,
        type: "promotion",
        actionText: "Shop Now",
        actionUrl: "/shop/oats",
    },
];

const mockPreferences: NotificationPreference[] = [
    // Order Updates
    {
        id: "delivery_confirmation",
        name: "Delivery Confirmation",
        description: "When your milk arrives at your door.",
        enabled: true,
        category: "order",
    },
    {
        id: "out_for_delivery",
        name: "Out for Delivery",
        description: "Real-time alert when the truck departs.",
        enabled: false,
        category: "order",
    },
    // Billing
    {
        id: "low_credit",
        name: "Low Credit Warning",
        description: "Alert when balance drops below $10.",
        enabled: true,
        category: "billing",
    },
    {
        id: "sms_marketing",
        name: "SMS Marketing",
        description: "Farm-to-table seasonal specials.",
        enabled: false,
        category: "marketing",
    },
];

export default function NotificationsPage() {


    const [notifications, setNotifications] =
        useState<Notification[]>(mockNotifications);
    const [preferences, setPreferences] =
        useState<NotificationPreference[]>(mockPreferences);

    const handleMarkAsRead = (id: string) => {
        setNotifications(
            notifications.map((notif) =>
                notif.id === id ? { ...notif, isRead: true } : notif
            )
        );
    };

    const handleMarkAllAsRead = () => {
        setNotifications(
            notifications.map((notif) => ({ ...notif, isRead: true }))
        );
    };

    const handlePreferenceToggle = (id: string, enabled: boolean) => {
        setPreferences(
            preferences.map((pref) =>
                pref.id === id ? { ...pref, enabled } : pref
            )
        );
    };

    const handleUpgrade = () => {
        router.visit("/subscriptions/upgrade");
    };

    const handleLoadMore = () => {
        console.log("Load more notifications");
        // Implement pagination
    };

    const orderPreferences = preferences.filter((p) => p.category === "order");
    const billingPreferences = preferences.filter(
        (p) => p.category === "billing"
    );
    const marketingPreferences = preferences.filter(
        (p) => p.category === "marketing"
    );

    const unreadCount = notifications.filter((n) => !n.isRead).length;
    

    return (
        <>
            <Head title="Notifications - Kaykay's Dairy" />
            <AuthenticatedLayout
                breadcrumb={[
                    { label: "Preferences", href:'/settings' },
                    { label: "Notifications", },
                ]}
            >
                <Container>
                    {/* Header */}
                    <NotificationsHeader
                        title="Notifications"
                        subtitle="Control how you receive fresh updates from the dairy farm. Manage your delivery alerts and farm-fresh promotions."
                        badge="Personalization"
                    />

                    {/* Bento Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                        {/* Preferences Panel */}
                        <section className="lg:col-span-5 space-y-6 md:space-y-8">
                            <div className="bg-surface-container-low p-6 md:p-8 rounded-2xl md:rounded-[2rem] relative overflow-hidden">
                                <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
                                <h3 className="text-xl md:text-2xl font-black font-headline mb-6 md:mb-8 flex items-center gap-2 md:gap-3">
                                    <span className="material-symbols-outlined text-primary">
                                        tune
                                    </span>
                                    Preferences
                                </h3>
                                <div className="space-y-8 md:space-y-10">
                                    <PreferenceGroup
                                        title="Order Updates"
                                        preferences={orderPreferences}
                                        onToggle={handlePreferenceToggle}
                                    />
                                    <PreferenceGroup
                                        title="Account & Billing"
                                        preferences={billingPreferences}
                                        onToggle={handlePreferenceToggle}
                                    />
                                    <PreferenceGroup
                                        title="Marketing"
                                        preferences={marketingPreferences}
                                        onToggle={handlePreferenceToggle}
                                    />
                                </div>
                            </div>

                            {/* Upgrade Card */}
                            <UpgradeCard
                                title="Priority Delivery Alerts"
                                description="Golden Members get exclusive WhatsApp tracking for zero-delay morning deliveries."
                                buttonText="Upgrade to Gold"
                                onUpgrade={handleUpgrade}
                            />
                        </section>

                        {/* History Panel */}
                        <section className="lg:col-span-7">
                            <div className="bg-surface-container-lowest p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-[2rem] shadow-sm min-h-[500px] md:min-h-[600px]">
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 md:mb-10">
                                    <h3 className="text-xl md:text-2xl font-black font-headline flex items-center gap-2 md:gap-3">
                                        <span className="material-symbols-outlined text-primary">
                                            history
                                        </span>
                                        Recent Activity
                                        {unreadCount > 0 && (
                                            <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                                                {unreadCount} new
                                            </span>
                                        )}
                                    </h3>
                                    {unreadCount > 0 && (
                                        <button
                                            onClick={handleMarkAllAsRead}
                                            className="text-primary font-bold text-xs md:text-sm hover:underline"
                                        >
                                            Mark all as read
                                        </button>
                                    )}
                                </div>

                                {/* Notification List */}
                                <div className="space-y-2">
                                    {notifications.map((notification) => (
                                        <NotificationCard
                                            key={notification.id}
                                            notification={notification}
                                            onMarkAsRead={handleMarkAsRead}
                                        />
                                    ))}
                                </div>

                                {/* Load More Button */}
                                <div className="mt-8 md:mt-12 text-center">
                                    <button
                                        onClick={handleLoadMore}
                                        className="text-on-surface-variant font-bold text-xs md:text-sm bg-surface-container-low px-5 md:px-6 py-2 md:py-3 rounded-full hover:bg-surface-container-high transition-colors"
                                    >
                                        Load Older Notifications
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </Container>
            </AuthenticatedLayout>
        </>
    );
}
