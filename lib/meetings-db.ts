import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

const sql = neon(process.env.DATABASE_URL!);

const ITEMS_PER_PAGE = 5;

export async function getMeetings(
  query: string = "",
  currentPage: number = 1,
): Promise<SacramentMeeting[]> {
  try {
    const searchTerm = `%${query}%`;
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const rows = await sql`
      SELECT
        id,
        to_char(date, 'YYYY-MM-DD') AS "date",
        meeting_type                AS "meetingType",
        presiding, conducting, announcements,
        opening_hymn                AS "openingHymn",
        opening_prayer              AS "openingPrayer",
        ward_business               AS "wardBusiness",
        stake_business              AS "stakeBusiness",
        sacrament_hymn              AS "sacramentHymn",
        speakers,
        closing_hymn                AS "closingHymn",
        closing_prayer              AS "closingPrayer"
      FROM meetings
      WHERE
        presiding      ILIKE ${searchTerm}
        OR conducting  ILIKE ${searchTerm}
        OR meeting_type ILIKE ${searchTerm}
        OR speakers::text ILIKE ${searchTerm}
      ORDER BY date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return rows as unknown as SacramentMeeting[];
  } catch (error) {
    console.error("Database Error (getMeetings):", error);
    throw new Error("Failed to fetch meetings.");
  }
}

export async function getMeetingByDate(
  date: string,
): Promise<SacramentMeeting | null> {
  try {
    const rows = await sql`
      SELECT
        id,
        to_char(date, 'YYYY-MM-DD') AS "date",
        meeting_type                AS "meetingType",
        presiding, conducting, announcements,
        opening_hymn                AS "openingHymn",
        opening_prayer              AS "openingPrayer",
        ward_business               AS "wardBusiness",
        stake_business              AS "stakeBusiness",
        sacrament_hymn              AS "sacramentHymn",
        speakers,
        closing_hymn                AS "closingHymn",
        closing_prayer              AS "closingPrayer"
      FROM meetings
      WHERE date = ${date}::date
      LIMIT 1
    `;
    return (rows[0] as unknown as SacramentMeeting) ?? null;
  } catch (error) {
    console.error("Database Error (getMeetingByDate):", error);
    throw new Error("Failed to fetch meeting by date.");
  }
}

export async function getMeetingsTotalPages(
  query: string = "",
): Promise<number> {
  try {
    const searchTerm = `%${query}%`;
    const rows = await sql`
      SELECT COUNT(*) FROM meetings
      WHERE
        presiding   ILIKE ${searchTerm}
        OR conducting ILIKE ${searchTerm}
        OR meeting_type ILIKE ${searchTerm}
        OR speakers::text ILIKE ${searchTerm}
    `;
    return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Database Error (getMeetingsTotalPages):", error);
    throw new Error("Failed to fetch total meeting pages.");
  }
}

export async function getMeetingById(
  id: number,
): Promise<SacramentMeeting | null> {
  try {
    const rows = await sql`
      SELECT 
        id,
        to_char(date, 'YYYY-MM-DD') AS "date",
        meeting_type                AS "meetingType",
        presiding, conducting, announcements,
        opening_hymn                AS "openingHymn",
        opening_prayer              AS "openingPrayer",
        ward_business               AS "wardBusiness",
        stake_business              AS "stakeBusiness",
        sacrament_hymn              AS "sacramentHymn",
        speakers,
        closing_hymn                AS "closingHymn",
        closing_prayer              AS "closingPrayer"
      FROM meetings WHERE id = ${id}
    `;
    return (rows[0] as unknown as SacramentMeeting) ?? null;
  } catch (error) {
    console.error("Database Error (getMeetingById):", error);
    throw new Error("Failed to fetch meeting by ID.");
  }
}

export async function addMeeting(
  data: Omit<SacramentMeeting, "id">,
): Promise<SacramentMeeting> {
  try {
    const rows = await sql`
      INSERT INTO meetings (
        date,
        meeting_type,
        presiding,
        conducting,
        announcements,
        opening_hymn,
        opening_prayer,
        ward_business,
        stake_business,
        sacrament_hymn,
        speakers,
        closing_hymn,
        closing_prayer
      )
      VALUES (
        ${data.date}::date,
        ${data.meetingType},
        ${data.presiding},
        ${data.conducting},
        ${JSON.stringify(data.announcements ?? [])}::jsonb,
        ${JSON.stringify(data.openingHymn)}::jsonb,
        ${data.openingPrayer},
        ${JSON.stringify(data.wardBusiness ?? [])}::jsonb,
        ${data.stakeBusiness},
        ${JSON.stringify(data.sacramentHymn)}::jsonb,
        ${JSON.stringify(data.speakers ?? [])}::jsonb,
        ${JSON.stringify(data.closingHymn)}::jsonb,
        ${data.closingPrayer}
      )
      RETURNING
        id,
        to_char(date, 'YYYY-MM-DD') AS "date",
        meeting_type                AS "meetingType",
        presiding, conducting, announcements,
        opening_hymn                AS "openingHymn",
        opening_prayer              AS "openingPrayer",
        ward_business               AS "wardBusiness",
        stake_business              AS "stakeBusiness",
        sacrament_hymn              AS "sacramentHymn",
        speakers,
        closing_hymn                AS "closingHymn",
        closing_prayer              AS "closingPrayer"
    `;
    return rows[0] as unknown as SacramentMeeting;
  } catch (error) {
    console.error("Database Error (addMeeting):", error);
    throw new Error("Failed to add meeting.");
  }
}

export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>,
): Promise<SacramentMeeting | null> {
  try {
    const rows = await sql`
      UPDATE meetings
      SET
        date            = COALESCE(${updates.date ?? null}::date, date),
        meeting_type    = COALESCE(${updates.meetingType ?? null}, meeting_type),
        presiding       = COALESCE(${updates.presiding ?? null}, presiding),
        conducting      = COALESCE(${updates.conducting ?? null}, conducting),
        announcements   = COALESCE(${updates.announcements !== undefined ? JSON.stringify(updates.announcements) : null}::jsonb, announcements),
        opening_hymn    = COALESCE(${updates.openingHymn !== undefined ? JSON.stringify(updates.openingHymn) : null}::jsonb, opening_hymn),
        opening_prayer  = COALESCE(${updates.openingPrayer ?? null}, opening_prayer),
        ward_business   = COALESCE(${updates.wardBusiness !== undefined ? JSON.stringify(updates.wardBusiness) : null}::jsonb, ward_business),
        stake_business  = COALESCE(${updates.stakeBusiness ?? null}, stake_business),
        sacrament_hymn  = COALESCE(${updates.sacramentHymn !== undefined ? JSON.stringify(updates.sacramentHymn) : null}::jsonb, sacrament_hymn),
        speakers        = COALESCE(${updates.speakers !== undefined ? JSON.stringify(updates.speakers) : null}::jsonb, speakers),
        closing_hymn    = COALESCE(${updates.closingHymn !== undefined ? JSON.stringify(updates.closingHymn) : null}::jsonb, closing_hymn),
        closing_prayer  = COALESCE(${updates.closingPrayer ?? null}, closing_prayer)
      WHERE id = ${id}
      RETURNING
        id,
        to_char(date, 'YYYY-MM-DD') AS "date",
        meeting_type                AS "meetingType",
        presiding, conducting, announcements,
        opening_hymn                AS "openingHymn",
        opening_prayer              AS "openingPrayer",
        ward_business               AS "wardBusiness",
        stake_business              AS "stakeBusiness",
        sacrament_hymn              AS "sacramentHymn",
        speakers,
        closing_hymn                AS "closingHymn",
        closing_prayer              AS "closingPrayer"
    `;
    return (rows[0] as unknown as SacramentMeeting) ?? null;
  } catch (error) {
    console.error("Database Error (updateMeeting):", error);
    throw new Error("Failed to update meeting.");
  }
}

export async function deleteMeeting(id: number): Promise<boolean> {
  try {
    const rows = await sql`
      DELETE FROM meetings
      WHERE id = ${id}
      RETURNING id
    `;
    return rows.length > 0;
  } catch (error) {
    console.error("Database Error (deleteMeeting):", error);
    throw new Error("Failed to delete meeting.");
  }
}
