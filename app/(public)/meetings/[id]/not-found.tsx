import Link from "next/link";

export default function MeetingNotFound() {
    return (
        <main className="mx-auto max-w-xl px-4 py-16 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">
                Meeting Not Found
            </h2>
            <p className="mt-2 text-sm text-gray-600">
                We couldn&apos; find the sacrament meeting you&apos;re looking for. It may have been removed or the link is invalid.
            </p>
            <div className="mt-6">
                <Link
                    href="/meetings"
                    className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    Return to Meetings
                </Link>
            </div>
        </main>
    );  
}