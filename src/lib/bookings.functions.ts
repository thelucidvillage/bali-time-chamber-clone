import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const MAX_OCCUPANCY = 10;
const MIN_NIGHTS = 2;

const createBookingSchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(40),
  num_guests: z.number().int().min(1).max(MAX_OCCUPANCY),
  arrival_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  departure_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  special_requests: z.string().trim().max(2000).optional().nullable(),
});

function nightsBetween(a: string, d: string): number {
  const ms = new Date(d + "T00:00:00Z").getTime() - new Date(a + "T00:00:00Z").getTime();
  return Math.round(ms / 86400000);
}

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => createBookingSchema.parse(data))
  .handler(async ({ data }) => {
    const nights = nightsBetween(data.arrival_date, data.departure_date);
    if (nights < MIN_NIGHTS) {
      throw new Error(`Minimum stay is ${MIN_NIGHTS} nights (3 days).`);
    }
    const arrival = new Date(data.arrival_date + "T00:00:00Z");
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    if (arrival < today) throw new Error("Arrival date must be today or later.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Server-side occupancy enforcement
    const { data: maxRow, error: rpcErr } = await supabaseAdmin.rpc(
      "max_overlapping_guests",
      { _arrival: data.arrival_date, _departure: data.departure_date },
    );
    if (rpcErr) throw new Error("Could not verify availability. Please try again.");
    const currentMax = (maxRow as number) ?? 0;
    if (currentMax + data.num_guests > MAX_OCCUPANCY) {
      throw new Error(
        `Sorry, the selected dates are not available. The Lucid Village has a maximum of ${MAX_OCCUPANCY} guests at any time, and your selection would exceed that limit. Please choose different dates or fewer guests.`,
      );
    }

    const { data: inserted, error: insertErr } = await supabaseAdmin
      .from("bookings")
      .insert({
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        num_guests: data.num_guests,
        arrival_date: data.arrival_date,
        departure_date: data.departure_date,
        total_nights: nights,
        special_requests: data.special_requests || null,
      })
      .select("id, arrival_date, departure_date, total_nights, num_guests, full_name, email, phone, special_requests, created_at")
      .single();
    if (insertErr || !inserted) throw new Error("Could not save your booking. Please try again.");

    // Re-check after insert (defense against race) — fail-safe rollback
    const { data: postMax } = await supabaseAdmin.rpc("max_overlapping_guests", {
      _arrival: data.arrival_date,
      _departure: data.departure_date,
    });
    if (((postMax as number) ?? 0) > MAX_OCCUPANCY) {
      await supabaseAdmin.from("bookings").delete().eq("id", inserted.id);
      throw new Error("Those dates just filled up while you were booking. Please try different dates.");
    }

    // Fire-and-forget admin notification (best-effort; doesn't block booking)
    try {
      const { sendBookingNotification } = await import("./booking-email.server");
      await sendBookingNotification(inserted);
    } catch (err) {
      console.error("Booking email notification failed:", err);
    }

    return { id: inserted.id, total_nights: nights };
  });

export const listBookings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

const updateSchema = z.object({
  id: z.string().uuid(),
  booking_status: z.enum(["pending", "confirmed", "cancelled"]).optional(),
  deposit_status: z.enum(["unpaid", "paid", "refunded"]).optional(),
});

export const updateBooking = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => updateSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const patch: { booking_status?: string; deposit_status?: string } = {};
    if (data.booking_status) patch.booking_status = data.booking_status;
    if (data.deposit_status) patch.deposit_status = data.deposit_status;
    const { error } = await supabaseAdmin.from("bookings").update(patch as never).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
