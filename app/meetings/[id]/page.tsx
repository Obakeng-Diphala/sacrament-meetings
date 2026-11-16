import MeetingDetail from "@/components/MeetingDetail";
import type { SacramentMeeting } from "@/lib/types";
import { notFound } from "next/navigation";

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/meetings/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch meeting details");
  }

  const meeting: SacramentMeeting = await res.json();

  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}
