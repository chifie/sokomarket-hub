import { Link } from "react-router";
import { Package, Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import { footerLinks } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto pt-12">
      {/* Colored bar */}
      <div className="h-2 bg-gradient-to-r from-primary via-primary/80 to-primary" />

      <div className="bg-card py-10">
        <div className="px-4 sm:px-8 lg:px-12 xl:px-16">
          {/* Brand + Social */}
          <div className="mb-10">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center">
                <Package className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">
                Soko<span className="text-primary font-light">Digital</span>
              </span>
            </Link>
            <p className="text-xs text-muted-foreground max-w-md leading-relaxed">
              Tanzania's premier online marketplace. Shop millions of products from trusted sellers across the nation.
            </p>
            <div className="flex items-center gap-2 mt-4">
              {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200 text-muted-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-sm font-bold text-primary mb-3">{title}</h4>
                <ul className="space-y-2">
                  {links.slice(0, 5).map((link) => (
                    <li key={link}>
                      <Link to="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-muted-foreground">
              &copy; {new Date().getFullYear()} SokoDigital. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
              <Link to="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <span className="text-border">|</span>
              <Link to="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
