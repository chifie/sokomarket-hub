import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Smartphone,
  Shirt,
  Sofa,
  Sprout,
  Laptop,
  Sparkles,
  Car,
  Dumbbell,
  ChevronRight,
  Zap,
  Truck,
  ShieldCheck,
} from "lucide-react";

const RAIL = [
  { icon: Smartphone, name: "Electronics" },
  { icon: Shirt, name: "Fashion" },
  { icon: Laptop, name: "Computers" },
  { icon: Sofa, name: "Home & Furniture" },
  { icon: Sparkles, name: "Beauty & Health" },
  { icon: Sprout, name: "Agriculture" },
  { icon: Car, name: "Automotive" },
  { icon: Dumbbell, name: "Sports & Outdoors" },
];

const MINI_DEALS = [
  {
    title: "Consumer Electronics",
    img: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Fashion & Style",
    img: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Home Essentials",
    img: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Beauty & Care",
    img: "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export function Hero() {
  return (
    <section className="bg-muted/40 pt-24 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[240px_1fr_280px]">
          {/* Category rail (Amazon-style) */}
          <aside className="hidden lg:block overflow-hidden rounded-lg border border-border bg-card">
            <div className="bg-secondary px-4 py-3 text-sm font-bold uppercase tracking-wide text-secondary-foreground">
              Shop by category
            </div>
            <ul className="divide-y divide-border">
              {RAIL.map((c) => (
                <li key={c.name}>
                  <Link
                    to="/categories"
                    className="group flex items-center justify-between px-4 py-2.5 text-sm text-foreground/80 hover:bg-muted hover:text-accent"
                  >
                    <span className="flex items-center gap-2.5">
                      <c.icon className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
                      {c.name}
                    </span>
                    <ChevronRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/marketplace"
              className="block border-t border-border bg-muted/50 px-4 py-3 text-center text-sm font-semibold text-accent hover:bg-muted"
            >
              See all departments
            </Link>
          </aside>

          {/* Main banner */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-lg border border-border bg-card"
          >
            <div className="relative aspect-[16/9] w-full lg:aspect-auto lg:h-[420px]">
              <img
                src="https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Global marketplace"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/60 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-lg p-6 sm:p-10 text-secondary-foreground">
                  <span className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-primary-foreground">
                    <Zap className="h-3 w-3" /> Mega Sale
                  </span>
                  <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                    Shop the world.
                    <br />
                    <span className="text-primary">Delivered to you.</span>
                  </h1>
                  <p className="mt-3 text-sm text-white/80 sm:text-base">
                    Millions of products from verified global sellers — save up to 70%.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      to="/marketplace"
                      className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-md transition hover:brightness-110"
                    >
                      Shop deals <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                    <Link
                      to="/dashboard"
                      className="inline-flex h-11 items-center rounded-full border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
                    >
                      Start selling
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Side promo stack */}
          <div className="hidden lg:flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-lg border border-border bg-card p-4">
              <div className="text-xs font-semibold uppercase text-primary">Today only</div>
              <div className="mt-1 text-lg font-black">Up to 60% off Electronics</div>
              <img
                src="https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Electronics deal"
                className="mt-3 h-32 w-full rounded object-cover"
              />
              <Link to="/marketplace" className="mt-3 inline-block text-sm font-semibold text-accent hover:underline">
                Shop now →
              </Link>
            </div>
            <div className="rounded-lg border border-border bg-secondary p-4 text-secondary-foreground">
              <div className="text-xs font-semibold uppercase text-primary">Sign in for the best experience</div>
              <div className="mt-2 text-sm text-white/70">Track orders, save favorites, and get personalized deals.</div>
              <Link
                to="/auth"
                className="mt-3 inline-flex h-9 items-center rounded-full bg-primary px-4 text-xs font-bold text-primary-foreground hover:brightness-110"
              >
                Sign in / Register
              </Link>
            </div>
          </div>
        </div>

        {/* Mini deal tiles (Alibaba style) */}
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {MINI_DEALS.map((d) => (
            <Link
              key={d.title}
              to="/marketplace"
              className="group overflow-hidden rounded-lg border border-border bg-card p-3 transition hover:shadow-md"
            >
              <div className="text-sm font-bold text-foreground">{d.title}</div>
              <div className="mt-2 aspect-square overflow-hidden rounded">
                <img
                  src={d.img}
                  alt={d.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-2 text-xs font-semibold text-accent">Shop now →</div>
            </Link>
          ))}
        </div>

        {/* Trust strip */}
        <div className="mt-4 grid grid-cols-1 gap-4 rounded-lg border border-border bg-card p-4 sm:grid-cols-3">
          {[
            { icon: Truck, title: "Free global shipping", sub: "On orders over $50" },
            { icon: ShieldCheck, title: "Buyer protection", sub: "Full refund if not delivered" },
            { icon: Zap, title: "Fast checkout", sub: "Pay with card, PayPal, Stripe" },
          ].map((t) => (
            <div key={t.title} className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                <t.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">{t.title}</div>
                <div className="text-xs text-muted-foreground">{t.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
