// resources/js/Pages/Settings/Addresses.tsx
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

// Mock Data
const mockAddresses: Address[] = [
    {
        id: "1",
        name: "Home",
        type: "home",
        county: "Nairobi",
        estate: "Kilimani Estate",
        street: "Argwings Kodhek Road",
        houseNumber: "The Mirage Apartments, 3B",
        landmark: "Opposite Yaya Centre",
        phone: "0712 345 678",
        instructions: "Gate code: 1234, call on arrival",
        isDefault: true,
    },
    {
        id: "2",
        name: "Office",
        type: "office",
        county: "Nairobi",
        estate: "Westlands Business Park",
        street: "Waiyaki Way",
        houseNumber: "Delta Corner, 3rd Floor",
        landmark: "Next to Sarit Centre",
        phone: "0723 456 789",
        instructions: "Deliver to reception, open 8am-5pm",
        isDefault: false,
    },
    {
        id: "3",
        name: "Ruiru Home",
        type: "cottage",
        county: "Kiambu",
        estate: "Tatu City Phase 2",
        street: "Mwiki Road",
        houseNumber: "Plot 1246, Tulip Court",
        landmark: "Near Ruiru Farmers Market",
        phone: "0734 567 890",
        instructions: "Leave at the gate, guard will receive",
        isDefault: false,
    },
];

export default function AddressesPage() {
    const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);

    const setItems = useNavStore((state) => state.setItems);

    useEffect(() => {
        setItems(settingsNav);

        return () => {
            // Logic to set back to original items if needed
        };
    }, []);

    const handleEdit = (id: string) => {
        const addressToEdit = addresses.find((a) => a.id === id);
        if (addressToEdit) {
            setEditingAddress(addressToEdit);
            setIsAddModalOpen(true);
        }
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to remove this address?")) {
            setAddresses(addresses.filter((a) => a.id !== id));
        }
    };

    const handleSetDefault = (id: string) => {
        setAddresses(
            addresses.map((a) => ({
                ...a,
                isDefault: a.id === id,
            }))
        );
    };

    const handleAddAddress = (newAddress: Partial<Address>) => {
        const newId = (addresses.length + 1).toString();
        setAddresses([
            ...addresses,
            {
                id: newId,
                name: newAddress.name || "New Address",
                type: newAddress.type || "home",
                county: newAddress.county || "Nairobi",
                estate: newAddress.estate || "",
                street: newAddress.street || "",
                houseNumber: newAddress.houseNumber || "",
                landmark: newAddress.landmark,
                phone: newAddress.phone || "",
                instructions: newAddress.instructions,
                isDefault: false,
            },
        ]);
    };

    const handleUpdateAddress = (updatedAddress: Partial<Address>) => {
        if (editingAddress) {
            setAddresses(
                addresses.map((a) =>
                    a.id === editingAddress.id
                        ? ({ ...a, ...updatedAddress } as Address)
                        : a
                )
            );
        }
    };

    const handleCloseModal = () => {
        setIsAddModalOpen(false);
        setEditingAddress(null);
    };

    // Mock delivery fee - you'll replace with your own logic later
    const getDeliveryFee = (county: string) => {
        const fees: Record<string, number> = {
            Nairobi: 100,
            Kiambu: 120,
            Machakos: 150,
            Kajiado: 180,
            Mombasa: 300,
            Kisumu: 350,
            Nakuru: 200,
            Thika: 110,
            Ruaka: 90,
            Limuru: 130,
            Ngong: 140,
            Ruiru: 95,
        };
        return fees[county] || 150;
    };

    return (
        <>
            <Head title="Saved Addresses - Kaykay's Dairy" />
            <AuthenticatedLayout>
                <Container>
                    {/* Header Section */}
                    <div className="mb-8 md:mb-12">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold font-play tracking-tighter text-on-surface mb-3">
                                    Delivery Destinations
                                </h2>
                                <p className="text-sm md:text-base font-play text-on-surface-variant max-w-lg">
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
                                className="flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                <HiOutlinePlus size={18} />
                                Add New Address
                            </Button>
                        </div>
                    </div>

                    {/* Address Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        {addresses.map((address) => (
                            <AddressCard
                                key={address.id}
                                address={address}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onSetDefault={handleSetDefault}
                                deliveryFee={getDeliveryFee(address.county)}
                            />
                        ))}
                    </div>

                    {/* Service Area Card */}
                    <div className="mt-8 md:mt-10">
                        <ServiceAreaCard />
                    </div>

                    {/* Support Section */}
                    <SupportSection />
                </Container>

                {/* Add/Edit Address Modal */}
                <AddAddressModal
                    isOpen={isAddModalOpen}
                    onClose={handleCloseModal}
                    onSave={
                        editingAddress ? handleUpdateAddress : handleAddAddress
                    }
                    deliveryFee={
                        editingAddress
                            ? getDeliveryFee(editingAddress.county)
                            : 100
                    }
                    initialData={editingAddress || undefined}
                />
            </AuthenticatedLayout>
        </>
    );
}
