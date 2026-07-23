import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

/**
 * SokoDigital Logo — Elegantly crafted brand mark.
 *
 * Architecture:
 *   Top    → Orange gradient badge with a refined shopping trolley
 *   Middle → Bold "SokoDigital" wordmark in dark gradient
 *   Bottom → "Modern Marketplace" tagline with refined letter-spacing
 *   Accent → A delicate orange dot anchoring the composition
 *
 * Designed for maximum visibility at every touch-point. Every detail —
 * from the trolley handle curve to the letter-spacing on the tagline —
 * has been hand-tuned for a premium, polished feel.
 */
export function Logo({ className }: LogoProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        svgRef.current,
        { opacity: 0, y: -10, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power4.out",
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 230"
      className={cn("h-20 w-auto shrink-0", className)}
      fill="none"
      aria-label="SokoDigital"
    >
      <defs>
        {/* ─── Brand Gradient ─── */}
        <linearGradient id="sd-badge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>

        {/* ─── Badge drop-shadow ─── */}
        <filter
          id="sd-shadow"
          x="-10%"
          y="-10%"
          width="130%"
          height="130%"
        >
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="6"
            floodColor="#F97316"
            floodOpacity="0.25"
          />
        </filter>

        {/* ─── Wordmark gradient (dark → deeper dark) ─── */}
        <linearGradient id="sd-wordmark" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#111827" />
          <stop offset="100%" stopColor="#1F2937" />
        </linearGradient>

        {/* ─── Tagline gradient ─── */}
        <linearGradient id="sd-tagline" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6B7280" />
          <stop offset="100%" stopColor="#4B5563" />
        </linearGradient>
      </defs>

      {/* ─── Badge with elegant drop-shadow ─── */}
      <rect
        x="30"
        y="2"
        width="140"
        height="85"
        rx="18"
        fill="url(#sd-badge)"
        filter="url(#sd-shadow)"
      />

      {/* ─── Lucide Shopping Cart icon ─── */}
      {/* Scaled ×3, centered in the badge */}
      <g
        transform="translate(100, 44.5) scale(3) translate(-12, -12)"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8" cy="21" r="1" fill="white" />
        <circle cx="19" cy="21" r="1" fill="white" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </g>

      {/* ─── "SokoDigital" Wordmark ─── */}
      <text
        x="100"
        y="138"
        textAnchor="middle"
        fontFamily="'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        fontSize="48"
        fontWeight="800"
        fill="url(#sd-wordmark)"
        letterSpacing="-0.8"
      >
        SokoDigital
      </text>

      {/* ─── "Modern Marketplace" Tagline ─── */}
      <text
        x="100"
        y="177"
        textAnchor="middle"
        fontFamily="'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        fontSize="24"
        fontWeight="500"
        fill="url(#sd-tagline)"
        letterSpacing="1.5"
      >
        Modern Marketplace
      </text>

      {/* ─── Polished underline accent ─── */}
      {/* Polished underline accent */}
      <circle cx="100" cy="198" r="4.5" fill="url(#sd-badge)" />
      {/* Subtle outer glow ring around the dot */}
      <circle
        cx="100"
        cy="198"
        r="6"
        fill="none"
        stroke="url(#sd-badge)"
        strokeWidth="1"
        opacity="0.3"
      />
    </svg>
  );
}
