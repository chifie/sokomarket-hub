import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Smartphone,
  Shirt,
  Sprout,
  Phone,
  Laptop,
  Sofa,
  Sparkles,
  UtensilsCrossed,
  Car,
  BookOpen,
  Dumbbell,
  HeartPulse,
  Search,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — SokoDigital" },
      {
        name: "description",
        content: "Explore every product category on SokoDigital, Tanzania's modern marketplace.",
      },
    ],
  }),
  component: Page,
});

const CATS = [
  {
    icon: Smartphone,
    name: "Electronics",
    count: "12,400+",
    tint: "from-teal-500/15 to-teal-500/5",
  },
  { icon: Shirt, name: "Fashion", count: "9,320+", tint: "from-amber-500/15 to-amber-500/5" },
  { icon: Sprout, name: "Agriculture", count: "4,150+", tint: "from-green-500/15 to-green-500/5" },
  { icon: Phone, name: "Phones", count: "6,800+", tint: "from-sky-500/15 to-sky-500/5" },
  { icon: Laptop, name: "Computers", count: "3,240+", tint: "from-indigo-500/15 to-indigo-500/5" },
  { icon: Sofa, name: "Furniture", count: "2,100+", tint: "from-orange-500/15 to-orange-500/5" },
  { icon: Sparkles, name: "Beauty", count: "5,600+", tint: "from-pink-500/15 to-pink-500/5" },
  { icon: UtensilsCrossed, name: "Food", count: "7,900+", tint: "from-red-500/15 to-red-500/5" },
  { icon: Car, name: "Automotive", count: "1,850+", tint: "from-slate-500/15 to-slate-500/5" },
  { icon: BookOpen, name: "Books", count: "3,110+", tint: "from-yellow-500/15 to-yellow-500/5" },
  { icon: Dumbbell, name: "Sports", count: "2,300+", tint: "from-emerald-500/15 to-emerald-500/5" },
  { icon: HeartPulse, name: "Health", count: "4,700+", tint: "from-rose-500/15 to-rose-500/5" },
];

function Page() {
  const [q, setQ] = useState("");
  const filtered = CATS.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PageHeader
        eyebrow="Categories"
        crumb="Categories"
        title="Find exactly what you're looking for."
        description="From electronics to fresh agriculture produce — browse every category available on SokoDigital."
      />

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative mx-auto max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search categories…"
              className="h-11 w-full rounded-full border border-border bg-card pl-9 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {filtered.map((c, i) => (
              <motion.a
                key={c.name}
                href="/marketplace"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                whileHover={{ y: -4 }}
                className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br ${c.tint} p-5 shadow-soft transition-shadow hover:shadow-elegant`}
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-background text-primary shadow-soft transition-transform group-hover:scale-110">
                  <c.icon className="h-6 w-6" />
                </div>
                <div className="mt-4 text-sm font-semibold">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.count} items</div>
              </motion.a>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-16 text-center text-muted-foreground">
              No categories match "{q}".
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
