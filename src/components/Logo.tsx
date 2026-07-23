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
      </defs>

      {/* ─── Icon badge ─── */}
      <rect x="2" y="2" width="56" height="56" rx="14" fill="url(#sd-badge)" />

      {/* Shopping bag body — rounded bottom, slight opening at top */}
      <path
        d="M19,27 L19,43 C19,45.2 20.8,47 23,47 L37,47 C39.2,47 41,45.2 41,43 L41,27 Z"
        fill="white"
      />
      {/* Bag opening crease */}
      <path
        d="M19,27 C19,24 22,23 30,23 C38,23 41,24 41,27"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Left handle */}
      <path
        d="M23,24 C23,16 25.5,13 28,13 C30.5,13 33,16 33,24"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Right handle */}
      <path
        d="M37,24 C37,18.5 38.5,16 40,16 C41.5,16 43,18 43,20.5"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Connecting arc — forms an 'S' curve across both handles */}
      <path
        d="M29,22 C29,19 31,17 33,17 C35,17 37,19 37,22"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Accent dots — digital nodes in a clean diagonal line */}
      <circle cx="23" cy="34" r="2" fill="white" opacity="0.9" />
      <circle cx="28" cy="38" r="2" fill="white" opacity="0.7" />
      <circle cx="33" cy="34" r="2" fill="white" opacity="0.9" />

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

      {/* Decorative orange underline accent */}
      <circle cx="144" cy="54" r="3" fill="url(#sd-badge)" />
    </svg>
  );
}
