import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-09-18",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Sister Williams",
    wardBusiness: [{ description: "Sustaining of new Primary president" }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Rememebrance of Thy Suffering" },
    speakers: [
      { name: "Sister Brown", topic: "Faith in Jesus Christ", type: "speaker" },
      { name: "Youth Choir", topic: "", type: "musical-number" },
    ],
    closingHymn: { number: 31, title: "O God, Our Help in Ages Past" },
    closingPrayer: "Brother Davis",
    announcements: ["Ward temple night: May 10"],
  },
  {
    id: 2,
    date: "2026-09-25",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Taylor",
    openingHymn: { number: 19, title: "We Thank Thee, O God, for a Prophet" },
    openingPrayer: "Brother Miller",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 175, title: "O God, the Eternal Father" },
    speakers: [
      { name: "Brother Wilson", topic: "Service", type: "speaker" },
      { name: "Sister Moore", topic: "Gratitude", type: "speaker" },
    ],
    closingHymn: { number: 152, title: "God Be with You Till We Meet Again " },
    closingPrayer: "Sister Anderson",
    announcements: [],
  },
  {
    id: 3,
    date: "2026-10-02",
    meetingType: "fast-and-testimony",
    presiding: "Bishop Smith",
    conducting: "Bishop Smith",
    openingHymn: { number: 85, title: "How Firm a Foundation" },
    openingPrayer: "Sister Thomas",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 181, title: "Jesus of Nazareth, Savior and King" },
    speakers: [],
    closingHymn: { number: 219, title: "Because I Have Been Given Much" },
    closingPrayer: "Brother Jackson",
    announcements: ["General Conference next week"],
  },
  {
    id: 4,
    date: "2026-10-09",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    openingHymn: { number: 6, title: "Redeemer of Israel" },
    openingPrayer: "Brother White",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 193, title: "I Stand All Amazed" },
    speakers: [
      { name: "Sister Harris", topic: "The Atonement", type: "speaker" },
    ],
    closingHymn: { number: 116, title: "Come, Follow Me" },
    closingPrayer: "Sister Martin",
    announcements: [],
  },
  {
    id: 5,
    date: "2026-10-16",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Taylor",
    openingHymn: { number: 27, title: "Praise to the Man" },
    openingPrayer: "Sister Thompson",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 185, title: "Reverently and Meekly Now" },
    speakers: [
      { name: "Brother Garcia", topic: "Temple Work", type: "speaker" },
      { name: "Primary Children", topic: "", type: "musical-number" },
    ],
    closingHymn: { number: 249, title: "Called to Serve" },
    closingPrayer: "Brother Martinez",
    announcements: ["Ward Trunk-or-Treat: Oct 29"],
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) {
    return meetings.filter((meeting) => meeting.date === date);
  }

  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((meeting) => meeting.id === id) ?? null;
}
