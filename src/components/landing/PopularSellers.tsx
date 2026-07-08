import { motion } from "framer-motion";
import { ArrowRight, Star, Shield, Package, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sellers } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function PopularSellers() {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Popular Sellers</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Top-rated sellers with verified stores
            </p>
          </div>
          <Button variant="ghost" size="sm" className="text-sm gap-1.5 rounded-full">
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sellers.slice(0, 6).map((seller, index) => (
            <motion.a
              key={seller.id}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-5 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Avatar className="h-14 w-14 rounded-xl ring-2 ring-border/50 group-hover:ring-primary/30 transition-all duration-300">
                    <AvatarImage src={seller.logo} alt={seller.name} />
                    <AvatarFallback className="rounded-xl">{seller.name[0]}</AvatarFallback>
                  </Avatar>
                  {seller.verified && (
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-blue-500 border-2 border-background flex items-center justify-center">
                      <Shield className="h-2.5 w-2.5 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                      {seller.storeName}
                    </h3>
                    {seller.verified && (
                      <Badge variant="secondary" className="h-5 text-[10px] px-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{seller.description}</p>

                  <div className="flex items-center gap-3 mt-3 text-[11px] text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                      <span className="font-medium text-amber-600 dark:text-amber-400">{seller.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      {seller.totalSales.toLocaleString()} sales
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {seller.followers.toLocaleString()}
                    </div>
                  </div>

                  {seller.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {seller.badges.map((badge) => (
                        <span
                          key={badge}
                          className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/5 text-primary text-[10px] font-medium"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {seller.location}
                </div>
                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {seller.responseRate}% response
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
