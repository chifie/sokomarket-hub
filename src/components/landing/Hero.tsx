import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ─── Premium 3D Product Images ───────────────────────────────────────────────
const heroProducts = [
  {
    id: "iphone",
    name: "iPhone 15 Pro Max",
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400&q=80",
    x: "8%", y: "10%", scale: 1.15, zIndex: 10,
    floatDuration: 6, floatDelay: 0, rotate: -3,
    driftX: 8, driftY: -10,
  },
  {
    id: "macbook",
    name: "MacBook Pro 16",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
    x: "58%", y: "5%", scale: 1.05, zIndex: 8,
    floatDuration: 7, floatDelay: 0.5, rotate: 2,
    driftX: -6, driftY: -12,
  },
  {
    id: "headphones",
    name: "Sony WH-1000XM5",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    x: "82%", y: "15%", scale: 0.95, zIndex: 7,
    floatDuration: 5.5, floatDelay: 1, rotate: 5,
    driftX: 5, driftY: -8,
  },
  {
    id: "watch",
    name: "Apple Watch Ultra",
    image: "https://images.unsplash.com/photo-1546868871-af0de0ae72e6?w=400&q=80",
    x: "75%", y: "52%", scale: 0.85, zIndex: 6,
    floatDuration: 6.5, floatDelay: 0.3, rotate: -5,
    driftX: -4, driftY: -6,
  },
  {
    id: "sneakers",
    name: "Nike Air Max",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    x: "3%", y: "55%", scale: 0.9, zIndex: 5,
    floatDuration: 8, floatDelay: 0.8, rotate: -8,
    driftX: 10, driftY: -5,
  },
  {
    id: "handbag",
    name: "Leather Handbag",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80",
    x: "65%", y: "68%", scale: 0.8, zIndex: 4,
    floatDuration: 5, floatDelay: 1.5, rotate: 8,
    driftX: 6, driftY: -8,
  },
  {
    id: "perfume",
    name: "Designer Perfume",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80",
    x: "45%", y: "8%", scale: 0.8, zIndex: 5,
    floatDuration: 7.5, floatDelay: 0.2, rotate: 4,
    driftX: -8, driftY: -7,
  },
  {
    id: "gaming",
    name: "PS5 Controller",
    image: "https://images.unsplash.com/photo-1593118247619-e2d6f056869e?w=400&q=80",
    x: "20%", y: "68%", scale: 0.85, zIndex: 5,
    floatDuration: 6.5, floatDelay: 1.2, rotate: -6,
    driftX: -7, driftY: -9,
  },
  {
    id: "tv",
    name: "Samsung OLED TV",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80",
    x: "88%", y: "72%", scale: 0.75, zIndex: 3,
    floatDuration: 9, floatDelay: 2, rotate: -2,
    driftX: 3, driftY: -10,
  },
  {
    id: "groceries",
    name: "Fresh Groceries",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80",
    x: "35%", y: "72%", scale: 0.75, zIndex: 4,
    floatDuration: 5.5, floatDelay: 1.8, rotate: 3,
    driftX: 9, driftY: -6,
  },
  {
    id: "furniture",
    name: "Modern Furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
    x: "48%", y: "78%", scale: 0.7, zIndex: 2,
    floatDuration: 8.5, floatDelay: 2.5, rotate: 1,
    driftX: -5, driftY: -8,
  },
  {
    id: "kitchen",
    name: "Kitchen Appliances",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
    x: "12%", y: "30%", scale: 0.8, zIndex: 6,
    floatDuration: 6, floatDelay: 0.7, rotate: 7,
    driftX: 7, driftY: -11,
  },
];

const quickCategories = [
  "Phones", "Laptops", "Fashion", "Groceries", "Electronics",
  "Furniture", "Beauty", "Sports", "Gaming", "Books",
];

// ─── Floating Product Card ────────────────────────────────────────────────────
function FloatingProductCard({
  image, name, x, y, scale, zIndex,
  floatDuration, floatDelay, rotate, driftX, driftY,
}: typeof heroProducts[0]) {
  return (
    <motion.div
      className="absolute hidden lg:block"
      style={{ left: x, top: y, zIndex }}
      initial={{ opacity: 0, y: 40, scale: scale * 0.8 }}
      animate={{ opacity: 1, y: 0, scale }}
      transition={{ duration: 1, delay: 0.3 + floatDelay * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{
          y: [0, driftY, 0],
          x: [0, driftX * 0.5, 0],
          rotate: [rotate, rotate - 2, rotate],
        }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay * 0.5,
        }}
        className="relative group cursor-pointer"
      >
        {/* Glow effect behind card */}
        <div className="absolute -inset-6 bg-gradient-to-br from-primary/10 via-purple-500/10 to-blue-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Main glass card */}
        <div
          className="relative bg-white/75 dark:bg-white/10 backdrop-blur-2xl rounded-2xl p-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/40 dark:border-white/10 hover:shadow-[0_16px_48px_rgba(99,102,241,0.15)] dark:hover:shadow-[0_16px_48px_rgba(99,102,241,0.1)] transition-shadow duration-500"
          style={{ transform: `rotate(${rotate}deg)` }}
        >
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-white/50">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          </div>

          {/* Product name tooltip */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-full text-[10px] font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 shadow-lg border border-white/50 dark:border-gray-700/50">
            {name}
          </div>

          {/* Shine effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Background Orb ──────────────────────────────────────────────────────────
function BackgroundOrb({ size, x, y, color, duration, delay }: {
  size: number; x: string; y: string; color: string; duration: number; delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, left: x, top: y }}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -25, 15, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div className={`w-full h-full rounded-full ${color} blur-3xl`} />
    </motion.div>
  );
}

// ─── Hero Component ──────────────────────────────────────────────────────────
export function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Show fewer products on mobile
  const displayProducts = typeof window !== "undefined" && window.innerWidth < 1024
    ? heroProducts.slice(0, 6)
    : heroProducts;

  return (
    <section
      ref={heroRef}
      className="relative min-h-[600px] md:min-h-[680px] lg:min-h-[750px] overflow-hidden bg-gradient-to-br from-white via-blue-50/40 to-purple-50/40 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/20"
    >
      {/* ── Background Orbs ── */}
      <BackgroundOrb size={500} x="-5%" y="-10%" color="bg-blue-400/15 dark:bg-blue-500/10" duration={12} delay={0} />
      <BackgroundOrb size={400} x="70%" y="-5%" color="bg-purple-400/15 dark:bg-purple-500/10" duration={14} delay={1} />
      <BackgroundOrb size={350} x="40%" y="60%" color="bg-indigo-400/10 dark:bg-indigo-500/8" duration={10} delay={0.5} />
      <BackgroundOrb size={250} x="85%" y="70%" color="bg-pink-400/10 dark:bg-pink-500/8" duration={16} delay={2} />
      <BackgroundOrb size={200} x="10%" y="75%" color="bg-cyan-400/8 dark:bg-cyan-500/6" duration={11} delay={1.5} />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(99 102 241) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Floating Products ── */}
      {displayProducts.map((product) => (
        <FloatingProductCard key={product.id} {...product} />
      ))}

      {/* ── Center Content ── */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 h-full min-h-[600px] md:min-h-[680px] lg:min-h-[750px] flex flex-col items-center justify-center text-center">
        {/* AI Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 border border-blue-200/50 dark:border-blue-500/20 backdrop-blur-sm"
        >
          <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[11px] font-medium text-blue-700 dark:text-blue-300">
            AI-Powered Marketplace
          </span>
        </motion.div>

        {/* Minimal tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1] max-w-2xl"
        >
          Tanzania's{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Smartest
          </span>{" "}
          Marketplace
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-4 text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-md leading-relaxed"
        >
          Discover millions of products. Buy and sell with AI-powered recommendations.
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-6 w-full max-w-lg relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] group-hover:shadow-[0_8px_30px_rgba(99,102,241,0.1)] transition-shadow duration-300">
            <Search className="ml-4 h-4 w-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search millions of products..."
              className="h-12 w-full bg-transparent border-0 px-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none"
            />
            <Button
              size="sm"
              className="mr-1.5 h-9 rounded-xl px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-medium shadow-lg shadow-blue-500/20"
            >
              <Search className="h-3.5 w-3.5 mr-1.5" />
              Search
            </Button>
          </div>
        </motion.div>

        {/* Quick Categories */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium mr-1">
            Popular:
          </span>
          {quickCategories.map((cat, i) => (
            <button
              key={cat}
              className="px-3 py-1 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-[11px] font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-8 flex items-center gap-6 text-[11px] text-gray-400 dark:text-gray-500"
        >
          <span className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
            Free Delivery
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
          <span className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            Secure Payments
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
          <span className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            Verified Sellers
          </span>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-start justify-center pt-1.5"
        >
          <motion.div className="w-1 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
