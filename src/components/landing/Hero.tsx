import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Zap, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { banners } from "@/lib/constants";
import { gsap } from "gsap";

/* ─── Floating particles component ─── */
function FloatingParticles({ bgColor }: { bgColor?: string }) {
  const particleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = particleRef.current;
    if (!el) return;

    const shapes = el.querySelectorAll('.hero-particle');
    if (!shapes.length) return;

    const ctx = gsap.context(() => {
      shapes.forEach((shape, i) => {
        gsap.to(shape, {
          y: `random(${-20}, ${-60})`,
          x: `random(${-15}, ${15})`,
          opacity: 0.15,
          duration: 3 + i * 0.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.3,
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const accent = bgColor || '#6366f1';

  return (
    <div ref={particleRef} className="absolute inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Large floating circle */}
      <div
        className="hero-particle absolute -top-6 -left-6 w-32 h-32 sm:w-48 sm:h-48 rounded-full opacity-10 blur-xl"
        style={{ backgroundColor: accent }}
      />
      {/* Medium floating circle */}
      <div
        className="hero-particle absolute top-1/4 -right-8 w-24 h-24 sm:w-36 sm:h-36 rounded-full opacity-10 blur-xl"
        style={{ backgroundColor: accent }}
      />
      {/* Small floating circle */}
      <div
        className="hero-particle absolute bottom-1/3 left-1/4 w-16 h-16 sm:w-24 sm:h-24 rounded-full opacity-8 blur-lg"
        style={{ backgroundColor: accent }}
      />
      {/* Tiny floating dot */}
      <div
        className="hero-particle absolute top-2/3 right-1/4 w-8 h-8 sm:w-12 sm:h-12 rounded-full opacity-8 blur-md"
        style={{ backgroundColor: accent }}
      />
      {/* Extra small floating element */}
      <div
        className="hero-particle absolute top-1/3 left-2/3 w-10 h-10 sm:w-16 sm:h-16 rounded-full opacity-6 blur-lg"
        style={{ backgroundColor: accent }}
      />
    </div>
  );
}

/* ─── Hero Component ─── */
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
  const animTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const isPausedRef = useRef(false);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  // Keep ref in sync
  isPausedRef.current = isPaused;

  const activeBanners = banners.filter((b) => b.isActive && b.type === "hero");

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
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

  /* ─── Per-slide text entrance (called once after each slide change) ─── */
  const animateSlideContent = useCallback((index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const slide = section.querySelector(`[data-slide="${index}"]`);
    if (!slide) return;

    gsap.context(() => {
      gsap.fromTo(
        slide.querySelector(".hero-badge"),
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
      gsap.fromTo(
        slide.querySelector(".hero-title"),
        { opacity: 0, y: 30, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out", delay: 0.1 }
      );
      gsap.fromTo(
        slide.querySelector(".hero-subtitle"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.25 }
      );
      gsap.fromTo(
        slide.querySelector(".hero-description"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.35 }
      );
      gsap.fromTo(
        slide.querySelector(".hero-cta"),
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)", delay: 0.5 }
      );
      gsap.fromTo(
        slide.querySelector(".hero-bg-img"),
        { scale: 1.12 },
        { scale: 1, duration: 1.5, ease: "power2.out", delay: 0.2 }
      );
      // NOTE: ctx is NOT reverted — let animations play naturally
    }, slide);
  }, []);

  /* ─── Progress bar (CSS interval-based, no GSAP) ─── */
  const startProgress = useCallback(() => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    setProgress(0);

    const TOTAL_MS = 5000; // 5 seconds
    const INTERVAL_MS = 30;
    const STEP = (INTERVAL_MS / TOTAL_MS) * 100;
    let current = 0;

    progressIntervalRef.current = setInterval(() => {
      if (isPausedRef.current) return; // paused — don't advance
      current += STEP;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = undefined;
        // Auto-advance
        handleNext();
      } else {
        setProgress(current);
      }
    }, INTERVAL_MS);
  }, []);

  /* ─── Slide transition ─── */
  const animateSlide = useCallback(
    (fromIndex: number, toIndex: number) => {
      const slider = sliderRef.current;
      if (!slider || isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      // Clear progress
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

      gsap.context(() => {
        gsap.to(slider, {
          x: `${-toIndex * 100}%`,
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            isAnimatingRef.current = false;
            animateSlideContent(toIndex);
            startProgress();
          },
        });
      }, slider);

      animTimeoutRef.current = setTimeout(() => {
        if (isAnimatingRef.current) {
          isAnimatingRef.current = false;
          animateSlideContent(toIndex);
          startProgress();
        }
      }, 900);
    },
    [animateSlideContent, startProgress]
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

  /* ─── Auto-play effect ─── */
  useEffect(() => {
    if (!activeBanners.length) return;
    // Animate the new slide's content
    animateSlideContent(currentSlide);
    // Start progress timer
    startProgress();
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide, activeBanners.length]);

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

  /* ─── Hover pause ─── */
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  if (activeBanners.length === 0) return null;

  const banner = activeBanners[currentSlide];

  return (
    <section ref={sectionRef} className="px-4 sm:px-8 lg:px-12 xl:px-16 mt-4">
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
        <div className="absolute top-0 left-0 right-0 h-1 z-30 bg-white/10">
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
          {activeBanners.map((b, idx) => (
            <div
              key={b.id}
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

              {/* Gradient overlay from banner bgColor */}
              <div
                className={cn(
                  "absolute inset-0 z-10",
                  b.bgColor
                    ? "from-black/50 via-black/20 to-transparent"
                    : "bg-gradient-to-r from-gray-950/90 via-gray-900/70 to-transparent"
                )}
                style={
                  b.bgColor
                    ? {
                        background: `linear-gradient(to right, ${b.bgColor}ee 0%, ${b.bgColor}88 50%, transparent 100%)`,
                      }
                    : undefined
                }
              />

              {/* Additional dark bottom gradient for readability */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Floating particles */}
              <FloatingParticles bgColor={b.bgColor} />

              {/* Text content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 max-w-3xl">
                {/* Badge */}
                {b.badge && (
                  <span
                    className={cn(
                      "hero-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border mb-3 sm:mb-4 w-fit backdrop-blur-sm",
                      b.bgColor
                        ? "bg-white/15 text-white/90 border-white/20"
                        : "bg-indigo-500/20 text-indigo-200 border-indigo-400/30"
                    )}
                  >
                    {b.discount && <Zap className="h-3.5 w-3.5" />}
                    {b.badge}
                  </span>
                )}

                {/* Title */}
                <h1
                  className="hero-title text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight drop-shadow-lg"
                  style={{ color: b.textColor || "#ffffff" }}
                >
                  {b.title}
                </h1>

                {/* Subtitle */}
                {b.subtitle && (
                  <p
                    className="hero-subtitle text-xs sm:text-sm md:text-base lg:text-lg mt-1.5 sm:mt-2 font-medium drop-shadow"
                    style={{ color: b.textColor ? `${b.textColor}ee` : "rgba(255,255,255,0.9)" }}
                  >
                    {b.subtitle}
                  </p>
                )}

                {/* Description */}
                {b.description && (
                  <p
                    className="hero-description text-[10px] sm:text-xs md:text-sm mt-1 sm:mt-2 max-w-xl leading-relaxed line-clamp-2 sm:line-clamp-none drop-shadow"
                    style={{ color: b.textColor ? `${b.textColor}aa` : "rgba(255,255,255,0.7)" }}
                  >
                    {b.description}
                  </p>
                )}

                {/* CTA Button (only clickable area) */}
                <Link
                  to={b.link || "/marketplace"}
                  className="hero-cta mt-3 sm:mt-5 inline-flex items-center gap-1.5 sm:gap-2 font-bold text-xs sm:text-sm md:text-base px-4 sm:px-7 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 w-fit active:scale-95 hover:scale-105"
                  style={{
                    backgroundColor: b.textColor || "#ffffff",
                    color: b.bgColor || "#111827",
                  }}
                >
                  {b.cta || "Shop Now"}
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Link>
              </div>

              {/* Floating discount badge */}
              {b.discount && (
                <div className="absolute top-3 sm:top-5 right-3 sm:right-5 z-20 flex items-center gap-1.5 bg-rose-500/90 text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold shadow-lg backdrop-blur-sm">
                  <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
                  -{b.discount}%
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        {activeBanners.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 backdrop-blur-sm hover:scale-110 active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
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
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(index);
                }}
                className={cn(
                  "rounded-full transition-all duration-300",
                  index === currentSlide
                    ? "w-6 sm:w-8 h-2.5 sm:h-3 shadow-md"
                    : "w-2.5 h-2.5 hover:opacity-80"
                )}
                style={{
                  backgroundColor:
                    index === currentSlide
                      ? banner.textColor || "#ffffff"
                      : "rgba(255,255,255,0.4)",
                }}
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
