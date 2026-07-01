import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { end: 100000, suffix: "+", label: "Products" },
  { end: 15000, suffix: "+", label: "Trusted Sellers" },
  { end: 250000, suffix: "+", label: "Customers" },
  { end: 95, suffix: "%", label: "Customer Satisfaction" },
  { end: 50, suffix: "+", label: "Cities Served" },
];

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1500;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end]);

  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-gradient-cta py-20 text-primary-foreground">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -top-32 left-10 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-32 right-10 h-80 w-80 rounded-full bg-accent/40 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="text-center"
            >
              <div className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                <Counter end={s.end} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs font-medium uppercase tracking-widest text-primary-foreground/80">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
