import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";

export default async function MeetingsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/meetings`, {
    cache: "no-store",
  });

  const meetings: SacramentMeeting[] = await res.json();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Meetings</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </main>
  );
}
