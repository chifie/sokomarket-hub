import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

/**
 * SokoDigital Logo — Premium hand-crafted SVG.
 *
 * Massive shopping trolley badge (top) → bold "SokoDigital" (middle)
 * → "Modern Marketplace" tagline (bottom).
 *
 * Designed to be LARGE and very visible — scales naturally via className.
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
      viewBox="0 0 200 190"
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

      {/* ─── Massive Shopping Trolley Badge ─── */}
      <rect x="25" y="2" width="150" height="100" rx="20" fill="url(#sd-badge)" />

      {/* Trolley basket body — wider at top, narrower at bottom (like a real trolley) */}
      <path
        d="M42,40 L48,82 C48,86 52,88 56,88 L144,88 C148,88 152,86 152,82 L158,40 Z"
        fill="white"
      />

      {/* Trolley grid lines (horizontal) */}
      <path d="M48,55 L152,55" fill="none" stroke="url(#sd-badge)" strokeWidth="3" strokeLinecap="round" />
      <path d="M49,68 L151,68" fill="none" stroke="url(#sd-badge)" strokeWidth="2.5" strokeLinecap="round" />

      {/* Left wheel — large */}
      <circle cx="72" cy="92" r="8" fill="white" />
      {/* Left wheel inner hub */}
      <circle cx="72" cy="92" r="3" fill="url(#sd-badge)" />

      {/* Right wheel — large */}
      <circle cx="128" cy="92" r="8" fill="white" />
      {/* Right wheel inner hub */}
      <circle cx="128" cy="92" r="3" fill="url(#sd-badge)" />

      {/* Trolley handle — thick arc */}
      <path
        d="M52,40 C52,18 68,6 100,6 C132,6 148,18 148,40"
        fill="none"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Handle grip detail */}
      <path
        d="M88,10 C88,6 94,4 100,4 C106,4 112,6 112,10"
        fill="none"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Digital accent dot on handle */}
      <circle cx="100" cy="6" r="3.5" fill="white" opacity="0.9" />

      {/* ─── Wordmark ─── */}
      <text
        x="100"
        y="140"
        textAnchor="middle"
        fontFamily="'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        fontSize="38"
        fontWeight="800"
        fill="#111827"
        letterSpacing="-0.5"
      >
        SokoDigital
      </text>

      {/* ─── Tagline ─── */}
      <text
        x="100"
        y="168"
        textAnchor="middle"
        fontFamily="'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        fontSize="19"
        fontWeight="600"
        fill="#6B7280"
        letterSpacing="3.5"
      >
        Modern Marketplace
      </text>

      {/* Decorative orange underline accent */}
      <circle cx="100" cy="182" r="4.5" fill="url(#sd-badge)" />
    </svg>
  );
}
