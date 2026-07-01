import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BadgeCheck, MapPin, Star } from "lucide-react";
import { SHOPS } from "@/lib/marketplace-data";

export function Shops() {
  return (
    <section className="bg-muted/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Popular shops
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Loved by thousands
            </h2>
          </div>
          <Link
            to="/shops"
            className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition inline-flex items-center"
          >
            Browse shops
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SHOPS.slice(0, 4).map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className={`relative h-24 bg-gradient-to-br ${s.hue}`}>
                <div className="absolute inset-0 bg-black/10" />
              </div>
              <div className="relative px-5 pb-5">
                <div className="-mt-8 grid h-16 w-16 place-items-center rounded-2xl border-4 border-card bg-card text-lg font-black text-primary shadow-elegant">
                  {s.name.charAt(0)}
                </div>
                <div className="mt-3 flex items-center gap-1.5">
                  <h3 className="text-base font-bold">{s.name}</h3>
                  <BadgeCheck className="h-4 w-4 text-primary" />
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                    {s.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {s.city}
                  </span>
                  <span>{s.products} products</span>
                </div>
                <button className="mt-4 w-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium py-2 hover:opacity-90 transition">
                  Visit Shop
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
