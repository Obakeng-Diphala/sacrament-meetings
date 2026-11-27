import { z } from "zod";

export const MeetingFormSchema = z.object({
    date: z.string().min(1, "Date is required."),
    meetingType: z.enum([
        "testimony",
        "regular",
        "stake",
        "general",
        "special",
    ]),
    presiding: z.string().trim().min(1, "Presiding leader is required."),
    conducting: z.string().trim().min(1, "Conducting leader is required."),
    openingPrayer: z.string().trim().min(1, "Opening prayer is required."),
    closingPrayer: z.string().trim().min(1, "Closing prayer is required."),
});  