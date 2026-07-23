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

      {/* ─── Refined Shopping Trolley ─── */}

      {/* Basket body — wider at top, narrower at the base (classic trolley silhouette) */}
      <path
        d="M44,36 L50,72 C50,76 54,78 60,78 L140,78 C146,78 150,76 150,72 L156,36 Z"
        fill="white"
      />

      {/* Horizontal grid line 1 */}
      <path
        d="M50,52 L150,52"
        fill="none"
        stroke="url(#sd-badge)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Horizontal grid line 2 */}
      <path
        d="M51,64 L149,64"
        fill="none"
        stroke="url(#sd-badge)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Left wheel */}
      <circle cx="72" cy="82" r="7.5" fill="white" />
      {/* Left wheel inner hub */}
      <circle cx="72" cy="82" r="2.8" fill="url(#sd-badge)" />

      {/* Right wheel */}
      <circle cx="128" cy="82" r="7.5" fill="white" />
      {/* Right wheel inner hub */}
      <circle cx="128" cy="82" r="2.8" fill="url(#sd-badge)" />

      {/* Handle — a sweeping, elegant arc */}
      <path
        d="M54,36 C54,16 70,5 100,5 C130,5 146,16 146,36"
        fill="none"
        stroke="white"
        strokeWidth="5.5"
        strokeLinecap="round"
      />

      {/* Handle grip — delicate inner arc detail */}
      <path
        d="M87,10 C87,6 93,4 100,4 C107,4 113,6 113,10"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* Accent dot on handle */}
      <circle cx="100" cy="6" r="3" fill="white" opacity="0.85" />

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
      <circle cx="100" cy="198" r="4.5" fill="url(#sd-badge)" />
      {/* Subtle outer glow ring around the dot */}
      <circle
        cx="100"
        cy="198"
        r="4.5"
        fill="none"
        stroke="url(#sd-badge)"
        strokeWidth="1"
        opacity="0.35"
        transform="scale(1.35) translate(-26.2, -52.2)"
      />
    </svg>
  );
}
