import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Shirt, Home, Sparkles, Trophy, BookOpen, Car, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, typeof Smartphone> = {
  smartphone: Smartphone, shirt: Shirt, home: Home, sparkles: Sparkles,
  trophy: Trophy, "book-open": BookOpen, car: Car, "heart-pulse": HeartPulse,
};

const gradients = [
  "from-blue-500/20 via-blue-500/5 to-transparent",
  "from-rose-500/20 via-rose-500/5 to-transparent",
  "from-emerald-500/20 via-emerald-500/5 to-transparent",
  "from-purple-500/20 via-purple-500/5 to-transparent",
  "from-amber-500/20 via-amber-500/5 to-transparent",
  "from-cyan-500/20 via-cyan-500/5 to-transparent",
  "from-orange-500/20 via-orange-500/5 to-transparent",
  "from-pink-500/20 via-pink-500/5 to-transparent",
];

const iconColors = [
  "text-blue-500", "text-rose-500", "text-emerald-500", "text-purple-500",
  "text-amber-500", "text-cyan-500", "text-orange-500", "text-pink-500",
];

export function FeaturedCategories() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Shop by Category</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Explore our curated categories with millions of products
            </p>
          </div>
          <Button variant="ghost" size="sm" className="text-sm gap-1.5 rounded-full">
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, index) => {
            const IconComponent = iconMap[cat.icon] || Smartphone;
            return (
              <motion.a
                key={cat.id}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5"
              >
                {/* Gradient Background */}
                <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500", gradients[index])} />

                {/* Background Image */}
                <div className="absolute inset-0 opacity-5">
                  <img src={cat.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                </div>

                <div className="relative">
                  <div className={cn("h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300", iconColors[index])}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-base">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    {cat.productCount.toLocaleString()} products
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Shop now <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
