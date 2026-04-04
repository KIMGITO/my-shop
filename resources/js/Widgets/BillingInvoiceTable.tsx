import React from "react";
import { Invoice } from "@/types/billing";
import { cn } from "@/Utils/helpers";
import Button from "@/Components/UI/Button";

interface InvoiceTableProps {
    invoices: Invoice[];
    onDownload: (invoiceId: string) => void;
}

export const InvoiceTable: React.FC<InvoiceTableProps> = ({
    invoices,
    onDownload,
}) => {
    const getStatusBadge = (status: Invoice["status"]) => {
        const configs = {
            paid: {
                color: "bg-primary",
                text: "Paid",
                bgClass: "bg-surface-container-high",
            },
            refunded: {
                color: "bg-error",
                text: "Refunded",
                bgClass: "bg-error-container/10",
                textClass: "text-error",
            },
            pending: {
                color: "bg-yellow-500",
                text: "Pending",
                bgClass: "bg-yellow-500/10",
                textClass: "text-yellow-700",
            },
            overdue: {
                color: "bg-error",
                text: "Overdue",
                bgClass: "bg-error-container/10",
                textClass: "text-error",
            },
        };
        const config = configs[status];
        return (
            <span
                className={cn(
                    "inline-flex items-center gap-1.5 px-2 md:px-3 py-1 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-wide",
                    config.bgClass,
                    config.textClass || "text-primary"
                )}
            >
                <span
                    className={cn(
                        "w-1 h-1 md:w-1.5 md:h-1.5 rounded-full",
                        config.color
                    )}
                ></span>
                {config.text}
            </span>
        );
    };

    return (
        <div className="bg-surface-container-lowest rounded-2xl md:rounded-[2rem] shadow-sm overflow-hidden border border-primary/5">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                        <tr className="bg-surface-container-low/50">
                            <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-extrabold text-on-surface-variant/70">
                                Invoice Date
                            </th>
                            <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-extrabold text-on-surface-variant/70">
                                Order ID
                            </th>
                            <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-extrabold text-on-surface-variant/70">
                                Status
                            </th>
                            <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-extrabold text-on-surface-variant/70 text-right">
                                Amount
                            </th>
                            <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-extrabold text-on-surface-variant/70 text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container">
                        {invoices.map((invoice) => (
                            <tr
                                key={invoice.id}
                                className="group hover:bg-surface-container-low/30 transition-colors"
                            >
                                <td className="px-4 md:px-8 py-4 md:py-6">
                                    <p className="font-bold text-on-surface text-sm md:text-base">
                                        {invoice.date}
                                    </p>
                                    <p className="text-[10px] md:text-xs text-on-surface-variant">
                                        Processed at {invoice.time}
                                    </p>
                                </td>
                                <td className="px-4 md:px-8 py-4 md:py-6">
                                    <span className="font-mono text-[10px] md:text-xs bg-surface-container px-2 py-1 rounded text-on-surface-variant">
                                        {invoice.orderNumber}
                                    </span>
                                </td>
                                <td className="px-4 md:px-8 py-4 md:py-6">
                                    {getStatusBadge(invoice.status)}
                                </td>
                                <td className="px-4 md:px-8 py-4 md:py-6 text-right tabular-nums font-extrabold text-on-surface text-sm md:text-base">
                                    {invoice.status === "refunded" ? "-" : ""}$
                                    {Math.abs(invoice.amount).toFixed(2)}
                                </td>
                                <td className="px-4 md:px-8 py-4 md:py-6 text-right">
                                    <Button
                                        onClick={() => onDownload(invoice.id)}
                                        variant="secondary"
                                        size="sm"
                                        className="inline-flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs"
                                    >
                                        <span className="material-symbols-outlined text-sm">
                                            download
                                        </span>
                                        Download PDF
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Table Footer */}
            <div className="px-4 md:px-8 py-4 md:py-6 bg-surface-container-low/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-[10px] md:text-xs text-on-surface-variant font-medium">
                    Showing {invoices.length} of {invoices.length} invoices
                </p>
                <div className="flex gap-2">
                    <button className="px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs font-bold text-on-surface hover:text-primary transition-colors">
                        Previous
                    </button>
                    <button className="px-3 md:px-4 py-1.5 md:py-2 bg-surface-container-highest rounded-lg text-[10px] md:text-xs font-bold text-on-surface hover:bg-primary-container transition-colors">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvoiceTable;
