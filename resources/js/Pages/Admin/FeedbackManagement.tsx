import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { SearchBar } from "@/Components/UI/SearchBar";
import { FilterChip } from "@/Components/UI/FilterChip";
import { Pagination } from "@/Components/UI/Pagination";
import { cn } from "@/lib/utils";
import {
    HiOutlineStar,
    HiOutlineCheckCircle,
    HiOutlineClock,
    HiOutlineUserCircle,
} from "react-icons/hi2";
import { HiOutlineReply, HiReply } from "react-icons/hi";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";

interface Feedback {
    id: string;
    user: {
        name: string;
        email: string;
        avatar?: string;
        memberSince: string;
    };
    type: "suggestion" | "complaint" | "praise" | "bug";
    title: string;
    description: string;
    rating: number;
    status: "pending" | "reviewed" | "resolved" | "archived";
    createdAt: string;
    attachments?: string[];
    response?: {
        message: string;
        respondedBy: string;
        respondedAt: string;
    };
}

const mockFeedbacks: Feedback[] = [
    {
        id: "1",
        user: {
            name: "Sarah Johnson",
            email: "sarah.j@example.com",
            memberSince: "Jan 2024",
        },
        type: "praise",
        title: "Amazing milk quality!",
        description:
            "The whole milk is absolutely delicious. Best I've ever had!",
        rating: 5,
        status: "pending",
        createdAt: "2024-04-01T10:30:00",
    },
    {
        id: "2",
        user: {
            name: "Michael Chen",
            email: "michael.c@example.com",
            memberSince: "Mar 2023",
        },
        type: "complaint",
        title: "Late delivery",
        description:
            "My delivery arrived 2 hours late. The milk was still cold but the ice cream melted.",
        rating: 2,
        status: "reviewed",
        createdAt: "2024-03-30T15:45:00",
        response: {
            message:
                "We apologize for the delay. We've identified the issue and will ensure it doesn't happen again.",
            respondedBy: "Admin",
            respondedAt: "2024-03-31T09:00:00",
        },
    },
    {
        id: "3",
        user: {
            name: "Emily Rodriguez",
            email: "emily.r@example.com",
            memberSince: "Oct 2024",
        },
        type: "suggestion",
        title: "Add oat milk option",
        description:
            "Would love to see an oat milk option for lactose-intolerant customers.",
        rating: 0,
        status: "resolved",
        createdAt: "2024-03-28T09:15:00",
        response: {
            message: "Great suggestion! We're launching oat milk next month.",
            respondedBy: "Product Manager",
            respondedAt: "2024-03-29T14:30:00",
        },
    },
    {
        id: "4",
        user: {
            name: "David Kim",
            email: "david.k@example.com",
            memberSince: "Jun 2023",
        },
        type: "bug",
        title: "App crashes on checkout",
        description:
            "The app crashes every time I try to checkout. Using iPhone 14.",
        rating: 0,
        status: "pending",
        createdAt: "2024-04-01T08:20:00",
    },
];

const typeConfig = {
    suggestion: { icon: "💡", label: "Suggestion", color: "primary" },
    complaint: { icon: "⚠️", label: "Complaint", color: "error" },
    praise: { icon: "🎉", label: "Praise", color: "success" },
    bug: { icon: "🐛", label: "Bug", color: "warning" },
};

const statusConfig = {
    pending: {
        label: "Pending",
        color: "bg-yellow-100 text-yellow-700",
        icon: "schedule",
    },
    reviewed: {
        label: "Reviewed",
        color: "bg-blue-100 text-blue-700",
        icon: "visibility",
    },
    resolved: {
        label: "Resolved",
        color: "bg-green-100 text-green-700",
        icon: "check_circle",
    },
    archived: {
        label: "Archived",
        color: "bg-gray-100 text-gray-700",
        icon: "archive",
    },
};

const stats = [
    { label: "Pending", value: "12", icon: "schedule", color: "warning" },
    { label: "Resolved", value: "45", icon: "check_circle", color: "success" },
    { label: "Avg Rating", value: "4.8", icon: "star", color: "primary" },
    { label: "Response Time", value: "4.2h", icon: "timer", color: "info" },
];

export default function FeedbackManagement() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeType, setActiveType] = useState("all");
    const [activeStatus, setActiveStatus] = useState("all");
    const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
        null
    );
    const [responseMessage, setResponseMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredFeedbacks = mockFeedbacks.filter((feedback) => {
        const matchesSearch =
            feedback.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            feedback.user.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        const matchesType =
            activeType === "all" || feedback.type === activeType;
        const matchesStatus =
            activeStatus === "all" || feedback.status === activeStatus;
        return matchesSearch && matchesType && matchesStatus;
    });

    const paginatedFeedbacks = filteredFeedbacks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleRespond = (feedbackId: string) => {
        console.log("Responding to feedback:", feedbackId, responseMessage);
        setSelectedFeedback(null);
        setResponseMessage("");
    };

    const getStarRating = (rating: number) => {
        return (
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <HiOutlineStar
                        key={star}
                        className={cn(
                            "w-4 h-4",
                            star <= rating
                                ? "fill-primary text-primary"
                                : "text-on-surface-variant"
                        )}
                    />
                ))}
            </div>
        );
    };

    return (
        <>
            <Head title="Feedback Management" />
            <AuthenticatedLayout active="feedback">
                <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold font-headline tracking-tighter">
                                Customer Feedback
                            </h2>
                            <p className="text-on-surface-variant mt-2">
                                Monitor, analyze, and respond to customer
                                feedback to improve service quality.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button className="bg-surface-container-highest px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined">
                                    download
                                </span>
                                Export Report
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {stats.map((stat, idx) => (
                            <div
                                key={idx}
                                className="bg-surface-container-lowest p-6 rounded-xl flex items-center justify-between border-l-4 border-primary"
                            >
                                <div>
                                    <p className="text-on-surface-variant text-sm font-semibold">
                                        {stat.label}
                                    </p>
                                    <h3 className="text-3xl font-black">
                                        {stat.value}
                                    </h3>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">
                                        {stat.icon}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                            <FilterChip
                                label="All Types"
                                active={activeType === "all"}
                                onClick={() => setActiveType("all")}
                            />
                            <FilterChip
                                label="Suggestion"
                                active={activeType === "suggestion"}
                                onClick={() => setActiveType("suggestion")}
                            />
                            <FilterChip
                                label="Complaint"
                                active={activeType === "complaint"}
                                onClick={() => setActiveType("complaint")}
                            />
                            <FilterChip
                                label="Praise"
                                active={activeType === "praise"}
                                onClick={() => setActiveType("praise")}
                            />
                            <FilterChip
                                label="Bug"
                                active={activeType === "bug"}
                                onClick={() => setActiveType("bug")}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <FilterChip
                                label="All Status"
                                active={activeStatus === "all"}
                                onClick={() => setActiveStatus("all")}
                            />
                            <FilterChip
                                label="Pending"
                                active={activeStatus === "pending"}
                                onClick={() => setActiveStatus("pending")}
                            />
                            <FilterChip
                                label="Reviewed"
                                active={activeStatus === "reviewed"}
                                onClick={() => setActiveStatus("reviewed")}
                            />
                            <FilterChip
                                label="Resolved"
                                active={activeStatus === "resolved"}
                                onClick={() => setActiveStatus("resolved")}
                            />
                        </div>
                    </div>

                    {/* Search */}
                    <div className="w-full md:w-96">
                        <SearchBar
                            placeholder="Search feedback..."
                            value={searchQuery}
                            onChange={setSearchQuery}
                        />
                    </div>

                    {/* Feedback List */}
                    <div className="space-y-4">
                        {paginatedFeedbacks.map((feedback) => (
                            <div
                                key={feedback.id}
                                className={cn(
                                    "bg-surface-container-lowest rounded-xl p-6 shadow-sm hover:shadow-md transition-all",
                                    feedback.status === "pending" &&
                                        "border-l-4 border-error"
                                )}
                            >
                                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center">
                                            <HiOutlineUserCircle className="text-2xl text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-on-surface">
                                                {feedback.user.name}
                                            </h4>
                                            <p className="text-xs text-on-surface-variant">
                                                {feedback.user.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">
                                            {typeConfig[feedback.type].icon}
                                        </span>
                                        <span
                                            className={cn(
                                                "px-2 py-1 rounded-full text-xs font-bold",
                                                statusConfig[feedback.status]
                                                    .color
                                            )}
                                        >
                                            {
                                                statusConfig[feedback.status]
                                                    .label
                                            }
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                                        <h3 className="text-lg font-bold text-on-surface">
                                            {feedback.title}
                                        </h3>
                                        {feedback.rating > 0 &&
                                            getStarRating(feedback.rating)}
                                    </div>
                                    <p className="text-on-surface-variant text-sm mb-3">
                                        {feedback.description}
                                    </p>
                                    <p className="text-xs text-on-surface-variant/60">
                                        {new Date(
                                            feedback.createdAt
                                        ).toLocaleDateString()}{" "}
                                        at{" "}
                                        {new Date(
                                            feedback.createdAt
                                        ).toLocaleTimeString()}
                                    </p>
                                </div>

                                {feedback.response && (
                                    <div className="mt-4 p-4 bg-surface-container-low rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <HiOutlineReply className="text-primary" />
                                            <span className="text-sm font-bold text-on-surface">
                                                Response
                                            </span>
                                        </div>
                                        <p className="text-sm text-on-surface-variant">
                                            {feedback.response.message}
                                        </p>
                                        <p className="text-xs text-on-surface-variant/60 mt-2">
                                            Responded by{" "}
                                            {feedback.response.respondedBy} on{" "}
                                            {new Date(
                                                feedback.response.respondedAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                )}

                                <div className="flex gap-3 mt-4 pt-4 border-t border-outline-variant/10">
                                    {feedback.status === "pending" && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    setSelectedFeedback(
                                                        feedback
                                                    )
                                                }
                                                className="flex items-center gap-1 text-primary font-bold text-sm hover:underline"
                                            >
                                                <HiReply className="text-lg" />
                                                Respond
                                            </button>
                                            <button className="flex items-center gap-1 text-success font-bold text-sm hover:underline">
                                                <HiOutlineCheckCircle className="text-lg" />
                                                Mark Resolved
                                            </button>
                                        </>
                                    )}
                                    <button className="flex items-center gap-1 text-on-surface-variant font-bold text-sm hover:underline">
                                        <span className="material-symbols-outlined text-lg">
                                            visibility
                                        </span>
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {filteredFeedbacks.length > itemsPerPage && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(
                                filteredFeedbacks.length / itemsPerPage
                            )}
                            totalItems={filteredFeedbacks.length}
                            itemsPerPage={itemsPerPage}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </div>

                {/* Response Modal */}
                {selectedFeedback && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full">
                            <div className="p-6 border-b border-outline-variant/10">
                                <h3 className="text-xl font-bold">
                                    Respond to Feedback
                                </h3>
                                <p className="text-sm text-on-surface-variant mt-1">
                                    From: {selectedFeedback.user.name}
                                </p>
                            </div>
                            <div className="p-6">
                                <div className="mb-4 p-4 bg-surface-container-low rounded-lg">
                                    <p className="text-sm font-medium text-on-surface mb-2">
                                        Original Message:
                                    </p>
                                    <p className="text-sm text-on-surface-variant">
                                        {selectedFeedback.description}
                                    </p>
                                </div>
                                <label className="block text-sm font-bold text-on-surface-variant mb-2">
                                    Your Response
                                </label>
                                <textarea
                                    value={responseMessage}
                                    onChange={(e) =>
                                        setResponseMessage(e.target.value)
                                    }
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary text-on-surface"
                                    placeholder="Type your response here..."
                                />
                            </div>
                            <div className="p-6 pt-0 flex gap-3 justify-end">
                                <button
                                    onClick={() => setSelectedFeedback(null)}
                                    className="px-4 py-2 rounded-lg font-bold hover:bg-surface-container transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() =>
                                        handleRespond(selectedFeedback.id)
                                    }
                                    className="px-6 py-2 rounded-lg bg-primary text-on-primary font-bold hover:bg-primary/90 transition-colors"
                                >
                                    Send Response
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </AuthenticatedLayout>
        </>
    );
}
