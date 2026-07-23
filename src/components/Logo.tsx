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
      viewBox="0 0 160 160"
      className={cn("h-20 w-auto shrink-0", className)}
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
      <rect x="52" y="2" width="56" height="56" rx="14" fill="url(#sd-badge)" />

      {/* Cart basket body — trapezoid, wider at top */}
      <path
        d="M67,32 L65,56 C65,58.5 67,60.5 69.5,60.5 L90.5,60.5 C93,60.5 95,58.5 95,56 L93,32 Z"
        fill="white"
      />

      {/* Cart divider line (basket grid) */}
      <path
        d="M66,44 L94,44"
        fill="none"
        stroke="url(#sd-badge)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Left wheel */}
      <circle cx="72" cy="63" r="4" fill="white" />

      {/* Right wheel */}
      <circle cx="88" cy="63" r="4" fill="white" />

      {/* Cart handle — arcs up from the basket top */}
      <path
        d="M70,32 C70,24 74,20 80,20 C86,20 90,24 90,32"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Small accent dot on handle (digital node) */}
      <circle cx="80" cy="20" r="2.5" fill="white" opacity="0.8" />

      {/* ─── Wordmark ─── */}
      <text
        x="80"
        y="90"
        textAnchor="middle"
        fontFamily="'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        fontSize="28"
        fontWeight="800"
        fill="#111827"
        letterSpacing="-0.5"
      >
        SokoDigital
      </text>

      {/* ─── Tagline ─── */}
      <text
        x="80"
        y="112"
        textAnchor="middle"
        fontFamily="'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        fontSize="13"
        fontWeight="600"
        fill="#6B7280"
        letterSpacing="2.5"
      >
        Modern Marketplace
      </text>

      {/* Decorative orange underline dot */}
      <circle cx="80" cy="126" r="3.5" fill="url(#sd-badge)" />
    </svg>
  );
}
