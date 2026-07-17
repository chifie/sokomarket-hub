import { Link } from "react-router";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Hero } from "@/components/landing/Hero";
import { ProductCard} from "@/components/product/ProductCard";
import { categories, products, sellers } from "@/lib/constants";
import { ShoppingCart, Package, BadgeCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background flex flex-col"
    >
      <Header />

      <main className="flex-1 pb-16 lg:pb-0">
        <Hero />

        {/* ─── Category Pills ─── */}
        <section className="px-4 sm:px-8 lg:px-12 xl:px-16 mt-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {categories.slice(0, 20).map((cat) => (
              <Link
                key={cat.id}
                to={`/marketplace?category=${cat.slug}`}
                className="shrink-0 px-4 py-2 rounded-full bg-card border border-border text-sm text-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>

        {/* ─── Top Selling / New Arrivals / Top Deals ─── */}
        <section className="px-4 sm:px-8 lg:px-12 xl:px-16 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
            {/* Top Selling */}
            <div className="bg-card rounded-lg p-4 flex flex-col">
              <h2 className="text-sm font-bold text-foreground mb-3">Top Selling Product</h2>
              <div className="grid grid-cols-2 gap-2">
                {products.slice(0, 4).map((p) => (
                  <Link key={p.id} to={`/product/${p.slug}`} className="block aspect-square">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-contain bg-muted/50 rounded"
                    />
                  </Link>
                ))}
              </div>
              <Link to="/top-selling" className="text-sm text-primary hover:underline mt-auto pt-2 block text-right font-medium">
                View more →
              </Link>
            </div>

            {/* New Arrivals */}
            <div className="bg-card rounded-lg p-4 flex flex-col">
              <h2 className="text-sm font-bold text-foreground mb-3">New Arrivals</h2>
              <div className="grid grid-cols-3 gap-2">
                <Link to={`/product/${products[0]?.slug}`} className="col-span-3 block aspect-[4/3] sm:aspect-[3/2]">
                  <img
                    src={products[0]?.images[0]}
                    alt={products[0]?.name || "Product"}
                    loading="lazy"
                    className="w-full h-full object-contain bg-muted/50 rounded"
                  />
                </Link>
                {products.slice(1, 4).map((p) => (
                  <Link key={p.id} to={`/product/${p.slug}`} className="block aspect-square">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-contain bg-muted/50 rounded"
                    />
                  </Link>
                ))}
              </div>
              <Link to="/new-arrivals" className="text-sm text-primary hover:underline mt-auto pt-2 block text-right font-medium">
                View more →
              </Link>
            </div>

            {/* Top Deals */}
            <div className="bg-card rounded-lg p-4 flex flex-col">
              <h2 className="text-sm font-bold text-foreground mb-3">Top Deals</h2>
              <div className="grid grid-cols-2 gap-2">
                {products.slice(4, 8).map((p) => (
                  <Link key={p.id} to={`/product/${p.slug}`} className="block aspect-square">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-contain bg-muted/50 rounded"
                    />
                  </Link>
                ))}
              </div>
              <Link to="/top-deals" className="text-sm text-primary hover:underline mt-auto pt-2 block text-right font-medium">
                View more →
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Stores Section ─── */}
        <section className="px-4 sm:px-8 lg:px-12 xl:px-16 mt-8">
          <div className="bg-card rounded-lg p-6">
            <h2 className="text-sm font-bold text-foreground mb-6">Stores</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-6">
              {sellers.slice(0, 12).map((seller) => (
                <Link
                  key={seller.id}
                  to={`/store/${seller.id}`}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-muted flex items-center justify-center ring-2 ring-border/50 group-hover:ring-primary transition-colors">
                    {seller.logo ? (
                      <img
                        src={seller.logo}
                        alt={seller.storeName}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-primary">{seller.storeName.charAt(0)}</span>
                    )}
                  </div>
                  <span className="text-[11px] text-center text-foreground w-full inline-flex items-center justify-center gap-1 min-w-0">
                    <span className="truncate min-w-0">{seller.storeName}</span>
                    {seller.verified && (
                      <BadgeCheck
                        className="inline-block shrink-0 text-primary fill-primary"
                        style={{ width: 12, height: 12 }}
                      />
                    )}
                  </span>
                </Link>
              ))}
            </div>
            <Link to="/stores" className="text-sm text-primary hover:underline mt-4 block text-right font-medium">
              View more →
            </Link>
          </div>
        </section>

        {/* ─── Promo Banner ─── */}
        <section className="px-4 sm:px-8 lg:px-12 xl:px-16 mt-8">
          <div className="bg-card rounded-lg p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <p className="text-sm text-primary font-medium">Don't Miss Today's Deal</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-1">Let Us Shopping Today!</h2>
              <Button
                size="lg"
                className="mt-4 shadow-md"
                asChild
              >
                <Link to="/marketplace">Shop Now</Link>
              </Button>
            </div>
            <div className="flex-1">
              <div className="w-full h-40 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/5 rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-3 gap-3 p-4">
                  <Package className="h-8 w-8 text-primary/60" />
                  <ShoppingCart className="h-8 w-8 text-primary/60" />
                  <Sparkles className="h-8 w-8 text-primary/60" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── All Products ─── */}
        <section className="px-4 sm:px-8 lg:px-12 xl:px-16 mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-foreground">Other Products</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <Button className="shadow-sm" asChild>
              <Link to="/products">
                View more →
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </motion.div>
  );
}
