import MeetingCard from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { getMeetings } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

export default async function MeetingsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {  
  const params = await searchParams;
  const query = params.query ?? "";
  const page = Math.max(1, Number(params.page) || 1);
  const meetings = await getMeetings(query, page);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Meetings</h1>
      <MeetingSearch />

      <div className="grid gap-4 md:grid-cols-2">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </main>
  );
}
