import { motion } from "framer-motion";
import { ArrowRight, Star, Package, Users, MapPin, Clock, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sellers } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

export function PopularSellers() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Sellers</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-1">Popular Sellers</h2>
            <p className="text-muted-foreground mt-1.5 text-sm">
              Top-rated verified sellers from across Tanzania
            </p>
          </div>
          <Link to="/shops">
            <Button variant="ghost" size="sm" className="text-sm gap-1.5 rounded-full">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sellers.slice(0, 8).map((seller, index) => (
            <motion.div
              key={seller.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link
                to={`/shop/${seller.id}`}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 block h-full"
              >
                {/* Store Banner */}
                <div className="h-20 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/5 overflow-hidden">
                  {seller.banner && (
                    <img src={seller.banner} alt="" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                  )}
                </div>

                <div className="p-5 -mt-10 relative">
                  {/* Avatar */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative shrink-0">
                      <Avatar className="h-16 w-16 rounded-2xl ring-4 ring-background shadow-md">
                        <AvatarImage src={seller.logo} alt={seller.name} />
                        <AvatarFallback className="rounded-2xl text-lg">{seller.name[0]}</AvatarFallback>
                      </Avatar>
                      {seller.verified && (
                        <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary border-[3px] border-background flex items-center justify-center shadow-sm">
                          <BadgeCheck className="h-3.5 w-3.5 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 pt-1">
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                        {seller.storeName}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 ml-1">
                            {seller.rating}
                          </span>
                        </div>
                        <span className="text-[10px] text-muted-foreground">
                          ({seller.totalSales.toLocaleString()} sales)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                    {seller.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2 rounded-lg bg-muted/50">
                      <Package className="h-3.5 w-3.5 mx-auto text-primary mb-1" />
                      <p className="text-xs font-semibold">{seller.totalProducts}</p>
                      <p className="text-[9px] text-muted-foreground">Products</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-muted/50">
                      <Users className="h-3.5 w-3.5 mx-auto text-primary mb-1" />
                      <p className="text-xs font-semibold">{seller.followers.toLocaleString()}</p>
                      <p className="text-[9px] text-muted-foreground">Followers</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-muted/50">
                      <Clock className="h-3.5 w-3.5 mx-auto text-emerald-500 mb-1" />
                      <p className="text-xs font-semibold">{seller.responseRate}%</p>
                      <p className="text-[9px] text-muted-foreground">Response</p>
                    </div>
                  </div>

                  {/* Badges */}
                  {seller.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
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

                  {/* Location */}
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground pt-3 border-t border-border/30">
                    <MapPin className="h-3 w-3" />
                    {seller.location}
                    <span className="ml-auto text-[10px] text-emerald-600 dark:text-emerald-400">
                      {seller.responseTime} response
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
