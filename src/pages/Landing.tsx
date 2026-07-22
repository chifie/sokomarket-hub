import { useRef, useState, useEffect, useCallback } from "react";
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
import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";
import { categories, products, sellers, stats } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BadgeCheck, Eye, Users, Store, Package, ShoppingCart } from "lucide-react";
import { useGsapScroll } from "@/hooks/use-gsap-scroll";
import { useTheme } from "@/hooks/use-theme";

const ICON_MAP: Record<string, React.ElementType> = { Users, Store, Package, ShoppingCart };

const INITIAL_PRODUCTS = 12;
const LOAD_MORE_COUNT = 8;

export default function Landing() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_PRODUCTS);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const hasMore = visibleCount < products.length;

  // Load more products (simulated async)
  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    // Simulate network delay
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, products.length));
      setIsLoadingMore(false);
    }, 400);
  }, [isLoadingMore, hasMore]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMore();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, loadMore]);

  const { isDark } = useTheme();

  /* ─── Stats counting animation ─── */
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const numbers = el.querySelectorAll(".stat-number");
    if (!numbers.length) return;

    const ctx = gsap.context(() => {
      numbers.forEach((num) => {
        const targetText = num.textContent || "";
        // Parse numeric value (e.g., "50K+" → 50, "1M+" → 1000)
        const raw = targetText.replace(/[^\dKM.]/g, "");
        let target = 0;
        let suffix = "";
        if (raw.endsWith("K")) {
          target = parseFloat(raw) * 1000;
          suffix = "K+";
        } else if (raw.endsWith("M")) {
          target = parseFloat(raw) * 1000000;
          suffix = "M+";
        } else {
          target = parseFloat(raw) || 0;
          suffix = targetText.replace(/[\d]/g, "");
        }

        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: num,
            start: "top 90%",
            once: true,
          },
          onUpdate: () => {
            if (target >= 1000000) {
              num.textContent = (obj.val / 1000000).toFixed(1) + suffix;
            } else if (target >= 1000) {
              num.textContent = Math.round(obj.val / 1000) + suffix;
            } else {
              num.textContent = Math.round(obj.val) + suffix;
            }
          },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  useGsapScroll(mainRef, [
    // Category pills with scale-in
    { selector: '.landing-cat-pill', stagger: 0.03, from: { y: 15, scale: 0.9 }, to: { scale: 1 }, duration: 0.4, ease: 'power3.out', start: 'top 90%', trigger: '.landing-cat-pills' },
    // Grid cards (Top Selling, New Arrivals, Today's Deal)
    { selector: '.landing-grid-card', stagger: 0.08, from: { y: 30 }, duration: 0.5, ease: 'power3.out' },
    // Stats section
    { selector: '.landing-stats', stagger: 0.08, duration: 0.5, ease: 'power3.out' },
    // Section titles fade-in
    { selector: '.landing-section-title', single: true, stagger: 0, duration: 0.5, ease: 'power3.out', from: { y: 10 } },
    // View more links
    { selector: '.landing-view-more', stagger: 0.08, duration: 0.4, ease: 'power3.out', from: { y: 8 } },
    // Store avatars
    { selector: '.landing-store-link', stagger: 0.03, from: { y: 15, scale: 0.95 }, to: { scale: 1 }, duration: 0.35, ease: 'power3.out' },
    // All products section
    { selector: '.landing-products-section', single: true, duration: 0.6, ease: 'power3.out', from: { y: 20 } },
    // Download app section
    { selector: '.landing-download-app', single: true, duration: 0.6, ease: 'power3.out', from: { y: 25 } },
    // Store badges in download section
    { selector: '.landing-store-badge', stagger: 0.12, duration: 0.5, ease: 'power3.out', from: { x: -15 } },
    // Download section text
    { selector: '.landing-feature-text', stagger: 0.08, duration: 0.5, ease: 'power3.out', from: { y: 15 } },
  ]);

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
              <h2 className="landing-section-title text-sm font-bold text-foreground mb-3">Top Selling</h2>
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
              <Link to="/marketplace" className="landing-view-more text-sm text-primary hover:underline mt-auto pt-2 block text-right font-medium">
                View more →
              </Link>
            </div>

            {/* New Arrivals */}
            <div className="landing-grid-card bg-card rounded-lg p-4 flex flex-col">
              <h2 className="landing-section-title text-sm font-bold text-foreground mb-3">New Arrivals</h2>
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
              <Link to="/marketplace" className="landing-view-more text-sm text-primary hover:underline mt-auto pt-2 block text-right font-medium">
                View more →
              </Link>
            </div>

            {/* Today's Deal — eBay-inspired carousel */}
            <div className="landing-grid-card bg-card rounded-lg p-4 flex flex-col md:col-span-3">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="landing-section-title text-base sm:text-lg font-bold text-foreground">
                    Today's Deals
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    All with free shipping
                  </p>
                </div>
                <Link
                  to="/marketplace?sort=discount"
                  className="landing-view-more text-xs sm:text-sm text-primary hover:underline font-medium shrink-0"
                >
                  See all →
                </Link>
              </div>

              {/* Carousel */}
              <div className="todays-deal-carousel relative -mx-1">
                <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {(() => {
                    const dealProducts = products.filter((p) => p.discountPrice).slice(0, 15);
                    return dealProducts.map((p) => {
                      const fmt = (n: number) =>
                        new Intl.NumberFormat("sw-TZ", {
                          style: "currency",
                          currency: "TZS",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(n);
                      return (
                        <Link
                          key={p.id}
                          to={`/product/${p.slug}`}
                          className="todays-deal-card group min-w-[140px] sm:min-w-[160px] md:min-w-[170px] lg:min-w-[180px] flex-shrink-0 snap-start"
                        >
                          <article className="flex flex-col gap-2 h-full">
                            {/* Image */}
                            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted/30 border border-border/50 group-hover:shadow-md transition-shadow">
                              <img
                                src={p.images[0]}
                                alt={p.name}
                                loading="lazy"
                                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                              />
                              {/* Discount badge */}
                              {p.discountPrice && p.price && (
                                <span className="absolute top-1.5 right-1.5 bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                                  -{Math.round((1 - p.discountPrice / p.price) * 100)}%
                                </span>
                              )}
                              {/* Hover overlay */}
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors rounded-lg" />
                            </div>

                            {/* Details */}
                            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                              <span className="text-xs sm:text-sm text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                                {p.name}
                              </span>
                              <div className="flex items-baseline gap-1.5 flex-wrap mt-auto">
                                {p.discountPrice && (
                                  <span className="font-bold text-sm sm:text-base text-primary">
                                    {fmt(p.discountPrice)}
                                  </span>
                                )}
                                {p.price && (
                                  <span className="text-[10px] sm:text-xs text-muted-foreground line-through">
                                    {fmt(p.price)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </article>
                        </Link>
                      );
                    });
                  })()}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Stats Section ─── */}
        <section ref={statsRef} className="landing-stats px-4 sm:px-8 lg:px-12 xl:px-16 mt-8">
          <div className={cn(
            "rounded-2xl p-8 sm:p-10",
            isDark
              ? "bg-gray-900/50 border border-gray-800"
              : "bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100"
          )}>
            <h2 className="landing-section-title text-center text-sm font-bold text-foreground mb-8">
              SokoDigital by the Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat) => {
                const Icon = ICON_MAP[stat.icon] || Package;
                return (
                  <div key={stat.label} className="text-center landing-stats">
                    <div className={cn(
                      "h-12 w-12 rounded-xl flex items-center justify-center mx-auto mb-3",
                      isDark ? "bg-orange-500/10" : "bg-orange-100"
                    )}>
                      <Icon className={cn(
                        "h-6 w-6",
                        isDark ? "text-orange-400" : "text-orange-600"
                      )} />
                    </div>
                    <p className={cn(
                      "stat-number text-2xl sm:text-3xl font-extrabold",
                      isDark ? "text-white" : "text-gray-900"
                    )}>
                      {stat.value}
                    </p>
                    <p className={cn(
                      "text-xs sm:text-sm mt-1",
                      isDark ? "text-gray-400" : "text-gray-500"
                    )}>
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Stores ─── */}
        <section className="landing-stores-section px-4 sm:px-8 lg:px-12 xl:px-16 mt-8">
          <div className="bg-card rounded-lg p-6">
            <h2 className="landing-section-title text-sm font-bold text-foreground mb-6">Popular Stores</h2>
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
            <Link to="/stores" className="landing-view-more text-sm text-primary hover:underline mt-4 block text-right font-medium">
              View more →
            </Link>
          </div>
        </section>

        {/* ─── All Products (Infinite Scroll) ─── */}
        <section className="landing-products-section px-4 sm:px-8 lg:px-12 xl:px-16 mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="landing-section-title text-sm font-bold text-foreground">All Products</h2>
            <span className="text-xs text-muted-foreground">
              Showing {Math.min(visibleCount, products.length)} of {products.length}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
            {products.slice(0, visibleCount).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
            {/* Loading skeletons */}
            {isLoadingMore &&
              Array.from({ length: LOAD_MORE_COUNT }).map((_, i) => (
                <ProductCardSkeleton key={`skeleton-${i}`} />
              ))}
          </div>

          {/* Sentinel element for IntersectionObserver */}
          <div ref={sentinelRef} className="w-full h-4" />

          {/* Load More button (fallback) */}
          <div className="flex flex-col items-center justify-center mt-6 gap-3">
            {hasMore && !isLoadingMore && (
              <Button
                variant="outline"
                className="rounded-full px-8 gap-2 shadow-sm"
                onClick={loadMore}
              >
                <Eye className="h-4 w-4" />
                Load More ({products.length - visibleCount} remaining)
              </Button>
            )}
            {!hasMore && (
              <p className="text-xs text-muted-foreground">You've viewed all products</p>
            )}
            <Button variant="ghost" size="sm" className="rounded-full text-xs" asChild>
              <Link to="/marketplace">Browse full marketplace →</Link>
            </Button>
          </div>
        </section>

        {/* ─── Download App (Alibaba-inspired) ─── */}
        <section className="landing-download-app px-4 sm:px-8 lg:px-12 xl:px-16 mt-8 mb-8">
          <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 p-8 sm:p-12 shadow-sm text-center">
            {/* Decorative background elements */}
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-accent/5 blur-2xl" />

            <div className="relative z-10 max-w-xl mx-auto">
              <p className="landing-feature-text text-sm sm:text-base text-muted-foreground">
                <span className="text-foreground font-medium">Download </span>
                <a
                  href="#"
                  className="text-primary hover:underline font-semibold"
                  target="_blank"
                  rel="noopener"
                >
                  SokoDigital App
                </a>
              </p>
              <p className="landing-feature-text text-sm sm:text-base text-muted-foreground mt-1">
                Trade on the go with the{' '}
                <span className="text-foreground font-semibold">SokoDigital app</span>
              </p>

              {/* Store Badges */}
              <div className="flex items-center justify-center gap-4 mt-6">
                {/* App Store */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener"
                  className="landing-store-badge inline-block hover:opacity-80 transition-opacity"
                  aria-label="Download from App Store"
                >
                  <img
                    src="https://s.alicdn.com/@img/imgextra/i4/O1CN01i9Aj641atkjJJ9I6y_!!6000000003388-2-tps-396-132.png"
                    alt="Download from App Store"
                    className="h-10 sm:h-12 w-auto"
                  />
                </a>
                {/* Google Play */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener"
                  className="landing-store-badge inline-block hover:opacity-80 transition-opacity"
                  aria-label="Download from Google Play"
                >
                  <img
                    src="https://s.alicdn.com/@img/imgextra/i4/O1CN018KnDNq1JleFgkjLRq_!!6000000001069-2-tps-447-132.png"
                    alt="Download from Google Play"
                    className="h-10 sm:h-12 w-auto"
                  />
                </a>
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
