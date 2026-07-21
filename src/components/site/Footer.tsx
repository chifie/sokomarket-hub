import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router";
import { Logo } from "@/components/Logo";

const ROUTES: Record<string, string> = {
  About: "/about",
  Contact: "/contact",
  Categories: "/categories",
  Shops: "/shops",
  Deals: "/deals",
};

const COLS = [
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Blog"],
  },
  {
    title: "Marketplace",
    links: ["Categories", "Shops", "Deals", "New Arrivals"],
  },
  {
    title: "Support",
    links: ["Help Center", "Contact", "Order Tracking", "Returns"],
  },
  {
    title: "Resources",
    links: ["Developers", "Partners", "Affiliates", "Guides"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms", "Cookies", "Compliance"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2">
              <Logo className="h-9 w-auto text-foreground" />
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The world's modern digital marketplace. Buy and sell with confidence.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border/60 text-muted-foreground transition hover:border-indigo-600 hover:text-indigo-600"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <div className="text-sm font-bold text-foreground">{c.title}</div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {c.links.map((l) =>
                  ROUTES[l] ? (
                    <li key={l}>
                      <Link to={ROUTES[l]} className="transition hover:text-indigo-600">
                        {l}
                      </Link>
                    </li>
                  ) : (
                    <li key={l}>
                      <a href="#" className="transition hover:text-indigo-600">
                        {l}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} SokoDigital. All rights reserved.</div>
          <div>Made with care worldwide</div>
        </div>
      </div>
    </footer>
  );
}
