import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";
import { deleteMeeting } from "@/lib/actions";
 
type MeetingCardProps = {
  meeting: SacramentMeeting;
};

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = new Date(meeting.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  async function handleDelete() {
    "use server";
    await deleteMeeting(meeting.id);
  }

  return (
    <article className="flex flex-col justify-between rounded-2xl border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <Link href={`/meetings/${meeting.id}`} className="block">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
          {meeting.meetingType}
        </p>
        <h2 className="mt-2 text-xl font-semibold text-slate-900">
          {formattedDate}
        </h2>
        <p className="mt-3 text-sm text-slate-600">
          Presiding: {meeting.presiding}
        </p>
        <p className="mt-1 text-sm text-slate-600">
          Conducting: {meeting.conducting}
        </p>
      </Link>
  
      <div className="mt-4 flex items-center justify-end gap-3 border-t border-slate-100 pt-3">
        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          Edit
        </Link>
        <form action={handleDelete}>
          <button
          type="submit"
          aria-label={`Delete meeting on ${formattedDate}`}
          className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
        >
          Delete Meeting
        </button>
      </form>
    </div>
    </article>
  );
}