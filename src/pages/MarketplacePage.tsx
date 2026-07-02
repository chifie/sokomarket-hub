import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, Star, ShoppingCart, Grid, List } from 'lucide-react';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { PageHeader } from '@/components/site/PageHeader';
import { PRODUCTS } from '@/lib/marketplace-data';
import { Button } from '@/components/ui/button';

const categories = ['All', 'Electronics', 'Fashion', 'Agriculture', 'Phones', 'Computers', 'Furniture', 'Beauty', 'Food', 'Automotive', 'Books', 'Sports'];

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All';
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PageHeader
        eyebrow="Marketplace"
        title="Explore Our Marketplace"
        description="Discover thousands of products from trusted sellers across the world"
        crumb="Marketplace"
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-input bg-background text-foreground outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {categories.slice(0, 8).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition ${
                  selectedCategory === category
                    ? 'bg-sky-500 text-white'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-sky-500 text-white' : 'bg-muted text-muted-foreground'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-sky-500 text-white' : 'bg-muted text-muted-foreground'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, i) => (
            <motion.article
              key={product.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={product.img}
                  alt={product.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2 py-1 text-[10px] font-bold text-white">
                  -{product.discount}%
                </span>
                <button
                  aria-label="Add to wishlist"
                  className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground/80 shadow-sm transition hover:text-red-500"
                >
                  <Heart className="h-4 w-4" />
                </button>
                <div className="absolute inset-x-3 bottom-3 flex translate-y-4 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <Button
                    size="sm"
                    className="flex-1 rounded-full bg-gradient-to-r from-sky-500 to-sky-700 text-white"
                  >
                    <ShoppingCart className="mr-1 h-4 w-4" /> Add
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <div className="text-xs text-muted-foreground">{product.seller}</div>
                <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-foreground">{product.title}</h3>
                <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold text-foreground">{product.rating}</span>
                  <span>· 240 sold</span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-lg font-black text-sky-500">{product.price}</span>
                  <span className="text-xs text-muted-foreground line-through">{product.old}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-xl text-muted-foreground">No products found</p>
            <p className="mt-2 text-muted-foreground">Try adjusting your search or filter</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
