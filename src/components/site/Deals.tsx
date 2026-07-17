import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Flame, ArrowRight } from "lucide-react";

function useCountdown(target: number) {
  const [now, setNow] = useState(() => Date.now());
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

export function Deals() {
  // eslint-disable-next-line react-hooks/purity
  const { h, m, s } = useCountdown(Date.now() + 1000 * 60 * 60 * 8);

  return (
    <section className="py-20 lg:py-28">
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
              <Link
                to="/deals"
                className="mt-6 h-12 rounded-full bg-yellow-500 px-6 font-semibold text-gray-900 hover:opacity-90 transition inline-flex items-center justify-center"
              >
                Shop Deals <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
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
      </div>
    </section>
  );
}
