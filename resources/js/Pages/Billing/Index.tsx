import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import Container from "@/Components/UI/Container";
import InvoiceTable from "@/Widgets/BillingInvoiceTable";
import { Invoice } from "@/types";
import NewsletterSubscribe from "../Subscriptions/NewsLetterSubscribe";
import BillingHeader from "../../Components/Billing/BillingHeader";
import ProTipCard from "../../Components/Billing/ProTipCard";
import RewardsStatCard from "@/Components/Billing/RewardStatCard";

// Mock Data
const mockInvoices: Invoice[] = [
    {
        id: "1",
        orderNumber: "#KK-92834",
        date: "Oct 12, 2023",
        time: "08:42 AM",
        amount: 42.5,
        status: "paid",
        items: [],
    },
    {
        id: "2",
        orderNumber: "#KK-91029",
        date: "Sep 28, 2023",
        time: "06:15 AM",
        amount: 38.0,
        status: "paid",
        items: [],
    },
    {
        id: "3",
        orderNumber: "#KK-89771",
        date: "Sep 14, 2023",
        time: "09:00 AM",
        amount: -15.2,
        status: "refunded",
        items: [],
    },
    {
        id: "4",
        orderNumber: "#KK-88210",
        date: "Aug 30, 2023",
        time: "07:30 AM",
        amount: 56.9,
        status: "paid",
        items: [],
    },
];

export default function BillingPage() {
    const [invoices] = useState<Invoice[]>(mockInvoices);

    const handleDownload = (invoiceId: string) => {
        console.log("Downloading invoice:", invoiceId);
        // Implement PDF download logic
    };

    const handleUpgrade = () => {
        router.visit("/subscriptions/upgrade");
    };

    const handleNewsletterSubscribe = (email: string) => {
        console.log("Subscribing email:", email);
        // Implement newsletter subscription logic
    };

    return (
        <>
            <Head title="Billing & Invoices - Kaykay's Dairy" />
            <AuthenticatedLayout
                breadcrumb={[
                    { label: "Account" },
                    { label: "Billing & Receipts", href: "#" },
                ]}
            >
                <Container>
                    {/* Header Section */}
                    <BillingHeader
                        title="Milk Ledger."
                        subtitle="Manage your artisanal subscriptions and download your monthly dairy statements."
                        currentCycle="Oct '23"
                        unpaidAmount={12.4}
                    />

                    {/* Stats Grid */}
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 mb-12 md:mb-16">
                        <ProTipCard
                            title="Save 15% on bulk orders"
                            description="Switch to quarterly billing and receive a free bottle of Kaykay's Signature Honey-Infused Milk."
                            buttonText="Upgrade Now"
                            onButtonClick={handleUpgrade}
                        />
                        <RewardsStatCard rewardsEarned={420} />
                    </div>

                    {/* Invoices Table */}
                    <div className="max-w-6xl mx-auto mb-16 md:mb-20">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5 md:mb-8">
                            <h3 className="text-xl md:text-2xl font-headline font-bold text-on-surface">
                                Recent Invoices
                            </h3>
                            <div className="flex gap-2">
                                <button className="p-1.5 md:p-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                                    <span className="material-symbols-outlined text-base md:text-lg">
                                        filter_list
                                    </span>
                                </button>
                                <button className="p-1.5 md:p-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                                    <span className="material-symbols-outlined text-base md:text-lg">
                                        search
                                    </span>
                                </button>
                            </div>
                        </div>
                        <InvoiceTable
                            invoices={invoices}
                            onDownload={handleDownload}
                        />
                    </div>

                    {/* Newsletter Section */}
                    <footer className="max-w-6xl mx-auto">
                        <NewsletterSubscribe
                            onSubmit={handleNewsletterSubscribe}
                        />
                    </footer>
                </Container>
            </AuthenticatedLayout>
        </>
    );
}
