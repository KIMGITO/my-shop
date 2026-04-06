import React, { useEffect, useState } from "react";
import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import Container from "@/Components/UI/Container";
import Button from "@/Components/UI/Button";
import { HiOutlinePlus } from "react-icons/hi2";
import { Address } from "@/types";
import AddressCard from "../../../Components/Address/AddressCard";
import AddAddressModal from "../../../Components/Address/AddressModal";
import SupportSection from "../../../Components/Address/SupportSection";
import ServiceAreaCard from "../Delivery/ServicesAreaCard";
import { useNavStore } from "@/Stores/useNavStore";
import { settingsNav } from "@/Data/Links/NavLinks";

interface Props {
    addresses: Address[];
    modalIsOpen?: boolean;
}

export default function AddressesPage({
    addresses,
    modalIsOpen = false,
}: Props) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(modalIsOpen);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const setItems = useNavStore((state) => state.setItems);

    useEffect(() => {
        setItems(settingsNav);
    }, [setItems]);

    const handleEdit = (id: string) => {
        const addressToEdit = addresses.find(
            (a) => String(a.id) === String(id)
        );
        if (addressToEdit) {
            setEditingAddress(addressToEdit);
            setIsAddModalOpen(true);
        }
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to remove this address?")) {
            router.delete(route("settings.address.destroy", id), {
                preserveScroll: true,
            });
        }
    };

    const handleSetDefault = (id: string) => {
        router.patch(
            route("settings.address.set-default", id),
            {},
            {
                preserveScroll: true,
            }
        );
    };

    const handleCloseModal = () => {
        setIsAddModalOpen(false);
        setEditingAddress(null);
    };

    const getDeliveryFee = (county: string) => {
        const fees: Record<string, number> = { Nairobi: 150, Kiambu: 200 };
        return fees[county] || 150;
    };

    return (
        <>
            <Head title="Saved Addresses - Kaykay's Dairy" />
            <AuthenticatedLayout>
                <Container>
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-extrabold font-play text-on-surface mb-3">
                                    Delivery Destinations
                                </h2>
                                <p className="text-sm text-on-surface-variant max-w-lg">
                                    Manage your delivery locations. We deliver
                                    fresh milk to your doorstep.
                                </p>
                            </div>
                            <Button
                                onClick={() => {
                                    setEditingAddress(null);
                                    setIsAddModalOpen(true);
                                }}
                                variant="primary"
                            >
                                <HiOutlinePlus size={18} className="mr-2" />
                                Add New Address
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {addresses &&
                            addresses.map((address) => (
                                <AddressCard
                                    key={address.id}
                                    address={address}
                                    onEdit={() => handleEdit(address.id)}
                                    onDelete={() => handleDelete(address.id)}
                                    onSetDefault={() =>
                                        handleSetDefault(address.id)
                                    }
                                    deliveryFee={getDeliveryFee(address.county)}
                                />
                            ))}
                    </div>

                    <div className="mt-10">
                        <ServiceAreaCard />
                    </div>
                    <SupportSection />
                </Container>

                <AddAddressModal
                    isOpen={isAddModalOpen}
                    onClose={handleCloseModal}
                    initialData={editingAddress || undefined}
                />
            </AuthenticatedLayout>
        </>
    );
}
