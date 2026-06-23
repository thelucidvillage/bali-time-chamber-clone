import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SPREADSHEET_ID = "1OweuFHIlr5a5a4_AHwiJ4owijNzy86dHm5CaMkJShFw";
const SHEET_RANGE = "Inquiries!A:L";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

const inquirySchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  social: z.string().trim().max(120).optional().default(""),
  whatsapp: z.string().trim().min(5).max(40),
  country: z.string().trim().min(2).max(80),
  check_in: z.string().trim().min(4).max(40),
  check_out: z.string().trim().min(4).max(40),
  guests: z.number().int().min(1).max(20),
  accommodation: z.enum(["Main Guesthouse", "Hobbit House", "No Preference"]),
  purpose: z.string().trim().min(1).max(200),
  notes: z.string().trim().max(2000).optional().default(""),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const sheetsKey = process.env.GOOGLE_SHEETS_API_KEY;
    if (!lovableKey || !sheetsKey) {
      throw new Error("Inquiry storage is not configured. Please contact us via WhatsApp.");
    }

    const row = [
      new Date().toISOString(),
      data.full_name,
      data.email,
      data.social,
      data.whatsapp,
      data.country,
      data.check_in,
      data.check_out,
      String(data.guests),
      data.accommodation,
      data.purpose,
      data.notes,
    ];

    const res = await fetch(
      `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_RANGE}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": sheetsKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: [row] }),
      },
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Sheets append failed", res.status, text);
      throw new Error("We couldn't save your inquiry. Please try again or message us on WhatsApp.");
    }

    return { ok: true as const };
  });
