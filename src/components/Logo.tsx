import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

/**
 * SokoDigital Logo — Premium hand-crafted SVG.
 *
 * Vertical layout: Shopping cart badge (top) → "SokoDigital" (middle)
 * → "Modern Marketplace" (bottom).
 *
 * Responsive via viewBox scaling — works from header (h-9) to large displays.
 */
export function Logo({ className }: LogoProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        svgRef.current,
        { opacity: 0, y: -8, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 85"
      className={cn("h-9 w-auto shrink-0", className)}
      fill="none"
      aria-label="SokoDigital"
    >
      <defs>
        <linearGradient id="sd-badge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
      </defs>

      {/* ─── Shopping Cart Badge ─── */}
      <rect x="52" y="2" width="56" height="50" rx="12" fill="url(#sd-badge)" />

      {/* Cart basket body — trapezoid, wider at top */}
      <path
        d="M67,28 L65,47 C65,49 67,50.5 69.5,50.5 L90.5,50.5 C93,50.5 95,49 95,47 L93,28 Z"
        fill="white"
      />

      {/* Cart divider line (basket grid) */}
      <path
        d="M66,38 L94,38"
        fill="none"
        stroke="url(#sd-badge)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Left wheel */}
      <circle cx="72" cy="52" r="3.5" fill="white" />

      {/* Right wheel */}
      <circle cx="88" cy="52" r="3.5" fill="white" />

      {/* Cart handle — arcs up from the basket top */}
      <path
        d="M70,28 C70,20 74,17 80,17 C86,17 90,20 90,28"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Small accent dot on handle (digital node) */}
      <circle cx="80" cy="17" r="2" fill="white" opacity="0.8" />

      {/* ─── Wordmark ─── */}
      <text
        x="80"
        y="65"
        textAnchor="middle"
        fontFamily="'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        fontSize="20"
        fontWeight="800"
        fill="#111827"
        letterSpacing="-0.3"
      >
        SokoDigital
      </text>

      {/* ─── Tagline ─── */}
      <text
        x="80"
        y="78"
        textAnchor="middle"
        fontFamily="'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        fontSize="12"
        fontWeight="600"
        fill="#6B7280"
        letterSpacing="2"
      >
        Modern Marketplace
      </text>

      {/* Decorative orange underline dot */}
      <circle cx="80" cy="83" r="2.5" fill="url(#sd-badge)" />
    </svg>
  );
}
