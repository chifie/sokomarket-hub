import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { banners } from "@/lib/constants";

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
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 min-h-[300px] flex items-center">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to SokoDigital</h1>
          <p className="text-lg text-muted-foreground mb-6">Tanzania's Premier Online Marketplace</p>
          <Button size="lg" className="rounded-full px-8">Start Shopping</Button>
        </div>
      </section>
    );
  }

  const banner = activeBanners[currentSlide];

  return (
    <section className="relative overflow-hidden bg-background">
      <div
        className="relative w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-[21/9] sm:aspect-[21/9] lg:aspect-[64/18]"
          >
            {/* Banner Image */}
            <img
              src={banner.desktopImage}
              alt={banner.title}
              className="w-full h-full object-cover object-center bg-muted"
              loading="lazy"
            />

            {/* Gradient Overlay - left to right for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="max-w-xl"
                >
                  {banner.badge && (
                    <Badge className="mb-3 sm:mb-4 bg-white/15 text-white border-white/20 backdrop-blur-sm text-[10px] sm:text-xs font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full inline-flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3" />
                      {banner.badge}
                      {banner.discount && <span className="font-bold">-{banner.discount}%</span>}
                    </Badge>
                  )}

                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
                    {banner.title}
                  </h1>

                  {banner.subtitle && (
                    <p className="mt-1.5 sm:mt-2 text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-semibold">
                      {banner.subtitle}
                    </p>
                  )}

                  {banner.description && (
                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-white/75 max-w-lg line-clamp-2 leading-relaxed">
                      {banner.description}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 sm:mt-5">
                    <Button
                      size="lg"
                      className="rounded-full h-9 sm:h-11 px-5 sm:px-7 text-xs sm:text-sm font-medium shadow-lg bg-white text-gray-900 hover:bg-white/90 transition-all duration-300 group"
                    >
                      {banner.cta || "Shop Now"}
                      <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {activeBanners.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-black/25 backdrop-blur-sm border border-white/15 flex items-center justify-center hover:bg-black/45 transition-all shadow-sm z-10 hidden md:flex"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-black/25 backdrop-blur-sm border border-white/15 flex items-center justify-center hover:bg-black/45 transition-all shadow-sm z-10 hidden md:flex"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </button>
          </>
        )}

        {/* Dot Indicators */}
        {activeBanners.length > 1 && (
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-10">
            {activeBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "rounded-full transition-all duration-300",
                  index === currentSlide
                    ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-white"
                    : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 hover:bg-white/60"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={cn(
                "ml-1.5 sm:ml-2 h-5 w-5 sm:h-6 sm:w-6 rounded-full flex items-center justify-center text-[8px] sm:text-[10px] transition-colors",
                isAutoPlaying ? "text-white" : "text-white/50"
              )}
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
