import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { SearchBar } from "@/Components/UI/SearchBar";
import { FilterChip } from "@/Components/UI/FilterChip";
import { ActionButton } from "@/Components/UI/ActionButton";
import { HiArrowDown } from "react-icons/hi2";
import { DeliveryHistoryCard } from "@/Components/Dispatch/DeliveryHistoryCard";

const mockDeliveries = [
    {
        id: "1",
        orderNumber: "MB-4920",
        address: "142 Oakwood Ave",
        time: "8:42 AM",
        status: "on_time" as const,
        rider: {
            name: "Marco V.",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCz5RekHdp0u-dG8DO90LT15tr6X38-oBa59McUh-XTweD-W0uRypODrUOjUneRIMyRvPJe9FoKyqDdYsEFMmqg0Kfz-ZVvVMgJY9Aa2m53PqTABgwkmKcWYL10aIC-mLwifv2oqY0Zj2XTirxXqqCBu05fIu63Qyzss6Wwv68fEkG6VXj7-PuRn6WZNbYDD8xn9miI8aoF8jjllDhc7yzL8f_0ApiVHlUY87Rb72F8XpViydV7Isq-MFw4-MsEr2aU2zdas0EoIt80",
        },
        duration: 14,
        rating: 5,
        review: "Fresh as always! Marco was very polite and left the bottles exactly where requested. Thank you!",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPjSnTvHovY8ZxKBIhNAYevDe17r0gVTwyT-wWOIsghJU7rIsfNOs70DFKrpOAqDN8RVoUD4NF4VoJyZ3sdDv8MfRe8r24-cqBJs7agZlwCnPo0XJSl9qkpPH5zcI800e1EbQNz_p9wxBH6PAHBA2MWE34sZjk7pCXu8JofrnuKrLTnUNur2oJYuVA24ggdPQduPeMwDnDW5Hlt5RdxGso1dkNz3b6r_yhxzFBTLaWxJmZOqmB7el9rOFLK-GtONy6dJZyKlmtjR90",
    },
    {
        id: "2",
        orderNumber: "MB-4921",
        address: "89 Pineview Dr",
        time: "8:58 AM",
        status: "early" as const,
        rider: {
            name: "Derrick T.",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxUS9UOJsZUJPDamZ3pqHAuR_Xfcq-wfFTBACwnezUL7eCumEvXqxH45tneLZepIlSzAHXcqIsbZqIThDHHwdNHVQIWh_2VF8fLX62mhY6CcGZG-moP0_bwIeefauTIynaKlHPXty_ePI5GKDa_RnBC10mVe0W4Y03LT0u1kPFzF1gzeQxHLiTCYOo0DJXXf7Bc7fDNL8-fhra87BKkm5s29u6JBZ9LabzyRzJXulEBNsLoXjQl94-wPIMNzm_vI-O39r0TxhQrvUq",
        },
        duration: 22,
        rating: 4,
        review: "Great service, very efficient delivery.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZt9ws-kAvZCv3eYQakcl3m_7lGOrcOAC99lzRhuaM-QVOwNLuV4K1j_QOxbQ3xJGY8aW_oSjWjYMGlGoWPVMCZ34X3hqexj1xVsNaFjqLm81-txCgH5oRrHfhvy7fsKQMQDAaI86FtZr3RtzSd0DPqMxktO7PoHTJTN2K7ZEOkwXg5u9XHWs4a0ZxQq8oS63neSTBIorQmoUFq9jz8jL5NSkitYbCqYi7OJ-olia4WNqs4DwtKgKurU4l5Di6GDyUO1X5mQDTGA53",
    },
];

const filters = ["Last 7 Days", "Last 30 Days", "Last 90 Days"];

export default function DeliveryHistoryPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activePeriod, setActivePeriod] = useState("Last 7 Days");

    const stats = [
        { label: "Completed Today", value: "128" },
        { label: "Avg. Time", value: "18m" },
    ];

    return (
        <>
            <Head title="Delivery History" />
            <AuthenticatedLayout>
                <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-on-surface">
                                Delivery Archive
                            </h1>
                            <p className="text-sm text-on-surface-variant mt-1">
                                Review completed routes, customer satisfaction
                                scores, and logistics efficiency.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <div className="bg-surface-container-highest rounded-xl p-4 flex flex-col min-w-[100px]">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-70">
                                    Completed Today
                                </span>
                                <span className="text-2xl font-black text-primary">
                                    128
                                </span>
                            </div>
                            <div className="bg-surface-container-highest rounded-xl p-4 flex flex-col min-w-[100px]">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-70">
                                    Avg. Time
                                </span>
                                <span className="text-2xl font-black text-secondary">
                                    18m
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="bg-surface-container-low p-2 rounded-2xl flex flex-wrap items-center gap-2">
                        <div className="bg-surface-container-lowest px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium border border-outline-variant/10">
                            <span className="material-symbols-outlined text-lg">
                                calendar_today
                            </span>
                            <span>{activePeriod}</span>
                            <span className="material-symbols-outlined text-lg opacity-40">
                                expand_more
                            </span>
                        </div>
                        <div className="bg-surface-container-lowest px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium border border-outline-variant/10">
                            <span className="material-symbols-outlined text-lg">
                                pedal_bike
                            </span>
                            <span>All Riders</span>
                            <span className="material-symbols-outlined text-lg opacity-40">
                                expand_more
                            </span>
                        </div>
                        <div className="bg-surface-container-lowest px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium border border-outline-variant/10">
                            <span className="material-symbols-outlined text-lg">
                                star
                            </span>
                            <span>Rating: All</span>
                            <span className="material-symbols-outlined text-lg opacity-40">
                                expand_more
                            </span>
                        </div>
                        <div className="flex-grow"></div>
                        <ActionButton
                            icon={HiArrowDown}
                            label="Export CSV"
                            variant="primary"
                            size="sm"
                        />
                    </div>

                    {/* Search */}
                    <div className="w-full md:w-80">
                        <SearchBar
                            placeholder="Search archive..."
                            value={searchQuery}
                            onChange={setSearchQuery}
                        />
                    </div>

                    {/* Delivery Cards Grid */}
                    <div className="grid grid-cols-1 gap-6">
                        {mockDeliveries.map((delivery) => (
                            <DeliveryHistoryCard
                                key={delivery.id}
                                delivery={delivery}
                            />
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="flex justify-center pt-4">
                        <button className="bg-surface-bright/60 backdrop-blur-xl border border-primary-container/20 text-on-surface px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-surface-container-high transition-colors shadow-sm">
                            <span className="material-symbols-outlined">
                                history
                            </span>
                            Load Older Records
                        </button>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
