import { redirect } from "next/navigation";
import { getMeetingByDate } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

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
  const meeting = await getMeetingByDate(sundayDate);

  if (!meeting) {
    redirect("/meetings");
  }

  redirect(`/meetings/${meeting.id}`);
}  