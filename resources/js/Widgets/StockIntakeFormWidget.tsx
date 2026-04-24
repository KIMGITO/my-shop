import React from "react";
import Button from "@/Components/UI/Button";
import { Input } from "@/Components/UI/Input";
import {
    HiOutlineShoppingCart,
    HiOutlineCube,
    HiOutlineCalendarDays,
    HiOutlineCurrencyDollar,
    HiOutlineHashtag,
    HiOutlineCheck,
} from "react-icons/hi2";
import { MdOutlinePrecisionManufacturing } from "react-icons/md";
import { Select } from "@/Components/UI/Select";
import LazyImage from "@/Components/UI/LazyImage";

interface StockIntakeFormWidgetProps {
    data: any;
    products: any[];
    suppliers: any[];
    setData: (key: string, value: any) => void;
    errors: any;
    processing: boolean;
    onSave: (e: React.FormEvent) => void;
    onClose: () => void;
}

export const StockIntakeFormWidget: React.FC<StockIntakeFormWidgetProps> = ({
    data,
    products,
    suppliers,
    setData,
    errors,
    processing,
    onSave,
    onClose,
}) => {
    const totalValue = (data.intakeQuantity || 0) * (data.currentPrice || 0);

    return (
        <form id="intake-form" onSubmit={onSave} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form Main Section */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Select
                            label="Select Product"
                            value={data.productId}
                            options={products.map((p) => ({
                                id: p.id,
                                value: p.id,
                                label: p.name,
                                icon: (
                                    <HiOutlineCube className="text-primary/60" />
                                ),
                            }))}
                            onChange={(val) => setData("productId", val)}
                            Icon={HiOutlineCube}
                            error={errors.productId}
                            placeholder="Search for a product..."
                            size="sm"
                        />

                        <Select
                            label="Supplier"
                            value={data.supplierId}
                            options={suppliers.map((s) => ({
                                id: s.id,
                                value: s.id,
                                label: s.name,
                                icon: (
                                    <LazyImage
                                        customSize={24}
                                        shape="none"
                                        src={s.image}
                                    />
                                ),
                            }))}
                            onChange={(val) => setData("supplierId", val)}
                            Icon={MdOutlinePrecisionManufacturing}
                            error={errors.supplierId}
                            placeholder="Search suppliers..."
                            size="sm"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Quantity"
                            type="number"
                            value={data.intakeQuantity}
                            onChange={(e) =>
                                setData("intakeQuantity", e.target.value)
                            }
                            Icon={HiOutlineShoppingCart}
                            error={errors.intakeQuantity}
                            placeholder="0"
                        />
                        <Input
                            label="Unit Price ($)"
                            type="number"
                            value={data.currentPrice}
                            onChange={(e) =>
                                setData("currentPrice", e.target.value)
                            }
                            Icon={HiOutlineCurrencyDollar}
                            error={errors.currentPrice}
                            placeholder="0.00"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-outline-variant/10">
                        <Input
                            label="Batch Number(set by system)"
                            disabled
                            value={data.batchNumber}
                            error={errors.batchNumber}
                            placeholder=""
                            className="uppercase"
                        />
                        <Input
                            disabled={true}
                            label="Expiry Date (set by product)"
                            type="date"
                            value={data.expiryDate}
                            onChange={(e) =>
                                setData("expiryDate", e.target.value)
                            }
                            Icon={HiOutlineCalendarDays}
                            error={errors.expiryDate}
                        />
                    </div>
                </div>

                {/* Sidebar Preview Area */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="bg-surface-container-high/40 p-6 rounded-3xl border border-outline-variant/10 shadow-sm h-full">
                        <h4 className="font-bold text-primary mb-6 text-xs uppercase tracking-widest">
                            Intake Summary
                        </h4>
                        <div className="space-y-5">
                            <div className="flex justify-between items-end border-b border-outline-variant/10 pb-2">
                                <span className="text-[10px] text-on-surface-variant uppercase font-bold">
                                    Volume
                                </span>
                                <span className="font-bold text-on-surface">
                                    {data.intakeQuantity || 0} Units
                                </span>
                            </div>
                            <div className="flex justify-between items-end border-b border-outline-variant/10 pb-2">
                                <span className="text-[10px] text-on-surface-variant uppercase font-bold">
                                    Total Value
                                </span>
                                <span className="font-bold text-xl text-primary">
                                    Ksh {' '}
                                    {totalValue.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                    })}
                                </span>
                            </div>
                        </div>
                        <div className="mt-8 p-4 bg-primary/5 rounded-2xl text-[11px] text-on-surface-variant italic leading-relaxed border border-primary/10">
                            Note: Submitting this will create a new ledger
                            entry and batch number will be generated automatically.
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-outline-variant/10">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={processing}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    onClick={onSave}
                    loading={processing}
                    className="px-8"
                >
                    Confirm Intake
                </Button>
            </div>
        </form>
    );
};
