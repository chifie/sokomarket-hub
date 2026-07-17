import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Zap, ArrowRight, ShoppingBag, TrendingUp, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/ProductCard";
import { flashSale } from "@/lib/constants";
import { getTimeRemaining } from "@/lib/utils";

function CountdownTimer({ endTime }: { endTime: string }) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(endTime));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeRemaining(endTime)), 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  const units = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hrs" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Sec" },
  ];

  return (
    <div className="flex items-center gap-2">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-2">
          <div className="bg-white/15 backdrop-blur-sm rounded-lg px-2.5 py-1.5 min-w-[44px] text-center">
            <span className="text-xl md:text-2xl font-bold tabular-nums text-white">
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

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto max-w-7xl px-4">
        {/* Flash Sale Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary via-[#E8912E] to-[#D4781F] p-6 md:p-10 mb-8"
        >
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
                    <Badge className="bg-amber-500/20 text-amber-200 border-0 text-xs font-semibold px-3 py-1 rounded-full">
                      <Flame className="h-3 w-3 mr-1" />
                      Limited Time
                    </Badge>
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-0 text-xs font-semibold px-3 py-1 rounded-full">
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
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${soldPercentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-rose-400"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Flash Sale Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full h-12 px-8 text-sm font-medium border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 gap-2 group"
          >
            View All Flash Deals
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
