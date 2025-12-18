/*
Pop-style event company website starter (single-file demo)
--------------------------------------------------------
How to use (Next.js App Router):
1) Create a Next.js app:
   npx create-next-app@latest pop-style-site --ts --tailwind --eslint --app
2) Replace the contents of:
   app/page.tsx  with this file’s default export
3) Put images in /public (or keep placeholders)
4) Run:
   npm run dev

Notes:
- This is an original layout inspired by common event-agency patterns:
  hero + stats + service cards + gallery + blog + values + testimonials + CTA + footer.
- Hook the “Request a Quote” button to your form/CRM later.
*/

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Mail, MapPin, Phone, Star } from "lucide-react";

// --- tiny helpers ---
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

const NAV: NavItem[] = [
  {
    label: "Corporate Events",
    children: [
      { label: "Team Building Events", href: "#team-building" },
      { label: "Conference & Meeting Mgmt", href: "#conferences" },
      { label: "Corporate Entertainment", href: "#entertainment" },
      { label: "Virtual Events", href: "#virtual" },
      { label: "Brand Activations", href: "#activations" },
      { label: "Holiday Parties", href: "#holiday-parties" },
    ],
  },
  {
    label: "Event Rentals",
    children: [
      { label: "Photo Booth Rentals", href: "#photo-booths" },
      { label: "Fun Foods & Catering", href: "#fun-foods" },
      { label: "Game Rentals", href: "#games" },
      { label: "Inflatables", href: "#inflatables" },
      { label: "Staffing", href: "#staffing" },
      { label: "Decor & Themes", href: "#decor-themes" },
    ],
  },
  { label: "Blog", href: "#blog" },
  {
    label: "About",
    children: [
      { label: "Reviews", href: "#testimonials" },
      { label: "Gallery", href: "#gallery" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

const STATS = [
  { k: "Events deployed simultaneously", v: "25+" },
  { k: "Events run per year", v: "500+" },
  { k: "Years in business", v: "15+" },
];

const SERVICES = [
  {
    title: "Corporate Event Planning",
    desc: "Full-service planning and production for corporate events across Toronto and the GTA.",
    tag: "Corporate services",
    items: [
      "Team building events",
      "Conferences & meeting management",
      "Corporate entertainment",
      "Brand activations",
      "Holiday parties (including Christmas & seasonal events)",
      "Company BBQs & family picnics",
    ],
  },
  {
    title: "Virtual & Hybrid Events",
    desc: "Remote-friendly experiences that keep teams connected—anywhere.",
    tag: "Virtual services",
    items: [
      "Virtual and hybrid events",
      "Online activities and engagement",
      "Hosted virtual parties or team building",
      "Tech support for virtual/hybrid formats",
    ],
  },
];

const SERVICE_DETAILS = [
  { title: "Team building events", desc: "Interactive activities that boost morale, communication, and team culture." },
  { title: "Conferences & meeting management", desc: "Venue sourcing, schedules, speakers, registrations, and onsite coordination." },
  { title: "Corporate entertainment", desc: "DJs, live performers, MCs, games, and high-energy programming." },
  { title: "Brand activations", desc: "Pop-ups and experiential campaigns designed for attention and engagement." },
  { title: "Holiday parties (including Christmas & seasonal events)", desc: "Themes, decor, entertainment, food, and a polished run-of-show." },
  { title: "Company BBQs & family picnics", desc: "Outdoor-friendly planning with games, food, tents, staffing, and flow." },
  { title: "Virtual and hybrid events", desc: "Remote-first experiences with strong participation and clear logistics." },
  { title: "Online activities and engagement", desc: "Trivia, game shows, workshops, and hosted team experiences." },
  { title: "Hosted virtual parties or team building", desc: "Facilitated sessions that feel fun and smooth, not awkward." },
  { title: "Tech support for virtual/hybrid formats", desc: "Platform setup, run-of-show, troubleshooting, and moderator support." },
];

// NEW: “sub-page” sections (Option A)
const CORPORATE_PAGES = [
  {
    id: "team-building",
    title: "Team Building Events",
    desc: "High-energy experiences that improve teamwork, morale, and company culture.",
    bullets: [
      "Facilitated games + challenges (no awkwardness)",
      "Indoor or outdoor options",
      "Great for 20–500+ guests",
      "Custom themes + scoring + prizes",
    ],
  },
  {
    id: "conferences",
    title: "Conference & Meeting Management",
    desc: "A-to-Z coordination so your sessions run on time and feel premium.",
    bullets: [
      "Venue sourcing + vendor booking",
      "Run-of-show + speaker scheduling",
      "Registration + check-in flow",
      "Onsite coordination + problem-solving",
    ],
  },
  {
    id: "entertainment",
    title: "Corporate Entertainment",
    desc: "Programming that keeps people engaged and creates real moments.",
    bullets: [
      "DJs + live performers + MCs",
      "Interactive games + stage moments",
      "AV / lighting coordination",
      "Crowd flow + pacing planning",
    ],
  },
  {
    id: "activations",
    title: "Brand Activations",
    desc: "Pop-ups and experiential campaigns built for attention and engagement.",
    bullets: [
      "Photo moments + content stations",
      "Sampling / promo teams",
      "Branded decor + signage",
      "Traffic flow + queue planning",
    ],
  },
  {
    id: "holiday-parties",
    title: "Holiday Parties",
    desc: "Seasonal events with themes, decor, food, and a polished run-of-show.",
    bullets: [
      "Christmas + seasonal themes",
      "Decor + staging + photo areas",
      "Entertainment + timeline planning",
      "Venue + vendor coordination",
    ],
  },
];

const RENTAL_PAGES = [
  {
    id: "photo-booths",
    title: "Photo Booth Rentals",
    desc: "Modern photo booth setups for corporate events, parties, and activations.",
    bullets: ["Backdrop + props", "Instant sharing", "Branding options", "Attendant available"],
  },
  {
    id: "fun-foods",
    title: "Fun Foods & Catering",
    desc: "Crowd-pleasers like popcorn/cotton candy plus simple catering add-ons.",
    bullets: ["Fun food stations", "Serving staff", "Setup + cleanup", "Allergy-friendly options"],
  },
  {
    id: "games",
    title: "Game Rentals",
    desc: "Arcade, carnival, and interactive games that keep guests engaged.",
    bullets: ["All-ages options", "Competitive formats", "Great for team building", "Delivery + setup"],
  },
  {
    id: "inflatables",
    title: "Inflatables",
    desc: "Inflatables for outdoor events, family days, and summer activations.",
    bullets: ["Safety-first setup", "Perfect for BBQs + picnics", "Staff available", "Weather planning"],
  },
  {
    id: "staffing",
    title: "Event Staffing",
    desc: "Trained staff to run stations, manage check-in, and keep things on time.",
    bullets: ["Event captains", "Brand ambassadors", "Registration desk", "Station attendants"],
  },
  {
    id: "decor-themes",
    title: "Decor & Themes",
    desc: "Theming that makes events feel premium and consistent.",
    bullets: ["Balloon installs + florals", "Table styling", "Signage + branding", "Theme packages"],
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
  { title: "Innovation", desc: "We hunt for fresh ideas and tech to keep your experiences modern and memorable." },
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

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
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
  const base = "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition shadow-sm";
  const styles =
    variant === "primary"
      ? "bg-neutral-900 text-white hover:bg-neutral-800"
      : "bg-white text-neutral-900 ring-1 ring-neutral-200 hover:bg-neutral-50";
  if (href) return <a href={href} className={cn(base, styles)}>{children}</a>;
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

function DesktopNav() {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) setOpenLabel(null);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div ref={navRef} className="hidden items-center gap-2 md:flex">
      {NAV.map((item) => {
        const hasChildren = !!item.children?.length;
        if (!hasChildren) {
          return (
            <a key={item.label} href={item.href} className="rounded-xl px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-100">
              {item.label}
            </a>
          );
        }

        const isOpen = openLabel === item.label;

        return (
          <div key={item.label} className="relative">
            <button
              type="button"
              onClick={() => setOpenLabel(isOpen ? null : item.label)}
              className={cn(
                "inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-100",
                isOpen && "bg-neutral-100"
              )}
            >
              {item.label} <ChevronDown className={cn("h-4 w-4 transition", isOpen && "rotate-180")} />
            </button>

            {isOpen ? (
              <div className="absolute left-0 top-full z-40 mt-2 w-[360px] rounded-3xl border border-neutral-200 bg-white p-3 shadow-xl">
                <div className="grid gap-1">
                  {item.children!.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      onClick={() => setOpenLabel(null)}
                      className="rounded-2xl px-4 py-3 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
                    >
                      {c.label}
                      <div className="mt-0.5 text-xs font-medium text-neutral-500">View details</div>
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

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 scroll-smooth">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="#" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-neutral-900 text-white font-black">P!</div>
            <div className="leading-tight">
              <div className="text-sm font-extrabold tracking-tight">Event Planner Toronto</div>
              <div className="text-xs font-semibold text-neutral-500">Corporate • Rentals • Activations</div>
            </div>
          </a>

          <DesktopNav />

          <div className="flex items-center gap-2">
            <Button variant="secondary" href="#services">Services</Button>
            <Button variant="secondary" href="#contact">Contact</Button>
            <Button href="#quote">Request a Quote <ArrowRight className="ml-2 h-4 w-4" /></Button>
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
              Your Corporate Events <span className="block">Super Agency</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-neutral-600">
              Full-service event planning, rentals, and activations for employee engagement, summer events, team building,
              holiday parties, and marketing experiences.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="#quote">Request a Quote <ArrowRight className="ml-2 h-4 w-4" /></Button>
              <Button variant="secondary" href="#services">Explore Services</Button>
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

      {/* Services */}
      <section id="services" className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <SectionTitle
            eyebrow="What we do"
            title="Planning, rentals, and activations"
            subtitle="Pick a lane—or bundle everything into one streamlined production partner."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {SERVICES.map((s) => (
              <Card key={s.title}>
                <div className="text-lg font-bold">{s.title}</div>
                <p className="mt-2 text-sm text-neutral-600">{s.desc}</p>

                <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                  {s.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a href="#quote" className="mt-5 inline-flex items-center text-sm font-semibold text-neutral-900">
                  {s.tag} <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Card>
            ))}
          </div>

          {/* All services grid */}
          <div className="mt-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold tracking-tight">All services</h3>
                <p className="mt-1 text-sm text-neutral-600">
                  Browse everything we offer—click “Request a Quote” when you’re ready.
                </p>
              </div>
              <Button variant="secondary" href="#quote">
                Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICE_DETAILS.map((s) => (
                <Card key={s.title}>
                  <div className="text-base font-bold">{s.title}</div>
                  <p className="mt-2 text-sm text-neutral-600">{s.desc}</p>
                  <a href="#quote" className="mt-4 inline-flex items-center text-sm font-semibold text-neutral-900">
                    Get pricing <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Corporate “sub-pages” */}
      <section className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <SectionTitle
            eyebrow="Corporate Events"
            title="Explore corporate services"
            subtitle="Each dropdown item jumps here (mini “sub-pages” on one page)."
          />

          <div className="mt-10 space-y-6">
            {CORPORATE_PAGES.map((p) => (
              <div key={p.id} id={p.id} className="scroll-mt-28">
                <Card>
                  <div className="text-xl font-bold">{p.title}</div>
                  <p className="mt-2 text-sm text-neutral-600">{p.desc}</p>

                  <ul className="mt-4 grid gap-2 text-sm text-neutral-700 sm:grid-cols-2">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href="#quote">Request a quote <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    <Button variant="secondary" href="#gallery">See gallery</Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rentals */}
      <section id="rentals" className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">Interactive Party Rentals</h3>
              <p className="mt-3 text-neutral-600">
                Build a “menu” of rentals your clients can browse. Group by categories (photo booths, games, food,
                entertainment, decor) and add strong images + clear pricing ranges.
              </p>
              <div className="mt-6 flex gap-3">
                <Button href="#quote">Get rental pricing</Button>
                <Button variant="secondary" href="#gallery">See gallery</Button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <PlaceholderImage label="Photo Booth" />
              <PlaceholderImage label="Fun Foods" />
              <PlaceholderImage label="Games" />
              <PlaceholderImage label="Decor" />
            </div>
          </div>
        </div>
      </section>

      {/* Rental “sub-pages” */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <SectionTitle
            eyebrow="Event Rentals"
            title="Browse rental categories"
            subtitle="These match your dropdown so visitors can easily see everything."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {RENTAL_PAGES.map((p) => (
              <div key={p.id} id={p.id} className="scroll-mt-28">
                <Card>
                  <div className="text-xl font-bold">{p.title}</div>
                  <p className="mt-2 text-sm text-neutral-600">{p.desc}</p>

                  <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <a href="#quote" className="mt-5 inline-flex items-center text-sm font-semibold text-neutral-900">
                    Get pricing <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual */}
      <section id="virtual" className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <PlaceholderImage label="Virtual / Hybrid Event" />
            </div>
            <div className="order-1 md:order-2 md:pl-6">
              <h3 className="text-2xl font-semibold tracking-tight">Virtual & Hybrid Events</h3>
              <p className="mt-3 text-neutral-600">
                Hosted online activities (trivia, game shows, workshops). Clear logistics, smooth facilitation,
                and strong participation.
              </p>
              <div className="mt-6">
                <Button href="#quote">Plan a virtual event</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="border-t border-neutral-200">
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
                <a href="#" className="mt-5 inline-flex items-center text-sm font-semibold">
                  Read more <ArrowRight className="ml-2 h-4 w-4" />
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
            subtitle="These are the trust-building blocks you can reuse across pages."
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
      <section id="gallery" className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">Photo gallery</h3>
              <p className="mt-2 text-neutral-600">Replace placeholders with real event photography.</p>
            </div>
            <Button variant="secondary" href="#quote">Use this style</Button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <PlaceholderImage key={i} label={`Gallery Image ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="border-t border-neutral-200 bg-neutral-50">
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
      <section id="quote" className="border-t border-neutral-200">
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
                  <input className="mt-1 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-neutral-300" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm font-semibold">Email</label>
                  <input className="mt-1 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-neutral-300" placeholder="you@company.com" type="email" />
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
                  <textarea className="mt-1 min-h-[120px] w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-neutral-300" placeholder="Date, city, estimated guests, goals, budget range…" />
                </div>
                <Button>Submit request <ArrowRight className="ml-2 h-4 w-4" /></Button>
                <p className="text-xs text-neutral-500">Demo form (no backend). Wire this to an API route or form service.</p>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <SectionTitle
            eyebrow="FAQ"
            title="Answer objections before they ask"
            subtitle="Keep FAQs short. Add specifics where you can (lead time, deposit, coverage area)."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              { q: "How far in advance should we book?", a: "For large corporate events: 6–10 weeks. For rentals: 1–2 weeks is often enough (season dependent)." },
              { q: "Do you provide staffing and onsite coordination?", a: "Yes. We offer trained onsite staff and a clear run-of-show to keep events smooth." },
              { q: "What areas do you serve?", a: "Set this to your real service areas (e.g., GTA, Toronto, Mississauga, Vaughan, etc.)." },
              { q: "Can we mix planning + rentals?", a: "Absolutely. Bundling planning with rentals is often cheaper and reduces coordination risk." },
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
      <footer id="contact" className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-neutral-900 text-white font-black">P!</div>
                <div>
                  <div className="text-sm font-extrabold">Event Planner Toronto</div>
                  <div className="text-xs font-semibold text-neutral-500">Corporate • Rentals • Activations</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-neutral-600">Replace this with your short “who we are” blurb (years in business, niche, cities).</p>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-bold">Contact</div>
              <div className="flex items-center gap-2 text-sm text-neutral-700"><Phone className="h-4 w-4" /> +1 (000) 000-0000</div>
              <div className="flex items-center gap-2 text-sm text-neutral-700"><Mail className="h-4 w-4" /> hello@yourbrand.com</div>
              <div className="flex items-center gap-2 text-sm text-neutral-700"><MapPin className="h-4 w-4" /> Toronto, ON</div>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-bold">Quick links</div>
              <div className="grid gap-2 text-sm">
                <a className="text-neutral-700 hover:underline" href="#services">Services</a>
                <a className="text-neutral-700 hover:underline" href="#gallery">Gallery</a>
                <a className="text-neutral-700 hover:underline" href="#testimonials">Reviews</a>
                <a className="text-neutral-700 hover:underline" href="#quote">Request a quote</a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-neutral-200 pt-6 text-xs text-neutral-500 md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} Event Planner Toronto. All rights reserved.</div>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
