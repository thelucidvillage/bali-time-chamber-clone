import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, CalendarIcon, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { submitInquiry } from "@/lib/inquiries.functions";
import villageAerial from "@/assets/nature/village-aerial.jpg.asset.json";

const WHATSAPP_NUMBER = "306980358981";

const PURPOSE_OPTIONS = [
  { id: "A", label: "Focus on fitness, nutrition and recovery" },
  { id: "B", label: "Remove all distractions to work on my business" },
  { id: "C", label: 'Network with other likeminded people who "get it"' },
  { id: "D", label: "Reflect and plan for personal projects" },
  { id: "E", label: "No specific reason — just want to relax and have an active holiday" },
] as const;

const ACCOMMODATION_OPTIONS = ["Main Guesthouse", "Hobbit House", "No Preference"] as const;

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Request a Stay — The Lucid Village" },
      {
        name: "description",
        content:
          "Request a stay at The Lucid Village. A simple first step toward village life, meaningful connection and the beauty of nature.",
      },
      { property: "og:title", content: "Request a Stay — The Lucid Village" },
      {
        property: "og:description",
        content:
          "A simple first step toward experiencing village life, meaningful connection, and the beauty of nature.",
      },
      { property: "og:image", content: villageAerial.url },
      { name: "twitter:image", content: villageAerial.url },
    ],
  }),
  component: InquiryPage,
});

function toIsoDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function buildWhatsAppUrl(values: {
  full_name: string;
  email: string;
  social: string;
  whatsapp: string;
  country: string;
  check_in: string;
  check_out: string;
  guests: number;
  accommodation: string;
  purpose: string;
  notes: string;
}) {
  const msg = [
    "Hello Jonathan,",
    "",
    "I would like to inquire about staying at Lucid Village.",
    "",
    `Name: ${values.full_name}`,
    `Email: ${values.email}`,
    `Social: ${values.social || "—"}`,
    `WhatsApp: ${values.whatsapp}`,
    `Country: ${values.country}`,
    `Check-in: ${values.check_in}`,
    `Check-out: ${values.check_out}`,
    `Guests: ${values.guests}`,
    `Accommodation: ${values.accommodation}`,
    `Purpose of Visit: ${values.purpose}`,
    `Notes: ${values.notes || "—"}`,
    "",
    "Please let me know if these dates are available.",
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function InquiryPage() {
  const submit = useServerFn(submitInquiry);

  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [social, setSocial] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [country, setCountry] = useState("");
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guests, setGuests] = useState<number>(1);
  const [accommodation, setAccommodation] =
    useState<(typeof ACCOMMODATION_OPTIONS)[number]>("No Preference");
  const [purposeId, setPurposeId] = useState<string>("");
  const [notes, setNotes] = useState("");

  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const purposeLabel = useMemo(
    () => PURPOSE_OPTIONS.find((p) => p.id === purposeId)?.label ?? "",
    [purposeId],
  );

  const valid =
    fullName.trim().length >= 2 &&
    /^\S+@\S+\.\S+$/.test(email) &&
    whatsapp.trim().length >= 5 &&
    country.trim().length >= 2 &&
    checkIn &&
    checkOut &&
    checkOut.getTime() > checkIn.getTime() &&
    guests >= 1 &&
    !!purposeId;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || loading) return;
    setError(null);
    setLoading(true);

    const payload = {
      full_name: fullName.trim(),
      email: email.trim(),
      social: social.trim(),
      whatsapp: whatsapp.trim(),
      country: country.trim(),
      check_in: toIsoDate(checkIn!),
      check_out: toIsoDate(checkOut!),
      guests,
      accommodation,
      purpose: purposeLabel,
      notes: notes.trim(),
    };

    try {
      await submit({ data: payload });
      setSubmitted(true);
      const url = buildWhatsAppUrl(payload);
      setTimeout(() => {
        window.location.href = url;
      }, 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-dvh bg-background">
        <div className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
          <CheckCircle2 className="h-14 w-14 text-emerald-500" aria-hidden />
          <h1 className="mt-8 font-serif text-3xl sm:text-4xl font-light leading-tight">
            Thank you for your inquiry.
          </h1>
          <p className="mt-5 text-muted-foreground">
            Your details have been received. You'll now be redirected to WhatsApp so we can
            continue the conversation personally.
          </p>
          <a
            href={buildWhatsAppUrl({
              full_name: fullName,
              email,
              social,
              whatsapp,
              country,
              check_in: toIsoDate(checkIn!),
              check_out: toIsoDate(checkOut!),
              guests,
              accommodation,
              purpose: purposeLabel,
              notes,
            })}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
          >
            Open WhatsApp now <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background">
      {/* Top bar */}
      <header className="absolute left-0 right-0 top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to the village
          </Link>
          <span className="font-serif text-base tracking-wide text-white/90">
            The Lucid Village
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate flex min-h-[88dvh] items-center justify-center overflow-hidden">
        <img
          src={villageAerial.url}
          alt="Aerial view of Lucid Village set between mountains and sea"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />

        <div className="mx-auto max-w-3xl px-6 text-center text-white">
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/70">
            A personal invitation
          </p>
          <h1 className="mt-5 font-serif text-4xl font-light leading-[1.08] sm:text-6xl">
            Request a Stay at <em className="italic">Lucid Village</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/85 sm:text-lg">
            A simple first step toward experiencing village life, meaningful connection, and the
            beauty of nature.
          </p>
          <button
            type="button"
            onClick={() => {
              setShowForm(true);
              setTimeout(() => {
                document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 30);
            }}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-stone-900 shadow-lg transition hover:bg-stone-100"
          >
            Request a Stay
          </button>
        </div>
      </section>

      {/* Intro */}
      <section className="border-b border-border/40 bg-background">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Before you write to us
          </p>
          <p className="mt-6 font-serif text-2xl font-light leading-relaxed sm:text-3xl">
            "Lucid Village is not a hotel or a corporate business. It's run by real people. If you
            feel called to visit, fill out the form below and tell us a little about yourself."
          </p>
        </div>
      </section>

      {/* Form */}
      <section id="inquiry" className="bg-background">
        <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Stay Inquiry
            </p>
            <h2 className="mt-4 font-serif text-3xl font-light sm:text-4xl">Tell us about you</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Every inquiry is personally reviewed.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-12 space-y-10">
            {/* Personal */}
            <fieldset className="space-y-5">
              <legend className="font-serif text-xl">Personal</legend>

              <div>
                <Label htmlFor="full_name">Full name</Label>
                <Input
                  id="full_name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  maxLength={120}
                  className="mt-2 h-12 rounded-xl"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    maxLength={200}
                    className="mt-2 h-12 rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp number</Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    required
                    placeholder="+30 698 035 8981"
                    maxLength={40}
                    className="mt-2 h-12 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    maxLength={80}
                    className="mt-2 h-12 rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="social">Social media handle</Label>
                  <Input
                    id="social"
                    value={social}
                    onChange={(e) => setSocial(e.target.value)}
                    placeholder="@your_handle"
                    maxLength={120}
                    className="mt-2 h-12 rounded-xl"
                  />
                </div>
              </div>
            </fieldset>

            {/* Stay */}
            <fieldset className="space-y-5">
              <legend className="font-serif text-xl">Your stay</legend>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label>Check-in date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "mt-2 h-12 w-full justify-start rounded-xl text-left font-normal",
                          !checkIn && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkIn ? format(checkIn, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={(d) => {
                          setCheckIn(d);
                          if (d && checkOut && checkOut.getTime() <= d.getTime()) {
                            setCheckOut(undefined);
                          }
                        }}
                        disabled={(d) => d < today}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Check-out date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        disabled={!checkIn}
                        className={cn(
                          "mt-2 h-12 w-full justify-start rounded-xl text-left font-normal",
                          !checkOut && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOut ? format(checkOut, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        disabled={(d) => !checkIn || d <= checkIn}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="guests">Number of guests</Label>
                  <Input
                    id="guests"
                    type="number"
                    min={1}
                    max={20}
                    value={guests}
                    onChange={(e) =>
                      setGuests(Math.max(1, Math.min(20, Number(e.target.value) || 1)))
                    }
                    className="mt-2 h-12 rounded-xl"
                  />
                </div>
                <div>
                  <Label>Accommodation preference</Label>
                  <Select
                    value={accommodation}
                    onValueChange={(v) =>
                      setAccommodation(v as (typeof ACCOMMODATION_OPTIONS)[number])
                    }
                  >
                    <SelectTrigger className="mt-2 h-12 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ACCOMMODATION_OPTIONS.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </fieldset>

            {/* About you */}
            <fieldset className="space-y-5">
              <legend className="font-serif text-xl">About you</legend>

              <div>
                <Label className="mb-3 block">Purpose of visit</Label>
                <RadioGroup
                  value={purposeId}
                  onValueChange={setPurposeId}
                  className="space-y-2"
                >
                  {PURPOSE_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      htmlFor={`purpose-${opt.id}`}
                      className={cn(
                        "flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 transition",
                        "hover:border-foreground/40",
                        purposeId === opt.id && "border-foreground bg-muted/30",
                      )}
                    >
                      <RadioGroupItem value={opt.id} id={`purpose-${opt.id}`} className="mt-0.5" />
                      <span className="text-sm leading-relaxed">{opt.label}</span>
                    </label>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="notes">Additional notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  maxLength={2000}
                  rows={5}
                  className="mt-2 rounded-xl"
                  placeholder="Anything you'd like us to know."
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  We care more about who you are than perfect answers. Share whatever feels
                  relevant.
                </p>
              </div>
            </fieldset>

            {error && (
              <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={!valid || loading}
              className="h-14 w-full rounded-full text-sm uppercase tracking-[0.2em]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                "Request a Stay"
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              After you send this, we'll continue the conversation personally on WhatsApp.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
