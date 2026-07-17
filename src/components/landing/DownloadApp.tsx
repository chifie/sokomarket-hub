import { motion } from "framer-motion";
import { Smartphone, Apple, MessageCircleCode, QrCode, Check, Star, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Shop on-the-go anytime, anywhere",
  "Exclusive app-only deals & discounts",
  "Real-time order tracking & notifications",
  "AI-powered product recommendations",
  "Instant messaging with sellers",
  "Free delivery on all orders",
];

const ratings = [
  { store: "App Store", rating: 4.8, reviews: "12.5K" },
  { store: "Google Play", rating: 4.7, reviews: "28.3K" },
];

export function DownloadApp() {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-secondary to-amber-900 p-8 md:p-12 premium-shadow"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-accent/10 rounded-full blur-2xl" />
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />

          <div className="relative flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-medium mb-6">
                <Smartphone className="h-3.5 w-3.5" />
                Coming Soon
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Download the<br />
                <span className="text-primary-foreground/80">SokoDigital</span> App
              </h2>
              <p className="text-white/70 max-w-md mx-auto lg:mx-0 text-sm md:text-base leading-relaxed">
                Get the best shopping experience on your mobile device.
                Shop, sell, and connect with millions across Tanzania.
              </p>

              {/* Store Ratings */}
              <div className="flex items-center gap-4 mt-6 justify-center lg:justify-start">
                {ratings.map((r) => (
                  <div key={r.store} className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    <div>
                      <span className="text-white font-semibold text-sm">{r.rating}</span>
                      <span className="text-white/60 text-xs ml-1">({r.reviews})</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-white/80">
                    <div className="h-6 w-6 rounded-full bg-emerald-500/30 flex items-center justify-center shrink-0">
                      <Check className="h-3.5 w-3.5 text-emerald-300" />
                    </div>
                    {benefit}
                  </div>
                ))}
              </div>

              {/* Store Buttons */}
              <div className="flex flex-wrap items-center gap-3 mt-8 justify-center lg:justify-start">
                <button className="inline-flex items-center gap-3 rounded-xl bg-white text-gray-900 px-5 py-3 font-medium text-sm hover:bg-gray-100 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:scale-95">
                  <Apple className="h-5 w-5" />
                  <div className="text-left">
                    <div className="text-[10px] text-gray-500">Download on the</div>
                    <div className="text-sm font-semibold -mt-0.5">App Store</div>
                  </div>
                </button>
                <button className="inline-flex items-center gap-3 rounded-xl bg-white text-gray-900 px-5 py-3 font-medium text-sm hover:bg-gray-100 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:scale-95">
                  <MessageCircleCode className="h-5 w-5" />
                  <div className="text-left">
                    <div className="text-[10px] text-gray-500">Get it on</div>
                    <div className="text-sm font-semibold -mt-0.5">Google Play</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Right - QR Code */}
            <div className="shrink-0">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-white/10 rounded-2xl blur-xl" />
                <div className="relative bg-white rounded-2xl p-5 shadow-2xl">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                    <QrCode className="h-24 w-24 text-primary" />
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-3 font-medium">
                    Scan to Download
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Shield className="h-3 w-3 text-emerald-500" />
                    <span className="text-[10px] text-gray-400">Secure & Free</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
