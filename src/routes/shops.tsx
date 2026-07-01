import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BadgeCheck, MapPin, Star, Store } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { SHOPS } from "@/lib/marketplace-data";

export const Route = createFileRoute("/shops")({
  head: () => ({
    meta: [
      { title: "Shops — SokoDigital" },
      {
        name: "description",
        content: "Discover verified shops and trusted sellers from across Tanzania on SokoDigital.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PageHeader
        eyebrow="Shops"
        crumb="Shops"
        title="Meet the sellers behind SokoDigital."
        description="Every shop is verified and reviewed by real customers — shop with confidence, from Dar es Salaam to Mwanza."
      />

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SHOPS.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
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
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                      {s.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {s.city}
                    </span>
                    <span>{s.products} products</span>
                  </div>
                  <div className="mt-2 inline-flex rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                    {s.category}
                  </div>
                  <Button className="mt-4 w-full rounded-full bg-gradient-primary text-primary-foreground">
                    Visit Shop
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mt-16 overflow-hidden rounded-3xl bg-gradient-cta p-10 text-center text-primary-foreground shadow-elegant lg:p-14"
          >
            <div className="pointer-events-none absolute -top-16 left-1/4 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 right-1/4 h-64 w-64 rounded-full bg-accent/40 blur-3xl" />
            <Store className="relative mx-auto h-10 w-10" />
            <h2 className="relative mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Ready to open your own shop?
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-primary-foreground/85">
              Join thousands of Tanzanian sellers already growing their business on SokoDigital.
              Zero setup fees, fast payouts.
            </p>
            <Button
              size="lg"
              className="relative mt-6 h-12 rounded-full bg-white px-8 font-semibold text-primary hover:bg-white/90"
            >
              Become a Seller
            </Button>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
