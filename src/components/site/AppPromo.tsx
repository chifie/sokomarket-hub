import { motion } from "framer-motion";
import { Apple, Play, Smartphone, Star } from "lucide-react";

export function AppPromo() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Mobile app
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Shop smarter, on the go.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Get exclusive app-only deals, faster checkout, and one-tap re-order.
              Available for iOS and Android.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#"
                className="flex items-center gap-3 rounded-2xl bg-foreground px-5 py-3 text-background transition hover:opacity-90"
              >
                <Apple className="h-6 w-6" />
                <div className="text-left leading-tight">
                  <div className="text-[10px] uppercase">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-2xl bg-foreground px-5 py-3 text-background transition hover:opacity-90"
              >
                <Play className="h-6 w-6" />
                <div className="text-left leading-tight">
                  <div className="text-[10px] uppercase">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto"
          >
            <div className="relative mx-auto h-[500px] w-[260px] rounded-[3rem] border-8 border-foreground bg-gradient-primary p-3 shadow-elegant">
              <div className="h-full w-full overflow-hidden rounded-[2rem] bg-background p-4">
                <div className="flex items-center justify-between">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <div className="text-xs font-semibold text-primary">SokoDigital</div>
                </div>
                <div className="mt-4 h-32 rounded-2xl bg-gradient-primary shadow-soft" />
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="h-24 rounded-xl bg-muted" />
                  <div className="h-24 rounded-xl bg-accent/30" />
                  <div className="h-24 rounded-xl bg-primary/20" />
                  <div className="h-24 rounded-xl bg-muted" />
                </div>
              </div>
            </div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -left-8 top-16 rounded-2xl bg-card p-3 shadow-elegant"
            >
              <div className="flex items-center gap-2 text-xs font-semibold">
                <Star className="h-4 w-4 fill-accent text-accent" /> 4.9 · 50k reviews
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
