import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Loader2, MessageCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { createBooking } from "@/lib/bookings.functions";

const PAYMENT_URL =
  "https://revolut.me/jonathanhuliaros?currency=EUR&amount=30000&note=The%20lucid%20village%20reservation%20deposit";
const WHATSAPP_URL = "https://wa.me/306980358981";
const MAX_GUESTS = 10;
const MIN_NIGHTS = 2;

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book Your Visit — The Lucid Village" },
      {
        name: "description",
        content:
          "Reserve your stay at The Lucid Village. Minimum 3 days / 2 nights. A €300 non-refundable deposit secures your booking.",
      },
      { property: "og:title", content: "Book Your Visit — The Lucid Village" },
      {
        property: "og:description",
        content: "Reserve your stay at The Lucid Village.",
      },
    ],
  }),
  component: BookingPage,
});

function diffNights(a?: Date, d?: Date) {
  if (!a || !d) return 0;
  return Math.round((d.getTime() - a.getTime()) / 86400000);
}

function toIsoDate(d: Date) {
  // Treat the picked calendar day as a UTC date (no TZ shift)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function BookingPage() {
  const navigate = useNavigate();
  const submit = useServerFn(createBooking);

  const [arrival, setArrival] = useState<Date | undefined>();
  const [departure, setDeparture] = useState<Date | undefined>();
  const [guests, setGuests] = useState<number>(2);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const nights = useMemo(() => diffNights(arrival, departure), [arrival, departure]);
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);
  const minDeparture = useMemo(() => {
    if (!arrival) return today;
    const d = new Date(arrival);
    d.setDate(d.getDate() + MIN_NIGHTS);
    return d;
  }, [arrival, today]);

  // August 2026 is fully blocked
  const isBlocked = (d: Date) => d.getFullYear() === 2026 && d.getMonth() === 7;

  // Clamp departure if arrival changes
  function handleArrivalChange(d?: Date) {
    setArrival(d);
    if (d && departure && departure.getTime() < d.getTime() + MIN_NIGHTS * 86400000) {
      setDeparture(undefined);
    }
  }

  const valid =
    arrival &&
    departure &&
    nights >= MIN_NIGHTS &&
    guests >= 1 &&
    guests <= MAX_GUESTS &&
    fullName.trim().length >= 2 &&
    /^\S+@\S+\.\S+$/.test(email) &&
    phone.trim().length >= 5;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || loading) return;
    setError(null);
    setLoading(true);
    try {
      await submit({
        data: {
          full_name: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          num_guests: guests,
          arrival_date: toIsoDate(arrival!),
          departure_date: toIsoDate(departure!),
          special_requests: notes.trim() || null,
        },
      });
      setSuccess(true);
      // Redirect to payment after a short pause so the success message is seen
      setTimeout(() => {
        window.location.href = PAYMENT_URL;
      }, 3500);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />
          <h1 className="mt-6 font-serif text-3xl sm:text-4xl font-light">
            Thank you for your reservation request
          </h1>
          <p className="mt-6 text-muted-foreground">
            Your dates have been received. Please complete the <strong>€300 non-refundable deposit payment</strong> to
            secure your booking. The remaining balance will be paid upon arrival.
          </p>
          <p className="mt-6 text-sm text-muted-foreground">
            You will now be redirected to the payment page…
          </p>
          <div className="mt-8">
            <a
              href={PAYMENT_URL}
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-4 text-sm font-medium uppercase tracking-wider text-primary-foreground hover:opacity-90"
            >
              Pay €300 deposit now
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to the village
          </Link>
          <span className="font-serif text-lg">The Lucid Village</span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Reservation</p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-light">Book your visit</h1>
          <p className="mt-4 text-muted-foreground">
            Come whenever you want, stay as long as you need. Minimum stay is 3 days (2 nights).
          </p>
        </div>

        {/* Deposit notice */}
        <div className="mt-10 rounded-lg border-2 border-primary/40 bg-primary/5 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Reservation Deposit</p>
          <p className="mt-2 text-2xl font-serif">€300 — non-refundable</p>
          <p className="mt-3 text-sm text-muted-foreground">
            A fixed non-refundable deposit of <strong>€300</strong> is required to secure your booking, regardless of
            the length of stay. The remaining balance is paid upon arrival.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          {/* Dates */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-serif text-xl">Choose your dates</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="arrival">Arrival date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="arrival"
                      type="button"
                      variant="outline"
                      className={cn(
                        "mt-2 w-full justify-start text-left font-normal",
                        !arrival && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {arrival ? format(arrival, "PPP") : "Pick arrival"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={arrival}
                      onSelect={handleArrivalChange}
                      disabled={(d) => d < today || isBlocked(d)}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="departure">Departure date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="departure"
                      type="button"
                      variant="outline"
                      disabled={!arrival}
                      className={cn(
                        "mt-2 w-full justify-start text-left font-normal",
                        !departure && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {departure ? format(departure, "PPP") : "Pick departure"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={departure}
                      onSelect={setDeparture}
                      disabled={(d) => d < minDeparture}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-md bg-muted/40 px-4 py-3">
              <span className="text-sm text-muted-foreground">Total nights</span>
              <span className="font-medium">
                {nights > 0 ? `${nights} night${nights === 1 ? "" : "s"}` : "—"}
              </span>
            </div>
            {arrival && departure && nights < MIN_NIGHTS && (
              <p className="mt-3 text-sm text-destructive">
                Minimum stay is {MIN_NIGHTS} nights (3 days). Please choose a later departure date.
              </p>
            )}
          </section>

          {/* Guests */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-serif text-xl">Guests</h2>
            <div className="mt-4">
              <Label htmlFor="guests">Number of guests (max {MAX_GUESTS})</Label>
              <Input
                id="guests"
                type="number"
                min={1}
                max={MAX_GUESTS}
                value={guests}
                onChange={(e) =>
                  setGuests(Math.max(1, Math.min(MAX_GUESTS, Number(e.target.value) || 1)))
                }
                className="mt-2"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                The village has a strict maximum occupancy of {MAX_GUESTS} guests at any given time.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-serif text-xl">Your details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="full_name">Full name</Label>
                <Input
                  id="full_name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="notes">Special requests / notes (optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  maxLength={2000}
                  className="mt-2"
                  rows={4}
                />
              </div>
            </div>
          </section>

          {error && (
            <div className="rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="rounded-lg bg-muted/40 p-4 text-sm text-muted-foreground">
            After submitting, you'll be redirected to pay the fixed <strong>€300</strong> non-refundable deposit via
            Revolut to secure your reservation.
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={!valid || loading}
            className="w-full text-base uppercase tracking-wider"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…
              </>
            ) : (
              "Request reservation & pay deposit"
            )}
          </Button>
        </form>

        {/* WhatsApp */}
        <section className="mt-16 rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Contact host directly</p>
          <h3 className="mt-3 font-serif text-2xl">Have questions before booking?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Jonathan is happy to answer anything about your stay.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition hover:bg-[#1ebe57]"
          >
            <MessageCircle className="h-4 w-4" />
            Contact host on WhatsApp
          </a>
        </section>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Need to manage existing bookings?{" "}
          <button
            type="button"
            onClick={() => navigate({ to: "/auth" })}
            className="underline hover:text-foreground"
          >
            Admin login
          </button>
        </p>
      </main>
    </div>
  );
}
