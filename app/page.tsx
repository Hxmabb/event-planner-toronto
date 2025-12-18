/*
Pop-style event company website starter (single-file demo)
--------------------------------------------------------
Option A: Single-page “subpages” via anchor sections.
Each dropdown item scrolls to a dedicated section with real content.
*/
"use client";
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Mail, MapPin, Phone, Star } from "lucide-react";

// --- tiny helpers ---
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string; desc?: string }[];
};

const STATS = [
  { k: "Events deployed simultaneously", v: "25+" },
  { k: "Events run per year", v: "500+" },
  { k: "Years in business", v: "15+" },
];

// ✅ “Subpage” content (single page, multiple sections)
const CORPORATE_PAGES = [
  {
    id: "team-building",
    title: "Team Building Events",
    desc: "Interactive experiences that strengthen communication, trust, and team culture.",
    bullets: [
      "Hosted games + challenges (indoor/outdoor)",
      "Icebreakers that don’t feel awkward",
      "Facilitators + run-of-show included",
      "Perfect for: offsites, retreats, quarterly kickoffs",
    ],
  },
  {
    id: "conference-meetings",
    title: "Conference & Meeting Management",
    desc: "Planning + logistics for conferences, all-hands, panels, and executive meetings.",
    bullets: [
      "Venue sourcing + vendor coordination",
      "Speaker scheduling + registrations",
      "Stage, AV, microphones, screens",
      "Onsite coordination + contingency planning",
    ],
  },
  {
    id: "corporate-entertainment",
    title: "Corporate Entertainment",
    desc: "High-energy programming that makes events feel premium and memorable.",
    bullets: [
      "DJs, MCs, live performers, musicians",
      "Interactive stations + crowd engagement",
      "Photo moments + themed experiences",
      "Add-ons: games, prizes, branded activations",
    ],
  },
  {
    id: "virtual-events",
    title: "Virtual Events",
    desc: "Remote-friendly events built for participation (not passive watching).",
    bullets: [
      "Hosted trivia + game shows + workshops",
      "Hybrid run-of-show + moderation",
      "Platform setup + technical support",
      "Team kits / shipping support (optional)",
    ],
  },
  {
    id: "brand-activations",
    title: "Brand Activations",
    desc: "Pop-ups and experiential campaigns designed for attention and engagement.",
    bullets: [
      "Concept + creative + design direction",
      "Staffing + booth builds + signage",
      "Photo/video moments + social hooks",
      "Perfect for: malls, campuses, street teams, launches",
    ],
  },
  {
    id: "holiday-parties",
    title: "Holiday Parties",
    desc: "Seasonal events with themes, decor, entertainment, and a polished run-of-show.",
    bullets: [
      "Theme design + decor + lighting",
      "Entertainment + DJs + interactive stations",
      "Food/catering coordination",
      "End-to-end logistics + onsite staff",
    ],
  },
];

const RENTAL_PAGES = [
  {
    id: "photo-booth",
    title: "Photo Booth Rentals",
    desc: "Modern photo booths with instant sharing and branded overlays.",
    bullets: ["Unlimited sessions", "Custom overlays", "Onsite attendant (optional)", "Digital gallery delivery"],
  },
  {
    id: "fun-foods",
    title: "Fun Foods & Catering",
    desc: "Crowd-pleasers that boost energy and lines (in a good way).",
    bullets: ["Popcorn/cotton candy", "Coffee/hot chocolate bars", "Snack stations", "Catering coordination"],
  },
  {
    id: "games",
    title: "Game Rentals",
    desc: "Interactive games for indoor/outdoor corporate events and parties.",
    bullets: ["Arcade-style games", "Giant games", "Carnival stations", "Tournament setups"],
  },
  {
    id: "inflatables",
    title: "Inflatables",
    desc: "Big impact attractions for summer parties, family days, and festivals.",
    bullets: ["Bouncy castles", "Obstacle courses", "Safety setup + supervision", "Indoor/outdoor options"],
  },
  {
    id: "staffing",
    title: "Staffing",
    desc: "Reliable staff who actually know the run-of-show.",
    bullets: ["Event captains", "Hosts/MCs", "Brand ambassadors", "Setup/teardown crew"],
  },
  {
    id: "decor-themes",
    title: "Decor & Themes",
    desc: "Transform spaces fast with clean, modern visuals.",
    bullets: ["Backdrops + step & repeat", "Balloon installs", "Tablescapes", "Themed props + signage"],
  },
];

const NAV: NavItem[] = [
  {
    label: "Corporate Events",
    children: [
      { label: "Team Building Events", href: "#team-building", desc: "Morale + culture builders" },
      { label: "Conference & Meeting Mgmt", href: "#conference-meetings", desc: "Logistics + production" },
      { label: "Corporate Entertainment", href: "#corporate-entertainment", desc: "Premium programming" },
      { label: "Virtual Events", href: "#virtual-events", desc: "Remote-friendly fun" },
      { label: "Brand Activations", href: "#brand-activations", desc: "Experiential marketing" },
      { label: "Holiday Parties", href: "#holiday-parties", desc: "Seasonal + themed events" },
    ],
  },
  {
    label: "Event Rentals",
    children: [
      { label: "Photo Booth Rentals", href: "#photo-booth", desc: "Booths + sharing + branding" },
      { label: "Fun Foods & Catering", href: "#fun-foods", desc: "Stations + catering" },
      { label: "Game Rentals", href: "#games", desc: "Interactive games" },
      { label: "Inflatables", href: "#inflatables", desc: "Big impact attractions" },
      { label: "Staffing", href: "#staffing", desc: "Captains + hosts + crew" },
      { label: "Decor & Themes", href: "#decor-themes", desc: "Backdrops + installs" },
    ],
  },
  { label: "Blog", href: "#blog" },
  {
    label: "About",
    children: [
      { label: "Reviews", href: "#testimonials", desc: "Client feedback" },
      { label: "Gallery", href: "#gallery", desc: "Past events" },
      { label: "FAQ", href: "#faq", desc: "Common questions" },
      { label: "Contact", href: "#contact", desc: "Get in touch" },
    ],
  },
];

const BLOG = [
  {
    title: "15 CSR event ideas that actually boost engagement",
    excerpt: "A modern CSR playbook: local impact, employee-led initiatives, and measurable outcomes.",
    meta: "Employee Engagement • 6 min",
  },
  {
    title: "10 tenant appreciation event ideas that keep communities sticky",
    excerpt: "From seasonal socials to themed activations that strengthen property relationships.",
    meta: "Property • 5 min",
  },
  {
    title: "Casino night highlights: how to design a premium themed experience",
    excerpt: "Decor, staffing, pacing, and photo moments—what makes it feel high-end.",
    meta: "Themes • 7 min",
  },
];

const VALUES = [
  { title: "Innovation", desc: "We hunt for fresh ideas and tech to keep experiences modern and memorable." },
  { title: "Service", desc: "Fast response times, clear communication, and no surprises." },
  { title: "Training", desc: "Reliable, enthusiastic staff who actually know the run-of-show." },
  { title: "Approach", desc: "Tight planning, checklists, and contingency thinking built-in." },
  { title: "Family", desc: "Long-term client relationships and a team that cares." },
  { title: "Experience", desc: "A portfolio of events that helps you avoid rookie mistakes." },
];

const TESTIMONIALS = [
  { name: "Brenda L.", quote: "Everything was seamless. Quick communication and a great team onsite.", rating: 5 },
  { name: "Alana S.", quote: "Our conference ran perfectly. The experience felt premium and easy.", rating: 5 },
  { name: "Sara P.", quote: "Super organized and personable. Last-minute asks were handled smoothly.", rating: 5 },
];

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? <div className="text-sm font-semibold tracking-wide text-neutral-500">{eyebrow}</div> : null}
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-base text-neutral-600">{subtitle}</p> : null}
    </div>
  );
}

function Button({
  children,
  variant = "primary",
  href,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition shadow-sm";
  const styles =
    variant === "primary"
      ? "bg-neutral-900 text-white hover:bg-neutral-800"
      : "bg-white text-neutral-900 ring-1 ring-neutral-200 hover:bg-neutral-50";

  if (href) {
    return (
      <a href={href} className={cn(base, styles)}>
        {children}
      </a>
    );
  }
  return <button className={cn(base, styles)}>{children}</button>;
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">{children}</div>;
}

function PlaceholderImage({ label }: { label: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50">
      <div className="aspect-[16/10] w-full" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-neutral-700 ring-1 ring-neutral-200">
          {label}
        </div>
      </div>
    </div>
  );
}

// ✅ FIXED NAV: works reliably + closes correctly
function DesktopNav() {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  // close dropdown when clicking outside (use CLICK, not mousedown)
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) setOpenLabel(null);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenLabel(null);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div ref={navRef} className="hidden items-center gap-2 md:flex">
      {NAV.map((item) => {
        const hasChildren = !!item.children?.length;

        if (!hasChildren) {
          return (
            <a
              key={item.label}
              href={item.href}
              className="rounded-xl px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-100"
            >
              {item.label}
            </a>
          );
        }

        const isOpen = openLabel === item.label;

        return (
          <div key={item.label} className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenLabel(isOpen ? null : item.label);
              }}
              className={cn(
                "inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-100",
                isOpen && "bg-neutral-100"
              )}
            >
              {item.label} <ChevronDown className={cn("h-4 w-4 transition", isOpen && "rotate-180")} />
            </button>

            {isOpen ? (
              <div
                className="absolute left-0 top-full z-40 mt-2 w-[380px] rounded-3xl border border-neutral-200 bg-white p-2 shadow-xl"
                onClick={(e) => e.stopPropagation()} // prevent closing before link click
              >
                <div className="grid gap-1">
                  {item.children!.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      onClick={() => setOpenLabel(null)}
                      className="rounded-2xl px-4 py-3 hover:bg-neutral-50"
                    >
                      <div className="text-sm font-semibold text-neutral-900">{c.label}</div>
                      {c.desc ? <div className="mt-0.5 text-xs font-medium text-neutral-500">{c.desc}</div> : null}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function SubPageSection({
  id,
  title,
  desc,
  bullets,
}: {
  id: string;
  title: string;
  desc: string;
  bullets: string[];
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-neutral-200">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
            <p className="mt-3 text-neutral-600">{desc}</p>
            <div className="mt-6 flex gap-3">
              <Button href="#quote">
                Request pricing <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="secondary" href="#contact">
                Ask a question
              </Button>
            </div>
          </div>
          <Card>
            <div className="text-sm font-bold">What you get</div>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              {bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="#" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-neutral-900 text-white font-black">
              P!
            </div>
            <div className="leading-tight">
              <div className="text-sm font-extrabold tracking-tight">Event Planner Toronto</div>
              <div className="text-xs font-semibold text-neutral-500">Corporate • Rentals • Activations</div>
            </div>
          </a>

          <DesktopNav />

          <div className="flex items-center gap-2">
            <Button variant="secondary" href="#services">
              Services
            </Button>
            <Button variant="secondary" href="#contact">
              Contact
            </Button>
            <Button href="#quote">
              Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-neutral-100" />
          <div className="absolute -right-24 top-24 h-80 w-80 rounded-full bg-neutral-100" />
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="inline-flex items-center rounded-full bg-neutral-100 px-4 py-2 text-xs font-semibold text-neutral-700">
              Toronto-style one-stop corporate event production
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Your Corporate Events
              <span className="block">Super Agency</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-neutral-600">
              Full-service event planning, rentals, and activations for employee engagement, summer events, team building,
              holiday parties, and marketing experiences.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="#quote">
                Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="secondary" href="#services">
                Explore Services
              </Button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {STATS.map((s) => (
                <Card key={s.k}>
                  <div className="text-2xl font-extrabold">{s.v}</div>
                  <div className="mt-1 text-xs font-semibold text-neutral-600">{s.k}</div>
                </Card>
              ))}
            </div>
          </div>

          <div className="md:pl-8">
            <PlaceholderImage label="Hero Image / Event Collage" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <PlaceholderImage label="Featured Event" />
              <PlaceholderImage label="Featured Activation" />
            </div>
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section id="services" className="scroll-mt-28 border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <SectionTitle
            eyebrow="What we do"
            title="Planning, rentals, and activations"
            subtitle="Click any dropdown item above to jump to that specific service section."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Card>
              <div className="text-lg font-bold">Corporate Event Planning</div>
              <p className="mt-2 text-sm text-neutral-600">
                End-to-end planning and production across Toronto and the GTA.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                {["Team building", "Conferences/meetings", "Entertainment", "Activations", "Holiday parties"].map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
              <a href="#team-building" className="mt-5 inline-flex items-center text-sm font-semibold text-neutral-900">
                Explore corporate services <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Card>

            <Card>
              <div className="text-lg font-bold">Rentals & Add-ons</div>
              <p className="mt-2 text-sm text-neutral-600">
                Build a rental “menu” your clients can browse and add to their event package.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                {["Photo booths", "Fun foods", "Games", "Inflatables", "Staffing", "Decor/themes"].map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
              <a href="#photo-booth" className="mt-5 inline-flex items-center text-sm font-semibold text-neutral-900">
                Explore rentals <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* Corporate “subpages” */}
      <section className="border-t border-neutral-200">
        {CORPORATE_PAGES.map((p) => (
          <SubPageSection key={p.id} id={p.id} title={p.title} desc={p.desc} bullets={p.bullets} />
        ))}
      </section>

      {/* Rentals “subpages” */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        {RENTAL_PAGES.map((p) => (
          <SubPageSection key={p.id} id={p.id} title={p.title} desc={p.desc} bullets={p.bullets} />
        ))}
      </section>

      {/* Blog */}
      <section id="blog" className="scroll-mt-28 border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <SectionTitle
            eyebrow="Latest ideas"
            title="Content that builds trust"
            subtitle="Short articles show expertise and help your site rank for event keywords."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {BLOG.map((p) => (
              <Card key={p.title}>
                <div className="text-xs font-semibold text-neutral-500">{p.meta}</div>
                <div className="mt-2 text-lg font-bold">{p.title}</div>
                <p className="mt-2 text-sm text-neutral-600">{p.excerpt}</p>
                <a href="#quote" className="mt-5 inline-flex items-center text-sm font-semibold">
                  Ask about this idea <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <SectionTitle
            eyebrow="The difference"
            title="Why clients pick you"
            subtitle="Trust-building blocks you can reuse across pages."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v) => (
              <Card key={v.title}>
                <div className="text-lg font-bold">{v.title}</div>
                <p className="mt-2 text-sm text-neutral-600">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="scroll-mt-28 border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">Photo gallery</h3>
              <p className="mt-2 text-neutral-600">Replace placeholders with real event photography.</p>
            </div>
            <Button variant="secondary" href="#quote">
              Use this style
            </Button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <PlaceholderImage key={i} label={`Gallery Image ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="scroll-mt-28 border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <SectionTitle
            eyebrow="Reviews"
            title="Social proof that closes deals"
            subtitle="Embed Google reviews later, but start with 3–6 strong testimonials."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name}>
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4" />
                  ))}
                </div>
                <p className="mt-3 text-sm text-neutral-700">“{t.quote}”</p>
                <div className="mt-5 text-sm font-semibold text-neutral-900">{t.name}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section id="quote" className="scroll-mt-28 border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">Request a quote</h3>
              <p className="mt-3 text-neutral-600">
                Start with a simple form. Later you can:
                <span className="block">• send leads to HubSpot / Zoho / Airtable</span>
                <span className="block">• add file uploads (briefs, floorplans)</span>
                <span className="block">• add a budget selector and event type</span>
              </p>

              <div className="mt-6 rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
                <div className="text-sm font-bold">What makes this convert?</div>
                <ul className="mt-2 space-y-2 text-sm text-neutral-600">
                  <li>• Clear promise (response time + what they get)</li>
                  <li>• Minimal fields (don’t overwhelm)</li>
                  <li>• A “next step” (call / meeting link)</li>
                </ul>
              </div>
            </div>

            <Card>
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-semibold">Name</label>
                  <input
                    className="mt-1 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-neutral-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">Email</label>
                  <input
                    className="mt-1 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-neutral-300"
                    placeholder="you@company.com"
                    type="email"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">Event type</label>
                  <select className="mt-1 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-neutral-300">
                    <option>Corporate event</option>
                    <option>Team building</option>
                    <option>Holiday party</option>
                    <option>Brand activation</option>
                    <option>Rentals only</option>
                    <option>Virtual / hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold">Details</label>
                  <textarea
                    className="mt-1 min-h-[120px] w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-neutral-300"
                    placeholder="Date, city, estimated guests, goals, budget range…"
                  />
                </div>
                <Button>
                  Submit request <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-xs text-neutral-500">Demo form (no backend).</p>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-28 border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <SectionTitle
            eyebrow="FAQ"
            title="Answer objections before they ask"
            subtitle="Keep FAQs short. Add specifics where you can (lead time, deposit, coverage area)."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              {
                q: "How far in advance should we book?",
                a: "For large corporate events: 6–10 weeks. For rentals: 1–2 weeks is often enough (season dependent).",
              },
              {
                q: "Do you provide staffing and onsite coordination?",
                a: "Yes. We offer trained onsite staff and a clear run-of-show to keep events smooth.",
              },
              {
                q: "What areas do you serve?",
                a: "Toronto + GTA (edit this to your exact coverage area).",
              },
              {
                q: "Can we mix planning + rentals?",
                a: "Absolutely. Bundling planning with rentals is often cheaper and reduces coordination risk.",
              },
            ].map((f) => (
              <Card key={f.q}>
                <div className="text-sm font-bold">{f.q}</div>
                <p className="mt-2 text-sm text-neutral-600">{f.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className="scroll-mt-28 border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-neutral-900 text-white font-black">
                  P!
                </div>
                <div>
                  <div className="text-sm font-extrabold">Event Planner Toronto</div>
                  <div className="text-xs font-semibold text-neutral-500">Corporate • Rentals • Activations</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-neutral-600">
                Replace this with your short “who we are” blurb (years in business, niche, cities).
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-bold">Contact</div>
              <div className="flex items-center gap-2 text-sm text-neutral-700">
                <Phone className="h-4 w-4" /> +1 (000) 000-0000
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-700">
                <Mail className="h-4 w-4" /> hello@yourbrand.com
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-700">
                <MapPin className="h-4 w-4" /> Toronto, ON
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-bold">Quick links</div>
              <div className="grid gap-2 text-sm">
                <a className="text-neutral-700 hover:underline" href="#services">
                  Services
                </a>
                <a className="text-neutral-700 hover:underline" href="#gallery">
                  Gallery
                </a>
                <a className="text-neutral-700 hover:underline" href="#testimonials">
                  Reviews
                </a>
                <a className="text-neutral-700 hover:underline" href="#quote">
                  Request a quote
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-neutral-200 pt-6 text-xs text-neutral-500 md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} Event Planner Toronto. All rights reserved.</div>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">
                Privacy
              </a>
              <a href="#" className="hover:underline">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
