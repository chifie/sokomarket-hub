import { motion } from "framer-motion";
import { TrendingUp, Users, Store, Package, Smile } from "lucide-react";
import { stats } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  users: Users, store: Store, package: Package, smile: Smile,
};

export function Statistics() {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 dark:from-primary/10 dark:via-background dark:to-accent/10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Our Reach</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-1">SokoDigital by the Numbers</h2>
          <p className="text-muted-foreground mt-1.5 text-sm max-w-xl mx-auto">
            Growing Tanzania's digital marketplace every day
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = iconMap[stat.icon] || TrendingUp;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative text-center p-6 md:p-8 rounded-2xl border border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                {stat.suffix && (
                  <div className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 rounded-full px-3 py-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.suffix} growth
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
