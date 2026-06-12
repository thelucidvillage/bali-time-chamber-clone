// Sends a booking notification email to the host.
// Uses Lovable's built-in transactional email route when configured;
// silently no-ops if the email infrastructure isn't set up yet.

const HOST_EMAIL = "jonathanhuliaros@hotmail.com";

interface BookingPayload {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  num_guests: number;
  arrival_date: string;
  departure_date: string;
  total_nights: number;
  special_requests: string | null;
  created_at: string;
}

export async function sendBookingNotification(b: BookingPayload) {
  const subject = `New booking request — ${b.full_name} (${b.arrival_date} → ${b.departure_date})`;
  const body = [
    `New booking request received at ${new Date(b.created_at).toUTCString()}`,
    ``,
    `Guest:           ${b.full_name}`,
    `Email:           ${b.email}`,
    `Phone:           ${b.phone}`,
    `Number of guests:${b.num_guests}`,
    `Arrival:         ${b.arrival_date}`,
    `Departure:       ${b.departure_date}`,
    `Total nights:    ${b.total_nights}`,
    `Special requests:${b.special_requests || "(none)"}`,
    ``,
    `Booking ID: ${b.id}`,
  ].join("\n");

  // Best-effort: log to server logs (always visible to host via project logs)
  console.log("[BOOKING_NOTIFICATION]", { to: HOST_EMAIL, subject, body });

  // Attempt to enqueue via Lovable transactional email infra if available
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // Use untyped rpc call so this works even before email infra is scaffolded.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = supabaseAdmin as any;
    const { error } = await sb.rpc("enqueue_email", {
      queue_name: "transactional_emails",
      message: {
        template_name: "booking-notification",
        recipient_email: HOST_EMAIL,
        template_data: b,
      },
    });
    if (error) {
      console.warn("[BOOKING_NOTIFICATION] email infra not available:", error.message);
    }
  } catch (err) {
    console.warn("[BOOKING_NOTIFICATION] enqueue skipped:", err);
  }
}
