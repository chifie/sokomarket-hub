import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Flame, ArrowRight, Star, ShoppingCart } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/marketplace-data";

export const Route = createFileRoute("/deals")({
  head: () => ({
    meta: [
      { title: "Deals — SokoDigital" },
      {
        name: "description",
        content: "Grab today's best flash-sale deals and discounts across Tanzania on SokoDigital.",
      },
    ],
  }),
  component: Page,
});

function useCountdown(target: number) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { h, m, s };
}

function Page() {
  const target = typeof window !== "undefined" ? Date.now() + 1000 * 60 * 60 * 8 : 0;
  const { h, m, s } = useCountdown(target);
  const deals = [...PRODUCTS].sort((a, b) => b.discount - a.discount);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PageHeader
        eyebrow="Deals"
        crumb="Deals"
        title="Today's biggest savings, all in one place."
        description="Handpicked flash sales from verified sellers — up to 50% off, while stock lasts."
      />

      <section className="pb-14 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-primary p-8 text-primary-foreground shadow-elegant lg:p-14"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                  <Flame className="h-4 w-4 text-accent" /> Flash Sale
                </span>
                <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                  Save up to 50% on top brands
                </h2>
                <p className="mt-3 max-w-md text-primary-foreground/85">
                  Limited stock. Ends in a few hours. Grab the deals your cart has been waiting for.
                </p>
                <Button
                  size="lg"
                  className="mt-6 h-12 rounded-full bg-accent px-6 font-semibold text-accent-foreground hover:opacity-90"
                >
                  Shop All Deals <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 lg:justify-self-end">
                {[
                  { v: h, l: "Hours" },
                  { v: m, l: "Minutes" },
                  { v: s, l: "Seconds" },
                ].map((t) => (
                  <div key={t.l} className="rounded-2xl bg-white/10 p-5 text-center backdrop-blur">
                    <div className="text-4xl font-black sm:text-5xl">
                      {t.v.toString().padStart(2, "0")}
                    </div>
                    <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground/80">
                      {t.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {deals.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    width={800}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-danger px-2 py-1 text-[10px] font-bold text-white">
                    <Flame className="h-3 w-3" /> -{p.discount}%
                  </span>
                </div>
                <div className="p-4">
                  <div className="text-xs text-muted-foreground">{p.seller}</div>
                  <h3 className="mt-1 line-clamp-2 text-sm font-semibold">{p.title}</h3>
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                    <span className="font-semibold text-foreground">{p.rating}</span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-lg font-black text-primary">{p.price}</span>
                    <span className="text-xs text-muted-foreground line-through">{p.old}</span>
                  </div>
                  <Button
                    size="sm"
                    className="mt-3 w-full rounded-full bg-gradient-primary text-primary-foreground"
                  >
                    <ShoppingCart className="mr-1 h-4 w-4" /> Add to Cart
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
