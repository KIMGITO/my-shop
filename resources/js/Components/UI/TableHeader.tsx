import React from "react";

interface Column {
    key: string;
    label: string;
    align?: "left" | "right" | "center";
    width?: string;
}

interface TableHeaderProps {
    columns: Column[];
}

export const TableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
    return (
        <thead>
            <tr className="bg-surface-container-low/50">
                {columns.map((col) => (
                    <th
                        key={col.key}
                        className={cn(
                            "px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest headline-font",
                            col.align === "right" && "text-right",
                            col.align === "center" && "text-center"
                        )}
                        style={{ width: col.width }}
                    >
                        {col.label}
                    </th>
                ))}
            </tr>
        </thead>
    );
};
