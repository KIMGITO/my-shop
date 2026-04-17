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
    console.log(suppliers);
    const totalValue = (data.quantity || 0) * (data.unit_price || 0);

    return (
        <form id="intake-form" onSubmit={onSave} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form Main Section */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Select
                            label="Select Product"
                            value={data.product_id}
                            options={products.map((p) => ({
                                id: p.id,
                                value: p.id,
                                label: p.name,
                                icon: (
                                    <HiOutlineCube className="text-primary/60" />
                                ),
                            }))}
                            onChange={(val) => setData("product_id", val)}
                            Icon={HiOutlineCube}
                            error={errors.product_id}
                            placeholder="Search for a product..."
                            size="sm"
                        />

                        <Select
                            label="Supplier"
                            value={data.supplier_id}
                            options={suppliers.map((s) => ({
                                id: s.id,
                                value: s.id,
                                label: s.name,
                                icon: (
                                    <LazyImage
                                        customSize={24}
                                        shape="rectangle"
                                        src={s.image}
                                    />
                                ),
                            }))}
                            onChange={(val) => setData("supplier_id", val)}
                            Icon={MdOutlinePrecisionManufacturing}
                            error={errors.supplier_id}
                            placeholder="Search suppliers..."
                            size="sm"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Quantity"
                            type="number"
                            value={data.quantity}
                            onChange={(e) =>
                                setData("quantity", e.target.value)
                            }
                            Icon={HiOutlineShoppingCart}
                            error={errors.quantity}
                            placeholder="0"
                        />
                        <Input
                            label="Unit Price ($)"
                            type="number"
                            value={data.unit_price}
                            onChange={(e) =>
                                setData("unit_price", e.target.value)
                            }
                            Icon={HiOutlineCurrencyDollar}
                            error={errors.unit_price}
                            placeholder="0.00"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-outline-variant/10">
                        <Input
                            label="Batch Number"
                            disabled
                            value={data.batch_number}
                            onChange={(e) =>
                                setData("batch_number", e.target.value)
                            }
                            error={errors.batch_number}
                            placeholder=""
                            className="uppercase"
                        />
                        <Input
                            label="Expiry Date"
                            type="date"
                            value={data.expiry_date}
                            onChange={(e) =>
                                setData("expiry_date", e.target.value)
                            }
                            Icon={HiOutlineCalendarDays}
                            error={errors.expiry_date}
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
                                    {data.quantity || 0} Units
                                </span>
                            </div>
                            <div className="flex justify-between items-end border-b border-outline-variant/10 pb-2">
                                <span className="text-[10px] text-on-surface-variant uppercase font-bold">
                                    Total Value
                                </span>
                                <span className="font-bold text-xl text-primary">
                                    $
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
                    loading={processing}
                    className="px-8"
                >
                    Confirm Intake
                </Button>
            </div>
        </form>
    );
};
