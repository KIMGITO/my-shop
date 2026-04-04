import React from "react";
import { cn } from "@/Utils/helpers";

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
    roleMatrix,
    roles,
    className,
    maxHeight = "max-h-[600px]", // Default scroll height
}) => {
    return (
        <div
            className={cn(
                "bg-surface-container-lowest/50 rounded-3xl border border-outline-variant/10 shadow-sm overflow-hidden",
                className
            )}
        >
            {/* The wrapper handles both horizontal and vertical scrolling */}
            <div className={cn("overflow-auto scrollbar-hidden", maxHeight)}>
                <table className="w-full text-left border-separate border-spacing-0">
                    <thead className="sticky top-0 z-10">
                        <tr className="bg-on-primary border-b border-outline-variant/10">
                            <th></th>
                            <th className="p-5 text-[10px] font-black uppercase tracking-widest  sticky left-0 bg-on-primary ">
                                Features & Permissions
                            </th>
                            {roles.map((role) => (
                                <th
                                    key={role}
                                    className="p-5 text-center text-[10px] font-black uppercase tracking-widest "
                                >
                                    {role}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {roleMatrix.map((row, idx) => (
                            <tr
                                key={idx}
                                className={cn(
                                    "transition-colors hover:bg-on-primary",
                                    idx % 2 === 0
                                        ? "bg-surface-container-low/30"
                                        : "bg-transparent"
                                )}
                            >
                                <td className="max-w-10 bg-on-primary text-center font-bold">{idx + 1}</td>
                                <td className="p-5 font-bold text-on-surface border-b capitalize border-outline-variant/5 sticky left-0 bg-on-primary">
                                    {row.feature}
                                </td>
                                {roles.map((role) => (
                                    <td
                                        key={role}
                                        className="p-5 text-center border-b border-outline-variant/5"
                                    >
                                        {row[role.toLowerCase()] ? (
                                            <div className="flex justify-center">
                                                <span className="material-symbols-outlined text-[#eeb200] text-xl">
                                                    check_circle
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex justify-center">
                                                <span className="material-symbols-outlined text-on-surface/10 text-xl">
                                                    cancel
                                                </span>
                                            </div>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RolePermissionTable;
