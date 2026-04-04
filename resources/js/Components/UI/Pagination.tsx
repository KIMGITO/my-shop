// resources/js/Components/UI/Pagination.tsx
import React from "react";
import { cn } from "@/Utils/helpers";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
}) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push(-1);
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push(-1);
                for (let i = totalPages - 3; i <= totalPages; i++)
                    pages.push(i);
            } else {
                pages.push(1);
                pages.push(-1);
                for (let i = currentPage - 1; i <= currentPage + 1; i++)
                    pages.push(i);
                pages.push(-1);
                pages.push(totalPages);
            }
        }
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between">
            <p className="text-sm text-on-surface-variant font-medium">
                Showing{" "}
                <span className="text-on-surface font-bold">
                    {startItem} - {endItem}
                </span>{" "}
                of {totalItems} activities
            </p>
            <div className="flex gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={cn(
                        "w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container text-on-surface-variant transition-colors",
                        currentPage === 1 && "opacity-30 cursor-not-allowed",
                        currentPage !== 1 && "hover:bg-surface-variant"
                    )}
                >
                    <HiOutlineChevronLeft className="text-lg" />
                </button>
                {getPageNumbers().map((page, index) =>
                    page === -1 ? (
                        <span
                            key={`ellipsis-${index}`}
                            className="w-10 h-10 flex items-center justify-center text-on-surface-variant"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={cn(
                                "w-10 h-10 flex items-center justify-center rounded-xl transition-colors",
                                currentPage === page
                                    ? "bg-primary text-white font-bold"
                                    : "bg-surface-container text-on-surface-variant hover:bg-surface-variant"
                            )}
                        >
                            {page}
                        </button>
                    )
                )}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={cn(
                        "w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container text-on-surface-variant transition-colors",
                        currentPage === totalPages &&
                            "opacity-30 cursor-not-allowed",
                        currentPage !== totalPages && "hover:bg-surface-variant"
                    )}
                >
                    <HiOutlineChevronRight className="text-lg" />
                </button>
            </div>
        </div>
    );
};
