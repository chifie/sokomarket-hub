import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Truck,
  Headphones,
  RotateCcw,
  Tag,
  Sparkles,
  MapPin,
} from "lucide-react";

const FEATURES = [
  { icon: ShieldCheck, title: "Verified Sellers", desc: "Every seller passes KYC and quality checks." },
  { icon: Lock, title: "Secure Payments", desc: "Escrow-protected transactions with M-Pesa & cards." },
  { icon: Truck, title: "Fast Delivery", desc: "Same-day dispatch across 50+ Tanzanian cities." },
  { icon: Headphones, title: "24/7 Support", desc: "Real humans ready to help in Swahili and English." },
  { icon: RotateCcw, title: "Easy Returns", desc: "7-day hassle-free returns on eligible items." },
  { icon: Tag, title: "Affordable Prices", desc: "Compete-and-save pricing from local sellers." },
  { icon: Sparkles, title: "Quality Products", desc: "Curated catalogue with strict listing standards." },
  { icon: MapPin, title: "Real-time Tracking", desc: "Follow your order from checkout to doorstep." },
];

export function Features() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Why SokoDigital
          </span>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Built for buyers. Loved by sellers.
          </h2>
          <p className="mt-4 text-muted-foreground">
            A marketplace engineered for trust, speed, and delight — from your first click to final delivery.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="group rounded-2xl border border-border/60 bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant transition-transform group-hover:scale-110">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-base font-bold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
