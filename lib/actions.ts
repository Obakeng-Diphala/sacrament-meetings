"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  addMeeting,
  updateMeeting as updateMeetingInDb,
  deleteMeeting as deleteMeetingInDb,
} from "./meetings-db";
import { MeetingFormSchema } from "./validation";
import type {
  Hymn,
  SacramentMeeting,
  SpeakerItem,
  WardBusinessItem,
} from "./types";

export type MeetingActionState = {
  message: string;
  errors?: Record<string, string[] | undefined>;
};

function parseHymn(formData: FormData, fieldName: string): Hymn {
  const raw = formData.get(fieldName);
  if (typeof raw === "string" && raw.trim()) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        return {
          number: Number(parsed.number) || 0,
          title: String(parsed.title || ""),
        };
      }
    } catch {
      // Fallback if form uses separate `${fieldName}Number` and `${fieldName}Title` inputs
    }
  }

  return {
    number: Number(formData.get(`${fieldName}Number`)) || 0,
    title: String(formData.get(`${fieldName}Title`) || ""),
  };
}

function parseJsonArray<T>(formData: FormData, fieldName: string): T[] {
  const raw = formData.get(fieldName);
  if (typeof raw !== "string" || !raw.trim()) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function extractValidateMeetingData(formData: FormData) {
  const validation = MeetingFormSchema.safeParse({
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    openingPrayer: formData.get("openingPrayer"),
    closingPrayer: formData.get("closingPrayer"),
  });

  if (!validation.success) {
    return {
      success: false as const,
      state: {
        message: "Please correct the highlighted fields,",
        errors: validation.error.flatten().fieldErrors,
      },
    };
  }

  const data: Omit<SacramentMeeting, "id"> = {
    ...validation.data,
    announcements: parseJsonArray<string>(formData, "announcements"),
    openingHymn: parseHymn(formData, "openingHymn"),
    wardBusiness: parseJsonArray<WardBusinessItem>(formData, "wardBusiness"),
    stakeBusiness: Boolean(formData.get("stakeBusiness")),
    sacramentHymn: parseHymn(formData, "sacramentHymn"),
    speakers: parseJsonArray<SpeakerItem>(formData, "speakers"),
    closingHymn: parseHymn(formData, "closingHymn")
  };

  return { success: true as const, data };
}

export async function createMeeting(
  prevState: MeetingActionState,
  formData: FormData,
): Promise<MeetingActionState> {
  const parsed = extractValidateMeetingData(formData);
  if (!parsed.success) {
    return parsed.state;
  }

 try {
    await addMeeting(parsed.data);
  } catch (error) {
    console.error("Failed to create meeting:", error);
    return {
      message: "Database Error: Failed to create meeting.",
      errors: {},
    };
  }

  revalidatePath("/meetings");
  revalidatePath("/meetings/current");
  revalidatePath("/");
  redirect("/meetings");
}

export async function updateMeeting(
  id: number,
  prevState: MeetingActionState,
  formData: FormData,
): Promise<MeetingActionState> {
  const parsed = extractValidateMeetingData(formData);
  if (!parsed.success) {
    return parsed.state;
  }

  try {
    await updateMeetingInDb(id, parsed.data);
  } catch (error) {
    console.error(`Failed to update meeting ${id}:`, error);
    return {
      message: "Database Error: Failed to update meeting.",
      errors: {},
    };
  }

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);
  revalidatePath("/meetings/current");
  redirect(`/meetings/${id}`);
}

export async function deleteMeeting(
  id: number,
): Promise<{ message: string } | void> {
  try {
    await deleteMeetingInDb(id);
  } catch (error) {
    console.error(`Failed to delete meeting: ${id}:`, error);
    return {
      message: "Database Error: Failed to delete meeting.",
    };
  } 

  revalidatePath("/meetings");
  revalidatePath("/meetings/current");
  redirect("/meetings");
}
