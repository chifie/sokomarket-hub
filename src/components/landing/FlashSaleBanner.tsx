import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Zap, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/ProductCard";
import { flashSale } from "@/lib/constants";

function CountdownTimer({ endTime }: { endTime: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const diff = new Date(endTime).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };
    setTimeLeft(calculate());
    const timer = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  const units = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Mins" },
    { value: timeLeft.seconds, label: "Secs" },
  ];

  return (
    <div className="flex items-center gap-3">
      {units.map((unit) => (
        <div key={unit.label} className="text-center">
          <div className="bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[52px]">
            <span className="text-2xl font-bold tabular-nums text-white">
              {String(unit.value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-[10px] text-white/70 mt-1 block">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}

export function FlashSaleBanner() {
  const { endTime, products, discount, title, description } = flashSale;

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Flash Sale Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-600 via-rose-700 to-red-800 p-8 md:p-12 mb-8"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }} />
          </div>

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <Badge className="mb-4 bg-white/20 text-white border-0 text-xs font-semibold px-3 py-1.5 rounded-full">
                <Zap className="h-3 w-3 mr-1" />
                Limited Time Offer
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{title}</h2>
              <p className="text-white/80 max-w-md text-sm md:text-base">{description}</p>
              <div className="mt-2 inline-flex items-center gap-1 text-amber-300 text-sm font-medium">
                <ShoppingBag className="h-4 w-4" />
                Up to {discount}% off on selected items
              </div>
            </div>

            {/* Countdown */}
            <div className="text-center">
              <div className="flex items-center gap-2 text-white/80 text-sm mb-3">
                <Clock className="h-4 w-4" />
                <span>Ends in</span>
              </div>
              <CountdownTimer endTime={endTime} />
            </div>
          </div>
        </motion.div>

        {/* Flash Sale Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full h-12 px-8 text-sm font-medium border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950 gap-2"
          >
            View All Deals
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
