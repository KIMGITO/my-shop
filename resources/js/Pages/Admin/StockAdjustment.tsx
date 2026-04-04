import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { ActionButton } from "@/Components/UI/ActionButton";
import { SearchBar } from "@/Components/UI/SearchBar";
import {
    HiOutlineCheck,
    HiOutlineMinus,
    HiOutlinePlus,
    HiOutlineArrowPath,
    HiOutlineClipboardDocument,
    HiOutlineClock,
} from "react-icons/hi2";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { cn } from "@/lib/utils";

const mockProduct = {
    id: "1",
    name: "Artisanal Whole Milk",
    sku: "MK-WH-02L",
    batch: "#2204-A",
    currentStock: 142,
    unitValue: 4.5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzOhY83bH_wmc-uNzcwICLwHUqbllKpuJPw4ksrARPa1S-CVuOcLxqPlx0FR7DRTokarkr0DIOLxdhX-lj08j-oGDwKpk7kHstVi_CBMo5T1-qP0i8eQAOad4VjScIvVhq6TcZ8BPC6lXAa0REhvnk2GNPLLr-h8m6JSy87TfNl0gSCyGqyp_DJy6oafhQlcqohcuL_Uey7WI9T_QnxZjf29TQpSFDzIc6bSvMTWWqxWrHCoTLEnbnDV3_zdpfyBe_qtz6cOzXkoRJ",
};

const recentAdjustments = [
    {
        name: "Greek Yogurt 500g",
        reason: "Spillage",
        quantity: -2,
        time: "10:42 AM",
    },
    { name: "Oat Milk 1L", reason: "Audit", quantity: 5, time: "09:15 AM" },
    {
        name: "Butter Croissant",
        reason: "Expired",
        quantity: -3,
        time: "Yesterday",
    },
];

export default function StockAdjustmentPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [adjustmentAmount, setAdjustmentAmount] = useState(0);
    const [reason, setReason] = useState("");
    const [notes, setNotes] = useState("");

    const newStock = mockProduct.currentStock + adjustmentAmount;
    const totalValueChange = adjustmentAmount * mockProduct.unitValue;
    const isHealthy = newStock > 50;
    const isIncrease = adjustmentAmount > 0;
    const isDecrease = adjustmentAmount < 0;

    return (
        <>
            <Head title="Stock Adjustment - Admin" />
            <AuthenticatedLayout>
                <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-6 md:mb-8">
                        <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-2">
                            <span className="text-primary font-medium">
                                Inventory
                            </span>
                            <span>/</span>
                            <span>Stock Adjustment</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-on-surface">
                            Adjust Stock Levels
                        </h1>
                        <p className="text-sm text-on-surface-variant mt-1 max-w-2xl">
                            Perform manual corrections for spillage, damage, or
                            audit variances.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Form - Takes 2/3 on desktop */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Product Card */}
                            <div className="bg-white dark:bg-surface-container-lowest rounded-xl border border-outline-variant/20 overflow-hidden">
                                <div className="p-4 border-b border-outline-variant/10 bg-surface-container-low/30">
                                    <h2 className="font-semibold text-on-surface">
                                        Select Product
                                    </h2>
                                </div>
                                <div className="p-4">
                                    <SearchBar
                                        placeholder="Search product by name or SKU..."
                                        value={searchQuery}
                                        onChange={setSearchQuery}
                                        className="mb-4"
                                    />

                                    {/* Selected Product Preview */}
                                    <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container flex-shrink-0">
                                            <img
                                                src={mockProduct.image}
                                                alt={mockProduct.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-on-surface truncate">
                                                {mockProduct.name}
                                            </p>
                                            <p className="text-xs text-on-surface-variant">
                                                SKU: {mockProduct.sku}
                                            </p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-xs text-on-surface-variant">
                                                Current Stock
                                            </p>
                                            <p className="text-lg font-bold text-primary">
                                                {mockProduct.currentStock} units
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Adjustment Form */}
                            <div className="bg-white dark:bg-surface-container-lowest rounded-xl border border-outline-variant/20 overflow-hidden">
                                <div className="p-4 border-b border-outline-variant/10 bg-surface-container-low/30">
                                    <h2 className="font-semibold text-on-surface">
                                        Adjustment Details
                                    </h2>
                                </div>
                                <div className="p-4 space-y-4">
                                    {/* Quantity Adjustment */}
                                    <div>
                                        <label className="block text-sm font-medium text-on-surface mb-2">
                                            Quantity Adjustment
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() =>
                                                    setAdjustmentAmount(
                                                        (prev) => prev - 1
                                                    )
                                                }
                                                className="w-10 h-10 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-center flex-shrink-0"
                                            >
                                                <HiOutlineMinus className="text-lg" />
                                            </button>
                                            <input
                                                type="number"
                                                value={adjustmentAmount}
                                                onChange={(e) =>
                                                    setAdjustmentAmount(
                                                        parseInt(
                                                            e.target.value
                                                        ) || 0
                                                    )
                                                }
                                                className="flex-1 h-10 px-3 text-center bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary text-on-surface"
                                            />
                                            <button
                                                onClick={() =>
                                                    setAdjustmentAmount(
                                                        (prev) => prev + 1
                                                    )
                                                }
                                                className="w-10 h-10 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-center flex-shrink-0"
                                            >
                                                <HiOutlinePlus className="text-lg" />
                                            </button>
                                        </div>
                                        <p className="text-xs text-on-surface-variant mt-1">
                                            {adjustmentAmount < 0
                                                ? "Removing stock"
                                                : adjustmentAmount > 0
                                                ? "Adding stock"
                                                : "No change"}
                                        </p>
                                    </div>

                                    {/* Reason */}
                                    <div>
                                        <label className="block text-sm font-medium text-on-surface mb-2">
                                            Reason for Adjustment
                                        </label>
                                        <select
                                            value={reason}
                                            onChange={(e) =>
                                                setReason(e.target.value)
                                            }
                                            className="w-full h-10 px-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary text-on-surface"
                                        >
                                            <option value="">
                                                Select a reason...
                                            </option>
                                            <option value="spillage">
                                                Spilled / Waste
                                            </option>
                                            <option value="damaged">
                                                Damaged Goods
                                            </option>
                                            <option value="audit">
                                                Audit Variance
                                            </option>
                                            <option value="promo">
                                                Promotional Use
                                            </option>
                                            <option value="expired">
                                                Expired Stock
                                            </option>
                                        </select>
                                    </div>

                                    {/* Notes */}
                                    <div>
                                        <label className="block text-sm font-medium text-on-surface mb-2">
                                            Additional Notes (Optional)
                                        </label>
                                        <textarea
                                            value={notes}
                                            onChange={(e) =>
                                                setNotes(e.target.value)
                                            }
                                            rows={2}
                                            className="w-full px-3 py-2 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary text-on-surface text-sm resize-none"
                                            placeholder="Describe the occurrence..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - Takes 1/3 on desktop */}
                        <div className="space-y-6">
                            {/* Summary Card */}
                            <div className="bg-white dark:bg-surface-container-lowest rounded-xl border border-outline-variant/20 overflow-hidden sticky top-6">
                                <div className="p-4 border-b border-outline-variant/10 bg-surface-container-low/30">
                                    <h2 className="font-semibold text-on-surface">
                                        Summary
                                    </h2>
                                </div>
                                <div className="p-4 space-y-4">
                                    {/* Stock Change */}
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-sm text-on-surface-variant">
                                            Current Stock
                                        </span>
                                        <span className="font-medium text-on-surface">
                                            {mockProduct.currentStock} units
                                        </span>
                                    </div>

                                    {adjustmentAmount !== 0 && (
                                        <div className="flex items-center justify-between py-2 border-t border-outline-variant/10">
                                            <span className="text-sm text-on-surface-variant">
                                                Adjustment
                                            </span>
                                            <span
                                                className={cn(
                                                    "font-medium",
                                                    adjustmentAmount > 0
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                )}
                                            >
                                                {adjustmentAmount > 0
                                                    ? "+"
                                                    : ""}
                                                {adjustmentAmount} units
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between py-2 border-t border-outline-variant/10">
                                        <span className="text-sm text-on-surface-variant">
                                            New Stock Level
                                        </span>
                                        <span className="font-bold text-lg text-primary">
                                            {newStock} units
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-sm text-on-surface-variant">
                                            Value Change
                                        </span>
                                        <span
                                            className={cn(
                                                "font-medium",
                                                totalValueChange > 0
                                                    ? "text-green-600"
                                                    : totalValueChange < 0
                                                    ? "text-red-600"
                                                    : ""
                                            )}
                                        >
                                            {totalValueChange > 0 ? "+" : ""}$
                                            {Math.abs(totalValueChange).toFixed(
                                                2
                                            )}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-sm text-on-surface-variant">
                                            Status
                                        </span>
                                        <span
                                            className={cn(
                                                "px-2 py-0.5 rounded-full text-xs font-medium",
                                                isHealthy
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            )}
                                        >
                                            {isHealthy
                                                ? "Healthy"
                                                : "Low Stock"}
                                        </span>
                                    </div>

                                    <button
                                        disabled={
                                            adjustmentAmount === 0 || !reason
                                        }
                                        className={cn(
                                            "w-full py-2.5 rounded-lg font-medium transition-all mt-4",
                                            adjustmentAmount !== 0 && reason
                                                ? "bg-primary text-white hover:bg-primary/90 active:scale-95"
                                                : "bg-surface-container-low text-on-surface-variant cursor-not-allowed"
                                        )}
                                    >
                                        Confirm Adjustment
                                    </button>
                                    <p className="text-[10px] text-center text-on-surface-variant">
                                        Changes are permanent and recorded in
                                        history
                                    </p>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white dark:bg-surface-container-lowest rounded-xl border border-outline-variant/20 overflow-hidden">
                                <div className="p-4 border-b border-outline-variant/10 bg-surface-container-low/30">
                                    <div className="flex items-center gap-2">
                                        <HiOutlineClock className="text-on-surface-variant" />
                                        <h2 className="font-semibold text-on-surface">
                                            Recent Activity
                                        </h2>
                                    </div>
                                </div>
                                <div className="p-4 space-y-3">
                                    {recentAdjustments.map((adj, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-3"
                                        >
                                            <div
                                                className={cn(
                                                    "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                                                    adj.quantity < 0
                                                        ? "bg-red-100"
                                                        : "bg-green-100"
                                                )}
                                            >
                                                <HiOutlineArrowPath
                                                    className={cn(
                                                        "text-sm",
                                                        adj.quantity < 0
                                                            ? "text-red-600"
                                                            : "text-green-600"
                                                    )}
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-on-surface truncate">
                                                    {adj.name}
                                                </p>
                                                <p className="text-xs text-on-surface-variant">
                                                    {adj.reason} •{" "}
                                                    {adj.quantity > 0
                                                        ? `+${adj.quantity}`
                                                        : adj.quantity}{" "}
                                                    units
                                                </p>
                                            </div>
                                            <span className="text-xs text-on-surface-variant flex-shrink-0">
                                                {adj.time}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
