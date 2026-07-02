import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Star, Eye, ShoppingCart, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/lib/marketplace-data";

export function Products() {
  return (
    <section className="bg-muted/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Featured products
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Trending this week
            </h2>
          </div>
          <Link
            to="/marketplace"
            className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition inline-flex items-center"
          >
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.slice(0, 4).map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
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
                <span className="absolute left-3 top-3 rounded-full bg-danger px-2 py-1 text-[10px] font-bold text-white">
                  -{p.discount}%
                </span>
                <button
                  aria-label="Wishlist"
                  className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground/80 shadow-soft transition hover:text-danger"
                >
                  <Heart className="h-4 w-4" />
                </button>
                <div className="absolute inset-x-3 bottom-3 flex translate-y-4 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <button className="flex-1 rounded-full bg-gradient-to-r from-sky-500 to-sky-700 text-white text-sm font-medium px-3 py-1.5 inline-flex items-center justify-center">
                    <ShoppingCart className="mr-1 h-4 w-4" /> Add
                  </button>
                  <button className="rounded-full bg-secondary text-secondary-foreground text-sm font-medium px-3 py-1.5 inline-flex items-center justify-center">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="text-xs text-muted-foreground">{p.seller}</div>
                <h3 className="mt-1 line-clamp-2 text-sm font-semibold">{p.title}</h3>
                <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                  <span className="font-semibold text-foreground">{p.rating}</span>
                  <span>· 240 sold</span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-lg font-black text-primary">{p.price}</span>
                  <span className="text-xs text-muted-foreground line-through">{p.old}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
