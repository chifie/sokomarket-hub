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
import { BadgeCheck, Smartphone, ArrowDown } from "lucide-react";

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
          <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 shadow-sm">
            {/* Decorative background elements */}
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-accent/5 blur-2xl" />

            {/* Left: Text + Store Buttons */}
            <div className="flex-1 relative z-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                <Smartphone className="h-3.5 w-3.5" />
                Mobile App
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                Get the SokoDigital App
              </h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto lg:mx-0 leading-relaxed">
                Shop on the go. Download the app for exclusive deals, real-time tracking, and the best shopping experience.
              </p>

              {/* Store Badges */}
              <div className="flex flex-wrap gap-3 mt-6 justify-center lg:justify-start">
                {/* Google Play */}
                <a
                  href="#"
                  className="inline-flex items-center gap-3 bg-foreground text-background px-4 py-2.5 rounded-xl hover:opacity-90 transition-all active:scale-[0.97] shadow-sm group/download"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" fill="currentColor">
                    <path d="M17.8 4.8L7.2 1.2C6.2.9 5.1 1.1 4.3 1.8L12.5 10l5.3-5.2zM3.9 2.5C3.4 3 3.1 3.7 3.1 4.5v15c0 .8.3 1.5.8 2l8.6-8.6L3.9 2.5zM13.2 12l4.6 4.6 1.9-.9c.9-.4 1.5-1.3 1.5-2.3s-.6-1.8-1.5-2.3l-1.9-.9L13.2 12zM3.1 21.5c.5.5 1.2.8 2 .8.3 0 .6 0 .9-.1l10.5-3.5-4.6-4.6-8.8 7.4z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[9px] leading-tight opacity-70">GET IT ON</div>
                    <div className="text-sm font-bold leading-tight">Google Play</div>
                  </div>
                </a>

                {/* App Store */}
                <a
                  href="#"
                  className="inline-flex items-center gap-3 bg-foreground text-background px-4 py-2.5 rounded-xl hover:opacity-90 transition-all active:scale-[0.97] shadow-sm group/download"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" fill="currentColor">
                    <path d="M17.1 12.6c-.1-2.4 1.9-3.6 2-3.7-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9-.7 0-1.8-.8-2.9-.8-1.5 0-2.9.9-3.7 2.2-1.6 2.8-.4 6.9 1.1 9.2.8 1.1 1.7 2.4 2.9 2.4 1.2 0 1.6-.8 3-.8s1.7.8 2.9.8c1.2 0 2-1.2 2.7-2.3.9-1.2 1.2-2.4 1.3-2.5-.1 0-2.4-.9-2.4-3.6zM14.5 5.3c.7-.8 1.2-2 1-3.1-1 .1-2.1.6-2.8 1.4-.6.7-1.2 1.9-1 3 .9 0 2-.6 2.8-1.3z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[9px] leading-tight opacity-70">Download on the</div>
                    <div className="text-sm font-bold leading-tight">App Store</div>
                  </div>
                </a>
              </div>

              <p className="text-[11px] text-muted-foreground mt-3 flex items-center gap-1 justify-center lg:justify-start">
                <ArrowDown className="h-3 w-3" />
                Free download. Available on iOS and Android.
              </p>
            </div>

            {/* Right: Phone Mockup */}
            <div className="shrink-0 relative z-10">
              <div className="relative">
                {/* Phone body */}
                <div className="w-28 h-44 sm:w-36 sm:h-56 rounded-2xl border-2 border-foreground/20 bg-gradient-to-b from-primary/20 via-accent/10 to-background flex items-center justify-center shadow-lg">
                  {/* Screen content */}
                  <div className="text-center">
                    <Smartphone className="h-8 w-8 sm:h-10 sm:w-10 text-primary/40 mx-auto" />
                    <div className="text-[8px] sm:text-[10px] font-bold text-primary mt-1">SokoDigital</div>
                    <div className="w-8 h-0.5 bg-primary/20 rounded-full mx-auto mt-1" />
                  </div>
                </div>
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-xl -z-10" />
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
