import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { ActivityFeedItem } from "@/Components/Dispatch/ActivityFeedItem";

const mockActivities = [
    {
        id: "1",
        orderNumber: "DK-9281",
        rider: "Marcus R.",
        status: "in_progress" as const,
        progress: 75,
        eta: "08 MIN",
        distance: "2.4 miles away from target",
    },
    {
        id: "2",
        orderNumber: "DK-1102",
        rider: "Samantha J.",
        status: "delayed" as const,
        progress: 45,
        eta: "15 MIN",
        distance: "Stuck in traffic",
    },
];

const mapPins = [
    { id: "1", top: "33%", left: "25%", rider: "Rider #802" },
    { id: "2", top: "75%", left: "66%", rider: "Rider #711" },
];

export default function LiveTrackPage() {
    return (
        <>
            <Head title="Live Track" />
            <AuthenticatedLayout>
                <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] p-4 md:p-6 gap-6">
                    {/* Map Container */}
                    <section className="flex-1 relative rounded-3xl overflow-hidden shadow-2xl bg-surface-container-highest min-h-[400px]">
                        <img
                            className="w-full h-full object-cover grayscale-[0.2] brightness-[0.95] contrast-[1.1]"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3cssqhlPqgE-jF44cUqRjhHBL8Ka6EO2KkudpIxDQ_CAHcd89jDmb78TXoI23rYCOgIF3fPCX9iHG88iRWTff4Me3sGakBtDpPNMvYdWn8maIhVW3MBIIlaeKUbty4ss3CqQI6QEOQxTkkSX25jHWqd3zw8LEX5GQ2YM2HgzOVQ7X616RelC3fzeHet37f2sGJ5FaFfBetkXm-uVn3RK8SN_d46RNLdcfCNmMqhohtA8Ldzvn-Jg2pJ1dkSvj3o3TXcg_a5xHCbhP"
                            alt="Fleet coverage map"
                        />
                        
                        {/* Map Overlays */}
                        <div className="absolute top-6 left-6 flex flex-col gap-3">
                            <div className="bg-surface-container-lowest/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-outline-variant/10">
                                <p className="text-[10px] uppercase tracking-widest font-bold text-primary">Active Fleet</p>
                                <p className="text-3xl font-black font-headline mt-1">24<span className="text-sm font-medium opacity-50 ml-2">riders live</span></p>
                            </div>
                        </div>

                        {/* Map Pins */}
                        {mapPins.map((pin) => (
                            <div key={pin.id} className="absolute group cursor-pointer" style={{ top: pin.top, left: pin.left }}>
                                <div className="relative flex flex-col items-center">
                                    <div className="bg-primary text-white p-2 rounded-full shadow-xl scale-110 group-hover:scale-125 transition-transform duration-300">
                                        <span className="material-symbols-outlined text-sm">motorcycle</span>
                                    </div>
                                    <div className="mt-2 bg-surface-container-lowest py-1 px-3 rounded-full text-[10px] font-bold shadow-lg border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {pin.rider}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Map Controls */}
                        <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                            <button className="bg-surface-container-lowest/90 backdrop-blur-md p-3 rounded-xl shadow-lg hover:bg-white transition-colors">
                                <span className="material-symbols-outlined">add</span>
                            </button>
                            <button className="bg-surface-container-lowest/90 backdrop-blur-md p-3 rounded-xl shadow-lg hover:bg-white transition-colors">
                                <span className="material-symbols-outlined">remove</span>
                            </button>
                            <button className="bg-primary text-white p-3 rounded-xl shadow-lg hover:brightness-110 transition-all">
                                <span className="material-symbols-outlined">my_location</span>
                            </button>
                        </div>
                    </section>

                    {/* Activity Feed Sidebar */}
                    <aside className="w-full lg:w-96 flex flex-col gap-6 overflow-y-auto">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold font-headline tracking-tight">Live Updates</h2>
                            <span className="px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-[10px] font-bold uppercase tracking-widest">Real-time</span>
                        </div>
                        <div className="flex flex-col gap-4">
                            {mockActivities.map((activity) => (
                                <ActivityFeedItem key={activity.id} activity={activity} />
                            ))}
                        </div>
                    </aside>
                </div>
            </AuthenticatedLayout>
        </>
    );
}