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
import MarketplacePage from '@/pages/MarketplacePage';import json

import AuthPage from '@/pages/AuthPage';
import DashboardPage from '@/pages/DashboardPage';
import SellerListingsPage from '@/pages/SellerListingsPage';
import SellerProductFormPage from '@/pages/SellerProductFormPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import { AuthProvider } from '@/lib/auth';
import { LanguageProvider } from '@/lib/i18n';
import { AIWidget } from '@/components/site/AIWidget';

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
        title="About SokoDigital"
        description="A global digital marketplace connecting buyers and sellers across every continent."
        crumb="About"
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="rounded-2xl border border-border bg-card p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h2>
            <p className="text-muted-foreground">
              SokoDigital is a worldwide digital marketplace built to connect verified sellers
              with millions of buyers across the globe. We empower entrepreneurs of every size and
              bring a trusted commerce experience to every device, everywhere.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Why Choose SokoDigital?</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li>
                <strong className="text-foreground">Trust & Safety</strong>
                <p className="mt-1">Every seller is verified and products are quality-checked.</p>
              </li>
              <li>
                <strong className="text-foreground">Global Community</strong>
                <p className="mt-1">We connect buyers and sellers across borders and currencies.</p>
              </li>
              <li>
                <strong className="text-foreground">Growth & Opportunity</strong>
                <p className="mt-1">Tools, analytics, and support to help every business thrive.</p>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Contact Us</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>support@sokodigital.com</p>
              <p>+1 (800) 555-0140</p>
              <p>Support available 24/7 worldwide</p>
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
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-semibold hover:opacity-90 transition"
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-bold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground">support@sokodigital.com</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-bold text-foreground mb-2">Phone</h3>
              <p className="text-muted-foreground">+1 (800) 555-0140</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-bold text-foreground mb-2">Location</h3>
              <p className="text-muted-foreground">Operating worldwide</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-bold text-foreground mb-2">Hours</h3>
              <p className="text-muted-foreground">24 / 7 across every timezone</p>
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
      <LanguageProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/shops" element={<ShopsPage />} />
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/chat" element={<AIChatPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/listings" element={<SellerListingsPage />} />
            <Route path="/dashboard/listings/new" element={<SellerProductFormPage />} />
            <Route path="/dashboard/listings/:id/edit" element={<SellerProductFormPage />} />
          </Routes>
          <AIWidget />
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
