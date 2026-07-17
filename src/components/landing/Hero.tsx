import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Clock, Zap, Tag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { banners } from "@/lib/constants";

const heroProducts = [
  { image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=500&q=80", name: "iPhone 15 Pro Max", floatDelay: 0, x: "12%", y: "8%", scale: 1.1 },
  { image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80", name: "MacBook Pro", floatDelay: 1, x: "72%", y: "5%", scale: 0.9 },
  { image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", name: "Headphones", floatDelay: 2, x: "88%", y: "40%", scale: 0.8 },
  { image: "https://images.unsplash.com/photo-1546868871-af0de0ae72e6?w=500&q=80", name: "Smart Watch", floatDelay: 0.5, x: "3%", y: "50%", scale: 0.85 },
  { image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", name: "Running Shoes", floatDelay: 1.5, x: "18%", y: "68%", scale: 0.75 },
  { image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80", name: "Handbag", floatDelay: 3, x: "62%", y: "72%", scale: 0.7 },
  { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", name: "Smart Watch Ultra", floatDelay: 2.5, x: "80%", y: "65%", scale: 0.65 },
  { image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&q=80", name: "Perfume", floatDelay: 4, x: "45%", y: "15%", scale: 0.6 },
  { image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80", name: "Smart TV", floatDelay: 3.5, x: "30%", y: "5%", scale: 0.65 },
];

function FloatingProduct({ image, name, floatDelay, x, y, scale }: typeof heroProducts[0]) {
  return (
    <motion.div
      className="absolute hidden lg:block"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 + floatDelay * 0.2 }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5 + floatDelay, repeat: Infinity, ease: "easeInOut", delay: floatDelay * 0.5 }}
        className="relative group cursor-pointer"
      >
        <div className="absolute -inset-4 bg-gradient-to-br from-white/40 via-white/10 to-transparent dark:from-white/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative bg-white/80 dark:bg-white/10 backdrop-blur-xl rounded-2xl p-3 premium-shadow border border-white/20 dark:border-white/10 hover:scale-105 transition-transform duration-300">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              style={{ transform: `scale(${scale})` }}
            />
          </div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-white/90 dark:bg-background/90 rounded-full text-[9px] font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
            {name}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const activeBanners = banners.filter((b) => b.isActive && b.type === "hero");

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % activeBanners.length);
  }, [activeBanners.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  }, [activeBanners.length]);

  useEffect(() => {
    if (!isAutoPlaying || activeBanners.length <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, activeBanners.length]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  if (activeBanners.length === 0) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 min-h-[400px] flex items-center">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Welcome to SokoDigital</h1>
          <p className="text-xl text-muted-foreground mb-8">Tanzania's Premier Online Marketplace</p>
          <Button size="lg" className="rounded-full px-8">Start Shopping</Button>
        </div>
      </section>
    );
  }

  const banner = activeBanners[currentSlide];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-background">
      {/* Background Gradient */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-[0.08] dark:opacity-[0.15]", banner.bgColor || "from-primary/20 via-background to-accent/10")} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />

      {/* Floating Products */}
      {heroProducts.map((product) => (
        <FloatingProduct key={product.name} {...product} />
      ))}

      <div className="relative mx-auto max-w-7xl px-4">
        <div
          className="flex flex-col lg:flex-row items-center gap-8 min-h-[500px] lg:min-h-[550px] py-12 lg:py-0"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left lg:max-w-xl z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                {banner.badge && (
                  <Badge className="mb-5 bg-primary/10 text-primary border-primary/20 text-xs font-semibold px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3" />
                    {banner.badge}
                    {banner.discount && <span className="text-primary font-bold">-{banner.discount}%</span>}
                  </Badge>
                )}

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                  <span className="text-foreground">{banner.title}</span>
                  {banner.subtitle && (
                    <>
                      <br />
                      <span className="gradient-text">{banner.subtitle}</span>
                    </>
                  )}
                </h1>

                {banner.description && (
                  <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
                    {banner.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 mt-8">
                  <Button
                    size="lg"
                    className="rounded-full h-12 px-8 text-sm font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 group"
                  >
                    {banner.cta || "Shop Now"}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full h-12 px-8 text-sm font-medium border-border/50"
                  >
                    Explore Deals
                    <Tag className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap items-center gap-4 mt-10 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-emerald-500" />
                    Free Delivery
                  </span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                    Secure Payments
                  </span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-amber-500" />
                    24/7 Support
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right - Banner Image */}
          <div className="flex-1 relative z-10 w-full max-w-lg lg:max-w-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-3xl blur-2xl" />
                <div className="relative rounded-2xl overflow-hidden premium-shadow aspect-[4/3] lg:aspect-[4/3]">
                  <img
                    src={banner.desktopImage}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Arrows */}
        {activeBanners.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-background transition-all shadow-sm z-20 hidden lg:flex"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-background transition-all shadow-sm z-20 hidden lg:flex"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Dot Indicators */}
        {activeBanners.length > 1 && (
          <div className="flex items-center justify-center gap-2 pb-6">
            {activeBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 bg-primary"
                    : "w-2 bg-border hover:bg-border/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`ml-3 h-6 w-6 rounded-full flex items-center justify-center text-[10px] transition-colors ${
                isAutoPlaying ? "text-primary" : "text-muted-foreground"
              }`}
              aria-label={isAutoPlaying ? "Pause auto-play" : "Start auto-play"}
            >
              {isAutoPlaying ? "⏸" : "▶"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
