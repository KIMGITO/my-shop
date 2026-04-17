import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import Button from "@/Components/UI/Button";
import { RiCloseLargeLine } from "react-icons/ri";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { StockIntakeFormWidget } from "@/Widgets/StockIntakeFormWidget";
import axios from "axios";

interface StockIntakeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const StockIntakeModal: React.FC<StockIntakeModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [prodRes, suppRes] = await Promise.all([
                    axios.get("/api/v1/products/search"),
                    axios.get("/api/v1/suppliers/search"),
                ]);
                setProducts(prodRes.data);
                setSuppliers(suppRes.data);
            } catch (error) {
                console.error("Failed to load intake data", error);
            }
        };

        if (isOpen) fetchInitialData();
    }, [isOpen]);
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            product_id: "",
            supplier_id: "",
            quantity: "" as string | number,
            unit_price: "" as string | number,
            batch_number: "",
            expiry_date: "",
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("admin.inventory.store"), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-surface-container-lowest rounded-[2.5rem] max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col shadow-2xl border border-outline-variant/10">
                {/* Header */}
                <div className="px-8 py-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low/30">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-2xl text-primary shadow-inner">
                            <HiOutlineShoppingCart className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-on-surface tracking-tight">
                                New Stock Intake
                            </h3>
                            <p className="text-xs text-on-surface-variant font-medium">
                                Record incoming inventory batches to the system.
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="p-3 rounded-full hover:bg-error/10 hover:text-error transition-colors"
                    >
                        <RiCloseLargeLine className="w-6 h-6" />
                    </Button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto flex-1 px-8 py-8">
                    <StockIntakeFormWidget
                        data={data}
                        products={products}
                        suppliers={suppliers}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSave={handleSubmit}
                        onClose={onClose}
                    />
                </div>
            </div>
        </div>
    );
};
