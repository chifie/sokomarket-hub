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
import { ProductCard} from "@/components/product/ProductCard";
import { categories, products } from "@/lib/constants";
import { Button } from "@/components/ui/button";

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
              <Link to="/marketplace">
                View more →
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </motion.div>
  );
}
