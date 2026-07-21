import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Clock, Zap, ArrowRight, ShoppingBag, TrendingUp, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/ProductCard";
import { flashSale } from "@/lib/constants";
import { getTimeRemaining } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CountdownTimer({ endTime }: { endTime: string }) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(endTime));
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeRemaining(endTime)), 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  // GSAP countdown number transition animation
  useEffect(() => {
    const el = countRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const numbers = el.querySelectorAll(".countdown-number");
      gsap.fromTo(
        numbers,
        { scale: 1.3, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out", stagger: 0.05 }
      );
    }, el);
    return () => ctx.revert();
  }, [timeLeft]);

  const units = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hrs" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Sec" },
  ];

  return (
    <div ref={countRef} className="flex items-center gap-2">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-2">
          <div className="bg-white/15 backdrop-blur-sm rounded-lg px-2.5 py-1.5 min-w-[44px] text-center">
            <span className="countdown-number text-xl md:text-2xl font-bold tabular-nums text-white">
              {String(unit.value).padStart(2, "0")}
            </span>
          </div>
          {i < units.length - 1 && <span className="text-white/40 text-lg font-bold">:</span>}
        </div>
      ))}
    </div>
  );
}

export function FlashSaleBanner() {
  const flashSaleData = flashSale[0];
  const { endTime, products, discount, title, description } = flashSaleData || {};
  const soldPercentage = 78; // Example: 78% sold
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP entrance animations for flash sale
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header card entrance
      gsap.fromTo(
        section.querySelector(".flash-sale-header"),
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Badge animations
      gsap.fromTo(
        section.querySelectorAll(".flash-badge"),
        { opacity: 0, scale: 0.7 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(2)",
          stagger: 0.15,
          delay: 0.3,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Discount badge pulse attention effect
      gsap.to(section.querySelectorAll(".discount-badge"), {
        scale: 1.05,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      });

      // Product cards staggered entrance
      gsap.fromTo(
        section.querySelectorAll(".flash-product-card"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: section.querySelector(".flash-products-grid"),
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Progress bar animation
      gsap.fromTo(
        section.querySelector(".flash-progress-bar"),
        { width: "0%" },
        {
          width: `${soldPercentage}%`,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.5,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [soldPercentage]);

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto max-w-7xl px-4">
        {/* Flash Sale Header */}
        <div className="flash-sale-header relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary via-[#E8912E] to-[#D4781F] p-6 md:p-10 mb-8">
          <div className="absolute inset-0 opacity-[0.08]">
            <div className="absolute inset-0" style={{
              backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }} />
          </div>

          <div className="relative">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              {/* Left */}
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
                  <Zap className="h-7 w-7 text-amber-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <Badge className="flash-badge bg-amber-500/20 text-amber-200 border-0 text-xs font-semibold px-3 py-1 rounded-full">
                      <Flame className="h-3 w-3 mr-1" />
                      Limited Time
                    </Badge>
                    <Badge className="flash-badge discount-badge bg-emerald-500/20 text-emerald-300 border-0 text-xs font-semibold px-3 py-1 rounded-full">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Up to {discount}% Off
                    </Badge>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
                  <p className="text-white/70 text-sm mt-1 max-w-md">{description}</p>
                </div>
              </div>

              {/* Countdown */}
              <div className="text-center lg:text-right">
                <div className="flex items-center gap-2 text-white/80 text-xs mb-2 justify-center lg:justify-end">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Ends in</span>
                </div>
                <CountdownTimer endTime={endTime} />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-white/70 flex items-center gap-1">
                  <ShoppingBag className="h-3 w-3" />
                  {soldPercentage}% claimed
                </span>
                <span className="text-white/70">Hurry! Limited stock</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="flash-progress-bar h-full rounded-full bg-gradient-to-r from-amber-400 to-rose-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Flash Sale Products */}
        <div className="flash-products-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {products.map((product, index) => (
            <div key={product.id} className="flash-product-card">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full h-12 px-8 text-sm font-medium border-secondary/30 text-secondary hover:bg-secondary/5 dark:hover:bg-secondary/10 gap-2 group"
          >
            View All Flash Deals
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
