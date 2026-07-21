import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Zap, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { banners } from "@/lib/constants";
import { gsap } from "gsap";

/* ─── Theme gradient & accent map ─── */
const THEME_GRADIENTS: Record<string, string> = {
  "Premium Tech Deals":
    "bg-gradient-to-r from-indigo-950/90 via-purple-900/70 to-transparent",
  "Tanzanian Fashion Collection":
    "bg-gradient-to-r from-rose-950/90 via-pink-900/70 to-transparent",
  "Free Delivery Week":
    "bg-gradient-to-r from-emerald-950/90 via-teal-900/70 to-transparent",
  "Beauty & Cosmetics Sale":
    "bg-gradient-to-r from-pink-950/90 via-rose-900/70 to-transparent",
  "Student Discount Week":
    "bg-gradient-to-r from-sky-950/90 via-blue-900/70 to-transparent",
};
const DEFAULT_GRADIENT =
  "bg-gradient-to-r from-gray-950/90 via-gray-900/70 to-transparent";

const ACCENT_BADGE: Record<string, string> = {
  "Premium Tech Deals": "bg-indigo-500/20 text-indigo-200 border-indigo-400/30",
  "Tanzanian Fashion Collection":
    "bg-rose-500/20 text-rose-200 border-rose-400/30",
  "Free Delivery Week":
    "bg-emerald-500/20 text-emerald-200 border-emerald-400/30",
  "Beauty & Cosmetics Sale":
    "bg-pink-500/20 text-pink-200 border-pink-400/30",
  "Student Discount Week": "bg-sky-500/20 text-sky-200 border-sky-400/30",
};

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const animTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const progressRef = useRef(0);
  const progressAnimRef = useRef<gsap.core.Tween | null>(null);

  const activeBanners = banners.filter((b) => b.isActive && b.type === "hero");

  // Cleanup
  useEffect(() => {
    return () => {
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
      if (progressAnimRef.current) progressAnimRef.current.kill();
    };
  }, []);

  /* ─── Entrance animation on mount ─── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector(".hero-slider-container"),
        { opacity: 0, scale: 0.96, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  /* ─── Per-slide text entrance ─── */
  const animateSlideContent = useCallback((index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const slide = section.querySelector(`[data-slide="${index}"]`);
    if (!slide) return;

    const ctx = gsap.context(() => {
      // Badge
      gsap.fromTo(
        slide.querySelector(".hero-badge"),
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
      // Title
      gsap.fromTo(
        slide.querySelector(".hero-title"),
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out",
          delay: 0.1,
        }
      );
      // Subtitle
      gsap.fromTo(
        slide.querySelector(".hero-subtitle"),
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: "power2.out",
          delay: 0.25,
        }
      );
      // Description
      gsap.fromTo(
        slide.querySelector(".hero-description"),
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: "power2.out",
          delay: 0.35,
        }
      );
      // CTA
      gsap.fromTo(
        slide.querySelector(".hero-cta"),
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)",
          delay: 0.5,
        }
      );
      // Background image gentle zoom
      gsap.fromTo(
        slide.querySelector(".hero-bg-img"),
        { scale: 1.12 },
        { scale: 1, duration: 1.5, ease: "power2.out", delay: 0.2 }
      );
    }, slide);
    ctx.revert();
    // We don't need to persist since this runs once per slide change
  }, []);

  /* ─── Progress bar animation ─── */
  const startProgress = useCallback(() => {
    setProgress(0);
    progressRef.current = 0;
    if (progressAnimRef.current) progressAnimRef.current.kill();

    progressAnimRef.current = gsap.to(progressRef, {
      current: 100,
      duration: 5,
      ease: "none",
      onUpdate: () => {
        setProgress(progressRef.current);
      },
      onComplete: () => {
        if (!isPaused) handleNext();
      },
    });
  }, [isPaused]);

  /* ─── Slide transition ─── */
  const animateSlide = useCallback(
    (fromIndex: number, toIndex: number) => {
      const slider = sliderRef.current;
      if (!slider || isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      // Kill progress
      if (progressAnimRef.current) progressAnimRef.current.kill();

      const ctx = gsap.context(() => {
        gsap.to(slider, {
          x: `${-toIndex * 100}%`,
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            isAnimatingRef.current = false;
            startProgress();
            animateSlideContent(toIndex);
            ctx.revert();
          },
        });
      }, slider);

      animTimeoutRef.current = setTimeout(() => {
        if (isAnimatingRef.current) {
          ctx.revert();
          isAnimatingRef.current = false;
          startProgress();
          animateSlideContent(toIndex);
        }
      }, 800);
    },
    [startProgress, animateSlideContent]
  );

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => {
      const next = (prev + 1) % activeBanners.length;
      animateSlide(prev, next);
      return next;
    });
  }, [activeBanners.length, animateSlide]);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => {
      const prevIdx =
        (prev - 1 + activeBanners.length) % activeBanners.length;
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

  /* ─── Auto-play ─── */
  useEffect(() => {
    if (!activeBanners.length) return;
    startProgress();
    return () => {
      if (progressAnimRef.current) progressAnimRef.current.kill();
    };
  }, [currentSlide, activeBanners.length, startProgress]);

  /* ─── Touch handlers ─── */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    setIsPaused(false);
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  /* ─── Mouse pause ─── */
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  if (activeBanners.length === 0) return null;

  const banner = activeBanners[currentSlide];
  const gradient =
    THEME_GRADIENTS[banner.title] || DEFAULT_GRADIENT;
  const accentStyle = ACCENT_BADGE[banner.title] || "";

  return (
    <section
      ref={sectionRef}
      className="px-4 sm:px-8 lg:px-12 xl:px-16 mt-4"
    >
      <div
        ref={containerRef}
        className="hero-slider-container rounded-2xl overflow-hidden relative group opacity-0 shadow-2xl"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 z-20 bg-white/10">
          <div
            className="h-full bg-white/70 rounded-r-full transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Slides container */}
        <div
          ref={sliderRef}
          className="flex"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {activeBanners.map((b, idx) => {
            const itemGradient = THEME_GRADIENTS[b.title] || DEFAULT_GRADIENT;
            return (
              <a
                key={b.id}
                href={b.link || "#"}
                data-slide={idx}
                className="relative w-full flex-shrink-0 overflow-hidden"
              >
                {/* Background image with Ken Burns effect */}
                <img
                  src={b.desktopImage}
                  alt={b.title}
                  width={1920}
                  height={512}
                  loading={idx === 0 ? "eager" : "lazy"}
                  className="hero-bg-img w-full aspect-[21/9] sm:aspect-[21/9] lg:aspect-[64/18] object-cover object-center bg-muted will-change-transform"
                />

                {/* Gradient overlay */}
                <div
                  className={cn(
                    "absolute inset-0 z-10",
                    itemGradient
                  )}
                />

                {/* Additional radial gradient for depth */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

                {/* Text content */}
                <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 max-w-3xl">
                  {/* Badge */}
                  {b.badge && (
                    <span
                      className={cn(
                        "hero-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border mb-3 sm:mb-4 w-fit backdrop-blur-sm",
                        accentStyle
                      )}
                    >
                      {b.discount && (
                        <Zap className="h-3.5 w-3.5" />
                      )}
                      {b.badge}
                    </span>
                  )}

                  {/* Title */}
                  <h1 className="hero-title text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
                    {b.title}
                  </h1>

                  {/* Subtitle */}
                  {b.subtitle && (
                    <p className="hero-subtitle text-xs sm:text-sm md:text-base lg:text-lg text-white/90 mt-1.5 sm:mt-2 font-medium drop-shadow">
                      {b.subtitle}
                    </p>
                  )}

                  {/* Description */}
                  {b.description && (
                    <p className="hero-description text-[10px] sm:text-xs md:text-sm text-white/70 mt-1 sm:mt-2 max-w-xl leading-relaxed line-clamp-2 sm:line-clamp-none drop-shadow">
                      {b.description}
                    </p>
                  )}

                  {/* CTA Button */}
                  <span className="hero-cta mt-3 sm:mt-5 inline-flex items-center gap-1.5 sm:gap-2 bg-white text-gray-900 font-bold text-xs sm:text-sm md:text-base px-4 sm:px-7 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 w-fit cursor-pointer active:scale-95">
                    {b.cta || "Shop Now"}
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </span>
                </div>

                {/* Floating discount badge */}
                {b.discount && (
                  <div className="absolute top-3 sm:top-5 right-3 sm:right-5 z-20 flex items-center gap-1.5 bg-rose-500/90 text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold shadow-lg backdrop-blur-sm">
                    <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
                    -{b.discount}%
                  </div>
                )}
              </a>
            );
          })}
        </div>

        {/* Navigation arrows */}
        {activeBanners.length > 1 && (
          <>
            <button
              onClick={(e) => { e.preventDefault(); handlePrev(); }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 backdrop-blur-sm hover:scale-110 active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); handleNext(); }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 backdrop-blur-sm hover:scale-110 active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {activeBanners.length > 1 && (
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
            {activeBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "rounded-full transition-all duration-300",
                  index === currentSlide
                    ? "w-6 sm:w-8 h-2.5 sm:h-3 bg-white shadow-md"
                    : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Pause indicator */}
        {isPaused && (
          <div className="absolute top-3 sm:top-5 left-3 sm:left-5 z-30 flex items-center gap-1.5 bg-black/30 text-white/80 text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">
            <Clock className="h-3 w-3" />
            Paused
          </div>
        )}
      </div>
    </section>
  );
}
