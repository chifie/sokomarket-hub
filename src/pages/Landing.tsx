import { useRef, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Hero } from "@/components/landing/Hero";
import { FlashSaleBanner } from "@/components/landing/FlashSaleBanner";
import { FeaturedCategories } from "@/components/landing/FeaturedCategories";
import { ProductSection } from "@/components/landing/ProductSection";
import { PopularSellers } from "@/components/landing/PopularSellers";
import { Statistics } from "@/components/landing/Statistics";
import { Testimonials } from "@/components/landing/Testimonials";
import { Newsletter } from "@/components/landing/Newsletter";
import { DownloadApp } from "@/components/landing/DownloadApp";
import { ProductCard} from "@/components/product/ProductCard";
import { categories, products, sellers } from "@/lib/constants";
import { ShoppingCart, Package, BadgeCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function Landing() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const ctx = gsap.context(() => {
      // Category pills staggered entrance
      gsap.fromTo(
        main.querySelectorAll(".landing-cat-pill"),
        { opacity: 0, y: 15, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
          stagger: 0.03,
          scrollTrigger: {
            trigger: main.querySelector(".landing-cat-pills"),
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Grid sections staggered entrance
      gsap.fromTo(
        main.querySelectorAll(".landing-grid-card"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: main.querySelector(".landing-grid-section"),
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Stores section staggered entrance
      gsap.fromTo(
        main.querySelectorAll(".landing-store-link"),
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
          stagger: 0.03,
          scrollTrigger: {
            trigger: main.querySelector(".landing-stores-section"),
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Products section entrance
      gsap.fromTo(
        main.querySelector(".landing-products-section"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: main.querySelector(".landing-products-section"),
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Promo banner entrance
      gsap.fromTo(
        main.querySelector(".landing-promo-banner"),
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: main.querySelector(".landing-promo-banner"),
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
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

        {/* ─── Top Selling / New Arrivals / Top Deals ─── */}
        <section className="landing-grid-section px-4 sm:px-8 lg:px-12 xl:px-16 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
            {/* Top Selling */}
            <div className="landing-grid-card bg-card rounded-lg p-4 flex flex-col">
              <h2 className="text-sm font-bold text-foreground mb-3">Top Selling Product</h2>
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
              <Link to="/top-selling" className="text-sm text-primary hover:underline mt-auto pt-2 block text-right font-medium">
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
              <Link to="/new-arrivals" className="text-sm text-primary hover:underline mt-auto pt-2 block text-right font-medium">
                View more →
              </Link>
            </div>

            {/* Top Deals */}
            <div className="landing-grid-card bg-card rounded-lg p-4 flex flex-col">
              <h2 className="text-sm font-bold text-foreground mb-3">Top Deals</h2>
              <div className="grid grid-cols-2 gap-2">
                {products.slice(4, 8).map((p) => (
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
              <Link to="/top-deals" className="text-sm text-primary hover:underline mt-auto pt-2 block text-right font-medium">
                View more →
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Stores Section ─── */}
        <section className="landing-stores-section px-4 sm:px-8 lg:px-12 xl:px-16 mt-8">
          <div className="bg-card rounded-lg p-6">
            <h2 className="text-sm font-bold text-foreground mb-6">Stores</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-6">
              {sellers.slice(0, 12).map((seller) => (
                <Link
                  key={seller.id}
                  to={`/store/${seller.id}`}
                  className="landing-store-link flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-muted flex items-center justify-center ring-2 ring-border/50 group-hover:ring-primary transition-colors">
                    {seller.logo ? (
                      <img
                        src={seller.logo}
                        alt={seller.storeName}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-primary">{seller.storeName.charAt(0)}</span>
                    )}
                  </div>
                  <span className="text-[11px] text-center text-foreground w-full inline-flex items-center justify-center gap-1 min-w-0">
                    <span className="truncate min-w-0">{seller.storeName}</span>
                    {seller.verified && (
                      <BadgeCheck
                        className="inline-block shrink-0 text-primary fill-primary"
                        style={{ width: 12, height: 12 }}
                      />
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

        {/* ─── Promo Banner ─── */}
        <section className="px-4 sm:px-8 lg:px-12 xl:px-16 mt-8">
          <div className="landing-promo-banner bg-card rounded-lg p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <p className="text-sm text-primary font-medium">Don't Miss Today's Deal</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-1">Let Us Shopping Today!</h2>
              <Button
                size="lg"
                className="mt-4 shadow-md"
                asChild
              >
                <Link to="/marketplace">Shop Now</Link>
              </Button>
            </div>
            <div className="flex-1">
              <div className="w-full h-40 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/5 rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-3 gap-3 p-4">
                  <Package className="h-8 w-8 text-primary/60" />
                  <ShoppingCart className="h-8 w-8 text-primary/60" />
                  <Sparkles className="h-8 w-8 text-primary/60" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── All Products ─── */}
        <section className="landing-products-section px-4 sm:px-8 lg:px-12 xl:px-16 mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-foreground">Other Products</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <Button className="shadow-sm" asChild>
              <Link to="/products">
                View more →
              </Link>
            </Button>
          </div>
        </section>

        {/* ─── Flash Sale Banner ─── */}
        <FlashSaleBanner />
        <FeaturedCategories />
        <ProductSection />
        <PopularSellers />
        <Statistics />
        <Testimonials />
        <Newsletter />
        <DownloadApp />
      </main>

      <Footer />
      <MobileBottomNav />
    </motion.div>
  );
}
