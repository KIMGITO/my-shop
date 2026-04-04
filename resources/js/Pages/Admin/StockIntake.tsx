import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { ActionButton } from "@/Components/UI/ActionButton";
import { HiOutlineCheck, HiOutlineXMark } from "react-icons/hi2";
import { SearchBar } from "@/Components/UI/SearchBar";
import { StatusBadge } from "@/Components/UI/StatusBadge";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import FloatingActionButton from "@/Components/Common/FloatingActionButton";
import { HiPlus } from "react-icons/hi";

const mockProducts = [
    { id: "1", name: "Whole Milk - 1L Glass Bottle", sku: "MLK-001-WH", supplier: "Golden Valley Farmstead" },
    { id: "2", name: "Artisan Salted Butter - 250g", sku: "BTR-001-SL", supplier: "North Ridge Dairy" },
    { id: "3", name: "Greek Yogurt - 500ml", sku: "YOG-001-GR", supplier: "Organic Pastures Co." },
    { id: "4", name: "Fresh Cream - 250ml", sku: "CRM-001-FR", supplier: "Golden Valley Farmstead" },
];

const recentIntakes = [
    { name: "Whole Milk - 1L", time: "2 hours ago", quantity: 50, status: "active" as const },
    { name: "Salted Butter", time: "Yesterday", quantity: 12, status: "active" as const },
];

export default function StockIntakePage() {
    const [selectedProduct, setSelectedProduct] = useState("");
    const [selectedSupplier, setSelectedSupplier] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [unitPrice, setUnitPrice] = useState(0);
    const [batchNumber, setBatchNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");

    const totalValue = quantity * unitPrice;

    return (
        <>
            <Head title="Stock Intake - Admin" />
            <AuthenticatedLayout active="/admin/batches/" >
                <div className="p-6 md:p-10 max-w-6xl mx-auto w-full">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 mb-8 text-sm font-medium text-on-surface-variant">
                        <span className="text-primary">Inventory</span>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span>Incoming Flow</span>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span className="text-on-surface">Manual Entry</span>
                    </div>

                    {/* Main Form */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Form Section */}
                        <div className="lg:col-span-8">
                            <div className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/10 rounded-bl-full pointer-events-none"></div>
                                
                                <h3 className="font-headline text-2xl font-bold mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">add_shopping_cart</span>
                                    Intake Details
                                </h3>

                                <form className="space-y-6">
                                    {/* Product & Supplier */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-on-surface-variant px-1">Select Product</label>
                                            <select
                                                value={selectedProduct}
                                                onChange={(e) => setSelectedProduct(e.target.value)}
                                                className="w-full bg-surface-container-low border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary"
                                            >
                                                <option value="">Select a product...</option>
                                                {mockProducts.map(p => (
                                                    <option key={p.id} value={p.id}>{p.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-on-surface-variant px-1">Supplier</label>
                                            <select
                                                value={selectedSupplier}
                                                onChange={(e) => setSelectedSupplier(e.target.value)}
                                                className="w-full bg-surface-container-low border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary"
                                            >
                                                <option value="">Select supplier...</option>
                                                <option>Golden Valley Farmstead</option>
                                                <option>North Ridge Dairy</option>
                                                <option>Organic Pastures Co.</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Quantity & Pricing */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-on-surface-variant px-1">Quantity</label>
                                            <input
                                                type="number"
                                                value={quantity}
                                                onChange={(e) => setQuantity(parseFloat(e.target.value))}
                                                placeholder="0.00"
                                                className="w-full bg-surface-container-low border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-on-surface-variant px-1">Unit Price ($)</label>
                                            <input
                                                type="number"
                                                value={unitPrice}
                                                onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
                                                placeholder="0.00"
                                                className="w-full bg-surface-container-low border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-on-surface-variant px-1">Total Valuation</label>
                                            <div className="w-full bg-surface-container-high/30 border-2 border-dashed border-outline-variant/30 rounded-lg py-3 px-4 font-bold text-primary text-lg">
                                                ${totalValue.toFixed(2)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Batch & Expiry */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-surface-container-low">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-on-surface-variant px-1">Batch Number</label>
                                            <input
                                                type="text"
                                                value={batchNumber}
                                                onChange={(e) => setBatchNumber(e.target.value)}
                                                placeholder="e.g., BTH-2024-001"
                                                className="w-full bg-surface-container-low border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary uppercase"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-on-surface-variant px-1">Expiry Date</label>
                                            <input
                                                type="date"
                                                value={expiryDate}
                                                onChange={(e) => setExpiryDate(e.target.value)}
                                                className="w-full bg-surface-container-low border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary"
                                            />
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="pt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                                        <p className="text-xs text-on-surface-variant italic">
                                            * Intake will be logged under Admin: Kaykay's Milk Bar
                                        </p>
                                        <div className="flex gap-4 w-full md:w-auto">
                                            <ActionButton
                                                icon={HiOutlineXMark}
                                                label="Cancel"
                                                variant="secondary"
                                                className="flex-1 md:flex-none"
                                            />
                                            <ActionButton
                                                icon={HiOutlineCheck}
                                                label="Confirm Intake"
                                                variant="primary"
                                                className="flex-1 md:flex-none"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-6">
                            {/* Preview Card */}
                            <div className="glass-card p-6 rounded-xl border border-white/20 shadow-xl">
                                <div className="flex justify-between items-start mb-6">
                                    <h4 className="font-headline font-bold text-primary">Intake Preview</h4>
                                    <StatusBadge status="active" size="sm" />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end border-b border-on-surface-variant/10 pb-2">
                                        <span className="text-sm text-on-surface-variant">Items</span>
                                        <span className="font-bold text-lg">{quantity} Units</span>
                                    </div>
                                    <div className="flex justify-between items-end border-b border-on-surface-variant/10 pb-2">
                                        <span className="text-sm text-on-surface-variant">Subtotal</span>
                                        <span className="font-bold text-lg">${totalValue.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm text-on-surface-variant">Tax (0%)</span>
                                        <span className="font-bold text-lg">$0.00</span>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Intake Log */}
                            <div className="bg-surface-container-high/40 p-6 rounded-xl">
                                <h4 className="font-headline font-bold text-on-surface mb-4 text-sm">Recent Intake Log</h4>
                                <div className="space-y-3">
                                    {recentIntakes.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-2 hover:bg-white/60 rounded-lg transition-colors cursor-pointer">
                                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                                                <span className="material-symbols-outlined text-sm">check_circle</span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs font-bold truncate">{item.name}</p>
                                                <p className="text-[10px] text-on-surface-variant">{item.time} • {item.quantity} Units</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-4 text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">
                                    View All Ledger
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}