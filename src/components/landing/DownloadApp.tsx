import { motion } from "framer-motion";
import { Smartphone, Tablet, Apple, MessageCircleCode, QrCode, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Shop on-the-go anytime, anywhere",
  "Exclusive app-only deals & discounts",
  "Real-time order tracking & notifications",
  "AI-powered product recommendations",
  "Instant messaging with sellers",
];

export function DownloadApp() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-blue-700 to-blue-900 p-8 md:p-12"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-2xl" />

          <div className="relative flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-medium mb-6">
                <Smartphone className="h-3.5 w-3.5" />
                Coming Soon
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Download the Soko Digital App
              </h2>
              <p className="text-white/70 max-w-md mx-auto lg:mx-0 text-sm md:text-base leading-relaxed">
                Get the best shopping experience on your mobile device. 
                Shop, sell, and connect with millions across Africa.
              </p>

              <div className="mt-8 space-y-3">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-white/80">
                    <div className="h-6 w-6 rounded-full bg-emerald-500/30 flex items-center justify-center shrink-0">
                      <Check className="h-3.5 w-3.5 text-emerald-300" />
                    </div>
                    {benefit}
                  </div>
                ))}
              </div>

              {/* Store Buttons */}
              <div className="flex flex-wrap items-center gap-3 mt-8">
                <button className="inline-flex items-center gap-3 rounded-xl bg-white text-gray-900 px-5 py-3 font-medium text-sm hover:bg-gray-100 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
                  <Apple className="h-5 w-5" />
                  <div className="text-left">
                    <div className="text-[10px] text-gray-500">Download on the</div>
                    <div className="text-sm font-semibold -mt-0.5">App Store</div>
                  </div>
                </button>
                <button className="inline-flex items-center gap-3 rounded-xl bg-white text-gray-900 px-5 py-3 font-medium text-sm hover:bg-gray-100 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
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
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 rounded-2xl blur-xl" />
                <div className="relative bg-white rounded-2xl p-5 shadow-2xl">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                    <QrCode className="h-24 w-24 text-primary" />
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-3 font-medium">
                    Scan to Download
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
