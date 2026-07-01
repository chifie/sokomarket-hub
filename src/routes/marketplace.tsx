import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Star, Eye, ShoppingCart, SlidersHorizontal, Search } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { PRODUCTS, CATEGORIES } from "@/lib/marketplace-data";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Marketplace — SokoDigital" },
      {
        name: "description",
        content: "Browse thousands of verified products from trusted sellers across Tanzania.",
      },
    ],
  }),
  component: Page,
});

const SORTS = ["Most Popular", "Newest", "Price: Low to High", "Price: High to Low", "Top Rated"];

function Page() {
  const [active, setActive] = useState("All");
  const [sort, setSort] = useState(SORTS[0]);

  const filtered = useMemo(() => {
    const list = active === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);
    if (sort === "Price: Low to High") {
      return [...list].sort(
        (a, b) => Number(a.price.replace(/\D/g, "")) - Number(b.price.replace(/\D/g, "")),
      );
    }
    if (sort === "Price: High to Low") {
      return [...list].sort(
        (a, b) => Number(b.price.replace(/\D/g, "")) - Number(a.price.replace(/\D/g, "")),
      );
    }
    if (sort === "Top Rated") {
      return [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [active, sort]);

  const chips = ["All", ...Array.from(new Set(CATEGORIES.map((c) => c.name))).slice(0, 6)];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PageHeader
        eyebrow="Marketplace"
        crumb="Marketplace"
        title="Everything Tanzania sells, in one place."
        description="Browse verified listings from thousands of trusted sellers — filter by category, compare prices, and buy with confidence."
      />

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-soft sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search the marketplace…"
                className="h-11 w-full rounded-full border border-border bg-background pl-9 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-11 rounded-full border border-border bg-background px-4 text-sm outline-none transition focus:border-primary"
              >
                {SORTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {chips.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  active === c
                    ? "border-primary bg-gradient-primary text-primary-foreground shadow-elegant"
                    : "border-border/60 bg-card text-foreground/80 hover:border-primary/40 hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
            products
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((p, i) => (
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
                    <Button
                      size="sm"
                      className="flex-1 rounded-full bg-gradient-primary text-primary-foreground"
                    >
                      <ShoppingCart className="mr-1 h-4 w-4" /> Add
                    </Button>
                    <Button size="sm" variant="secondary" className="rounded-full">
                      <Eye className="h-4 w-4" />
                    </Button>
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

          {filtered.length === 0 && (
            <div className="mt-16 text-center text-muted-foreground">
              No products found in this category yet.
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
