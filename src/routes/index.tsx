import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Partners } from "@/components/site/Partners";
import { Categories } from "@/components/site/Categories";
import { Products } from "@/components/site/Products";
import { Features } from "@/components/site/Features";
import { Stats } from "@/components/site/Stats";
import { Shops } from "@/components/site/Shops";
import { Deals } from "@/components/site/Deals";
import { Testimonials } from "@/components/site/Testimonials";
import { AppPromo } from "@/components/site/AppPromo";
import { FAQ } from "@/components/site/FAQ";
import { Newsletter } from "@/components/site/Newsletter";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
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
