
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import Badge from "@/Components/UI/Badge";
import Button from "@/Components/UI/Button";
import { Input } from "@/Components/UI/Input";
import { settingsNav } from "@/Data/Links/NavLinks";
import { useNavStore } from "@/Stores/useNavStore";
import { Head } from "@inertiajs/react";
import React, { useEffect } from "react";
import { FaHeartBroken } from "react-icons/fa";
import {
    HiOutlineShieldCheck,
    HiOutlineUserCircle,
    HiOutlineArrowLeft,
} from "react-icons/hi2";
import { MdOutlineSecurity } from "react-icons/md";
import { RiPhoneLockLine } from "react-icons/ri";

export default function Settings() {
    const setItems = useNavStore((state) => state.setItems);

    useEffect(() => {
        setItems(settingsNav);

        return () => {
            // Logic to set back to original items if needed
        };
    }, []);

    return (
        <AuthenticatedLayout
            header={<h1 className="text-3xl font-black">Settings</h1>}
        >
            <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm">
                {/* Your content here */}
                <Head title="Settings - Kaykay's Dairy" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Forms */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Change Password Section */}
                        <section className="bg-transparent rounded-xl  shadow-none">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="material-symbols-outlined text-primary">
                                    lock
                                </span>
                                <h2 className="font-headline text-xl font-bold text-on-surface">
                                    Change Password
                                </h2>
                            </div>
                            <form className="space-y-6">
                                <Input
                                    label="Current Password"
                                    type="password"
                                    placeholder="••••••••"
                                    height="md" // Using your new height!
                                />
                                <Input
                                    label="New Password"
                                    type="password"
                                    placeholder="••••••••"
                                    height="md"
                                />
                                <Input
                                    label="Confirm New Password"
                                    type="password"
                                    placeholder="••••••••"
                                    height="md"
                                />
                                <Button
                                    variant="primary"
                                    className="w-full md:w-auto"
                                >
                                    Update Password
                                </Button>
                            </form>
                        </section>
                    </div>

                    {/* Right Column: Status/Danger */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Security Score */}
                        {/* <div className="bg-surface-container-high rounded-xl p-8 relative overflow-hidden">
                            <h3 className="font-headline text-lg font-bold mb-4">
                                Security Score
                            </h3>
                            <div className="flex items-end gap-2 mb-6">
                                <span className="text-5xl font-black text-primary">
                                    85
                                </span>
                                <span className="text-on-surface-variant font-bold mb-2">
                                    / 100
                                </span>
                            </div>
                            <div className="w-full bg-surface-container-lowest h-2 rounded-full">
                                <div className="bg-primary h-2 rounded-full w-[85%]"></div>
                            </div>
                        </div> */}
                        {/* Two-Factor Authentication */}
                        <section className="bg-surface-container-lowest rounded-xl p-1 shadow-sm ">
                            <div className="flex flex-col  justify-between p-4 bg-surface-container-low rounded-xl">
                                <div className="flex items-center w-full justify-between gap-2 p-2">
                                    <div className="flex items-center gap-4 font-semibold text-2xl ">
                                        <MdOutlineSecurity className="text-2xl" />
                                        Security Settings
                                    </div>
                                    <Badge
                                        variant="secondary"
                                        className="bg-primary/40"
                                    >
                                        Recommended
                                    </Badge>
                                </div>

                                <div className="flex gap-4 items-center bg-primary/20 rounded p-4 justify-around">
                                    <div className="bg-surface-container-high p-2 rounded-lg">
                                        <RiPhoneLockLine className="text-2xl" />
                                    </div>
                                    <div>
                                        <h3 className=" text-on-surface">
                                            Two-Factor Authentication
                                        </h3>
                                        <p className="text-xs text-on-surface-variant mt-1">
                                            Add an extra layer of security via
                                            SMS.
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer bg-surface rounded-full">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                        />
                                        <div className="w-12 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                    </label>
                                </div>
                            </div>
                        </section>

                        {/* Danger Zone */}
                        <section className="bg-surface-container-lowest rounded-xl p-8 border border-error/10">
                            <h2 className="font-headline text-xl font-bold text-error mb-4 flex items-center gap-4">
                                <FaHeartBroken /> Danger Zone
                            </h2>
                            <p className="text-sm text-on-surface-variant mb-6">
                                Once you delete your account, there is no going
                                back. Please be certain.
                            </p>
                            <Button
                                variant="danger"
                                className="rounded  p-2 hover:brightness-110"
                            >
                                Delete Account
                            </Button>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}