import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { FeaturedCategories } from "@/components/landing/FeaturedCategories";
import { ProductSection } from "@/components/landing/ProductSection";
import { FlashSaleBanner } from "@/components/landing/FlashSaleBanner";
import { PopularSellers } from "@/components/landing/PopularSellers";
import { Testimonials } from "@/components/landing/Testimonials";
import { Statistics } from "@/components/landing/Statistics";
import { DownloadApp } from "@/components/landing/DownloadApp";
import { Newsletter } from "@/components/landing/Newsletter";

export default function Landing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col"
    >
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedCategories />
        <ProductSection />
        <FlashSaleBanner />
        <PopularSellers />
        <Testimonials />
        <Statistics />
        <DownloadApp />
        <Newsletter />
      </main>
      <Footer />
    </motion.div>
  );
}