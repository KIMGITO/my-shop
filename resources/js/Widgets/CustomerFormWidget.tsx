"use client"

import React from "react";
import Button from "@/Components/UI/Button";
import { SingleImageUpload } from "@/Components/UI/SingleImageUpload";
import { Input } from "@/Components/UI/Input";
import { 
    HiOutlinePhone, 
    HiOutlineUser, 
    HiOutlineEnvelope, 
    HiOutlineUserGroup, 
    HiOutlineShieldCheck,
    HiOutlineDocumentText 
} from "react-icons/hi2";
import { MdOutlineCategory, MdOutlineStars } from "react-icons/md";

interface CustomerFormWidgetProps {
    data: any;
    existingImageUrl?: string | null;
    setData: (key: string, value: any) => void;
    errors: any;
    processing: boolean;
    onSave: (e: React.FormEvent) => void;
    onClose: () => void;
}

export const CustomerFormWidget: React.FC<CustomerFormWidgetProps> = ({
    data,
    existingImageUrl,
    setData,
    errors,
    processing,
    onSave,
    onClose,
}) => {
    return (
        <form onSubmit={onSave} className="space-y-6">
            <div className="space-y-4">
                

                {/* 2. Full Name / Business Name */}
                <Input
                    label="Full Name / Business Name"
                    value={data.name}
                    placeholder="e.g. John Doe or Acme Corp"
                    onChange={(e) => setData("name", e.target.value)}
                    Icon={HiOutlineUser}
                    error={errors.name}
                    disabled={processing}
                />

                {/* 3. Contact Info Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="customer@example.com"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        Icon={HiOutlineEnvelope}
                        error={errors.email}
                        disabled={processing}
                    />
                    <Input
                        label="Phone Number"
                        value={data.phone}
                        placeholder="e.g. 0700123456"
                        onChange={(e) => setData("phone", e.target.value)}
                        Icon={HiOutlinePhone}
                        error={errors.phone}
                        disabled={processing}
                    />
                </div>

                {/* 4. Classification Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-[13px] font-medium text-on-surface-variant ml-1">
                            Customer Group
                        </label>
                        <div className="relative">
                            <select 
                                value={data.customer_group || ""}
                                onChange={(e) => setData("customer_group", e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 bg-surface-container-high rounded-xl border-none outline-none appearance-none focus:ring-2 focus:ring-primary text-sm"
                                disabled={processing}
                            >
                                <option value="">General</option>
                                <option value="VIP">VIP Tier</option>
                                <option value="Staff">Staff</option>
                                <option value="Loyal">Loyal Customer</option>
                            </select>
                            <HiOutlineUserGroup className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
                        </div>
                        {errors.customer_group && (
                            <span className="text-xs text-error ml-1">{errors.customer_group}</span>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[13px] font-medium text-on-surface-variant ml-1">
                            Customer Type
                        </label>
                        <div className="relative">
                            <select 
                                value={data.customer_type || ""}
                                onChange={(e) => setData("customer_type", e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 bg-surface-container-high rounded-xl border-none outline-none appearance-none focus:ring-2 focus:ring-primary text-sm"
                                disabled={processing}
                            >
                                <option value="retail">Retail</option>
                                <option value="wholesale">Wholesale</option>
                                <option value="distributor">Distributor</option>
                            </select>
                            <MdOutlineCategory className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
                        </div>
                        {errors.customer_type && (
                            <span className="text-xs text-error ml-1">{errors.customer_type}</span>
                        )}
                    </div>
                </div>

                {/* 5. Priority & Loyalty Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Loyalty Points"
                        type="number"
                        value={data.loyalty_points}
                        onChange={(e) => setData("loyalty_points", e.target.value)}
                        Icon={MdOutlineStars}
                        error={errors.loyalty_points}
                        disabled={processing}
                    />
                    <div className="space-y-1.5">
                        <label className="text-[13px] font-medium text-on-surface-variant ml-1">
                            Credit Priority
                        </label>
                        <div className="relative">
                            <select 
                                value={data.priority || 0}
                                onChange={(e) => setData("priority", e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 bg-surface-container-high rounded-xl border-none outline-none appearance-none focus:ring-2 focus:ring-primary text-sm"
                                disabled={processing}
                            >
                                <option value={0}>Standard (0)</option>
                                <option value={5}>High (5)</option>
                                <option value={10}>VIP (10)</option>
                            </select>
                            <HiOutlineShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* 6. Administrative Notes */}
                <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-on-surface-variant ml-1 flex items-center gap-2">
                        <HiOutlineDocumentText className="w-4 h-4" /> Administrative Notes
                    </label>
                    <textarea
                        value={data.notes || ""}
                        onChange={(e) => setData("notes", e.target.value)}
                        rows={3}
                        className="w-full px-5 py-3.5 rounded-2xl bg-surface-container-high border-none outline-none focus:ring-2 focus:ring-primary text-sm"
                        placeholder="Internal notes about preferences or credit history..."
                        disabled={processing}
                    />
                    {errors.notes && (
                        <span className="text-xs text-error ml-1">{errors.notes}</span>
                    )}
                </div>
            </div>

            {/* Form Footer Actions */}
            <div className="flex gap-4 pt-6 border-t border-outline-variant/10">
                <Button
                    type="button"
                    onClick={onClose}
                    variant="outline"
                    className="flex-1"
                    disabled={processing}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                    loading={processing}
                >
                    {data.id ? "Update Customer" : "Save Customer"}
                </Button>
            </div>
        </form>
    );
};