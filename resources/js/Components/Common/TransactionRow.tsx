import React from "react";
import { CashierTransaction } from "@/types";
import { HiOutlinePrinter, HiOutlineArrowPath } from "react-icons/hi2";

interface TransactionRowProps {
    transaction: CashierTransaction;
    onPrint?: (id: string) => void;
    onRefund?: (id: string) => void;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({
    transaction,
    onPrint,
    onRefund,
}) => {
    const getStatusBadge = () => {
        if (transaction.status === "Success") {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Success
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-error/20 text-error-dim">
                <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                Refunded
            </span>
        );
    };

    return (
        <tr className="group bg-on-primary  pmy-2 p-4 m-6 dark:hover:brightness-150 hover: shadow ">
            <td className=" py-5 px-4 rounded-l-xl border-y border-l border-outline-variant/5">
                <span className="font-mono text-sm font-bold text-on-surface-variant">
                    {transaction.orderNumber}
                </span>
            </td>
            <td className=" py-5 px-4 border-y border-outline-variant/5">
                <span className="text-sm font-medium">{transaction.time}</span>
            </td>
            <td className=" py-5 px-4 border-y border-outline-variant/5 text-sm">
                {transaction.items} {transaction.items === 1 ? "item" : "items"}
            </td>
            <td className=" py-5 px-4 border-y border-outline-variant/5 text-right font-headline font-bold">
                ${transaction.amount.toFixed(2)}
            </td>
            <td className=" py-5 px-4 border-y border-outline-variant/5">
                {getStatusBadge()}
            </td>
            <td className=" py-5 px-4 rounded-r-xl border-y border-r border-outline-variant/5 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onPrint?.(transaction.id)}
                        className="p-2 text-primary hover:bg-primary/20 rounded-lg transition-colors"
                        title="Print Receipt"
                    >
                        <HiOutlinePrinter className="text-xl" />
                    </button>
                    <button
                        onClick={() => onRefund?.(transaction.id)}
                        className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors"
                        title="Process Refund"
                    >
                        <HiOutlineArrowPath className="text-xl" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default TransactionRow;
