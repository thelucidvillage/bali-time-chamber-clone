import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  X,
  ChevronDown,
  MapPin,
  Bus,
  Car,
  Plane,
  MessageCircle,
  Instagram,
  Phone,
  Mail,
  Clock,
  Wifi,
  Utensils,
  Dumbbell,
  Mountain,
  Flame,
  Waves,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import villageAerial from "@/assets/nature/village-aerial.jpg.asset.json";
import natureTree from "@/assets/nature/nature-tree.jpg.asset.json";
import natureWaterfall from "@/assets/nature/nature-waterfall.jpg.asset.json";
import natureSprings from "@/assets/nature/nature-springs-aerial.jpg.asset.json";
import natureSwim from "@/assets/nature/nature-swim.jpg.asset.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/details")({
  head: () => ({
    meta: [
      { title: "Details & Pricing — The Lucid Village" },
      {
        name: "description",
        content:
          "Everything you need to know about staying at The Lucid Village — who it's for, what's included, pricing, the daily rhythm and how to get here.",
      },
      { property: "og:title", content: "Details & Pricing — The Lucid Village" },
      {
        property: "og:description",
        content:
          "A temporary home for people who want to become stronger, clearer, healthier and more connected.",
      },
      { property: "og:image", content: villageAerial.url },
      { name: "twitter:image", content: villageAerial.url },
    ],
  }),
  component: DetailsPage,
});

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-6 py-20 sm:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-[760px]">{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">{children}</p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-5 font-serif text-3xl font-light leading-[1.1] sm:text-5xl">{children}</h2>
  );
}

function Divider() {
  return (
    <div className="mx-auto my-2 h-px w-24 bg-gradient-to-r from-transparent via-foreground/25 to-transparent" />
  );
}

function ImageBand({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-[40dvh] w-full overflow-hidden sm:h-[55dvh]">
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

function CTA({ children = "Request Your Stay" }: { children?: React.ReactNode }) {
  return (
    <Link
      to="/booking"
      className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-10 py-5 text-xs font-medium uppercase tracking-[0.22em] text-background shadow-sm transition hover:opacity-90"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
    </Link>
  );
}

const FIT_FOR = [
  "You want to step away from noise and reset.",
  "You take radical responsibility for your life.",
  "You already have your own physical training practice.",
  "You enjoy learning and sharing skills with others.",
  "You value community and meaningful conversations.",
  "You are building something important — a business, a mission, or yourself.",
  "You are comfortable with simplicity and disconnecting from technology.",
  "You already have discipline and do not need hand-holding.",
];

const NOT_FIT = [
  "You want luxury hotels or five-star service.",
  "You expect entertainment or staff taking care of you.",
  "You prefer complete isolation.",
  "You need constant guidance or motivation.",
  "You are uncomfortable with daily movement and activity.",
  "You want to party or use substances.",
];

const INCLUDED = [
  { icon: Mountain, label: "Accommodation" },
  { icon: Wifi, label: "Fast internet" },
  { icon: Utensils, label: "All food included" },
  { icon: Users, label: "Community cooking" },
  { icon: Dumbbell, label: "Gym access" },
  { icon: Sparkles, label: "Parkour park" },
  { icon: Flame, label: "Sauna" },
  { icon: Waves, label: "Cold plunge" },
  { icon: Dumbbell, label: "Open training spaces" },
  { icon: Users, label: "Guided sessions" },
  { icon: Mountain, label: "Nature adventures" },
];

const ADVENTURES = [
  "Natural hot springs",
  "Waterfalls",
  "Freediving",
  "Hiking",
  "Climbing",
  "Volcanic island visits",
  "Kayaking",
  "Beach training",
  "Barbecues",
  "Games",
];

const RHYTHM = [
  { time: "08:00", label: "Movement, strength, breathwork & cold plunge" },
  { time: "10:00", label: "Breakfast and coffee" },
  { time: "17:00", label: "Nature adventure, hiking, sauna or recovery" },
  { time: "19:00", label: "Community dinner" },
];

const SHARED_TIERS = [
  { d: "3 Days / 2 Nights", p: "€300" },
  { d: "7 Days / 6 Nights", p: "€600", save: "Save 14%" },
  { d: "14 Days / 13 Nights", p: "€1,200", save: "Save 14%" },
  { d: "28 Days / 27 Nights", p: "€2,100", save: "Save 25%" },
];

const PRIVATE_TIERS = [
  { d: "3 Days / 2 Nights", p: "€450" },
  { d: "7 Days / 6 Nights", p: "€900", save: "Save 14%" },
  { d: "14 Days / 13 Nights", p: "€1,800", save: "Save 14%" },
  { d: "28 Days / 27 Nights", p: "€3,150", save: "Save 25%" },
];

function DetailsPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
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

      {/* HERO */}
      <section className="relative isolate flex min-h-[92dvh] items-center justify-center overflow-hidden">
        <img
          src={villageAerial.url}
          alt="Aerial view of Lucid Village between mountains and sea"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/45 via-black/30 to-black/65" />

        <div className="mx-auto max-w-3xl px-6 text-center text-white">
          <Eyebrow>
            <span className="text-white/75">Details & Pricing</span>
          </Eyebrow>
          <h1 className="mt-5 font-serif text-4xl font-light leading-[1.05] sm:text-6xl">
            Everything You <em className="italic">Need To Know</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/85 sm:text-lg">
            Lucid Village is more than a place to stay. It's a temporary home for people who want
            to become stronger, clearer, healthier, and more connected.
          </p>
          <div className="mt-10">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-5 text-xs font-medium uppercase tracking-[0.22em] text-stone-900 shadow-lg transition hover:bg-stone-100"
            >
              Request Your Stay <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* scroll indicator */}
        <a
          href="#who"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 transition hover:text-white"
          aria-label="Scroll"
        >
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </a>
      </section>

      {/* WHO THIS IS FOR */}
      <Section id="who">
        <div className="text-center">
          <Eyebrow>For the right people</Eyebrow>
          <H2>Who This Is For</H2>
          <p className="mt-6 text-muted-foreground">Lucid Village is intentionally selective.</p>
        </div>

        <div className="mt-12 space-y-5 text-center">
          <p className="font-serif text-xl font-light leading-relaxed sm:text-2xl">
            This is for people who are already on their path.
          </p>
          <p className="text-muted-foreground">
            You already take responsibility for your life. You care about your health. You train
            your body. You want meaningful work, real conversations, and strong people around you.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-foreground/10 bg-card/70 p-8 shadow-sm backdrop-blur sm:p-10">
          <p className="text-center text-sm uppercase tracking-[0.22em] text-muted-foreground">
            You'll likely feel at home here if
          </p>
          <ul className="mt-8 space-y-4">
            {FIT_FOR.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 text-center font-serif text-xl font-light italic text-foreground/80">
          If this feels familiar, you'll probably find your people here.
        </p>
      </Section>

      <ImageBand src={natureTree.url} alt="Olive trees and mountains" />

      {/* NOT FIT */}
      <Section>
        <div className="rounded-3xl border border-stone-300/60 bg-stone-900 p-8 text-stone-100 sm:p-12">
          <div className="text-center">
            <Eyebrow>
              <span className="text-stone-400">Protecting the culture</span>
            </Eyebrow>
            <h2 className="mt-5 font-serif text-3xl font-light sm:text-4xl">Not The Right Fit</h2>
          </div>
          <ul className="mt-10 space-y-4">
            {NOT_FIT.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-stone-800 text-stone-400">
                  <X className="h-3.5 w-3.5" />
                </span>
                <span className="leading-relaxed text-stone-200">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center text-sm leading-relaxed text-stone-400">
            Lucid Village feels special because of the people who come here. Protecting that
            culture matters.
          </p>
        </div>
      </Section>

      {/* MORE THAN ACCOMMODATION */}
      <Section>
        <div className="text-center">
          <Eyebrow>The environment</Eyebrow>
          <H2>More Than Accommodation</H2>
        </div>

        <div className="mt-10 space-y-5 text-center text-muted-foreground">
          <p>This is not simply a place to sleep.</p>
          <p className="font-serif text-xl font-light leading-relaxed text-foreground sm:text-2xl">
            Lucid Village is a complete environment designed to help you become stronger, clearer,
            and more alive.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[
            "Physical performance",
            "Mental clarity",
            "Deep rest",
            "Real human connection",
            "Personal growth",
            "Business focus",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-foreground/10 bg-card/70 p-5 text-center text-sm leading-snug shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>

        <Divider />

        <div className="mt-10 text-center">
          <p className="text-muted-foreground">Everything you need is already here:</p>
          <p className="mt-4 font-serif text-2xl font-light leading-relaxed">
            Food. Training. Recovery. Nature. Community. Space to think.
          </p>
          <p className="mt-6 text-sm uppercase tracking-[0.22em] text-muted-foreground">
            No distractions — only the essentials.
          </p>
        </div>
      </Section>

      {/* DAILY RHYTHM */}
      <Section className="bg-card">
        <div className="text-center">
          <Eyebrow>A typical day</Eyebrow>
          <H2>A Day At Lucid Village</H2>
          <p className="mt-6 text-muted-foreground">
            There are no schedules. Only daily anchors.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {RHYTHM.map((r) => (
            <div
              key={r.time}
              className="flex items-center gap-5 rounded-2xl border border-foreground/15 bg-card p-5 shadow-sm"
            >
              <div className="grid h-12 w-16 shrink-0 place-items-center rounded-xl bg-foreground/10 font-serif text-lg">
                {r.time}
              </div>
              <p className="text-sm leading-relaxed sm:text-base">{r.label}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-muted-foreground">
          You choose how much structure or freedom you want.
        </p>
      </Section>

      <ImageBand src={natureWaterfall.url} alt="Waterfall in the mountains of Evia" />

      {/* FLEXIBLE STAYS */}
      <Section>
        <div className="text-center">
          <Eyebrow>Length of stay</Eyebrow>
          <H2>Flexible Stays</H2>
          <p className="mt-6 text-muted-foreground">
            Minimum stay <span className="text-foreground">— 3 days / 2 nights.</span>
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {["5 days", "10 days", "14 days", "21 days", "28+ days"].map((s) => (
            <div
              key={s}
              className="rounded-2xl border border-foreground/15 bg-card py-5 text-center text-sm shadow-sm"
            >
              {s}
            </div>
          ))}
        </div>

        <p className="mt-10 text-center font-serif text-xl font-light italic text-foreground/80">
          The longer you stay, the deeper the experience.
        </p>
      </Section>

      {/* WHAT'S INCLUDED */}
      <Section className="bg-card">
        <div className="text-center">
          <Eyebrow>Included</Eyebrow>
          <H2>What's Included</H2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {INCLUDED.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-2xl border border-foreground/15 bg-card p-4 shadow-sm"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-foreground/10">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-sm leading-snug">{label}</span>
            </div>
          ))}
        </div>

        <Divider />

        <p className="mt-10 text-center text-sm uppercase tracking-[0.22em] text-muted-foreground">
          Adventures may include
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {ADVENTURES.map((a) => (
            <span
              key={a}
              className="rounded-full border border-foreground/20 bg-card px-4 py-2 text-xs"
            >
              {a}
            </span>
          ))}
        </div>
      </Section>

      <ImageBand src={natureSprings.url} alt="Natural hot springs from above" />

      {/* PRICING */}
      <Section id="pricing">
        <div className="text-center">
          <Eyebrow>Pricing</Eyebrow>
          <H2>Simple, Transparent Pricing</H2>
          <p className="mt-6 text-muted-foreground">
            All-inclusive — food, training, recovery and adventures.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {/* Shared */}
          <div className="flex flex-col rounded-3xl border border-foreground/15 bg-card p-7 shadow-sm">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Shared Guesthouse
            </p>
            <p className="mt-4 font-serif text-3xl font-light">€100</p>
            <p className="text-sm text-muted-foreground">per day, per person</p>
            <div className="mt-6 space-y-3 border-t border-foreground/10 pt-6">
              {SHARED_TIERS.map((t) => (
                <div key={t.d} className="flex items-baseline justify-between gap-3">
                  <span className="text-sm">{t.d}</span>
                  <span className="flex items-baseline gap-2">
                    {t.save && (
                      <span className="text-[10px] uppercase tracking-wider text-emerald-700">
                        {t.save}
                      </span>
                    )}
                    <span className="font-serif text-lg">{t.p}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Private */}
          <div className="relative flex flex-col rounded-3xl border border-foreground bg-foreground p-7 text-background shadow-md">
            <span className="absolute -top-3 right-6 rounded-full bg-amber-200 px-3 py-1 text-[10px] uppercase tracking-wider text-stone-900">
              Private
            </span>
            <p className="text-xs uppercase tracking-[0.22em] text-background/60">
              Private Stay — Hobbit House or Private Room
            </p>
            <p className="mt-4 font-serif text-3xl font-light">€150</p>
            <p className="text-sm text-background/70">per day, per person</p>
            <div className="mt-6 space-y-3 border-t border-background/15 pt-6">
              {PRIVATE_TIERS.map((t) => (
                <div key={t.d} className="flex items-baseline justify-between gap-3">
                  <span className="text-sm">{t.d}</span>
                  <span className="flex items-baseline gap-2">
                    {t.save && (
                      <span className="text-[10px] uppercase tracking-wider text-amber-200">
                        {t.save}
                      </span>
                    )}
                    <span className="font-serif text-lg">{t.p}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Longer stays can be discussed individually.
        </p>
      </Section>

      {/* BOOKING PROCESS */}
      <Section className="bg-card">
        <div className="text-center">
          <Eyebrow>How it works</Eyebrow>
          <H2>How Booking Works</H2>
        </div>

        <div className="mt-12 space-y-4">
          {[
            { n: "01", t: "Request your stay.", d: "Fill out a short, personal form." },
            { n: "02", t: "We confirm availability personally.", d: "A real conversation, not an automated system." },
            { n: "03", t: "Secure your reservation with a deposit.", d: "Remaining balance is paid upon arrival." },
          ].map((s) => (
            <div
              key={s.n}
              className="flex gap-5 rounded-2xl border border-foreground/15 bg-card p-6 shadow-sm"
            >
              <div className="font-serif text-3xl font-light text-foreground/30">{s.n}</div>
              <div>
                <p className="font-serif text-lg">{s.t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-foreground/15 bg-card p-6 text-center">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Shared deposit
            </p>
            <p className="mt-3 font-serif text-3xl font-light">€300</p>
          </div>
          <div className="rounded-2xl border border-foreground/15 bg-card p-6 text-center">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Private deposit
            </p>
            <p className="mt-3 font-serif text-3xl font-light">€450</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <CTA />
        </div>
      </Section>

      <ImageBand src={natureSwim.url} alt="Swimming in clear sea water" />

      {/* LOCATION */}
      <Section>
        <div className="text-center">
          <Eyebrow>Where we are</Eyebrow>
          <H2>Hidden In The Mountains Of North Evia</H2>
        </div>

        <div className="mt-10 space-y-4 text-center text-muted-foreground">
          <p>Lucid Village is located in the mountains of North Evia, Greece.</p>
          <p className="font-serif text-xl font-light text-foreground sm:text-2xl">
            No neighbors. No traffic. No distractions.
          </p>
          <p>Only forests, mountains, fresh air and ocean views.</p>
        </div>

        <p className="mt-10 text-center text-xs uppercase tracking-[0.22em] text-muted-foreground">
          For privacy & safety, the exact location is shared after booking.
        </p>
      </Section>

      {/* GETTING HERE */}
      <Section id="getting-here" className="bg-card">
        <div className="text-center">
          <Eyebrow>Your journey</Eyebrow>
          <H2>Getting Here</H2>
        </div>

        <div className="mt-12 space-y-4">
          {[
            {
              n: "01",
              icon: Bus,
              t: "Take the direct bus from Athens to Edipsos Port.",
              btn: { label: "Bus Station", href: "https://maps.app.goo.gl/KWcoRXP4zuK4D6iBA" },
            },
            {
              n: "02",
              icon: Car,
              t: "Take a taxi from Edipsos Port.",
              sub: "Travel time — 25 minutes.",
              btn: { label: "Destination", href: "https://share.google/psWfHu6aSizEynxxF" },
            },
            {
              n: "03",
              icon: MapPin,
              t: "The Lucid Village team personally picks you up and drives you to the village.",
            },
          ].map((s) => (
            <div
              key={s.n}
              className="flex gap-5 rounded-2xl border border-foreground/15 bg-card p-6 shadow-sm"
            >
              <div className="flex flex-col items-center">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-foreground/10">
                  <s.icon className="h-4 w-4" />
                </span>
                <span className="mt-2 font-serif text-xs text-foreground/40">{s.n}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="leading-relaxed">{s.t}</p>
                {s.sub && <p className="mt-1 text-sm text-muted-foreground">{s.sub}</p>}
                {s.btn && (
                  <a
                    href={s.btn.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-xs uppercase tracking-wider transition hover:bg-foreground hover:text-background"
                  >
                    {s.btn.label} <ArrowRight className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs italic text-muted-foreground">
          The exact location is intentionally private.
        </p>
      </Section>

      {/* QUICK FACTS */}
      <Section>
        <div className="text-center">
          <Eyebrow>Quick facts</Eyebrow>
          <H2>Good To Know</H2>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          {[
            { icon: Plane, t: "3.5 hours from Athens Airport" },
            { icon: Bus, t: "30 minutes from Edipsos Port" },
            { icon: Car, t: "Transportation is not included" },
            { icon: Clock, t: "Detailed travel instructions sent after booking" },
          ].map((f) => (
            <div
              key={f.t}
              className="flex items-center gap-3 rounded-2xl border border-foreground/15 bg-card p-5 shadow-sm"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-foreground/10">
                <f.icon className="h-4 w-4" />
              </span>
              <span className="text-sm">{f.t}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* TRANSPORT OPTIONS — FAQ */}
      <Section className="bg-card">
        <div className="text-center">
          <Eyebrow>Transport options</Eyebrow>
          <H2>How To Reach Us</H2>
        </div>

        <Accordion type="single" collapsible className="mt-10 space-y-3">
          <AccordionItem
            value="bus"
            className="rounded-2xl border border-foreground/15 bg-card px-5 shadow-sm"
          >
            <AccordionTrigger className="py-5 text-left">
              <span className="flex items-center gap-3">
                <Bus className="h-4 w-4" /> Public bus
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
              Frequent buses run from Athens directly to Edipsos.
              <a
                href="https://share.google/DhRnlOaMsU0Do5GMe"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-foreground underline-offset-4 hover:underline"
              >
                View bus station <ArrowRight className="h-3 w-3" />
              </a>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="private"
            className="rounded-2xl border border-foreground/15 bg-card px-5 shadow-sm"
          >
            <AccordionTrigger className="py-5 text-left">
              <span className="flex items-center gap-3">
                <Car className="h-4 w-4" /> Private transfer
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
              Private pickup can be arranged for an additional fee.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="rental"
            className="rounded-2xl border border-foreground/15 bg-card px-5 shadow-sm"
          >
            <AccordionTrigger className="py-5 text-left">
              <span className="flex items-center gap-3">
                <Plane className="h-4 w-4" /> Rental car
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
              Rental cars are available at Athens Airport.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          We're happy to help coordinate your journey.
        </p>
      </Section>

      {/* ARRIVAL & DEPARTURE */}
      <Section>
        <div className="text-center">
          <Eyebrow>Plan your travel</Eyebrow>
          <H2>Arrival & Departure</H2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-foreground/15 bg-card p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Arrival</p>
            <p className="mt-3 font-serif text-xl font-light leading-snug">
              Arrive in Athens before 12:00 PM
            </p>
          </div>
          <div className="rounded-2xl border border-foreground/15 bg-card p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Departure</p>
            <p className="mt-3 font-serif text-xl font-light leading-snug">
              Book flights after 7:00 PM
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          A relaxed journey without rushing.
        </p>
      </Section>

      {/* QUESTIONS */}
      <Section className="bg-card">
        <div className="text-center">
          <Eyebrow>Get in touch</Eyebrow>
          <H2>Questions?</H2>
          <p className="mt-6 text-muted-foreground">
            Preferred communication — WhatsApp.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          <a
            href="https://wa.me/306980358981"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 rounded-2xl bg-[#25D366] p-5 text-white shadow-sm transition hover:opacity-90"
          >
            <MessageCircle className="h-5 w-5" />
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-[0.22em] opacity-80">WhatsApp</p>
              <p className="truncate font-serif text-lg">+30 698 035 8981</p>
            </div>
            <ArrowRight className="h-4 w-4" />
          </a>

          {[
            {
              icon: Instagram,
              label: "Instagram DM",
              value: "@lucidvillage",
              href: "https://www.instagram.com/direct/t/107878293942329",
            },
            {
              icon: Phone,
              label: "Call or SMS",
              value: "+30 698 035 8981",
              href: "tel:+306980358981",
            },
            {
              icon: Mail,
              label: "Email",
              value: "jonathanhuliaros@hotmail.com",
              href: "mailto:jonathanhuliaros@hotmail.com",
            },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-foreground/15 bg-card p-5 shadow-sm transition hover:border-foreground/30"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-foreground/10">
                <c.icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {c.label}
                </p>
                <p className="truncate text-sm">{c.value}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </a>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          We're happy to answer questions and help you decide whether Lucid Village is the right
          fit.
        </p>
      </Section>

      {/* FINAL CTA */}
      <section className="relative isolate overflow-hidden">
        <img
          src={villageAerial.url}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/45 to-black/70" />
        <div className="mx-auto max-w-2xl px-6 py-28 text-center text-white sm:py-36">
          <Eyebrow>
            <span className="text-white/70">Your next chapter</span>
          </Eyebrow>
          <h2 className="mt-5 font-serif text-4xl font-light leading-[1.05] sm:text-5xl">
            Come and see for yourself.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-white/85">
            Every stay begins with a short, personal conversation.
          </p>
          <div className="mt-10">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-5 text-xs font-medium uppercase tracking-[0.22em] text-stone-900 shadow-lg transition hover:bg-stone-100"
            >
              Request Your Stay <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
