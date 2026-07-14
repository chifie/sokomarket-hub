import { Link } from "react-router";
import { Package, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Youtube, Linkedin, ChevronRight, Shield, CreditCard, Truck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  "Shop": ["Electronics", "Fashion", "Home & Living", "Beauty", "Sports", "Books", "Automotive", "Health"],
  "For Sellers": ["Start Selling", "Seller Dashboard", "Seller Academy", "Fees & Pricing", "Seller Community", "Success Stories"],
  "Customer Service": ["Help Center", "Returns & Refunds", "Shipping Info", "Order Tracking", "Contact Us", "FAQs"],
  "About": ["About Us", "Careers", "Press", "Blog", "Investors", "Privacy Policy", "Terms of Service"],
};

const trustBadges = [
  { icon: Shield, text: "Secure Payments", desc: "256-bit SSL encrypted" },
  { icon: Truck, text: "Free Delivery", desc: "On orders over $50" },
  { icon: RotateCcw, text: "Easy Returns", desc: "30-day return policy" },
  { icon: CreditCard, text: "Multiple Payments", desc: "Cards & Mobile Money" },
];

export function Footer() {
  return (
    <footer className="relative bg-secondary text-secondary-foreground">
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge) => (
              <div key={badge.text} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <badge.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{badge.text}</p>
                  <p className="text-xs text-white/60">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Package className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Soko<span className="text-primary font-light">Digital</span>
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Africa's premier online marketplace connecting buyers and sellers across the continent. Shop smart, sell global.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                Nairobi, Kenya | Dar es Salaam, Tanzania
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Mail className="h-3.5 w-3.5 text-primary" />
                hello@sokodigital.com
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Phone className="h-3.5 w-3.5 text-primary" />
                +254 700 123 456
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-200 hover:scale-110">
                  <Icon className="h-4 w-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link to="#" className="text-sm text-white/60 hover:text-primary transition-colors duration-200 flex items-center gap-1 group">
                      <ChevronRight className="h-3 w-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-base font-semibold text-white">Stay in the loop</h4>
              <p className="text-sm text-white/60 mt-1">Get exclusive deals, new arrivals, and seller tips.</p>
            </div>
            <div className="flex w-full max-w-md gap-2">
              <Input type="email" placeholder="Enter your email" className="h-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-full focus-visible:ring-primary/50" />
              <Button className="h-11 rounded-full px-6 bg-primary hover:bg-primary/90 shadow-lg cursor-pointer">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">&copy; {new Date().getFullYear()} Soko Digital. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <Link to="#" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <span>&bull;</span>
            <Link to="#" className="hover:text-white/60 transition-colors">Terms of Service</Link>
            <span>&bull;</span>
            <Link to="#" className="hover:text-white/60 transition-colors">Cookie Policy</Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/30">Accepted Payments:</span>
            <div className="flex gap-1">
              {["Visa", "MC", "MPesa", "Airtel"].map((p) => (
                <span key={p} className="px-2 py-0.5 bg-white/10 rounded text-[10px] font-medium text-white/60">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}