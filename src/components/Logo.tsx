import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

/**
 * SokoDigital Logo — Premium hand-crafted SVG.
 *
 * Features a rounded badge with a shopping-bag icon (orange gradient)
 * paired with the "Soko" + "Digital" wordmark.
 * A subtle entrance animation fades and scales the logo in on mount.
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
      viewBox="0 0 232 60"
      className={cn("h-9 w-auto shrink-0", className)}
      fill="none"
      aria-label="SokoDigital"
    >
      <defs>
        <linearGradient id="sd-badge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id="sd-accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>

      {/* ─── Icon badge ─── */}
      <rect x="2" y="2" width="56" height="56" rx="14" fill="url(#sd-badge)" />

      {/* Shopping bag body */}
      <path
        d="M18,24 L18,43 C18,45.5 20,47.5 22.5,47.5 L37.5,47.5 C40,47.5 42,45.5 42,43 L42,24 Z"
        fill="white"
      />

      {/* Left handle — curves up and forms an 'S' hint */}
      <path
        d="M22.5,24 C22.5,16 25,13 28,13 C31,13 33.5,16 33.5,24"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right handle — shorter, gives asymmetry */}
      <path
        d="M35.5,24 C35.5,19 37,17 39,17 C40.5,17 41.5,18.5 41.5,21"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Small accent dot on the bag (digital node) */}
      <circle cx="24" cy="33" r="2" fill="url(#sd-accent)" />
      <circle cx="30" cy="39" r="2" fill="url(#sd-accent)" />
      <circle cx="36" cy="33" r="2" fill="url(#sd-accent)" />

      {/* ─── Wordmark ─── */}
      <text
        x="70"
        y="34"
        fontFamily="'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        fontSize="22"
        fontWeight="800"
        fill="#111827"
        letterSpacing="-0.5"
      >
        Soko
      </text>
      <text
        x="70"
        y="50"
        fontFamily="'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        fontSize="11"
        fontWeight="600"
        fill="#6B7280"
        letterSpacing="3"
      >
        DIGITAL
      </text>

      {/* Decorative orange underline dot under wordmark */}
      <circle cx="144" cy="54" r="3" fill="url(#sd-badge)" />
    </svg>
  );
}
