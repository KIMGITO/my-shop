import React, { useState } from "react";
import axios from "axios"; // Ensure axios is installed
import { cn } from "@/Utils/helpers";
import { toast } from "sonner";
import { PiUserCircleCheckDuotone, PiUserCircleCheckFill } from "react-icons/pi";
import { TbUserCancel } from "react-icons/tb";
import { Button } from "@/Components/UI/Button";

// ... existing interfaces ...
interface PermissionRow {
    feature: string;

    [key: string]: any;
}

interface RolePermissionTableProps {
    roleMatrix: PermissionRow[];

    roles: string[];

    className?: string;

    maxHeight?: string; // Added prop for custom scroll height
}

export const RolePermissionTable: React.FC<RolePermissionTableProps> = ({
    roleMatrix: initialData,
    roles,
    className,
    maxHeight = "max-h-[600px]",
}) => {
    // Keep local state so the UI updates immediately when you click
    const [matrix, setMatrix] = useState(initialData);
    const [loading, setLoading] = useState<string | null>(null);

    const handleToggle = async (
        roleName: string,
        permissionName: string,
        currentValue: boolean,
    ) => {
        const id = `${roleName}-${permissionName}`;

        // update icon status instantly 
        setMatrix((prev) =>
            prev.map((row) => {
                if (row.feature === permissionName) {
                    return { ...row, [roleName.toLowerCase()]: !currentValue };
                }
                return row;
            }),
        );

        try {
            // Your Laravel endpoint
            await axios.post("/api/v1/permissions/toggle", {
                role: roleName.toLowerCase(),
                permission: permissionName,
                status: !currentValue,
            });
        } catch (error) {
            // revert the local status if failed
            setMatrix((prev) =>
                prev.map((row) => {
                    if (row.feature === permissionName) {
                        return {
                            ...row,
                            [roleName.toLowerCase()]: currentValue,
                        };
                    }
                    return row;
                }),
            );
            toast.error(
                error.response.data.message || "Unable to update status",
            );
        } finally {
            setLoading(null);
        }
    };

    return (
        <div
            className={cn(
                "bg-surface-container-lowest/50 rounded-3xl border border-outline-variant/10 shadow-sm overflow-hidden",
                className,
            )}
        >
            <div className={cn("overflow-auto", maxHeight)}>
                <table className="w-full text-left border-separate border-spacing-0">
                    <thead className="sticky top-0 z-10">
                        <tr className="bg-on-primary">
                            <th className="p-5 sticky left-0 bg-on-primary">
                                Features & Permissions
                            </th>
                            {roles.map((role) => (
                                <th
                                    key={role}
                                    className="p-5 text-center text-[10px] font-black uppercase"
                                >
                                    {role}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {matrix.map((row, idx) => (
                            <tr key={idx} className="hover:bg-on-primary">
                                <td className="p-5 font-bold sticky left-0 bg-on-primary border-b capitalize">
                                    {row.feature}
                                </td>
                                {roles.map((role) => {
                                    const isAssigned = row[role.toLowerCase()];
                                    const isLoading =
                                        loading === `${role}-${row.feature}`;

                                    return (
                                        <td
                                            key={role}
                                            className="p-5 text-center border-b"
                                        >
                                            <Button
                                                variant="ghost"
                                                onClick={() =>
                                                    handleToggle(
                                                        role,
                                                        row.feature,
                                                        !!isAssigned,
                                                    )
                                                }
                                                disabled={isLoading || role.toLowerCase() == 'admin'}
                                                className={cn(
                                                    "transition-transform active:scale-90",
                                                    isLoading
                                                        ? "opacity-50 cursor-not-allowed"
                                                        : "cursor-pointer",
                                                )}
                                            >
                                                {isAssigned ? (
                                                   <PiUserCircleCheckDuotone className="text-2xl text-primary" />
                                                    
                                                ) : (
                                                    
                                                    <TbUserCancel  className="material-symbols-outlined text-on-surface/10 text-2xl" />
                                                )}
                                            </Button>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
