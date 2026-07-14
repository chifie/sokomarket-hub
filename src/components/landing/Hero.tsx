import { useState } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const trendingCategories = [
  "Electronics", "Fashion", "Beauty", "Sports", "Home & Living"
];

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 dark:from-primary/10 dark:via-background dark:to-accent/10" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-accent/5 via-transparent to-transparent rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="text-foreground">Discover & Shop</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-blue-500 to-accent bg-clip-text text-transparent">
              Your Favorite Products
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed"
          >
            Africa's premier online marketplace. Find verified sellers, discover unique products,
            and shop with confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 w-full max-w-2xl"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center bg-card border border-border/50 rounded-2xl shadow-lg shadow-primary/5 group-hover:shadow-xl transition-all duration-300">
                <Search className="ml-5 h-5 w-5 text-muted-foreground shrink-0" />
                <Input
                  type="search"
                  placeholder="Search millions of products, brands, and categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 border-0 bg-transparent text-base shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/50"
                />
                <Button
                  size="lg"
                  className="mr-2 h-10 rounded-xl bg-primary hover:bg-primary/90 text-sm font-medium gap-1.5 shadow-sm cursor-pointer"
                >
                  <Search className="h-4 w-4" />
                  <span className="hidden sm:inline">Search</span>
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-2"
          >
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-primary" />
              Trending:
            </span>
            {trendingCategories.map((cat) => (
              <button
                key={cat}
                className="rounded-full border border-border/50 bg-muted/30 px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all duration-200 cursor-pointer"
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-3xl"
          >
            {[
              { value: "2.5M+", label: "Active Buyers" },
              { value: "50K+", label: "Verified Sellers" },
              { value: "5M+", label: "Products" },
              { value: "98%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Button size="lg" className="rounded-full h-12 px-8 text-sm font-medium shadow-lg shadow-primary/20 cursor-pointer">
              Start Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full h-12 px-8 text-sm font-medium border-border/50 cursor-pointer"
            >
              <Shield className="mr-2 h-4 w-4" />
              Become a Seller
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}