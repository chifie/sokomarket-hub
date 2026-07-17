import { Link } from "react-router";
import { Package, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Youtube, Linkedin, ChevronRight, Shield, CreditCard, Truck, RotateCcw, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { footerLinks, paymentMethods } from "@/lib/constants";

const trustBadges = [
  { icon: Shield, text: "Secure Payments", desc: "256-bit SSL encrypted" },
  { icon: Truck, text: "Free Delivery", desc: "Nationwide Tanzania" },
  { icon: RotateCcw, text: "Easy Returns", desc: "14-day return policy" },
  { icon: CreditCard, text: "Mobile Money", desc: "M-Pesa, Airtel & more" },
];

export function Footer() {
  return (
    <footer className="relative bg-secondary text-secondary-foreground">
      {/* Trust Badges Bar */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map((badge) => (
              <div key={badge.text} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
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

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
                <Package className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Soko<span className="text-primary font-light">Digital</span>
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Tanzania's premier online marketplace connecting buyers and sellers across the nation. Shop smart, sell global.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>Dar es Salaam, Tanzania | Zanzibar</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>hello@sokodigital.co.tz</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>+255 700 123 456</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-6">
              {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-200 hover:scale-110 active:scale-95"
                >
                  <Icon className="h-4 w-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.slice(0, 6).map((link) => (
                  <li key={link}>
                    <Link
                      to="#"
                      className="text-sm text-white/60 hover:text-primary transition-colors duration-200 flex items-center gap-1 group"
                    >
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

      {/* Newsletter & Payments */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Stay in the loop
              </h4>
              <p className="text-xs text-white/60 mt-1">Get exclusive deals, new arrivals, and seller tips.</p>
            </div>
            <div className="flex w-full max-w-md gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl focus-visible:ring-primary/50"
              />
              <Button className="h-11 rounded-xl px-6 bg-primary hover:bg-primary/90 shadow-lg shrink-0 cursor-pointer">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} SokoDigital. All rights reserved. Made with <Heart className="h-3 w-3 inline text-rose-400" /> for Tanzania
          </p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <Link to="#" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <span className="text-white/20">&bull;</span>
            <Link to="#" className="hover:text-white/60 transition-colors">Terms of Service</Link>
            <span className="text-white/20">&bull;</span>
            <Link to="#" className="hover:text-white/60 transition-colors">Cookie Policy</Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/30">Accepted Payments:</span>
            <div className="flex gap-1.5">
              {["M-Pesa", "Airtel", "Visa", "MC", "NMB"].map((p) => (
                <span key={p} className="px-2 py-0.5 bg-white/10 rounded-md text-[10px] font-medium text-white/60">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
