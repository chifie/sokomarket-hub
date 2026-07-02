import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
} from "lucide-react";

const CATS = [
  {
    icon: Smartphone,
    name: "Electronics",
    count: "12,400+",
    tint: "from-rose-500/15 to-rose-500/5",
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
  { icon: Dumbbell, name: "Sports", count: "2,300+", tint: "from-sky-500/15 to-sky-500/5" },
  { icon: HeartPulse, name: "Health", count: "4,700+", tint: "from-rose-500/15 to-rose-500/5" },
];

export function Categories() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Categories
          </span>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Shop everything you love
          </h2>
          <p className="mt-4 text-muted-foreground">
            Explore thousands of products across every category — curated for Tanzania.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {CATS.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              whileHover={{ y: -4 }}
            >
              <Link
                to="/marketplace"
                className={`group relative block overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br ${c.tint} p-5 shadow-soft transition-shadow hover:shadow-elegant`}
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-background text-primary shadow-soft transition-transform group-hover:scale-110">
                  <c.icon className="h-6 w-6" />
                </div>
                <div className="mt-4 text-sm font-semibold">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.count} items</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
