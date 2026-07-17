import { BrowserRouter, Routes, Route } from 'react-router';
import Landing from '@/pages/Landing';
import AIChatPage from '@/pages/AIChatPage';
import MarketplacePage from '@/pages/MarketplacePage';
import AuthPage from '@/pages/AuthPage';
import DashboardPage from '@/pages/DashboardPage';
import SellerListingsPage from '@/pages/SellerListingsPage';
import SellerProductFormPage from '@/pages/SellerProductFormPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import SellerOnboardingPage from '@/pages/SellerOnboardingPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import StorePage from '@/pages/StorePage';
import { AuthProvider } from '@/lib/auth';
import { LanguageProvider } from '@/lib/i18n';
import { AIWidget } from '@/components/site/AIWidget';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { AIAssistant } from '@/components/ai/AIAssistant';

function CategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center">
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-muted-foreground mt-2">Browse all categories coming soon</p>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

function ShopsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center">
          <h1 className="text-3xl font-bold">Shops</h1>
          <p className="text-muted-foreground mt-2">Discover stores coming soon</p>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

function DealsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center">
          <h1 className="text-3xl font-bold">Deals</h1>
          <p className="text-muted-foreground mt-2">Flash sales coming soon</p>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-3xl font-bold mb-4">About SokoDigital</h1>
          <p className="text-muted-foreground">Tanzania's premier online marketplace connecting buyers and sellers across the nation.</p>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground">support@sokodigital.co.tz</p>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/shops" element={<ShopsPage />} />
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/store/:id" element={<StorePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/chat" element={<AIChatPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/listings" element={<SellerListingsPage />} />
            <Route path="/dashboard/listings/new" element={<SellerProductFormPage />} />
            <Route path="/dashboard/listings/:id/edit" element={<SellerProductFormPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/sell" element={<SellerOnboardingPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
          </Routes>
          <AIAssistant />
          <AIWidget />
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
