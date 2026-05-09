import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-mountains.jpg";
import cabinImg from "@/assets/cabin.jpg";
import cabin2Img from "@/assets/908b6d46-3365-4be6-8959-61b9985b7fe4.jpg";
import cabin3Img from "@/assets/aa710589-ec0f-4f37-a5cb-3524cc3024b7.jpg";
import cabin4Img from "@/assets/763ab336-9329-44b2-9041-3eacef93f799.jpg";
import cabin5Img from "@/assets/8f808091-1a43-4847-b24c-59f9a0ebb3b8.jpg";
import gymImg from "@/assets/gym.jpg";
import gym2Img from "@/assets/gym-2.jpg";
import saunaImg from "@/assets/sauna.jpg";
import sauna2Img from "@/assets/sauna-2.jpg";
import advWaterfallImg from "@/assets/adv-waterfall.jpg";
import advCanyonImg from "@/assets/adv-canyon.jpg";
import advFreediveImg from "@/assets/adv-freedive.jpg";
import advHikeImg from "@/assets/adv-hike.jpg";
import advKayakImg from "@/assets/adv-kayak.jpg";
import advBeachImg from "@/assets/adv-beach.jpg";
import logoImg from "@/assets/logo.png";
import { useBrochureModal } from "@/components/BrochureModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Lucid Village — Off-Grid Retreat for Athletes & Entrepreneurs" },
      {
        name: "description",
        content:
          "A natural off-grid village designed for athletes, entrepreneurs and families to heal, grow and find themselves.",
      },
      { property: "og:title", content: "The Lucid Village" },
      {
        property: "og:description",
        content:
          "A natural off-grid village to heal, grow and find yourself.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Index,
});

const WHATSAPP = "https://wa.me/306980358981";

function TopBanner() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      className="bg-banner block w-full"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 text-xs sm:text-sm tracking-display uppercase">
        <span className="font-medium">Now booking — Stays open year-round</span>
        <span className="flex items-center gap-3 font-semibold">
          Book your stay
          <span aria-hidden>→</span>
        </span>
      </div>
    </a>
  );
}

function Header() {
  return (
    <header className="border-b border-border/50 bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-6">
        <img src={logoImg} alt="The Lucid Village logo" width={64} height={64} className="h-14 w-14" />
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative isolate flex min-h-[88vh] items-center justify-center overflow-hidden">
      <img
        src={heroImg}
        alt="Aerial view of the Lucid Village in the mountains"
        width={1920}
        height={1080}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/30 to-background" />
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="tracking-display text-xs sm:text-sm text-gold uppercase">
          Off-grid retreat · Greece
        </p>
        <h1 className="mt-6 font-serif text-5xl sm:text-7xl md:text-8xl font-light leading-tight">
          The Lucid Village
        </h1>
        <p className="mx-auto mt-8 max-w-2xl font-serif italic text-lg sm:text-xl text-foreground/90">
          A natural living off-grid village designed for athletes, entrepreneurs &amp; families
          to heal, grow &amp; find themselves.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#pricing"
            className="inline-flex min-w-56 items-center justify-center border border-foreground/80 bg-foreground/95 px-8 py-3 text-sm tracking-display uppercase text-background transition hover:bg-foreground"
          >
            Details &amp; Pricing
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-w-56 items-center justify-center border border-primary bg-primary px-8 py-3 text-sm tracking-display uppercase text-primary-foreground transition hover:opacity-90"
          >
            Book your stay
          </a>
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section className="bg-card py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="tracking-display text-xs sm:text-sm uppercase text-foreground/80 border-b border-border/60 pb-4 inline-block">
          Full immersion with our film
        </p>
        <div className="mt-10 aspect-video w-full overflow-hidden border border-border bg-black">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/YblcRspVrtk"
            title="Welcome to The Lucid Village"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="tracking-display text-sm uppercase text-gold">Our Mission</p>
        <h2 className="mt-6 font-serif text-4xl sm:text-5xl font-light">
          Building a new generation of <span className="text-gold italic">awakened humans</span>
        </h2>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
          <p>
            The screens. The indoor routines. The endless notifications. The 9-to-5 that quietly spills into everything else. The same conversations, on repeat.{"\n\n"}
            On the surface, everything works. You move. You train. You eat well. You’re functioning.{"\n\n"}
            But underneath, there’s something harder to ignore.{"\n\n"}
            Not burnout. Not breakdown.{"\n"}
            Just a subtle, persistent disconnection.{"\n\n"}
            From the environment. From your body. From something more essential.{"\n\n"}
            Modern life doesn’t feel like a prison because it’s been normalized. But the body remembers. Every time you step outside the pattern—into the sun, into the ocean, into effort that actually matters—you feel it.{"\n\n"}
            Clarity. Presence. Aliveness.{"\n\n"}
            Lucid Village exists to make that state the baseline again.{"\n\n"}
            This is not an escape. It’s a return.{"\n\n"}
            A return to physical work with purpose.{"\n"}
            To food that comes from the ground and is prepared with intention.{"\n"}
            To movement that isn’t performed, but lived.{"\n"}
            To stillness that isn’t forced, but arises naturally.{"\n"}
            To small groups of people who share values, not just space.{"\n\n"}
            We create environments where the nervous system can reset, where the body can recalibrate, and where people can experience—directly—what it feels like to live in alignment with their design.{"\n\n"}
            No distractions. No excess. No performance.{"\n\n"}
            Just sun, salt, earth, effort, recovery, and connection.{"\n\n"}
            Our mission is simple:{"\n\n"}
            To help people remember what they are—and build a life that reflects it.
          </p>
        </div>
      </div>
    </section>
  );
}

import { Flame, Droplets, Mountain, Users, Dumbbell, UtensilsCrossed } from "lucide-react";

const HIGHLIGHTS = [
  { icon: Flame, text: "Recovery centre with sauna & cold plunge" },
  { icon: Droplets, text: "Direct access to natural hot springs" },
  { icon: Mountain, text: "Secluded mountain location in Greece" },
  { icon: Users, text: "Community of like-minded guests" },
  { icon: Dumbbell, text: "Fully equipped open-air gym" },
  { icon: UtensilsCrossed, text: "Home-cooked, nourishing meals" },
];

function Highlights() {
  return (
    <section className="bg-card border-y border-border/40 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="tracking-display text-center text-xs uppercase text-gold">
          A one-of-a-kind experience
        </p>
        <h2 className="mt-4 text-center font-serif text-3xl sm:text-4xl font-light">
          What makes the Village
        </h2>
        <ul className="mt-12 grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-start gap-4 border-b border-border/40 pb-4 text-foreground/90"
            >
              <Icon className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
              <span className="font-serif text-lg">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const FACILITIES = [
  {
    images: [cabinImg, cabin2Img, cabin3Img, cabin4Img, cabin5Img],
    title: "Accommodation",
    text:
      "A spacious guesthouse comfortably accommodating up to 10 guests. Choose between a private room or a cozy shared bed space, all surrounded by forest and mountains.",
  },
  {
    images: [gymImg, gym2Img],
    title: "Hybrid Open-Air Gym",
    text:
      "Train in the elements with a fully-equipped outdoor gym — racks, barbells, dumbbells, rings and everything you need to reach peak performance.",
  },
  {
    images: [saunaImg, sauna2Img],
    title: "Recovery Centre (Sauna & Cold Plunge)",
    text:
      "Our dedicated recovery space pairs a traditional wood-burning sauna with an ice-cold plunge — the ultimate contrast ritual to reset your nervous system, sharpen your mind and accelerate physical recovery after every session.",
  },
  {
    images: [
      advWaterfallImg,
      advCanyonImg,
      advFreediveImg,
      advHikeImg,
      advKayakImg,
      advBeachImg,
    ],
    title: "Nature Adventures",
    text:
      "Step outside the village and the wild becomes your playground — swim in turquoise waterfall pools, explore dramatic canyons, freedive to forgotten shipwrecks, summit mountain peaks at sunrise, kayak across crystal-clear water to the private island of Lichadonisia, and end the day training and grilling on the beach. Every week here is a new adventure.",
  },
];

function Facilities() {
  return (
    <section id="facilities" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="tracking-display text-center text-xs uppercase text-gold">Facilities</p>
        <h2 className="mt-4 text-center font-serif text-4xl sm:text-5xl font-light">
          Everything you need, nothing you don't
        </h2>
        <div className="mt-16 space-y-20">
          {FACILITIES.map((f, i) => (
            <div
              key={f.title}
              className={`grid items-center gap-10 md:grid-cols-2 ${
                i % 2 ? "md:[&>div.facility-media]:order-2" : ""
              }`}
            >
              <div className="facility-media relative">
                <Carousel opts={{ loop: true }} className="w-full">
                  <CarouselContent>
                    {f.images.map((src, idx) => (
                      <CarouselItem key={idx}>
                        <img
                          src={src}
                          alt={`${f.title} — ${idx + 1}`}
                          width={1280}
                          height={960}
                          loading="lazy"
                          className="aspect-[4/3] w-full object-cover"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-3 border-foreground/20 bg-background/70 text-foreground hover:bg-background" />
                  <CarouselNext className="right-3 border-foreground/20 bg-background/70 text-foreground hover:bg-background" />
                </Carousel>
              </div>
              <div>
                <p className="tracking-display text-xs uppercase text-gold">0{i + 1}</p>
                <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-light">{f.title}</h3>
                <p className="mt-5 text-muted-foreground leading-relaxed">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const { open } = useBrochureModal();
  return (
    <section id="pricing" className="bg-card py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="tracking-display text-xs uppercase text-gold">Pricing &amp; Details</p>
        <h2 className="mt-4 font-serif text-4xl sm:text-5xl font-light">
          Reserve your space
        </h2>
        <p className="mt-6 text-muted-foreground">
          Stays are designed to be flexible — by the week or the month. Reach out
          via WhatsApp and we'll send you the full brochure with pricing, dates and
          everything included in your stay.
        </p>
        <div className="mt-10">
          <a
            href="https://tally.so/r/68AeZB"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center border border-primary bg-primary px-10 py-4 text-sm tracking-display uppercase text-primary-foreground transition hover:opacity-90"
          >
            Request the brochure
          </a>
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "Who is the Lucid Village for?",
    a: "Athletes, entrepreneurs, creatives and families looking for a quiet, natural environment to focus, train and reconnect. If you value nature, simplicity and like-minded company, you'll feel at home here.",
  },
  {
    q: "Are there any workshops or classes?",
    a: "No fixed schedule. The value of the experience is the environment itself — facilities are open all day and the rhythm of your stay is yours to design.",
  },
  {
    q: "Is the village really off-grid?",
    a: "Yes. We are tucked away in the mountains, powered by natural systems and surrounded by forest. You'll still have Wi-Fi for work, but the noise of the city is left behind.",
  },
  {
    q: "Can I bring my partner or family?",
    a: "Absolutely. Unlike men-only programs, the Lucid Village welcomes solo travellers, couples and families. Reach out and we'll find the right setup for you.",
  },
  {
    q: "How do I get there?",
    a: "We'll send you full directions when you book. The closest airports are in Greece — most guests arrange a transfer or rental car for the final stretch into the mountains.",
  },
];

function FAQ() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <p className="tracking-display text-center text-xs uppercase text-gold">FAQs</p>
        <h2 className="mt-4 text-center font-serif text-4xl sm:text-5xl font-light">
          Common questions
        </h2>
        <div className="mt-12 divide-y divide-border/60 border-y border-border/60">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl">
                {f.q}
                <span className="text-gold transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center">
        <img src={logoImg} alt="" width={48} height={48} className="h-12 w-12" />
        <p className="font-serif text-2xl">The Lucid Village</p>
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs tracking-display uppercase text-muted-foreground">
          <a href="#facilities" className="hover:text-foreground">Facilities</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="hover:text-foreground">
            WhatsApp
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} The Lucid Village. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="dark min-h-screen bg-background text-foreground">
      <TopBanner />
      <Header />
      <Hero />
      <VideoSection />
      <Mission />
      <Highlights />
      <Facilities />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
