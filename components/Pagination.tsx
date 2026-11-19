"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type PaginationProps = {
    totalPages: number;
};

export function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

if (totalPages <= 1) {
    return null;
}
  
const requestedPage =
  Number.parseInt(searchParams.get("page") ?? "1", 10) || 1;
const currentPage = Math.min(totalPages, Math.max(1, requestedPage));

function createPageURL(page: number) {
  const params = new URLSearchParams(searchParams.toString());  
  params.set("page", String(page)); 
    return `${pathname}?${params.toString()}`;  
}

return (
    <nav
        className="mt-6 flex items-center justify-center gap-4"
        aria-label="Pagination"
    >
        {currentPage > 1 && (
            <Link
                href={createPageURL(currentPage - 1)}
                className="text-blue-700 hover:underline"
            >
                Previous
            </Link>
        )}
 
        <span className="text-sm text-slate-600">
            Page {currentPage} of {totalPages}
        </span>
    
        {currentPage < totalPages && (
            <Link
                href={createPageURL(currentPage + 1)}
                className="text-blue-700 hover:underline"
            >
                Next
            </Link>
        )}
    </nav>
 );
}