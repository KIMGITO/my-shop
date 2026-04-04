import React from "react";
import { cn } from "@/lib/utils";
import Button from "../UI/Button";

interface StaffCardProps {
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
}) => {
    const roleColors = {
        admin: "bg-warning",
        manager: "bg-primary-dark",
        cashier: "bg-success",
        rider: "bg-secondary",
    };

    const roleBadgeColors = {
        admin: "bg-warning/30 text-primary",
        manager: "bg-primary/30 text-primary",
        cashier: "bg-success/10 text-success",
        rider: "bg-secondary/30 text-white",
    };

    const roleDisplayNames = {
        admin: "Admin",
        manager: "Manager",
        cashier: "Cashier",
        rider: "Rider",
    };

    return (
        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-2xl hover:shadow-xl transition-all border border-transparent hover:border-outline-variant/20 group">
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
                <button className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined">more_vert</span>
                </button>
            </div>
            <div className="space-y-1 mb-4">
                <h4 className="text-xl font-bold font-headline">
                    {staff.name}
                </h4>
                <p className="text-on-surface-variant text-sm">{staff.role}</p>
            </div>
            {/* <div className="flex flex-wrap gap-2 text-xs font-semibold mb-6">
                {staff.permissions.map((perm, idx) => (
                    <span
                        key={idx}
                        className={cn(
                            "px-2 py-1 rounded",
                            roleBadgeColors[staff.roleType]
                        )}
                    >
                        {perm}
                    </span>
                ))}
                {staff.twoFactor && (
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                        2FA Active
                    </span>
                )}
            </div> */}
            <Button
                variant="ghost"
                className="p-1 border "
                onClick={() => onManagePermissions?.(staff.id)}
            >
                Manage Permissions
            </Button>
        </div>
    );
};

export default StaffCard;
