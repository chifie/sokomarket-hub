import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, BadgeCheck, Package, Star } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-28 pb-20 lg:pt-36 lg:pb-28">
      {/* animated blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-24 h-96 w-96 rounded-full bg-emerald-400/20 dark:bg-emerald-600/20 blur-3xl animate-pulse" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-teal-400/20 dark:bg-teal-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-400/20 dark:bg-cyan-600/20 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 dark:bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Kenya's #1 Digital Marketplace
          </span>
          <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
            Buy and Sell Across{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Kenya
            </span>{" "}
            with Confidence.
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            SokoMarket connects trusted sellers and millions of buyers through
            a fast, secure, and modern online marketplace built for Kenya.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/marketplace"
              className="h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-6 text-base font-semibold text-white shadow-md transition hover:scale-[1.02] hover:opacity-95 inline-flex items-center justify-center"
            >
              Explore Marketplace <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
            <Link
              to="/chat"
              className="h-12 rounded-full border border-border bg-background/60 px-6 text-base font-semibold backdrop-blur transition hover:bg-background inline-flex items-center justify-center text-foreground"
            >
              Ask AI Assistant
            </Link>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: ShieldCheck, label: "Secure Payments" },
              { icon: BadgeCheck, label: "Verified Sellers" },
              { icon: Truck, label: "Fast Delivery" },
              { icon: Package, label: "1000s of Products" },
            ].map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/70 px-3 py-2 text-xs font-medium backdrop-blur"
              >
                <b.icon className="h-4 w-4 shrink-0 text-emerald-500" />
                <span className="truncate text-foreground">{b.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="relative mx-auto aspect-square w-full max-w-[500px] overflow-hidden rounded-[2rem] shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-90" />
            <img
              src="https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Marketplace buyers and sellers"
              className="relative h-full w-full object-cover mix-blend-luminosity opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/40 via-transparent to-teal-400/30" />
          </div>

          {/* floating cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -left-2 top-10 rounded-2xl bg-card border border-border p-3 shadow-lg dark:bg-gray-800 sm:-left-6"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-yellow-500/15 text-yellow-500">
                <Star className="h-5 w-5 fill-yellow-500" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Avg. Rating</div>
                <div className="text-sm font-bold text-foreground">4.9 / 5.0</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute right-0 top-1/3 rounded-2xl bg-card border border-border p-3 shadow-lg dark:bg-gray-800"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/15 text-emerald-500">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Daily Orders</div>
                <div className="text-sm font-bold text-foreground">10,240+</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
            className="absolute bottom-6 left-6 rounded-2xl bg-card border border-border p-3 shadow-lg dark:bg-gray-800"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/15 text-emerald-500">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Status</div>
                <div className="text-sm font-bold text-foreground">Verified Seller</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
