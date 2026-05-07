import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import Button from "../UI/Button";
import { MdMoreVert, MdEdit, MdDelete, MdInfo, MdOutlineAdminPanelSettings } from "react-icons/md";

export interface StaffCardProps {
    editMode: (staff: any) => void;
    onDelete?: (id: string) => void;
    onInfo?: (staff: any) => void;
    staff: {
        id: string;
        name: string;
        role: string;
        avatar: string;
        roleType: "admin" | "cashier" | "rider" | "manager";
        permissions: string[];
        twoFactor: boolean;
    };
    onManagePermissions?: (id: string) => void;
}

export const StaffCard: React.FC<StaffCardProps> = ({
    staff,
    onManagePermissions,
    editMode,
    onDelete,
    onInfo,
}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const roleColors = {
        admin: "bg-red-500",
        manager: "bg-primary-dark",
        cashier: "bg-success",
        rider: "bg-blue-500",
    };

    const roleDisplayNames = {
        admin: "Admin",
        manager: "Manager",
        cashier: "Cashier",
        rider: "Rider",
    };

    return (
        <div className="bg-surface-container-lowest p-4 rounded-3xl shadow-2xl hover:shadow-xl transition-all border border-transparent hover:border-outline-variant/20 group relative">
            <div className="flex justify-between items-start mb-6">
                <div className="relative">
                    <img
                        alt={staff.name}
                        className="w-20 h-20 rounded-2xl object-cover"
                        src={
                            staff.avatar ||
                            "https://lh3.googleusercontent.com/aida-public/AB6AXuBJCw-Jlv2pd7Qujg4YHWZWISpFFk0Cd9a83AfoSaPycKoYHZL2r29oS3gRHuGoBoogGGdGUb7jNe3My91VffjHGI5ywEaWEcZ9FRe_nUYV53z41Bv8n5x0UXigBClXSGDaD8gm19DX7Q2GhCbBlIB0TKSGHES0epWnG3NjB0wHvVaF9I6to98wfEOtNlogz0vpsbDX4xf-DTXtY6ha9_BFmhJ314ndzo368qYaEA10ThbxQJE5WpHhESkXna5T-eIDsogBPov-VwgV"
                        }
                    />
                    <span
                        className={cn(
                            "absolute -bottom-2 -right-2 px-2 py-1 rounded-md text-[10px] text-white font-bold uppercase tracking-tighter",
                            roleColors[staff.roleType]
                        )}
                    >
                        {roleDisplayNames[staff.roleType]}
                    </span>
                </div>
                
                {/* More Vert Button and Menu */}
                <div className="relative" ref={menuRef}>
                    <Button 
                        onClick={() => setMenuOpen(!menuOpen)} 
                        variant="ghost" 
                        className="p-0 opacity-0 group-hover:opacity-100"
                    >
                        <MdMoreVert className="text-2xl"/>
                    </Button>

                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-surface-container-high border border-outline-variant/20 rounded-2xl shadow-2xl z-50 py-2">
                            <button
                                onClick={() => { editMode(staff); setMenuOpen(false); }}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-surface-container-highest transition-colors"
                            >
                                <MdEdit className="text-primary" /> Edit
                            </button>
                            <button
                                onClick={() => { onInfo?.(staff); setMenuOpen(false); }}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-surface-container-highest transition-colors"
                            >
                                <MdInfo className="text-info" /> Info
                            </button>
                            <hr className="my-1 border-outline-variant/10" />
                            <button
                                onClick={() => { onDelete?.(staff.id); setMenuOpen(false); }}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors"
                            >
                                <MdDelete /> Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="space-y-1 mb-4">
                <h4 className="text-xl font-bold font-headline">
                    {staff.name}
                </h4>
                <p className="text-on-surface-variant text-sm">{staff.role}</p>
            </div>
           
            <div className=" flex justify-end">
                <Button
                    variant="ghost"
                    className="p-0"
                    onClick={() => onManagePermissions?.(staff.id)}
                >
                    <MdOutlineAdminPanelSettings className="text-2xl "/>
                </Button>
            </div>
        </div>
    );
};

export default StaffCard;