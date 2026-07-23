import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

/**
 * SokoDigital Logo — Premium hand-crafted SVG.
 *
 * Vertical layout: Large shopping cart badge (top) → bold "SokoDigital"
 * (middle) → "Modern Marketplace" tagline (bottom).
 *
 * Designed to be visible and responsive — scales naturally via className.
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
      viewBox="0 0 200 150"
      className={cn("h-14 w-auto shrink-0", className)}
      fill="none"
      aria-label="SokoDigital"
    >
      <defs>
        <linearGradient id="sd-badge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
      </defs>

      {/* ─── Large Shopping Cart Badge ─── */}
      <rect x="60" y="2" width="80" height="68" rx="16" fill="url(#sd-badge)" />

      {/* Cart basket body — wider trapezoid */}
      <path
        d="M78,28 L75,56 C75,59 78,61.5 81,61.5 L119,61.5 C122,61.5 125,59 125,56 L122,28 Z"
        fill="white"
      />

      {/* Cart divider line (basket grid detail) */}
      <path
        d="M76,44 L124,44"
        fill="none"
        stroke="url(#sd-badge)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Left wheel */}
      <circle cx="86" cy="64" r="5" fill="white" />

      {/* Right wheel */}
      <circle cx="114" cy="64" r="5" fill="white" />

      {/* Cart handle — arcs up */}
      <path
        d="M83,28 C83,16 89,11 100,11 C111,11 117,16 117,28"
        fill="none"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* Accent dot on handle */}
      <circle cx="100" cy="11" r="3" fill="white" opacity="0.85" />

      {/* ─── Wordmark ─── */}
      <text
        x="100"
        y="110"
        textAnchor="middle"
        fontFamily="'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        fontSize="36"
        fontWeight="800"
        fill="#111827"
        letterSpacing="-0.5"
      >
        SokoDigital
      </text>

      {/* ─── Tagline ─── */}
      <text
        x="100"
        y="133"
        textAnchor="middle"
        fontFamily="'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        fontSize="18"
        fontWeight="600"
        fill="#6B7280"
        letterSpacing="3"
      >
        Modern Marketplace
      </text>

      {/* Decorative orange underline accent */}
      <circle cx="100" cy="145" r="4" fill="url(#sd-badge)" />
    </svg>
  );
}
