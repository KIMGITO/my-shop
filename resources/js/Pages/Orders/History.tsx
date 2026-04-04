import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import Container from "@/Components/UI/Container";
import Pagination from "@/Components/UI/Pagination";
import FeaturedOrderCard from "@/Components/Order/FeaturedOrderCard";
import OrderFilters from "@/Components/Order/OrderFilter";
import OrderHistoryHeader from "@/Components/Order/OrderHistoryHeader";
import OrderRow from "@/Components/Order/OrderRow";
import { Order } from "@/types";

// Mock Data
const mockOrders: Order[] = [
    {
        id: "1",
        orderNumber: "KB-90421",
        date: "Oct 12, 2023",
        total: 3450,
        status: "delivered",
        items: [
            {
                id: "1",
                name: "The Farmhouse Morning Pack",
                quantity: 1,
                price: 3450,
            },
        ],
        deliveryAddress: "Kilimani Estate, Nairobi",
        paymentMethod: "M-Pesa",
    },
    {
        id: "2",
        orderNumber: "KB-88219",
        date: "Sep 28, 2023",
        total: 2200,
        status: "completed",
        items: [
            {
                id: "2",
                name: "Artisan Butter & Cream Set",
                quantity: 2,
                price: 1100,
            },
        ],
        deliveryAddress: "Westlands, Nairobi",
        paymentMethod: "Card",
    },
    {
        id: "3",
        orderNumber: "KB-87110",
        date: "Sep 21, 2023",
        total: 1850,
        status: "completed",
        items: [
            {
                id: "3",
                name: "The Weekly Dairy Subscription",
                quantity: 1,
                price: 1850,
            },
        ],
        deliveryAddress: "Kilimani Estate, Nairobi",
        paymentMethod: "M-Pesa",
    },
    {
        id: "4",
        orderNumber: "KB-86504",
        date: "Sep 14, 2023",
        total: 1500,
        status: "canceled",
        items: [
            {
                id: "4",
                name: "Organic Almond Milk Trio",
                quantity: 3,
                price: 500,
            },
        ],
        deliveryAddress: "Tatu City, Kiambu",
        paymentMethod: "M-Pesa",
    },
    {
        id: "5",
        orderNumber: "KB-85490",
        date: "Sep 07, 2023",
        total: 4500,
        status: "delivered",
        items: [
            {
                id: "5",
                name: "Holiday Pastry & Milk Box",
                quantity: 1,
                price: 4500,
            },
        ],
        deliveryAddress: "Ruiru, Kiambu",
        paymentMethod: "Card",
    },
];

const ITEMS_PER_PAGE = 5;

export default function OrderHistoryPage() {
    const [orders, setOrders] = useState<Order[]>(mockOrders);
    const [activeFilter, setActiveFilter] = useState("All Orders");
    const [activePeriod, setActivePeriod] = useState("Last 6 Months");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredOrders = orders.filter((order) => {
        if (activeFilter === "All Orders") return true;
        if (activeFilter === "Delivered")
            return order.status === "delivered" || order.status === "completed";
        if (activeFilter === "Processing") return order.status === "processing";
        if (activeFilter === "Canceled") return order.status === "canceled";
        return true;
    });

    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
    const featuredOrder = orders.find((o) => o.status === "delivered");

    const handleViewDetails = (orderId: string) => {
        router.visit(`/orders/${orderId}`);
    };

    const handleDownloadInvoice = (orderId: string) => {
        console.log("Download invoice for order:", orderId);
        // Implement invoice download logic
    };

    return (
        <>
            <Head title="Order History - Kaykay's Dairy" />
            <AuthenticatedLayout>
                <Container>
                    {/* Header Section */}
                    <div className="mb-6 md:mb-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <OrderHistoryHeader />
                            <OrderFilters
                                activeFilter={activeFilter}
                                onFilterChange={setActiveFilter}
                                activePeriod={activePeriod}
                                onPeriodChange={setActivePeriod}
                            />
                        </div>
                    </div>

                    {/* Featured Order */}
                    {featuredOrder && (
                        <div className="mb-6 md:mb-8">
                            <FeaturedOrderCard
                                order={featuredOrder}
                                onViewDetails={handleViewDetails}
                                onDownloadInvoice={handleDownloadInvoice}
                            />
                        </div>
                    )}

                    {/* Orders List */}
                    <div className="bg-surface-container-high/30 rounded-3xl p-1">
                        <div className="bg-surface-container-lowest rounded-[1.4rem] overflow-hidden">
                            {/* Table Header - Desktop only */}
                            <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-5 border-b border-surface-container-low">
                                <div className="col-span-5 text-on-surface-variant font-label text-xs font-bold uppercase tracking-widest">
                                    Order Details
                                </div>
                                <div className="col-span-2 text-on-surface-variant font-label text-xs font-bold uppercase tracking-widest">
                                    Status
                                </div>
                                <div className="col-span-2 text-on-surface-variant font-label text-xs font-bold uppercase tracking-widest text-right">
                                    Total
                                </div>
                                <div className="col-span-3"></div>
                            </div>

                            {/* Order Rows */}
                            {paginatedOrders.map((order) => (
                                <OrderRow
                                    key={order.id}
                                    order={order}
                                    onViewDetails={handleViewDetails}
                                    onDownloadInvoice={handleDownloadInvoice}
                                />
                            ))}

                            {/* Empty State */}
                            {paginatedOrders.length === 0 && (
                                <div className="text-center py-12">
                                    <span className="material-symbols-outlined text-5xl text-on-surface-variant/40 mb-3">
                                        receipt_long
                                    </span>
                                    <p className="text-on-surface-variant">
                                        No orders found
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={filteredOrders.length}
                            itemsPerPage={ITEMS_PER_PAGE}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </Container>
            </AuthenticatedLayout>
        </>
    );
}
