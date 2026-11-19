import MeetingCard from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";
import { Pagination } from "@/components/Pagination";


export const dynamic = "force-dynamic";

export default async function MeetingsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {  
  const params = await searchParams;
  const query = params.query ?? "";
  const currentPage = Math.max(1,
    Number.parseInt(params.page ?? "1", 10) || 1,
  );

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Meetings</h1>
      <MeetingSearch />
      
      <div className="grid gap-4 md:grid-cols-2">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}  
      </div>
     
      <Pagination totalPages={totalPages} />  
    </main>
  );
}
