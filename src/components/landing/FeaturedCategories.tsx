import { Link } from "react-router";
import { useRef, useEffect } from "react";
import { ArrowRight, Smartphone, Shirt, Sparkles, Trophy, BookOpen, Car, HeartPulse, Package, Armchair, ChefHat, Gamepad2, Baby, ShoppingBag, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  smartphone: Smartphone, laptop: Smartphone, headphones: Headphones,
  shirt: Shirt, footprints: Smartphone, sparkles: Sparkles,
  "shopping-bag": ShoppingBag, armchair: Armchair, "cooking-pot": ChefHat,
  "gamepad-2": Gamepad2, car: Car, trophy: Trophy, baby: Baby,
  "book-open": BookOpen, "heart-pulse": HeartPulse,
};

const gradients = [
  "from-blue-500/20 via-blue-500/5 to-transparent",
  "from-sky-500/20 via-sky-500/5 to-transparent",
  "from-violet-500/20 via-violet-500/5 to-transparent",
  "from-rose-500/20 via-rose-500/5 to-transparent",
  "from-emerald-500/20 via-emerald-500/5 to-transparent",
  "from-purple-500/20 via-purple-500/5 to-transparent",
  "from-amber-500/20 via-amber-500/5 to-transparent",
  "from-cyan-500/20 via-cyan-500/5 to-transparent",
  "from-orange-500/20 via-orange-500/5 to-transparent",
  "from-pink-500/20 via-pink-500/5 to-transparent",
  "from-teal-500/20 via-teal-500/5 to-transparent",
  "from-indigo-500/20 via-indigo-500/5 to-transparent",
  "from-lime-500/20 via-lime-500/5 to-transparent",
  "from-red-500/20 via-red-500/5 to-transparent",
  "from-fuchsia-500/20 via-fuchsia-500/5 to-transparent",
];

const iconColors = [
  "text-blue-500", "text-sky-500", "text-violet-500", "text-rose-500",
  "text-emerald-500", "text-purple-500", "text-amber-500", "text-cyan-500",
  "text-orange-500", "text-pink-500", "text-teal-500", "text-indigo-500",
  "text-lime-500", "text-red-500", "text-fuchsia-500",
];

const bgColors = [
  "bg-blue-500/10", "bg-sky-500/10", "bg-violet-500/10", "bg-rose-500/10",
  "bg-emerald-500/10", "bg-purple-500/10", "bg-amber-500/10", "bg-cyan-500/10",
  "bg-orange-500/10", "bg-pink-500/10", "bg-teal-500/10", "bg-indigo-500/10",
  "bg-lime-500/10", "bg-red-500/10", "bg-fuchsia-500/10",
];

export function FeaturedCategories() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const ctx = gsap.context(() => {
      // Section header entrance
      gsap.fromTo(
        section.querySelector(".categories-header"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Category cards staggered reveal
      const cards = grid.querySelectorAll(".category-card-wrapper");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: {
            trigger: grid,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Hover effect for each card
      cards.forEach((card) => {
        const link = card.querySelector("a");
        if (!link) return;

        card.addEventListener("mouseenter", () => {
          gsap.to(link, {
            y: -4,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
          });
          const icon = link.querySelector(".category-icon");
          if (icon) {
            gsap.to(icon, {
              scale: 1.15,
              duration: 0.3,
              ease: "back.out(2)",
            });
          }
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(link, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          });
          const icon = link.querySelector(".category-icon");
          if (icon) {
            gsap.to(icon, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="categories-header flex items-center justify-between mb-10 opacity-0">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Categories</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-1">Shop by Category</h2>
            <p className="text-muted-foreground mt-1.5 text-sm">
              Explore millions of products across {categories.length} categories
            </p>
          </div>
          <Link to="/marketplace">
            <Button variant="ghost" size="sm" className="text-sm gap-1.5 rounded-full">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((cat, index) => {
            const IconComponent = iconMap[cat.icon] || Package;
            return (
              <div key={cat.id} className="category-card-wrapper">
                <Link
                  to={"/marketplace?category=" + cat.slug}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-5 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 block h-full"
                >
                  <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500", gradients[index % gradients.length])} />
                  <div className="relative">
                    <div className={cn(
                      "category-icon h-12 w-12 rounded-xl flex items-center justify-center mb-3.5 group-hover:scale-110 transition-all duration-300",
                      bgColors[index % bgColors.length],
                      iconColors[index % iconColors.length]
                    )}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-sm">{cat.name}</h3>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      {cat.productCount.toLocaleString()} products
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Shop now <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
