import { useRef, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Hero } from "@/components/landing/Hero";
import { ProductCard } from "@/components/product/ProductCard";
import { categories, products, sellers } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { BadgeCheck, ShoppingCart, Smartphone, Package } from "lucide-react";

export default function Landing() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        main.querySelectorAll(".landing-cat-pill"),
        { opacity: 0, y: 15, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.4,
          ease: "power3.out", stagger: 0.03,
          scrollTrigger: { trigger: main.querySelector(".landing-cat-pills"), start: "top 90%", once: true },
        }
      );
      gsap.fromTo(
        main.querySelectorAll(".landing-grid-card"),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: main.querySelector(".landing-grid-section"), start: "top 85%", once: true },
        }
      );
      gsap.fromTo(
        main.querySelectorAll(".landing-store-link"),
        { opacity: 0, y: 15, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out", stagger: 0.03,
          scrollTrigger: { trigger: main.querySelector(".landing-stores-section"), start: "top 85%", once: true },
        }
      );
      gsap.fromTo(
        main.querySelector(".landing-deal-banner"),
        { opacity: 0, y: 25, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: main.querySelector(".landing-deal-banner"), start: "top 85%", once: true },
        }
      );
      gsap.fromTo(
        main.querySelector(".landing-products-section"),
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: main.querySelector(".landing-products-section"), start: "top 85%", once: true },
        }
      );
      gsap.fromTo(
        main.querySelector(".landing-download-app"),
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: main.querySelector(".landing-download-app"), start: "top 85%", once: true },
        }
      );
    }, main);
    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background flex flex-col"
    >
      <Header />

      <main ref={mainRef} className="flex-1 pb-16 lg:pb-0">
        <Hero />

        {/* ─── Category Pills ─── */}
        <section className="landing-cat-pills px-4 sm:px-8 lg:px-12 xl:px-16 mt-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {categories.slice(0, 20).map((cat) => (
              <Link
                key={cat.id}
                to={`/marketplace?category=${cat.slug}`}
                className="landing-cat-pill shrink-0 px-4 py-2 rounded-full bg-card border border-border text-sm text-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>

        {/* ─── Top Selling / New Arrivals / Today's Deal ─── */}
        <section className="landing-grid-section px-4 sm:px-8 lg:px-12 xl:px-16 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
            {/* Top Selling */}
            <div className="landing-grid-card bg-card rounded-lg p-4 flex flex-col">
              <h2 className="text-sm font-bold text-foreground mb-3">Top Selling</h2>
              <div className="grid grid-cols-2 gap-2">
                {products.slice(0, 4).map((p) => (
                  <Link key={p.id} to={`/product/${p.slug}`} className="block aspect-square">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-contain bg-muted/50 rounded"
                    />
                  </Link>
                ))}
              </div>
              <Link to="/marketplace" className="text-sm text-primary hover:underline mt-auto pt-2 block text-right font-medium">
                View more →
              </Link>
            </div>

            {/* New Arrivals */}
            <div className="landing-grid-card bg-card rounded-lg p-4 flex flex-col">
              <h2 className="text-sm font-bold text-foreground mb-3">New Arrivals</h2>
              <div className="grid grid-cols-3 gap-2">
                <Link to={`/product/${products[0]?.slug}`} className="col-span-3 block aspect-[4/3] sm:aspect-[3/2]">
                  <img
                    src={products[0]?.images[0]}
                    alt={products[0]?.name || "Product"}
                    loading="lazy"
                    className="w-full h-full object-contain bg-muted/50 rounded"
                  />
                </Link>
                {products.slice(1, 4).map((p) => (
                  <Link key={p.id} to={`/product/${p.slug}`} className="block aspect-square">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-contain bg-muted/50 rounded"
                    />
                  </Link>
                ))}
              </div>
              <Link to="/marketplace" className="text-sm text-primary hover:underline mt-auto pt-2 block text-right font-medium">
                View more →
              </Link>
            </div>

            {/* Today's Deal */}
            <div className="landing-grid-card bg-card rounded-lg p-4 flex flex-col">
              <h2 className="text-sm font-bold text-foreground mb-3">Today's Deal</h2>
              <div className="grid grid-cols-2 gap-2">
                {products.filter((p) => p.discountPrice).slice(0, 4).map((p) => (
                  <Link key={p.id} to={`/product/${p.slug}`} className="block aspect-square relative">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-contain bg-muted/50 rounded"
                    />
                    {p.discountPrice && p.price && (
                      <span className="absolute top-0.5 right-0.5 bg-rose-500 text-white text-[9px] font-bold px-1 py-0.5 rounded">
                        -{Math.round((1 - p.discountPrice / p.price) * 100)}%
                      </span>
                    )}
                  </Link>
                ))}
              </div>
              <Link to="/marketplace" className="text-sm text-primary hover:underline mt-auto pt-2 block text-right font-medium">
                View more →
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Stores ─── */}
        <section className="landing-stores-section px-4 sm:px-8 lg:px-12 xl:px-16 mt-8">
          <div className="bg-card rounded-lg p-6">
            <h2 className="text-sm font-bold text-foreground mb-6">Popular Stores</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-6">
              {sellers.slice(0, 12).map((seller) => (
                <Link
                  key={seller.id}
                  to={`/store/${seller.id}`}
                  className="landing-store-link flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-muted flex items-center justify-center ring-2 ring-border/50 group-hover:ring-primary transition-colors">
                    {seller.logo ? (
                      <img src={seller.logo} alt={seller.storeName} loading="lazy" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl font-bold text-primary">{seller.storeName.charAt(0)}</span>
                    )}
                  </div>
                  <span className="text-[11px] text-center text-foreground w-full inline-flex items-center justify-center gap-1 min-w-0">
                    <span className="truncate min-w-0">{seller.storeName}</span>
                    {seller.verified && (
                      <BadgeCheck className="inline-block shrink-0 text-primary fill-primary" style={{ width: 12, height: 12 }} />
                    )}
                  </span>
                </Link>
              ))}
            </div>
            <Link to="/stores" className="text-sm text-primary hover:underline mt-4 block text-right font-medium">
              View more →
            </Link>
          </div>
        </section>

        {/* ─── All Products ─── */}
        <section className="landing-products-section px-4 sm:px-8 lg:px-12 xl:px-16 mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-foreground">All Products</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <Button className="shadow-sm" asChild>
              <Link to="/marketplace">View more →</Link>
            </Button>
          </div>
        </section>

        {/* ─── Download App ─── */}
        <section className="landing-download-app px-4 sm:px-8 lg:px-12 xl:px-16 mt-8 mb-8">
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-2xl border border-border/50 p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            <div className="flex-1 text-center sm:text-left">
              <Smartphone className="h-8 w-8 text-primary mb-3 mx-auto sm:mx-0" />
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">Get the SokoDigital App</h2>
              <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto sm:mx-0">
                Shop on the go. Download the app for the best shopping experience with exclusive app-only deals.
              </p>
              <div className="flex flex-wrap gap-3 mt-5 justify-center sm:justify-start">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all active:scale-[0.97] shadow-sm"
                >
                  <Package className="h-4 w-4" />
                  Google Play
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all active:scale-[0.97] shadow-sm"
                >
                  <ShoppingCart className="h-4 w-4" />
                  App Store
                </a>
              </div>
            </div>
            <div className="shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-border/30">
                <Smartphone className="h-12 w-12 sm:h-16 sm:w-16 text-primary/60" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </motion.div>
  );
}
