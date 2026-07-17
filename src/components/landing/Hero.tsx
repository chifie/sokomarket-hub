import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

  if (activeBanners.length === 0) return null;

  return (
    <section className="px-4 sm:px-8 lg:px-12 xl:px-16 mt-4">
      <div
        className="rounded-lg overflow-hidden relative group"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {activeBanners.map((b) => (
            <a key={b.id} href={b.link || "#"} className="w-full flex-shrink-0">
              <div className="relative w-full group/slide">
                <img
                  src={b.desktopImage}
                  alt={b.title}
                  width={1920}
                  height={512}
                  loading="eager"
                  className="w-full aspect-[21/9] sm:aspect-[21/9] lg:aspect-[64/18] object-cover object-center bg-muted"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent sm:flex sm:items-center sm:justify-center">
                  <span className="pointer-events-none absolute bottom-3 left-3 sm:static inline-flex items-center gap-1.5 bg-primary text-primary-foreground font-bold text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-lg shadow-primary/40 ring-2 ring-white/40 transition-transform duration-300 group-hover/slide:scale-110">
                    {b.cta || "Shop Now"}
                    <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Navigation Arrows */}
        {activeBanners.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/60 hover:bg-background/80 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/60 hover:bg-background/80 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </>
        )}

        {/* Dot Indicators */}
        {activeBanners.length > 1 && (
          <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {activeBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === currentSlide ? "bg-primary" : "bg-background/60"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
