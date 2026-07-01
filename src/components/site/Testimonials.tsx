import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    name: "Amina Hassan",
    role: "Boutique Owner, Dar es Salaam",
    text: "SokoDigital tripled my sales in three months. Payments are fast, and the seller dashboard is a dream.",
  },
  {
    name: "John Mwakalinga",
    role: "Customer, Mwanza",
    text: "Ordered a phone in the morning and it arrived the same day. The tracking felt like magic.",
  },
  {
    name: "Grace Ndege",
    role: "Coffee Grower, Moshi",
    text: "Finally a platform that puts small Tanzanian producers first. My customers love the packaging too.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-muted/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Testimonials
          </span>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Loved across Tanzania
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.blockquote
              key={r.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative rounded-2xl border border-border/60 bg-card p-8 shadow-soft"
            >
              <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/15" />
              <div className="flex items-center gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-base leading-relaxed text-foreground/90">
                "{r.text}"
              </p>
              <footer className="mt-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-primary text-sm font-bold text-primary-foreground">
                  {r.name
                    .split(" ")
                    .map((s) => s[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
