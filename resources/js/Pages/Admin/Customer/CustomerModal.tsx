import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { HiPlus } from "react-icons/hi2";
import { Customer } from "./Index";
import { CustomerFormWidget } from "@/Widgets/CustomerFormWidget";

interface CustomerModalProps {
    isOpen: boolean;
    onClose: () => void;
    customer: Customer | null;
}

export const CustomerModal = ({ isOpen, onClose, customer }: CustomerModalProps) => {
    // 1. Initialize useForm with the schema fields
    const { data, setData, post, patch, processing, errors, reset, clearErrors } = useForm({
        id: customer?.id || null,
        name: customer?.name || "",
        phone: customer?.phone || "",
        email: customer?.email || "",
        customer_group: customer?.customer_group || "",
        customer_type: customer?.customer_type || "retail",
        loyalty_points: customer?.loyalty_points || 0,
        priority: customer?.priority || 0,
        notes: customer?.notes || "",
        avatar: null as File | null,
        removeExistingAvatar: false,
    });

    // 2. Update form when the "customer" prop changes (e.g., clicking different edit buttons)
    useEffect(() => {
        if (customer) {
            setData({
                id: customer.id,
                name: customer.name || "",
                phone: customer.phone || "",
                email: customer.email || "",
                customer_group: customer.customer_group || "",
                customer_type: customer.customer_type || "retail",
                loyalty_points: customer.loyalty_points || 0,
                priority: customer.priority || 0,
                notes: customer.notes || "",
                avatar: null,
                removeExistingAvatar: false,
            });
        } else {
            reset();
        }
        clearErrors();
    }, [customer, isOpen]);

    // 3. Handle Submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (customer) {
            // Inertia doesn't natively support files in PATCH/PUT, 
            // so we use POST with a _method spoof if there's an image
            patch(route("customers.update", customer.id), {
                onSuccess: () => {
                    onClose();
                    reset();
                },
            });
        } else {
            post(route("customers.store"), {
                onSuccess: () => {
                    onClose();
                    reset();
                },
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-surface-container-lowest rounded-[2.5rem] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-outline-variant/20">
                <div className="p-8">
                    {/* Modal Header */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight">
                                {customer ? "Modify Registry" : "Register Account"}
                            </h2>
                            <p className="text-on-surface-variant text-sm mt-1">
                                Manage core customer profile and accounting settings.
                            </p>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="p-2 bg-surface-container-high rounded-full hover:rotate-90 transition-transform"
                        >
                             <HiPlus className="w-6 h-6 rotate-45" />
                        </button>
                    </div>

                    {/* 4. The Form Widget Component */}
                    <CustomerFormWidget
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSave={handleSubmit}
                        onClose={onClose}
                        existingImageUrl={customer?.metadata?.avatar_url || null} // Adjust based on where you store URLs
                    />
                </div>
            </div>
        </div>
    );
};