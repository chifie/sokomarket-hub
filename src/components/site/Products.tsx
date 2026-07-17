import { motion } from "framer-motion";
import { Link } from "react-router";
import { Star, ArrowRight, TrendingUp } from "lucide-react";
import { PRODUCTS } from "@/lib/marketplace-data";

export function Products() {
  return (
    <section className="bg-muted/40 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary">
              <TrendingUp className="h-3.5 w-3.5" /> Trending
            </span>
            <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Best sellers this week</h2>
          </div>
          <Link
            to="/marketplace"
            className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted"
          >
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {PRODUCTS.slice(0, 8).map((p, i) => {
            const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            return (
              <motion.div
                key={`${p.title}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <Link
                  to={`/product/${slug}`}
                  className="group block overflow-hidden rounded-lg border border-border bg-card transition hover:shadow-lg"
                >
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    {p.discount > 0 && (
                      <span className="absolute left-2 top-2 rounded bg-destructive px-1.5 py-0.5 text-[10px] font-black text-white">
                        -{p.discount}%
                      </span>
                    )}
                    <span className="absolute right-2 top-2 rounded bg-secondary/90 px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">
                      Prime
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium text-foreground group-hover:text-accent">
                      {p.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-1">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star
                            key={s}
                            className={`h-3 w-3 ${s < Math.round(p.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-accent font-semibold">{p.rating}</span>
                      <span className="text-xs text-muted-foreground">(240)</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-lg font-black text-foreground">{p.price}</span>
                      {p.old && <span className="text-xs text-muted-foreground line-through">{p.old}</span>}
                    </div>
                    <div className="mt-1 text-[11px] text-success font-semibold">FREE shipping</div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground truncate">by {p.seller}</div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
