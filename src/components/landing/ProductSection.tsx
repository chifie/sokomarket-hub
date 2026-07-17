import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, TrendingUp, Star, Flame, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/lib/constants";

const tabs = [
  { id: "featured", label: "Featured", icon: Star },
  { id: "trending", label: "Trending Now", icon: Flame },
  { id: "recommended", label: "For You", icon: Sparkles },
];

export function ProductSection() {
  const [activeTab, setActiveTab] = useState("featured");

  const filteredProducts = products.filter((p) => {
    if (activeTab === "featured") return p.featured;
    if (activeTab === "trending") return p.trending;
    return true;
  });

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Products</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-1">Discover Products</h2>
            <p className="text-muted-foreground mt-1.5 text-sm">
              Handpicked selections just for you
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 bg-muted rounded-xl p-1 border border-border/50">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    activeTab === tab.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {filteredProducts.slice(0, 10).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All */}
        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" className="rounded-full h-12 px-8 text-sm font-medium border-border/50 gap-2 group">
            View All Products
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
