import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { banners } from "@/lib/constants";
import { gsap } from "gsap";

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  const activeBanners = banners.filter((b) => b.isActive && b.type === "hero");

  // GSAP entrance animation on mount
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Premium entrance: container scale + fade
      gsap.fromTo(
        section.querySelector(".hero-slider-container"),
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
      );

      // Animate each banner's overlay content (CTA buttons)
      const ctas = section.querySelectorAll(".hero-cta");
      gsap.fromTo(
        ctas,
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.15,
          delay: 0.4,
        }
      );

      // Subtle floating animation on active CTA
      gsap.to(ctas, {
        y: -3,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // GSAP-powered slide transition
  const animateSlide = useCallback(
    (fromIndex: number, toIndex: number) => {
      const slider = sliderRef.current;
      if (!slider || isAnimatingRef.current) return;

      isAnimatingRef.current = true;

      const ctx = gsap.context(() => {
        // Determine direction: -1 = next (left), 1 = prev (right)
        const direction = toIndex > fromIndex ? -1 : 1;

        gsap.to(slider, {
          x: `${-toIndex * 100}%`,
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        });

        // Add a subtle opacity transition for a cinematic feel
        const slides = slider.children;
        if (slides[fromIndex]) {
          gsap.to(slides[fromIndex], {
            opacity: 0.7,
            duration: 0.3,
            ease: "power2.out",
          });
        }
        if (slides[toIndex]) {
          gsap.fromTo(
            slides[toIndex],
            { opacity: 0.7, scale: 0.98 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: "power3.out",
              delay: 0.1,
            }
          );
        }
      }, slider);

      // Cleanup context after animation completes
      setTimeout(() => {
        ctx.revert();
        isAnimatingRef.current = false;
      }, 800);
    },
    []
  );

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      const next = (prev + 1) % activeBanners.length;
      animateSlide(prev, next);
      return next;
    });
  }, [activeBanners.length, animateSlide]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      const prevIdx = (prev - 1 + activeBanners.length) % activeBanners.length;
      animateSlide(prev, prevIdx);
      return prevIdx;
    });
  }, [activeBanners.length, animateSlide]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide((prev) => {
        if (prev !== index) {
          animateSlide(prev, index);
        }
        return index;
      });
    },
    [animateSlide]
  );

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
    <section ref={sectionRef} className="px-4 sm:px-8 lg:px-12 xl:px-16 mt-4">
      <div
        ref={containerRef}
        className="hero-slider-container rounded-lg overflow-hidden relative group opacity-0"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={sliderRef}
          className="flex"
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
                  <span className="hero-cta pointer-events-none absolute bottom-3 left-3 sm:static inline-flex items-center gap-1.5 bg-primary text-primary-foreground font-bold text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-lg shadow-primary/40 ring-2 ring-white/40 transition-transform duration-300 group-hover/slide:scale-110">
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
                onClick={() => goToSlide(index)}
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
