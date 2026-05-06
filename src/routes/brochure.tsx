import { createFileRoute, Link } from "@tanstack/react-router";
import { BrochureButton } from "@/components/BrochureModal";
import heroImg from "@/assets/hero-mountains.jpg";
import cabinImg from "@/assets/cabin.jpg";
import gymImg from "@/assets/gym.jpg";
import saunaImg from "@/assets/sauna.jpg";
import advWaterfallImg from "@/assets/adv-waterfall.jpg";
import advHikeImg from "@/assets/adv-hike.jpg";
import logoImg from "@/assets/logo.png";

export const Route = createFileRoute("/brochure")({
  head: () => ({
    meta: [
      { title: "Lucid Village Brochure — Everything you need to know" },
      {
        name: "description",
        content:
          "The full Lucid Village brochure: mission, accommodation, facilities, adventures, pricing, and how to book.",
      },
      { property: "og:title", content: "Lucid Village Brochure" },
      {
        property: "og:description",
        content: "Everything you need to know about Lucid Village.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Brochure,
});

function Section({
  eyebrow,
  title,
  children,
  image,
  imageAlt,
  reverse,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  image?: string;
  imageAlt?: string;
  reverse?: boolean;
}) {
  return (
    <section className="border-t border-border/40 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        {eyebrow && (
          <p className="tracking-display text-xs uppercase text-gold">{eyebrow}</p>
        )}
        <h2 className="mt-4 font-serif text-4xl sm:text-5xl font-light leading-tight">
          {title}
        </h2>
        {image && (
          <div
            className={`mt-10 ${reverse ? "md:float-right md:ml-10" : "md:float-left md:mr-10"} md:w-1/2`}
          >
            <img
              src={image}
              alt={imageAlt ?? title}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        )}
        <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
          {children}
        </div>
        <div className="clear-both" />
      </div>
    </section>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-10 font-serif text-2xl sm:text-3xl font-light text-foreground">
      {children}
    </h3>
  );
}

function Brochure() {
  return (
    <main className="dark min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/50 bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <Link to="/" className="tracking-display text-xs uppercase text-muted-foreground hover:text-foreground">
            ← Back to site
          </Link>
          <img src={logoImg} alt="The Lucid Village" width={56} height={56} className="h-12 w-12" />
          <BrochureButton className="hidden sm:inline-flex items-center justify-center border border-primary bg-primary px-5 py-2 text-xs tracking-display uppercase text-primary-foreground transition hover:opacity-90">
            Get the PDF
          </BrochureButton>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="Lucid Village"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="tracking-display text-xs uppercase text-gold">The Brochure</p>
          <h1 className="mt-6 font-serif text-5xl sm:text-7xl font-light leading-tight">
            Everything you need to know
          </h1>
          <p className="mx-auto mt-8 max-w-2xl font-serif italic text-lg sm:text-xl text-foreground/90">
            A live, scrollable version of the Lucid Village brochure — read it here, or have the PDF sent to your inbox.
          </p>
          <div className="mt-10 flex justify-center">
            <BrochureButton>Get the PDF Brochure</BrochureButton>
          </div>
        </div>
      </section>

      {/* Mission */}
      <Section eyebrow="Our Mission" title="The Lucid Village Mission">
        <H3>The Problem</H3>
        <p>
          Modern life doesn't feel like a trap. That's why it works. You wake up indoors. You eat food you didn't grow. You drink water from plastic. You move — but inside systems that remove you from reality. You're functioning. Even thriving.
        </p>
        <p>But:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>You haven't been in nature long enough to actually settle</li>
          <li>You haven't done real, physical work that means something</li>
          <li>You haven't felt fully present in your own body</li>
        </ul>
        <p>
          Every time you step outside the pattern — a run, the ocean, a hard session, a day in the sun — you feel like yourself again. Then Monday comes. And it disappears.
        </p>

        <H3>The Realization</H3>
        <p>
          You can be fit, successful, and disciplined… and still be living a life that doesn't fit your wiring. Humans were built for sun, salt, dirt, fire, physical effort, real food, and small groups with shared values.
        </p>
      </Section>

      {/* Concept */}
      <Section eyebrow="The Concept" title="Not an escape — a return">
        <p>
          Lucid Village is a structured, immersive environment designed to reset your system at the deepest level. Here, you will train outdoors with purpose, eat simple real food, disconnect from screens and noise, reconnect with your body and environment, live in a small aligned group, and experience stillness without forcing it.
        </p>
        <p>No performance. No distractions. No excess. Just what actually matters.</p>
        <H3>What Changes</H3>
        <p>People don't leave with motivation. They leave with clarity.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Clear mind</li>
          <li>Regulated nervous system</li>
          <li>Stronger, more capable body</li>
          <li>A felt understanding of what "right" actually feels like</li>
          <li>A network of people who get it — your tribe</li>
        </ul>
      </Section>

      {/* How it works */}
      <Section eyebrow="How It Works" title="An immersive environment, not a fixed program">
        <p>
          There is no rigid schedule. No prescribed path. No one telling you what to do with your time. Everything is built around one principle: <em>radical self-responsibility</em>.
        </p>
        <H3>The Structure (Without Being Structured)</H3>
        <p>
          Spaces to train. Spaces to work. Spaces to connect. Spaces to recover. Your experience is shaped by your intention, your discipline, and your curiosity.
        </p>
        <H3>How People Use It</H3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-foreground">Health & Performance</strong> — train consistently, recover properly, reconnect with your body.</li>
          <li><strong className="text-foreground">Work & Creation</strong> — focus deeply on business, ideas, or building without distraction.</li>
          <li><strong className="text-foreground">Connection & Network</strong> — be around aligned, driven people.</li>
          <li><strong className="text-foreground">Reset & Realignment</strong> — break patterns and gain clarity.</li>
        </ul>
        <H3>The Result</H3>
        <p>You don't leave with instructions. You leave with clarity, momentum, stronger habits, and real connections.</p>
        <p className="font-serif italic text-foreground">Lucid Village doesn't change your life. It removes what's in the way so you can.</p>
      </Section>

      {/* Who this is for */}
      <Section eyebrow="Who It's For" title="This is not for everyone — by design">
        <p>
          Lucid Village is created for people already on a meaningful path and ready for the next level. You've explored training, you eat real food, you understand the fundamentals — and lately you've been craving something deeper.
        </p>
        <H3>This is for you if</H3>
        <ul className="list-disc pl-6 space-y-2">
          <li>You feel called to step away from your daily environment.</li>
          <li>You're ready for a genuine reset — to breathe, reflect, and decide what's next.</li>
          <li>You love being around people who share your values.</li>
          <li>You're open to leaving with a small, supportive tribe.</li>
          <li>You're comfortable with a rustic, honest experience.</li>
          <li>You're happy to put your phone away and be fully present.</li>
        </ul>
        <H3>This is NOT for you if</H3>
        <ul className="list-disc pl-6 space-y-2">
          <li>You're looking for luxury resort comforts, spa services, or five-star pampering.</li>
          <li>You want constant entertainment or staff catering to your every need.</li>
          <li>You prefer total isolation — this is warm communal living.</li>
          <li>You're hoping for fully guided programs and personal trainers.</li>
          <li>You haven't been physically active and aren't ready to move daily.</li>
          <li>You're coming mainly to party or escape through substances.</li>
        </ul>
      </Section>

      {/* Dates */}
      <Section eyebrow="Dates & Stays" title="Are there fixed dates?">
        <p>
          No — and we love that. Lucid Village is an open, living environment. You're welcome anytime there's space. Minimum stay is <strong className="text-foreground">3 days (2 nights)</strong>. Most guests stay between 10 days and one month — the sweet spot for real transformation.
        </p>
        <H3>Ways to Experience Lucid Village</H3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-foreground">Open Stays</strong> — flexible, no fixed schedule. The most popular option.</li>
          <li><strong className="text-foreground">Curated Events</strong> — themed 3 to 30 day experiences. Follow @thelucidvillage.</li>
          <li><strong className="text-foreground">One-Day Access</strong> — full-day access for locals or travellers passing through.</li>
        </ul>
      </Section>

      {/* Accommodation */}
      <Section
        eyebrow="Accommodation"
        title="Simple, beautiful spaces in nature"
        image={cabinImg}
        imageAlt="Lucid Village accommodation"
      >
        <p>
          Three accommodation options, all nestled in nature with stunning views of the mountains and sea.
        </p>
        <H3>The Main Guesthouse</H3>
        <p>
          A spacious home for up to 10 guests. Six sleeping areas upstairs with views, three cozy spots by the fireplace downstairs, one fully private room, fully equipped kitchen, two fireplaces, Starlink, and a large balcony with standing desks.
        </p>
        <H3>The Rustic Guesthouse</H3>
        <p>
          A charming, fully rustic house with an open fireplace, traditional wood-burning oven, outdoor kitchen, second-floor balcony with sweeping sea and mountain views, and an outdoor training platform.
        </p>
        <H3>The Hobbit House</H3>
        <p>
          A sweet, private sanctuary right next to the main guesthouse — perfect for couples or those wanting more privacy. Private bedroom, working desk, Starlink, intimate setting.
        </p>
      </Section>

      {/* Facilities */}
      <Section
        eyebrow="Facilities"
        title="A complete environment for training, recovery & play"
        image={gymImg}
        imageAlt="Open-air gym"
        reverse
      >
        <H3>Recovery Centre</H3>
        <p>
          Traditional wood-burning sauna, ice-cold plunge pool, and outdoor showers. Contrast therapy used daily by guests for faster recovery, reduced inflammation, and mental clarity.
        </p>
        <H3>Hybrid Open-Air Gym</H3>
        <p>
          70m² open-air gym with barbells, racks, dumbbells, kettlebells, gymnastic rings, pull-up bars, and space for bodyweight, mobility, yoga and movement.
        </p>
        <H3>Parkour & Calisthenics Park</H3>
        <p>
          A "rail heaven" surrounded by trees — perfect for parkour, calisthenics, aerial acrobatics, and primal movement.
        </p>
        <H3>Volleyball Field</H3>
        <p>
          A social space where guests connect through play.
        </p>
      </Section>

      {/* Around the village */}
      <Section
        eyebrow="Around the Village"
        title="Nature adventures"
        image={advWaterfallImg}
        imageAlt="Waterfall pool"
      >
        <p>
          Step outside Lucid Village and the wild becomes your playground. Highlights include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Swim and bathe in turquoise waterfall pools and dramatic canyons</li>
          <li>Hike and summit beautiful mountain peaks — including sunrise hikes</li>
          <li>Freedive among forgotten shipwrecks at two locations</li>
          <li>Visit two natural hot springs (15 and 30 minutes away)</li>
          <li>Kayak to the volcanic island of Lichadonisia — a Caribbean-like paradise in Greece</li>
          <li>Bouldering and rock climbing at quality local spots</li>
          <li>Golden sand beaches and hidden coves for training, swimming, fire, and BBQ</li>
        </ul>
      </Section>

      {/* Getting there */}
      <Section
        eyebrow="Getting Here"
        title="Located on the island of Evia, Greece"
        image={advHikeImg}
        imageAlt="Mountain views"
        reverse
      >
        <p>
          Lucid Village is 25 minutes from Edipsos — one of the oldest cities in Greece, where legend says Hercules came to recover in the natural hot springs. Nearest airport: Athens (ATH). Travel time: 3.5–4 hours door-to-door.
        </p>
        <H3>Arrival & Departure</H3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Arrival: land in Athens no later than 12:00 pm.</li>
          <li>Departure: book flights after 7:00 pm (19:00).</li>
        </ul>
        <p>
          Transportation is not included, but once you book we'll send detailed guidance — private transfer, public bus + ferry, or a combination.
        </p>
      </Section>

      {/* What's included */}
      <Section eyebrow="What's Included" title="A true all-inclusive experience">
        <ul className="list-disc pl-6 space-y-2">
          <li>Accommodation in your chosen space</li>
          <li>All nourishing meals — breakfast, lunch, dinner. Local, grass-fed, free-range, seasonal.</li>
          <li>Unlimited access to all facilities</li>
          <li>Transportation between Edipsos port and the village</li>
          <li>All nature adventures — transport to hikes, beaches, hot springs, waterfalls</li>
          <li>High-speed Starlink Wi-Fi throughout</li>
          <li>Towels, toiletries, linen, daily cleaning & laundry</li>
          <li>30 days free access to our online training platform</li>
        </ul>
        <p className="text-sm">
          Note: Flights to Athens and transport from your location to Edipsos port are not included. We provide full guidance.
        </p>
      </Section>

      {/* Pricing */}
      <Section eyebrow="Pricing" title="What you're investing in">
        <p>
          This is not just accommodation. It's a fully integrated environment for physical performance, mental clarity, meaningful connection, and deep personal progress.
        </p>
        <p className="text-sm">Check-in 14:00 · Check-out 11:00 · Minimum stay 3 days (2 nights)</p>

        <H3>Main & Rustic Guesthouse (per person)</H3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border/60 text-foreground">
                <th className="py-3 text-left font-normal tracking-display uppercase text-xs text-gold">Duration</th>
                <th className="py-3 text-left font-normal tracking-display uppercase text-xs text-gold">Nights</th>
                <th className="py-3 text-left font-normal tracking-display uppercase text-xs text-gold">Total</th>
                <th className="py-3 text-left font-normal tracking-display uppercase text-xs text-gold">Per Day</th>
              </tr>
            </thead>
            <tbody className="font-serif">
              {[
                ["Day Pass", "—", "€50", "€50"],
                ["3 Days", "2", "€300", "€100"],
                ["7 Days", "6", "€630", "€90"],
                ["14 Days", "13", "€1,190", "€85"],
                ["21 Days", "20", "€1,680", "€80"],
                ["28 Days", "27", "€1,960", "€70"],
              ].map((r) => (
                <tr key={r[0]} className="border-b border-border/30">
                  {r.map((c, i) => <td key={i} className="py-3 text-base">{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <H3>Private Hobbit House Upgrade (+€15/day)</H3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border/60 text-foreground">
                <th className="py-3 text-left font-normal tracking-display uppercase text-xs text-gold">Duration</th>
                <th className="py-3 text-left font-normal tracking-display uppercase text-xs text-gold">Nights</th>
                <th className="py-3 text-left font-normal tracking-display uppercase text-xs text-gold">Total</th>
                <th className="py-3 text-left font-normal tracking-display uppercase text-xs text-gold">Per Day</th>
              </tr>
            </thead>
            <tbody className="font-serif">
              {[
                ["3 Days", "2", "€345", "€115"],
                ["7 Days", "6", "€725", "€103.50"],
                ["14 Days", "13", "€1,365", "€97.50"],
                ["21 Days", "20", "€1,995", "€95"],
                ["28 Days", "27", "€2,380", "€85"],
              ].map((r) => (
                <tr key={r[0]} className="border-b border-border/30">
                  {r.map((c, i) => <td key={i} className="py-3 text-base">{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <H3>Special Discounts</H3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Bring a friend or partner — both receive 10% off (stays longer than 3 days)</li>
          <li>Returning guests — 10% off your next stay</li>
        </ul>
      </Section>

      {/* How to book */}
      <Section eyebrow="How to Book" title="It's simple" image={saunaImg} imageAlt="Recovery centre" reverse>
        <ol className="list-decimal pl-6 space-y-3">
          <li>
            Send us a message on{" "}
            <a href="https://wa.me/306980358981" className="text-gold underline" target="_blank" rel="noreferrer">WhatsApp</a>
            {" "}or email <a href="mailto:jonathanhuliaros@hotmail.com" className="text-gold underline">jonathanhuliaros@hotmail.com</a>.
          </li>
          <li>Secure your spot with a €300 deposit — fully deductible from your total stay.</li>
        </ol>
        <p>
          We accept custom stay lengths and will happily answer all your questions — travel, accommodations, what to bring, anything. Once your deposit is confirmed, you're officially part of the next Lucid Village chapter.
        </p>
      </Section>

      {/* Final CTA */}
      <section className="border-t border-border/40 py-24 bg-card">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="tracking-display text-xs uppercase text-gold">Take it with you</p>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl font-light">
            Want this as a PDF?
          </h2>
          <p className="mt-6 text-muted-foreground">
            We'll send the full brochure straight to your inbox.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <BrochureButton>Get the PDF Brochure</BrochureButton>
            <a
              href="https://wa.me/306980358981"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-w-56 items-center justify-center border border-foreground/80 px-8 py-3 text-sm tracking-display uppercase text-foreground transition hover:bg-foreground hover:text-background"
            >
              Book your stay
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
          <img src={logoImg} alt="" width={48} height={48} className="h-12 w-12" />
          <p className="font-serif text-2xl">The Lucid Village</p>
          <Link to="/" className="tracking-display text-xs uppercase text-muted-foreground hover:text-foreground">
            ← Back to home
          </Link>
        </div>
      </footer>
    </main>
  );
}
