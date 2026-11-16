import { redirect } from "next/navigation";
import type { SacramentMeeting } from "@/lib/types";

function formatDateInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default async function CurrentMeetingPage() {
  const today = new Date();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - today.getDay());

  const sundayDate = formatDateInput(sunday);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/meetings?=date${sundayDate}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    redirect("/meetings");
  }

  const meetings: SacramentMeeting[] = await res.json();
  const meeting = meetings[0];

  if (!meeting) {
    redirect("/meetings");
  }

  redirect(`/meetings/${meeting.id}`);
}  