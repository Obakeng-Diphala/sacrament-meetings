"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { updateMeeting, type MeetingActionState } from "@/lib/actions";
import type {
  SacramentMeeting,
  SpeakerItem,
  WardBusinessItem,
} from "@/lib/types";

const initialState: MeetingActionState = {
  message: "",
  errors: {},
};

export default function EditMeetingForm({
  meeting,
}: {
  meeting: SacramentMeeting;
}) {
  const updateMeetingWithId = updateMeeting.bind(null, meeting.id);
  const [state, formAction, isPending] = useActionState(
    updateMeetingWithId,
    initialState,
  );

  // Dynamic lists serialized into hidden JSON inputs for parseJsonArray()
  const [announcements, setAnnouncements] = useState<string[]>(
    meeting.announcements ?? [],
  );
  const [wardBusiness, setWardBusiness] = useState<WardBusinessItem[]>(
    meeting.wardBusiness ?? [],
  );
  const [speakers, setSpeakers] = useState<SpeakerItem[]>(
    meeting.speakers ?? [],
  );

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">
          Edit Sacrament Meeting
        </h1>
        <Link
          href={`/meetings/${meeting.id}`}
          className="text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          Cancel
        </Link>
      </div>

      {state.message && (
        <div
          id="form-status"
          role="status"
          aria-live="polite"
          className="mb-6 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {state.message}
        </div>
      )}

      <form
        action={formAction}
        aria-describedby={state.message ? "form-status" : undefined}
        className="space-y-6 rounded-lg border bg-white p-6 shadow-sm"
      >
        {/* Hidden inputs for JSON array fields */}
        <input
          type="hidden"
          name="announcements"
          value={JSON.stringify(announcements.filter((a) => a.trim() !== ""))}
        />
        <input
          type="hidden"
          name="wardBusiness"
          value={JSON.stringify(
            wardBusiness.filter((w) => w.description.trim() !== ""),
          )}
        />
        <input
          type="hidden"
          name="speakers"
          value={JSON.stringify(speakers.filter((s) => s.name.trim() !== ""))}
        />

        {/* Date & Meeting Type */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-slate-700"
            >
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              defaultValue={meeting.date}
              aria-invalid={Boolean(state.errors?.date)}
              aria-describedby={state.errors?.date ? "date-error" : undefined}
            />
            {state.errors?.date && (
              <p id="date-error" className="mt-1 text-xs text-red-600">
                {state.errors.date[0]}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="meetingType"
              className="block text-sm font-medium text-slate-700"
            >
              Meeting Type
            </label>
            <select
              id="meetingType"
              name="meetingType"
              required
              defaultValue={meeting.meetingType}
              aria-invalid={Boolean(state.errors?.meetingType)}
              aria-describedby={
                state.errors?.meetingType ? "meetingType-error" : undefined
              }
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="regular">Regular</option>
              <option value="testimony">Fast &amp; Testimony</option>
              <option value="stake">Stake Conference</option>
              <option value="general">General Conference</option>
              <option value="special">Special</option>
            </select>

            {state.errors?.meetingType && (
              <p id="meetingType-error" className="mt-1 text-xs text-red-600">
                {state.errors.meetingType[0]}
              </p>
            )}
          </div>
        </div>

        {/* Presiding & Conducting */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="presiding"
              className="block text-sm font-medium text-slate-700"
            >
              Presiding
            </label>
            <input
              id="presiding"
              name="presiding"
              type="text"
              required
              aria-invalid={Boolean(state.errors?.presiding)}
              aria-describedby={
                state.errors?.presiding ? "presiding-error" : undefined
              }
              defaultValue={meeting.presiding}
              placeholder="e.g., Bishop Smith"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
            {state.errors?.presiding && (
              <p id="presiding-error" className="mt-1 text-xs text-red-600">
                {state.errors.presiding[0]}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="conducting"
              className="block text-sm font-medium text-slate-700"
            >
              Conducting
            </label>
            <input
              id="conducting"
              name="conducting"
              type="text"
              required
              aria-invalid={Boolean(state.errors?.conducting)}
              aria-describedby={
                state.errors?.conducting ? "conducting-error" : undefined
              }
              defaultValue={meeting.conducting}
              placeholder="e.g., Brother Davis"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
            {state.errors?.conducting && (
              <p id="conducting-error" className="mt-1 text-xs text-red-600">
                {state.errors.conducting[0]}
              </p>
            )}
          </div>
        </div>

        {/* Opening Hymn & Prayer */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="openingHymnNumber"
              className="block text-sm font-medium text-slate-700"
            >
              Opening Hymn #
            </label>
            <input
              id="openingHymnNumber"
              name="openingHymnNumber"
              type="number"
              defaultValue={meeting.openingHymn?.number || ""}
              placeholder="2"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="openingHymnTitle"
              className="block text-sm font-medium text-slate-700"
            >
              Opening Hymn Title
            </label>
            <input
              id="openingHymnTitle"
              name="openingHymnTitle"
              type="text"
              defaultValue={meeting.openingHymn?.title || ""}
              placeholder="The Spirit of God"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="openingPrayer"
              className="block text-sm font-medium text-slate-700"
            >
              Opening Prayer
            </label>
            <input
              id="openingPrayer"
              name="openingPrayer"
              type="text"
              required
              defaultValue={meeting.openingPrayer}
              aria-invalid={Boolean(state.errors?.openingPrayer)}
              aria-describedby={
                state.errors?.openingPrayer ? "openingPrayer-error" : undefined
              }
              placeholder="e.g., Sister Johnson"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />

            {state.errors?.openingPrayer && (
              <p id="openingPrayer-error" className="mt-1 text-xs text-red-600">
                {state.errors.openingPrayer[0]}
              </p>
            )}
          </div>
        </div>

        {/* Announcements */}
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-slate-700">
              Announcements
            </label>
            <button
              type="button"
              onClick={() => setAnnouncements([...announcements, ""])}
              className="text-xs font-medium text-blue-600 hover:underline"
            >
              + Add Announcement
            </button>
          </div>
          <div className="mt-2 space-y-2">
            {announcements.map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <label htmlFor={`announcement-${idx}`} className="sr-only">
                  Announcement {idx + 1}
                </label>

                <input
                  id={`announcement-${idx}`}
                  name={`announcement-${idx}`}
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const updated = [...announcements];
                    updated[idx] = e.target.value;
                    setAnnouncements(updated);
                  }}
                  placeholder="Announcement details..."
                  className="block w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                />

                <button
                  type="button"
                  aria-label={`Remove announcement ${idx + 1}`}
                  onClick={() =>
                    setAnnouncements(announcements.filter((_, i) => i !== idx))
                  }
                  className="text-xs text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Ward & Stake Business */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              id="stakeBusiness"
              name="stakeBusiness"
              type="checkbox"
              defaultChecked={meeting.stakeBusiness}
              className="h-4 w-4 rounded border-slate-300"
            />
            <label
              htmlFor="stakeBusiness"
              className="text-sm font-medium text-slate-700"
            >
              Stake Business Included
            </label>
          </div>

          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-slate-700">
              Ward Business
            </label>
            <button
              type="button"
              onClick={() =>
                setWardBusiness([...wardBusiness, { description: "" }])
              }
              className="text-xs font-medium text-blue-600 hover:underline"
            >
              + Add Ward Business
            </button>
          </div>
          <div className="mt-2 space-y-2">
            {wardBusiness.map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <label htmlFor={`ward-business-${idx}`} className="sr-only">
                  Ward business {idx + 1}
                </label>

                <input
                  id={`ward-business-${idx}`}
                  name={`ward-business-${idx}`}
                  type="text"
                  value={item.description}
                  onChange={(e) => {
                    const updated = [...wardBusiness];
                    updated[idx] = { description: e.target.value };
                    setWardBusiness(updated);
                  }}
                  placeholder="e.g., Release and sustaining..."
                  className="block w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                />

                <button
                  type="button"
                  aria-label={`Remove ward business ${idx + 1}`}
                  onClick={() =>
                    setWardBusiness(wardBusiness.filter((_, i) => i !== idx))
                  }
                  className="text-xs text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sacrament Hymn */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="sacramentHymnNumber"
              className="block text-sm font-medium text-slate-700"
            >
              Sacrament Hymn #
            </label>
            <input
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              type="number"
              defaultValue={meeting.sacramentHymn?.number || ""}
              placeholder="169"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="sacramentHymnTitle"
              className="block text-sm font-medium text-slate-700"
            >
              Sacrament Hymn Title
            </label>
            <input
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              type="text"
              defaultValue={meeting.sacramentHymn?.title || ""}
              placeholder="As Now We Take the Sacrament"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Speakers & Musical Numbers */}
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-slate-700">
              Speakers &amp; Musical Numbers
            </label>
            <button
              type="button"
              onClick={() =>
                setSpeakers([
                  ...speakers,
                  { name: "", topic: "", type: "speaker" },
                ])
              }
              className="text-xs font-medium text-blue-600 hover:underline"
            >
              + Add Program Item
            </button>
          </div>
          <div className="mt-2 space-y-2">
            {speakers.map((speaker, idx) => (
              <div key={idx} className="grid gap-2 sm:grid-cols-4">
                <div>
                  <label htmlFor={`speaker-type-${idx}`} className="sr-only">
                    Program item type {idx + 1}
                  </label>

                  <select
                    id={`speaker-type-${idx}`}
                    value={speaker.type}
                    onChange={(e) => {
                      const updated = [...speakers];
                      updated[idx] = {
                        ...speaker,
                        type: e.target.value as SpeakerItem["type"],
                      };
                      setSpeakers(updated);
                    }}
                    className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                  >
                    <option value="speaker">Speaker</option>
                    <option value="musical-number">Musical Number</option>
                  </select>
                </div>

                <div>
                  <label htmlFor={`speaker-name-${idx}`} className="sr-only">
                    Speaker or performer {idx + 1}
                  </label>

                  <input
                    id={`speaker-name-${idx}`}
                    name={`speaker-name-${idx}`}
                    type="text"
                    value={speaker.name}
                    onChange={(e) => {
                      const updated = [...speakers];
                      updated[idx] = {
                        ...speaker,
                        name: e.target.value,
                      };
                      setSpeakers(updated);
                    }}
                    placeholder="Name / Performer"
                    className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor={`speaker-topic-${idx}`} className="sr-only">
                    Topic or song title {idx + 1}
                  </label>

                  <input
                    id={`speaker-topic-${idx}`}
                    name={`speaker-topic-${idx}`}
                    type="text"
                    value={speaker.topic}
                    onChange={(e) => {
                      const updated = [...speakers];
                      updated[idx] = {
                        ...speaker,
                        topic: e.target.value,
                      };
                      setSpeakers(updated);
                    }}
                    placeholder="Topic / Song Title"
                    className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                  />
                </div>

                <button
                  type="button"
                  aria-label={`Remove program item ${idx + 1}`}
                  onClick={() =>
                    setSpeakers(speakers.filter((_, i) => i !== idx))
                  }
                  className="text-xs text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Hymn & Prayer */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="closingHymnNumber"
              className="block text-sm font-medium text-slate-700"
            >
              Closing Hymn #
            </label>
            <input
              id="closingHymnNumber"
              name="closingHymnNumber"
              type="number"
              defaultValue={meeting.closingHymn?.number || ""}
              placeholder="152"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="closingHymnTitle"
              className="block text-sm font-medium text-slate-700"
            >
              Closing Hymn Title
            </label>
            <input
              id="closingHymnTitle"
              name="closingHymnTitle"
              type="text"
              defaultValue={meeting.closingHymn?.title || ""}
              placeholder="God Be with You Till We Meet Again"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="closingPrayer"
              className="block text-sm font-medium text-slate-700"
            >
              Closing Prayer
            </label>
            <input
              id="closingPrayer"
              name="closingPrayer"
              type="text"
              required
              defaultValue={meeting.closingPrayer}
              aria-invalid={Boolean(state.errors?.closingPrayer)}
              aria-describedby={
                state.errors?.closingPrayer ? "closingPrayer-error" : undefined
              }
              placeholder="e.g., Brother Wilson"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />

            {state.errors?.closingPrayer && (
              <p id="closingPrayer-error" className="mt-1 text-xs text-red-600">
                {state.errors.closingPrayer[0]}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3 pt-2">
          <Link
            href={`/meetings/${meeting.id}`}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </main>
  );
}
