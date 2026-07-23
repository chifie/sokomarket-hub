import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Zap, Clock, ArrowRight, Star, Truck, Shield } from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { banners } from "@/lib/constants";
import { gsap } from "gsap";

/* ─── Floating Product Showcase ─── */
function FloatingProducts({
  theme,
}: {
  theme: "tech" | "sale" | "beauty" | "delivery";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = el.querySelectorAll(".float-card");
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 0.6 + i * 0.15,
          }
        );
        gsap.to(card, {
          y: `random(${-6}, ${-12})`,
          duration: 3 + i * 0.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.5 + i * 0.3,
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const products = {
    tech: [
      {
        img: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=300&q=80",
        label: "iPhone 15 Pro",
        price: "TZS 3,150,000",
        badge: "-10%",
      },
      {
        img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80",
        label: "MacBook Pro",
        price: "TZS 5,490,000",
        badge: "New",
      },
      {
        img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
        label: "Sony Headphones",
        price: "TZS 520,000",
        badge: "-20%",
      },
    ],
    sale: [
      {
        img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80",
        label: "MacBook Pro M3",
        price: "TZS 4,990,000",
        badge: "-15%",
      },
      {
        img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&q=80",
        label: "Kitenge Dress",
        price: "TZS 65,000",
        badge: "-25%",
      },
      {
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
        label: "Nike Air Max",
        price: "TZS 210,000",
        badge: "-25%",
      },
    ],
    beauty: [
      {
        img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&q=80",
        label: "Face Serum",
        price: "TZS 45,000",
        badge: "Premium",
      },
      {
        img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&q=80",
        label: "Skincare Set",
        price: "TZS 89,000",
        badge: "Bestseller",
      },
      {
        img: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=300&q=80",
        label: "Perfume",
        price: "TZS 65,000",
        badge: "Luxury",
      },
    ],
    delivery: [
      {
        img: "https://images.unsplash.com/photo-1557456170-0e2b4a7fc3eb?w=300&q=80",
        label: "Free Delivery",
        price: "Nationwide",
        badge: "TZ Mainland",
      },
      {
        img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&q=80",
        label: "Secure Payment",
        price: "M-Pesa | Visa",
        badge: "Protected",
      },
      {
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&q=80",
        label: "Trusted Sellers",
        price: "10K+ Verified",
        badge: "100%",
      },
    ],
  };

  const items = products[theme];

  return (
    <div
      ref={ref}
      className="hidden lg:flex absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 z-20 gap-3 xl:gap-4"
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            "float-card w-28 xl:w-36 bg-white/90 backdrop-blur-xl rounded-xl shadow-lg border border-white/30 p-2.5 xl:p-3",
            i === 1 && "mt-6"
          )}
        >
          <div className="aspect-square rounded-lg overflow-hidden bg-orange-50 mb-1.5">
            <img
              src={item.img}
              alt={item.label}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <p className="text-[10px] xl:text-xs font-semibold text-gray-800 truncate">
            {item.label}
          </p>
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-[9px] xl:text-[10px] text-orange-600 font-bold">
              {item.price}
            </span>
            <span className="text-[8px] xl:text-[9px] bg-orange-500 text-white px-1 py-0.5 rounded font-bold">
              {item.badge}
            </span>
          </div>
        </div>
      ))}
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

  isPausedRef.current = isPaused;

  const activeBanners = banners.filter((b) => b.isActive && b.type === "hero");

  /* ─── Theme map keyed by title (not index) ─── */
  const THEME_MAP: Record<string, "tech" | "sale" | "beauty" | "delivery"> = {
    "Everything You Need, All in One Place": "tech",
    "Flash Sale Up to 70% OFF": "sale",
    "Glow with Premium Beauty": "beauty",
    "Fast Delivery. Secure Payments. Trusted Sellers.": "delivery",
  };

  useEffect(() => {
    return () => {
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  /* ─── Entrance ─── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector(".hero-slider-container"),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  /* ─── Per-slide content entrance ─── */
  const animateSlideContent = useCallback((index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const slide = section.querySelector(`[data-slide="${index}"]`);
    if (!slide) return;

    gsap.context(() => {
      gsap.fromTo(
        slide.querySelector(".hero-badge"),
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
      // (title, subtitle, description removed — baked into banner images)
      gsap.fromTo(
        slide.querySelector(".hero-cta"),
        { opacity: 0, y: 15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)", delay: 0.5 }
      );
      gsap.fromTo(
        slide.querySelector(".hero-trust"),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", delay: 0.65 }
      );
    }, slide);
  }, []);

  /* ─── Progress bar (uses handleNextRef to avoid stale closure) ─── */
  const handleNextRef = useRef<() => void>(() => {});

  const startProgress = useCallback(() => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    setProgress(0);
    const TOTAL_MS = 6000;
    const INTERVAL_MS = 30;
    const STEP = (INTERVAL_MS / TOTAL_MS) * 100;
    let current = 0;

    progressIntervalRef.current = setInterval(() => {
      if (isPausedRef.current) return;
      current += STEP;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = undefined;
        handleNextRef.current();
      } else {
        setProgress(current);
      }
    }, INTERVAL_MS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ─── Slide transition — fade + scale ─── */
  const animateSlide = useCallback(
    (fromIndex: number, toIndex: number) => {
      const slider = sliderRef.current;
      if (!slider || isAnimatingRef.current || fromIndex === toIndex) return;
      isAnimatingRef.current = true;
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

      const fromSlide = slider.querySelector(`[data-slide="${fromIndex}"]`) as HTMLElement | null;
      const toSlide   = slider.querySelector(`[data-slide="${toIndex}"]`)   as HTMLElement | null;
      if (!fromSlide || !toSlide) {
        isAnimatingRef.current = false;
        startProgress();
        return;
      }

      gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            isAnimatingRef.current = false;
            animateSlideContent(toIndex);
            startProgress();
          },
        });

        tl.to(fromSlide, {
          opacity: 0,
          scale: 1.05,
          duration: 0.4,
          ease: "power2.out",
        });
        tl.fromTo(
          toSlide,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
          "-=0.1"
        );
      }, slider);

      animTimeoutRef.current = setTimeout(() => {
        if (isAnimatingRef.current) {
          isAnimatingRef.current = false;
          animateSlideContent(toIndex);
          startProgress();
        }
      }, 1000);
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
        if (prev !== index) animateSlide(prev, index);
        return index;
      });
    },
    [animateSlide]
  );

  // Sync ref after render (placed AFTER handleNext declaration to avoid TDZ)
  useEffect(() => {
    handleNextRef.current = handleNext;
  }, [handleNext]);

  useEffect(() => {
    if (!activeBanners.length) return;
    animateSlideContent(currentSlide);
    startProgress();
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide, activeBanners.length]);

  /* ─── Touch / Hover ─── */
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
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  if (activeBanners.length === 0) return null;

  const banner = activeBanners[currentSlide];

  /* ─── Theme from banner title (not index) ─── */
  const productTheme = THEME_MAP[banner.title] ?? "tech";

  return (
    <section ref={sectionRef} className="px-4 sm:px-8 lg:px-12 xl:px-16 mt-4">
      <div
        ref={containerRef}
        className="hero-slider-container rounded-2xl overflow-hidden relative group opacity-0 shadow-sm border border-gray-100"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Progress bar — orange */}
        <div className="absolute top-0 left-0 right-0 h-1 z-30 bg-orange-100">
          <div
            className="h-full bg-orange-500 rounded-r-full transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Slides — stacked absolutely with fade transitions */}
        <div ref={sliderRef} className="relative overflow-hidden">
          {/* Spacer div maintains the aspect ratio so the container has height */}
          <div className="w-full aspect-[21/9] sm:aspect-[21/9] lg:aspect-[64/18]" />

          {activeBanners.map((b, idx) => (
            <div
              key={b.id}
              data-slide={idx}
              className={cn(
                "absolute inset-0 w-full h-full overflow-hidden transition-none",
                idx === currentSlide ? "opacity-100 z-[1]" : "opacity-0 z-0"
              )}
              style={{ pointerEvents: idx === currentSlide ? "auto" : "none" }}
            >
              {/* Responsive banner image — mobileImage on small screens, desktopImage on larger */}
              <picture>
                <source media="(max-width: 639px)" srcSet={b.mobileImage ?? b.desktopImage} />
                <img
                  src={b.desktopImage}
                  alt={b.title}
                  className="w-full h-full object-cover"
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              </picture>

              {/* Subtle dark overlay so the CTA and badge pop on any banner */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent z-[1]" />

              {/* Content wrapper */}
              <div className="absolute inset-0 z-10 flex items-center">
                <div className="flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 max-w-2xl">
                  {/* Badge */}
                  {b.badge && (
                    <span className="hero-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 sm:mb-4 w-fit bg-orange-500 text-white shadow-sm">
                      {b.discount && <Zap className="h-3.5 w-3.5" />}
                      {b.badge}
                    </span>
                  )}

                  {/* CTA */}
                  <Link
                    to={b.link || "/marketplace"}
                    className="hero-cta mt-4 sm:mt-6 inline-flex items-center gap-2 font-bold text-xs sm:text-sm md:text-base px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 w-fit active:scale-95 hover:scale-105 bg-orange-500 text-white hover:bg-orange-600"
                  >
                    {b.cta || "Shop Now"}
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Link>

                  {/* Trust indicators */}
                  <div className="hero-trust hidden sm:flex items-center gap-4 mt-4 text-[11px] text-gray-200">
                    <span className="flex items-center gap-1">
                      <Truck className="h-3.5 w-3.5 text-orange-400" />
                      Free delivery over 50K
                    </span>
                    <span className="flex items-center gap-1">
                      <Shield className="h-3.5 w-3.5 text-orange-400" />
                      Secure payment
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-orange-400" />
                      50K+ happy customers
                    </span>
                  </div>
                </div>

                {/* Floating product cards */}
                <FloatingProducts theme={productTheme} />
              </div>

              {/* Discount badge */}
              {b.discount && (
                <div className="absolute top-3 sm:top-5 right-3 sm:right-5 z-20 flex items-center gap-1.5 bg-rose-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                  <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Up to -{b.discount}%
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Nav Arrows */}
        {activeBanners.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2.5 sm:p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 shadow-md hover:shadow-lg hover:scale-110 active:scale-95 border border-gray-200"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2.5 sm:p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 shadow-md hover:shadow-lg hover:scale-110 active:scale-95 border border-gray-200"
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
                onClick={(e) => { e.stopPropagation(); goToSlide(index); }}
                className={cn(
                  "rounded-full transition-all duration-300",
                  index === currentSlide
                    ? "w-6 sm:w-8 h-2.5 sm:h-3 shadow-sm"
                    : "w-2.5 h-2.5 hover:opacity-80"
                )}
                style={{
                  backgroundColor:
                    index === currentSlide ? "#F97316" : "rgba(249,115,22,0.25)",
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Pause indicator */}
        {isPaused && (
          <div className="absolute top-3 sm:top-5 left-3 sm:left-5 z-30 flex items-center gap-1.5 bg-white/80 text-gray-500 text-[10px] px-2 py-1 rounded-full shadow-sm border border-gray-200">
            <Clock className="h-3 w-3" />
            Paused
          </div>
        )}
      </div>
    </section>
  );
}
