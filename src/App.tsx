import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/site/Navbar';
import { Hero } from '@/components/site/Hero';
import { Partners } from '@/components/site/Partners';
import { Categories } from '@/components/site/Categories';
import { Products } from '@/components/site/Products';
import { Features } from '@/components/site/Features';
import { Stats } from '@/components/site/Stats';
import { Shops } from '@/components/site/Shops';
import { Deals } from '@/components/site/Deals';
import { Testimonials } from '@/components/site/Testimonials';
import { AppPromo } from '@/components/site/AppPromo';
import { FAQ } from '@/components/site/FAQ';
import { Newsletter } from '@/components/site/Newsletter';
import { CTA } from '@/components/site/CTA';
import { Footer } from '@/components/site/Footer';
import { PageHeader } from '@/components/site/PageHeader';
import AIChatPage from '@/pages/AIChatPage';
import MarketplacePage from '@/pages/MarketplacePage';

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Partners />
        <Categories />
        <Products />
        <Features />
        <Stats />
        <Shops />
        <Deals />
        <Testimonials />
        <AppPromo />
        <FAQ />
        <Newsletter />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PageHeader
        eyebrow="Categories"
        title="Browse All Categories"
        description="Explore thousands of products across every category"
        crumb="Categories"
      />
      <div className="py-12">
        <Categories />
      </div>
      <Footer />
    </div>
  );
}

function ShopsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PageHeader
        eyebrow="Shops"
        title="Discover Trusted Sellers"
        description="Connect with verified sellers from across the world"
        crumb="Shops"
      />
      <div className="py-12">
        <Shops />
      </div>
      <Footer />
    </div>
  );
}

function DealsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PageHeader
        eyebrow="Deals"
        title="Flash Sales & Offers"
        description="Limited time deals on top products"
        crumb="Deals"
      />
      <div className="py-12">
        <Deals />
        <Products />
      </div>
      <Footer />
    </div>
  );
}

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PageHeader
        eyebrow="About"
        title="About SokoMarket"
        description="worldwide's leading digital marketplace connecting buyers and sellers"
        crumb="About"
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="rounded-2xl border border-border bg-card p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h2>
            <p className="text-muted-foreground">
              SokoMarket Hub is worldwide's premier digital marketplace, designed to connect local sellers
              with buyers across all 47 counties. We believe in empowering small businesses and
              bringing the traditional market experience into the digital age.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Why Choose SokoMarket?</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-sky-500"></span>
                <div>
                  <strong className="text-foreground">Trust & Safety</strong>
                  <p className="mt-1">Every seller is verified and products quality-checked.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sky-500"></span>
                <div>
                  <strong className="text-foreground">Community First</strong>
                  <p className="mt-1">We prioritize building lasting relationships between buyers and sellers.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sky-500"></span>
                <div>
                  <strong className="text-foreground">Growth & Opportunity</strong>
                  <p className="mt-1">We provide tools and support to help small businesses thrive.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Contact Us</h2>
            <div className="space-y-3 text-muted-foreground">
              <p> support@sokomarket.co.ke</p>
              <p> +254 700 000 000</p>
              <p> Mon - Sat: 8:00 AM - 6:00 PM EAT</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PageHeader
        eyebrow="Contact"
        title="Get in Touch"
        description="We'd love to hear from you. Reach out to our team."
        crumb="Contact"
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-xl font-bold mb-6 text-foreground">Send us a message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-sky-500 to-sky-700 text-white font-semibold hover:opacity-90 transition"
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-bold text-foreground mb-2"> Email</h3>
              <p className="text-muted-foreground">support@sokomarket.co.ke</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-bold text-foreground mb-2"> Phone</h3>
              <p className="text-muted-foreground">+254 700 000 000</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-bold text-foreground mb-2"> Location</h3>
              <p className="text-muted-foreground">Metro areas, worldwide</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-bold text-foreground mb-2"> Hours</h3>
              <p className="text-muted-foreground">Mon - Sat: 8:00 AM - 6:00 PM EAT</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/shops" element={<ShopsPage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/chat" element={<AIChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
