import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star, Heart, ShoppingCart, Shield, Truck, RotateCcw, CheckCircle2,
  Store, ChevronRight, Sparkles, Share2, Minus, Plus,
} from 'lucide-react';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { PRODUCTS, type Product } from '@/lib/marketplace-data';
import { Button } from '@/components/ui/button';

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const product: Product | undefined = useMemo(
    () => PRODUCTS.find((p) => slugify(p.title) === id),
    [id]
  );

  const gallery = useMemo(() => {
    if (!product) return [];
    return [product.img, ...PRODUCTS.filter((p) => p.category === product.category && p.title !== product.title).slice(0, 3).map((p) => p.img)];
  }, [product]);

  const [active, setActive] = useState(0);

  const related = useMemo(
    () => (product ? PRODUCTS.filter((p) => p.category === product.category && p.title !== product.title).slice(0, 4) : []),
    [product]
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="mt-2 text-muted-foreground">The item you're looking for is unavailable.</p>
          <Link to="/marketplace" className="mt-6 inline-block rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground">
            Back to marketplace
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/40">
        <div className="mx-auto flex max-w-7xl items-center gap-1.5 px-4 py-3 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/marketplace" className="hover:text-primary">Marketplace</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={`/marketplace?category=${product.category}`} className="hover:text-primary">{product.category}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="line-clamp-1 text-foreground">{product.title}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Gallery */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <motion.img
                key={active}
                initial={{ opacity: 0.6, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                src={gallery[active]}
                alt={product.title}
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`overflow-hidden rounded-lg border-2 transition ${active === i ? 'border-primary' : 'border-transparent hover:border-border'}`}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={g} alt="" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 font-semibold text-primary">
                <CheckCircle2 className="h-3 w-3" /> Verified Seller
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-1 font-semibold text-accent">
                <Sparkles className="h-3 w-3" /> AI Recommended
              </span>
            </div>

            <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">{product.title}</h1>

            <div className="mt-2 flex items-center gap-3 text-sm">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className={`h-4 w-4 ${s < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                ))}
              </div>
              <span className="font-semibold">{product.rating}</span>
              <span className="text-muted-foreground">(1,240 reviews)</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">2.4k sold</span>
            </div>

            <div className="mt-5 flex items-end gap-3">
              <span className="text-4xl font-black text-primary">{product.price}</span>
              {product.old && (
                <>
                  <span className="pb-1 text-lg text-muted-foreground line-through">{product.old}</span>
                  <span className="pb-1 rounded bg-destructive/10 px-2 py-0.5 text-xs font-bold text-destructive">
                    -{product.discount}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="mt-1 text-sm text-success font-semibold">In stock · Ships worldwide</p>

            {/* Options */}
            <div className="mt-6 space-y-4">
              <div>
                <div className="mb-2 text-sm font-semibold">Color</div>
                <div className="flex gap-2">
                  {['bg-slate-900', 'bg-slate-400', 'bg-rose-500', 'bg-indigo-600'].map((c, i) => (
                    <button key={i} className={`h-8 w-8 rounded-full ${c} ring-2 ring-offset-2 ring-offset-background ${i === 0 ? 'ring-primary' : 'ring-transparent'}`} />
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-2 text-sm font-semibold">Quantity</div>
                <div className="inline-flex items-center rounded-full border border-border bg-card">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-9 w-9 place-items-center hover:bg-muted rounded-l-full" aria-label="Decrease">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="grid h-9 w-9 place-items-center hover:bg-muted rounded-r-full" aria-label="Increase">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1500); }}
                className="flex-1 rounded-full bg-primary text-primary-foreground hover:opacity-90"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {added ? 'Added to cart' : 'Add to Cart'}
              </Button>
              <Button size="lg" variant="outline" className="rounded-full">
                <Heart className="mr-2 h-5 w-5" /> Wishlist
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" aria-label="Share">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Trust */}
            <div className="mt-6 grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className="rounded-lg border border-border bg-card p-3">
                <Truck className="mx-auto mb-1 h-4 w-4 text-primary" />
                <div className="font-semibold">Free shipping</div>
                <div className="text-muted-foreground">Orders $50+</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
                <RotateCcw className="mx-auto mb-1 h-4 w-4 text-primary" />
                <div className="font-semibold">30-day returns</div>
                <div className="text-muted-foreground">Hassle-free</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
                <Shield className="mx-auto mb-1 h-4 w-4 text-primary" />
                <div className="font-semibold">Buyer protection</div>
                <div className="text-muted-foreground">Secure payments</div>
              </div>
            </div>
          </div>

          {/* Seller card */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
                    <Store className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-bold">{product.seller}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> 4.9 · 12k orders
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                  <div><div className="font-bold text-foreground">98%</div><div className="text-muted-foreground">Positive</div></div>
                  <div><div className="font-bold text-foreground">24h</div><div className="text-muted-foreground">Response</div></div>
                  <div><div className="font-bold text-foreground">2y+</div><div className="text-muted-foreground">Selling</div></div>
                </div>
                <Link to="/shops" className="mt-4 inline-flex w-full justify-center rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted">
                  Visit store
                </Link>
              </div>

              <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-accent/10 p-5">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <Sparkles className="h-4 w-4 text-accent" /> Soko AI insight
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Price is <span className="font-semibold text-foreground">12% below</span> the category average this week — a good time to buy.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Description / Specs */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold">Description</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {product.title} is designed for everyday performance and long-term reliability.
              Crafted by {product.seller} with premium materials, this product blends thoughtful design
              with modern engineering. Backed by a global warranty and buyer protection, it's a smart
              addition to your daily routine.
            </p>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              {['Premium materials', 'Ergonomic design', 'Global warranty', 'Fast worldwide shipping', 'Verified seller quality', 'Eco-friendly packaging'].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold">Specifications</h2>
            <dl className="mt-3 divide-y divide-border text-sm">
              {[
                ['Category', product.category],
                ['Seller', product.seller],
                ['Rating', `${product.rating} / 5`],
                ['SKU', `SD-${slugify(product.title).slice(0, 8).toUpperCase()}`],
                ['Ships from', 'Global network'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-2">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-black tracking-tight">You may also like</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {related.map((r) => (
                <Link
                  key={r.title}
                  to={`/product/${slugify(r.title)}`}
                  className="group overflow-hidden rounded-xl border border-border bg-card transition hover:shadow-lg"
                >
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img src={r.img} alt={r.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-3">
                    <div className="line-clamp-2 text-sm font-medium">{r.title}</div>
                    <div className="mt-1 font-bold text-primary">{r.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
