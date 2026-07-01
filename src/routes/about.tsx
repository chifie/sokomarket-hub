import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Rocket, Heart, MapPin, TrendingUp } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SokoDigital" },
      {
        name: "description",
        content:
          "Learn about SokoDigital's mission to build Tanzania's most trusted digital marketplace.",
      },
    ],
  }),
  component: Page,
});

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Trust First",
    desc: "Every seller is verified. Every payment is protected.",
  },
  {
    icon: Rocket,
    title: "Built for Speed",
    desc: "Fast listings, fast checkout, fast delivery — nationwide.",
  },
  {
    icon: Users,
    title: "Community Driven",
    desc: "We grow by helping local sellers and buyers succeed together.",
  },
  {
    icon: Heart,
    title: "Proudly Tanzanian",
    desc: "Designed in Dar es Salaam, for every region of Tanzania.",
  },
];

const TIMELINE = [
  { year: "2022", text: "SokoDigital founded in Dar es Salaam with a handful of local sellers." },
  { year: "2023", text: "Expanded to Arusha, Mwanza, and Dodoma; launched mobile money payments." },
  {
    year: "2024",
    text: "Crossed 15,000 verified sellers and same-day delivery in 3 major cities.",
  },
  { year: "2025", text: "Launched the SokoDigital app with over 250,000 active shoppers." },
];

const STATS = [
  { icon: Users, value: "250,000+", label: "Customers" },
  { icon: TrendingUp, value: "15,000+", label: "Sellers" },
  { icon: MapPin, value: "50+", label: "Cities Served" },
];

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PageHeader
        eyebrow="About Us"
        crumb="About"
        title="Tanzania's marketplace, built by Tanzanians."
        description="SokoDigital exists to make buying and selling online simple, safe, and fast — for every seller and shopper across the country."
      />

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Our Story
              </span>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                From a small idea to Tanzania's fastest-growing marketplace.
              </h2>
              <p className="mt-4 text-muted-foreground">
                SokoDigital started with a simple observation: talented sellers across Tanzania —
                from Kilimanjaro coffee farmers to Dar es Salaam boutiques — needed an easier way to
                reach customers nationwide. Today, we connect thousands of verified sellers with
                millions of shoppers through a fast, secure, and modern platform built specifically
                for Tanzania.
              </p>
              <p className="mt-4 text-muted-foreground">
                We handle secure payments, logistics, and customer trust so sellers can focus on
                what they do best — and buyers can shop with total confidence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-6"
            >
              <div className="grid grid-cols-3 gap-4 lg:grid-cols-3">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-border/60 bg-card p-5 text-center shadow-soft"
                  >
                    <s.icon className="mx-auto h-6 w-6 text-primary" />
                    <div className="mt-2 text-xl font-black sm:text-2xl">{s.value}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Values */}
          <div className="mt-24">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                What We Stand For
              </span>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Our values</h2>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-base font-bold">{v.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-24">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Our Journey
              </span>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Milestones along the way
              </h2>
            </div>
            <div className="mx-auto mt-12 max-w-2xl space-y-6">
              {TIMELINE.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="flex gap-5 rounded-2xl border border-border/60 bg-card p-5 shadow-soft"
                >
                  <div className="shrink-0 text-xl font-black text-primary">{t.year}</div>
                  <p className="text-sm text-muted-foreground">{t.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
