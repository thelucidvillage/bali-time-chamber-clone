import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-mountains.jpg";
import cabinImg from "@/assets/cabin.jpg";
import cabin2Img from "@/assets/908b6d46-3365-4be6-8959-61b9985b7fe4.jpg";
import cabin3Img from "@/assets/aa710589-ec0f-4f37-a5cb-3524cc3024b7.jpg";
import cabin4Img from "@/assets/763ab336-9329-44b2-9041-3eacef93f799.jpg";
import cabin5Img from "@/assets/8f808091-1a43-4847-b24c-59f9a0ebb3b8.jpg";
import gymImg from "@/assets/gym.jpg";
import gym2Img from "@/assets/ae20129d-af03-4d7e-a862-464053248e79.jpg";
import saunaImg from "@/assets/34e03719-7c85-495e-9151-d092e0bd443b.jpg";
import sauna2Img from "@/assets/62ce08e2-5241-406d-836b-101d04a0dc41.jpg";
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
          To help people find themselves &amp; <span className="text-gold italic">build a life that reflects it</span>.
        </h2>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
          <p>
            In a world of endless screens, notifications, and a 9-to-5 that quietly consumes everything, a subtle but deep disconnection slowly settles in from your body, from nature, and from who you truly are. We exist to change that.{"\n\n"}
            This is not an escape. It’s a return{"\n\n"}
            to purposeful work, food grown from the earth, movement that feels alive, natural stillness, and real connection with people who share your values. Here, your nervous system resets, your body realigns, and you rediscover clarity, presence, and aliveness as your new baseline.{"\n\n"}
            No distractions. No excess. No performance. Just sun, salt, earth, effort, and connection. We help you remember what you are — and build a life that truly reflects it.
          </p>
        </div>
      </div>
    </section>
  );
}

import { Flame, Droplets, Mountain, Users, Dumbbell, UtensilsCrossed, BedDouble, Wifi, Laptop } from "lucide-react";

const HIGHLIGHTS = [
  { icon: Flame, text: "Recovery centre with sauna & cold plunge" },
  { icon: Droplets, text: "Unlimited Access to Nature’s Wonders:\n\nNatural hot springs, private islands, waterfalls, freediving spots, hidden beaches, and breathtaking hiking trails — all within easy reach." },
  { icon: Mountain, text: "Secluded mountain location in Greece" },
  { icon: Users, text: "Community of like-minded guests" },
  { icon: Dumbbell, text: "Fully equipped open-air gym" },
  { icon: UtensilsCrossed, text: "Home-cooked, nourishing meals" },
  { icon: BedDouble, text: "Multiple cozy accommodation options for private & shared stays" },
  { icon: Wifi, text: "High-speed internet throughout the village" },
  { icon: Laptop, text: "Online training platform to support your transformation before & after your visit" },
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

type Facility = {
  images: string[];
  title: string;
  text: string;
};

const FACILITIES: Facility[] = [
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
    images: [sauna2Img, saunaImg],
    title: "Recovery Centre (Sauna & Cold Plunge)",
    text:
      "Our dedicated recovery space pairs a traditional wood-burning sauna with an ice-cold plunge — the ultimate contrast ritual to reset your nervous system, sharpen your mind and accelerate physical recovery after every session.",
  },
  {
    images: [],
    title: "All meals included",
    text:
      "All meals are included — breakfast, lunch, and dinner.\n\nWe serve simple, high-quality, nutrient-dense Greek food:\n- Grass-fed red meat from small Olympus farmers\n- Free-range eggs\n- Fresh seasonal vegetables and fruits\n- Local honey and olive oil\n\nEverything is locally sourced to fuel your body and support Greek producers.\n\nClean, nourishing, and delicious — no processed junk. Just real food done right.",
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
  {
    images: [],
    title: "Also included in the experience",
    text:
      "- Community of inspiring guests: You'll tap into the uplifting energy of other committed, growth-oriented individuals walking a similar path. Together, you'll build authentic friendships and connections that will deeply inspire, empower, challenge, and support you — both personally and professionally — long after you leave.\n- High-speed internet\n- Amenities such as towels, soaps and more\n- All laundry & cleaning services",
  },
];

const TEXT_TESTIMONIALS = [
  {
    quote:
      "An experience that completely reset my body and mind. The people, the food, the training — everything was on another level.",
    name: "Guest",
  },
  {
    quote:
      "The most authentic place I've ever stayed. You can feel the soul in every corner of the village.",
    name: "Guest",
  },
  {
    quote:
      "I came for a week and left with friends for life and a clearer vision for my future.",
    name: "Guest",
  },
];

const VIDEO_TESTIMONIALS = [
  "1eRZw9lmjWPO2hMFLdlJkV5FmwhpKyC2Z",
  "1VsQY58TE15EilNtWx1Jz_zyszFTifzav",
  "12gDLcRh1IFchqf4fOd65aNm36sgWfFLb",
  "1ZMuCA6PJ6Dyhk4flot_cVL2m7BGSe5y_",
  "1heaHYvY2DK5QMAcNCTGFzIfW36tXogwx",
  "14exgq3qXhJIXcvFM-NI7Jqr4qHKw8-u7",
  "10BDjTiHYY7A0Wjrn3ZTOdkxwekYqLuM3",
  "1qQKPyV44yyQMo3nLXRTWSMOObflbua-v",
  "14Q0iXQSzAtAE2CkEqnWC5JtaS-d_l0aL",
];

const ABOUT_SLIDES = [
  {
    eyebrow: "The Family & The People",
    title: "Our Story – The Lucid Village",
    body: `Lucid Village was built with our own hands, heart, and soul. For three years, my family and I — with the help of close friends — carried every stone and beam up the hill and constructed this place from the ground up.

This is not a business. This is our family home.

It is the same land where I took my first steps, climbed trees, and later found myself during the hardest chapters of my life. Every corner was created with love, effort, and sacrifice. There are no investors, no corporate designs — only raw authenticity and soul.

In a world of polished, luxury retreats, Lucid Village stands apart as a living, breathing sanctuary with a real story — one that we now open to you.`,
  },
  {
    eyebrow: "Your Host",
    title: "Jonathan Huliaros",
    subtitle: "Founder, Host & Strength & Movement Coach",
    body: `With over 15 years of experience, Jonathan is a dedicated Strength & Movement Coach who has guided hundreds of people through workshops, courses, and personal training. His approach blends parkour, calisthenics, martial arts, climbing, natural movement, and intelligent strength training.

He specializes in helping people rebuild a deep, loving relationship with their body — turning movement into a source of joy, confidence, and self-discovery.`,
  },
  {
    eyebrow: "How It All Began",
    title: "My journey started at rock bottom.",
    body: `After years of living a life that wasn't mine, I fell into deep depression. I dropped my studies, quit my job, bought an old van, turned it into a mobile gym, and drove away in search of answers.

Six years of van life across Europe taught me resilience, freedom, and the importance of surrounding myself with the right people. But something was still missing.

In 2022, I flew to Bali and stepped into the legendary Time Chamber created by my friend Nico De Paoli. That experience changed everything. For the first time, I felt the transformative power of an intentionally designed environment.

I came home with a clear mission: to create something similar — but deeper, more rooted, and real.

The Lucid Village is the embodiment of that vision — my life's most important project.`,
  },
];

function AboutUs() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="tracking-display text-center text-xs uppercase text-gold">About Us</p>
        <h2 className="mt-4 text-center font-serif text-4xl sm:text-5xl font-light">
          The people behind the Village
        </h2>
        <div className="mt-16 grid grid-cols-2 items-center gap-6 sm:gap-10">
          {/* Left: image carousel (empty placeholder slides — add images later) */}
          <div className="relative">
            <Carousel opts={{ loop: true }} className="w-full">
              <CarouselContent>
                {ABOUT_SLIDES.map((_, idx) => (
                  <CarouselItem key={idx}>
                    <div className="flex aspect-[4/3] w-full items-center justify-center bg-muted text-muted-foreground">
                      <span className="tracking-display text-xs uppercase">Image {idx + 1}</span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-3 border-foreground/20 bg-background/70 text-foreground hover:bg-background" />
              <CarouselNext className="right-3 border-foreground/20 bg-background/70 text-foreground hover:bg-background" />
            </Carousel>
          </div>

          {/* Right: text carousel */}
          <div className="relative">
            <Carousel opts={{ loop: true }} className="w-full">
              <CarouselContent>
                {ABOUT_SLIDES.map((s, idx) => (
                  <CarouselItem key={idx}>
                    <div className="px-2">
                      <p className="tracking-display text-xs uppercase text-gold">{s.eyebrow}</p>
                      <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-light">{s.title}</h3>
                      {s.subtitle && (
                        <p className="mt-2 text-sm uppercase tracking-display text-muted-foreground">
                          {s.subtitle}
                        </p>
                      )}
                      <p className="mt-5 whitespace-pre-line text-muted-foreground leading-relaxed">
                        {s.body}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-3 border-foreground/20 bg-background/70 text-foreground hover:bg-background" />
              <CarouselNext className="right-3 border-foreground/20 bg-background/70 text-foreground hover:bg-background" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}

function Facilities() {
  return (
    <section id="facilities" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="tracking-display text-center text-xs uppercase text-gold">What is included</p>
        <h2 className="mt-4 text-center font-serif text-4xl sm:text-5xl font-light">
          Everything you need to reset, connect & transform
        </h2>
        <div className="mt-16 space-y-20">
          {FACILITIES.map((f, i) => {
            const hasImages = f.images.length > 0;
            if (!hasImages) {
              return (
                <div key={f.title} className="mx-auto max-w-3xl text-center">
                  <p className="tracking-display text-xs uppercase text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-light">{f.title}</h3>
                  <p className="mt-5 whitespace-pre-line text-muted-foreground leading-relaxed text-left sm:text-center">
                    {f.text}
                  </p>
                </div>
              );
            }
            return (
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
                            className="aspect-[4/3] w-full object-contain"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-3 border-foreground/20 bg-background/70 text-foreground hover:bg-background" />
                    <CarouselNext className="right-3 border-foreground/20 bg-background/70 text-foreground hover:bg-background" />
                  </Carousel>
                </div>
                <div>
                  <p className="tracking-display text-xs uppercase text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-light">{f.title}</h3>
                  <p className="mt-5 whitespace-pre-line text-muted-foreground leading-relaxed">
                    {f.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="bg-card border-y border-border/40 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <p className="tracking-display text-center text-xs uppercase text-gold">
          Real people, real testimonials
        </p>
        <h2 className="mt-4 text-center font-serif text-4xl sm:text-5xl font-light">
          What people said about their experience
        </h2>

        {/* Text testimonials carousel */}
        <div className="mt-14 px-10">
          <Carousel opts={{ loop: true }} className="w-full">
            <CarouselContent>
              {TEXT_TESTIMONIALS.map((t, idx) => (
                <CarouselItem key={idx}>
                  <figure className="mx-auto max-w-2xl text-center">
                    <blockquote className="font-serif text-2xl sm:text-3xl font-light italic leading-relaxed text-foreground/90">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="mt-6 tracking-display text-xs uppercase text-gold">
                      — {t.name}
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-foreground/20 bg-background/70 text-foreground hover:bg-background" />
            <CarouselNext className="border-foreground/20 bg-background/70 text-foreground hover:bg-background" />
          </Carousel>
        </div>

        {/* Video testimonials carousel */}
        <div className="mt-20">
          <p className="tracking-display text-center text-xs uppercase text-gold">
            Video testimonials
          </p>
          <h3 className="mt-3 text-center font-serif text-2xl sm:text-3xl font-light">
            Hear it directly from our guests
          </h3>
          <div className="mt-10 px-10">
            <Carousel opts={{ loop: true }} className="w-full">
              <CarouselContent>
                {VIDEO_TESTIMONIALS.map((id) => (
                  <CarouselItem key={id} className="sm:basis-1/2 lg:basis-1/3">
                    <div className="aspect-[9/16] w-full overflow-hidden border border-border bg-black">
                      <iframe
                        className="h-full w-full"
                        src={`https://drive.google.com/file/d/${id}/preview`}
                        title="Guest testimonial"
                        loading="lazy"
                        allow="autoplay"
                        allowFullScreen
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="border-foreground/20 bg-background/70 text-foreground hover:bg-background" />
              <CarouselNext className="border-foreground/20 bg-background/70 text-foreground hover:bg-background" />
            </Carousel>
          </div>
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
        <p className="mt-6 text-muted-foreground whitespace-pre-line">
          Visits are designed to be flexible — Come for 3 days, a week or a full month.
          Get the free brochure with pricing, dates and everything included in your stay by clicking below.
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
    a: (
      <div className="space-y-8">
        <div>
          <p className="font-serif text-lg text-foreground uppercase tracking-wider text-gold mb-3">WHO THIS IS FOR</p>
          <p className="font-medium text-foreground mb-4">Lucid Village is not for everyone — and that’s exactly why it works.</p>
          <p className="mb-4">
            This is for people who are already on the path. You’ve been training, eating real food, and doing the inner work. You know the feeling of pushing your body and coming alive — but lately you sense there’s more. You’re craving deeper clarity, real connection, and a stronger version of yourself.
          </p>
          <p className="mb-3 font-medium text-foreground">This is for you if:</p>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>You’re ready to step away from the noise and reset.</li>
            <li>You want to train, work, and live with people who truly get it.</li>
            <li>You’re comfortable with simple, rustic living and turning your phone off.</li>
            <li>You already have discipline and don’t need hand-holding.</li>
          </ul>
          <p className="italic">If you’re ready for the next level, you’ll feel right at home. Your people are waiting.</p>
        </div>

        <div className="pt-4 border-t border-border/40">
          <p className="font-serif text-lg text-foreground uppercase tracking-wider text-gold mb-3">Who this is NOT for</p>
          <p className="font-medium text-foreground mb-4">Lucid Village is not for everyone — and we’re clear about that.</p>
          <p className="mb-3 font-medium text-foreground">This isn’t the right fit if:</p>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>You want luxury, comfort, and five-star service.</li>
            <li>You expect constant entertainment or staff looking after you.</li>
            <li>You want to stay completely isolated (this is communal living).</li>
            <li>You’re looking for guided programs and hand-holding.</li>
            <li>You haven’t been active and aren’t ready to move daily.</li>
            <li>You’re coming to party or use substances.</li>
          </ul>
          <p>If these describe you, this probably isn’t the right place. Lucid Village feels special because of the quality of people who come. <span className="font-medium text-foreground italic">When the right people gather, the magic happens.</span></p>
        </div>
      </div>
    ),
  },
  {
    q: "What are the ways to experience the Village?",
    a: (
      <div className="space-y-5">
        <p>There are three ways to join us — pick the one that fits you best:</p>
        <div>
          <p className="font-serif text-lg text-foreground">1. Open Stays <span className="text-gold text-xs tracking-display uppercase">Most popular</span></p>
          <p className="mt-1">Complete freedom and flexibility — no fixed schedule. You shape your days exactly as you wish. Your host, an experienced Strength &amp; Movement Coach, is on hand to guide and support your training whenever you need.</p>
        </div>
        <div>
          <p className="font-serif text-lg text-foreground">2. Curated Events</p>
          <p className="mt-1">Themed group experiences with more structure and guidance. Ideal if you enjoy training and connecting with like-minded people. Follow <a href="https://instagram.com/thelucidvillage" target="_blank" rel="noreferrer" className="text-gold underline underline-offset-4">@thelucidvillage</a> on Instagram for upcoming dates.</p>
        </div>
        <div>
          <p className="font-serif text-lg text-foreground">3. One-Day Access</p>
          <p className="mt-1">Drop in for a single full day — training, workspace, nourishing meals and connection. No overnight stay.</p>
        </div>
      </div>
    ),
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
    a: (
      <div className="space-y-6">
        <div>
          <p className="font-serif text-lg text-foreground mb-2">Where are you located?</p>
          <p>
            Lucid Village is nestled in the mountains of North Evia (Euboea), Greece — a remote, peaceful sanctuary with no neighbors and zero distractions.
          </p>
          <p className="mt-3">
            <a 
              href="https://maps.app.goo.gl/2VHC3DrLpfQPWUwcA" 
              target="_blank" 
              rel="noreferrer" 
              className="text-gold underline underline-offset-4"
            >
              📍The Lucid village Location
            </a>
          </p>
        </div>

        <div className="pt-4 border-t border-border/40">
          <p className="font-serif text-lg text-foreground mb-2">How long does it take to get here?</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>3.5 hours door-to-door from Athens International Airport (ATH)</li>
            <li>30 minutes from the port of Edipsos</li>
          </ul>
        </div>

        <div className="pt-4 border-t border-border/40">
          <p className="font-serif text-lg text-foreground mb-2">Transportation Options</p>
          <p className="mb-3 italic">
            Transportation is not included in your stay, but once you book we’ll send you detailed instructions tailored to your arrival.
          </p>
          
          <p className="font-medium text-foreground mb-1">From Athens Airport:</p>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li><span className="text-foreground">Bus:</span> Frequent public buses from Athens directly to Edipsos port (most convenient public option)</li>
            <li><span className="text-foreground">Private transfer:</span> We can arrange a pickup car for you (additional cost)</li>
            <li><span className="text-foreground">Car rental:</span> Available at the airport</li>
          </ul>

          <p className="font-medium text-foreground mb-1">From Edipsos Port to Lucid Village (30 min):</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Taxi</li>
            <li>Personal pickup by the team (upon request)</li>
          </ul>
        </div>

        <div className="pt-4 border-t border-border/40">
          <p>
            We’re happy to help coordinate your journey and make the process as smooth as possible.
          </p>
          <p className="mt-4 font-medium text-foreground">
            Feel free to contact us for any questions or reserving your spot:
          </p>
          <a 
            href={WHATSAPP} 
            target="_blank" 
            rel="noreferrer" 
            className="mt-2 inline-flex items-center gap-2 text-gold hover:underline"
          >
            🟢 WhatsApp: +30 698 035 8981
          </a>
        </div>
      </div>
    ),
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
              <div className="mt-4 text-muted-foreground leading-relaxed">{f.a}</div>
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
          <a href="https://tally.so/r/68AeZB" target="_blank" rel="noreferrer" className="hover:text-foreground">Pricing</a>
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
      <AboutUs />
      <Facilities />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
