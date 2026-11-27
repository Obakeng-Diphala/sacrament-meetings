"use client"

import { useEffect } from "react";
import Link from "next/link";

export default function MeetingsError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="mx-auto max-w-xl px-4 py-16 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">
                Something went wrong loading meetings
            </h2>
            <p className="mt-2 text-sm text-gray-600">
                {error.message || "An unexpected error occurred. Please try again."}
            </p>
            <div className="mt-6 flex justify-center gap-4">
         <button
                type="button"
                onClick={() => reset()}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
                Try again
            </button>
            <Link
                href="/meetings"
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
                Back to Meetings
            </Link>
        </div> 
  </main>    
);
}