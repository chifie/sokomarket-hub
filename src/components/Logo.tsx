import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  variant?: "default" | "gradient" | "mono";
}

/**
 * SokoDigital Logo — Premium React SVG component.
 *
 * The icon uses an orange gradient (primary → secondary) for a premium brand look,
 * while the wordmark adapts to its background via currentColor.
 */
export function Logo({ className, showTagline = false, variant = "default" }: LogoProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(
        svgRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
      // Subtle draw-in animation for the icon paths
      const paths = svgRef.current?.querySelectorAll(".logo-icon-path");
      if (paths?.length) {
        gsap.fromTo(
          paths,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)", stagger: 0.12, delay: 0.15 }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const isGradient = variant === "gradient";

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1280 1024"
      className={cn("h-9 w-auto shrink-0", className)}
      aria-label="SokoDigital"
    >
      <defs>
        <linearGradient id="logoIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.80 0.17 68)" /> {/* primary orange */}
          <stop offset="100%" stopColor="oklch(0.70 0.20 65)" /> {/* secondary darker orange */}
        </linearGradient>
        <linearGradient id="logoTextGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.21 0.02 260)" /> {/* dark text */}
          <stop offset="100%" stopColor="oklch(0.35 0.02 260)" />
        </linearGradient>
        <filter id="logoShadow">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* ── Icon mark (the S-curve with two dots) ── */}
      <g filter={isGradient ? "url(#logoShadow)" : undefined}>
        <g transform="matrix(1.921 0 0 1.921 611.87 400.29)">
          <g>
            <g transform="matrix(0.2153 0 0 -0.2153 0 -25.97)">
              <path
                className="logo-icon-path"
                fill={isGradient ? "url(#logoIconGrad)" : "currentColor"}
                d="M404.2 895.1c2.08 12.79 14.09 21.64 27.04 21.64h686.82c20.17 0 38.73 11 48.41 28.68 20.15 36.79-6.47 81.72-48.41 81.72H367.94c-14.57 0-27.63 9-32.82 22.62l-59.88 157.17c-9.86 25.9-34.7 43.01-62.4 43.01H65.02c-40.72 0-71.3-33.3-63.92-73.34 5.56-30.13 31.6-51.17 61.27-51.17h76.27c14.53 0 27.55-8.94 32.78-22.49l187.99-487.99c5.22-13.55 18.25-22.5 32.77-22.5h548.34c20.12 0 38.63 10.97 48.3 28.61 20.09 36.7-6.46 81.52-48.3 81.52H496.78c-12.96 0-24.97 8.85-27.05 21.64-2.65 16.29 9.86 30.37 25.66 30.37h533.93c20.12 0 38.63 10.97 48.3 28.61 20.09 36.7-6.46 81.52-48.3 81.52H429.86c-15.8 0-28.3 14.08-25.65 30.38z"
              />
            </g>
            <g transform="matrix(0.2153 0 0 -0.2153 -22.61 78.88)">
              <path
                className="logo-icon-path"
                fill={isGradient ? "url(#logoIconGrad)" : "currentColor"}
                d="M481.66 166.01c-45.84 0-83-37.17-83-83.01 0-45.84 37.16-83 83-83 45.85 0 83.01 37.16 83.01 83 0 45.84-37.16 83.01-83.01 83.01z"
              />
            </g>
            <g transform="matrix(0.2153 0 0 -0.2153 64.87 78.88)">
              <path
                className="logo-icon-path"
                fill={isGradient ? "url(#logoIconGrad)" : "currentColor"}
                d="M887.95 166.01c-45.84 0-83-37.17-83-83.01 0-45.84 37.16-83 83-83 45.84 0 83.01 37.16 83.01 83 0 45.84-37.17 83.01-83.01 83.01z"
              />
            </g>
          </g>
        </g>
      </g>

      {/* ── "SokoDigital" wordmark ── */}
      <g transform="matrix(1.921 0 0 1.921 640.46 683.73)">
        <path
          fill={isGradient ? "url(#logoTextGrad)" : "currentColor"}
          d="M12.56.37c7.16 0 12.19-3.66 12.19-11.13 0-5.14-2.54-7.95-10.55-12.45-1.85-1.06-2.91-2.28-2.91-3.45.05-1.22 1.01-1.96 2.6-1.96 1.27 0 2.33.58 3.28 1.43 2.17 1.91 3.29 1.91 5.04.21l.9-.9c2.01-1.96 2.07-3.71.16-5.3-2.71-2.22-6.1-3.28-9.81-3.28-6.46 0-11.08 3.12-11.08 9.96 0 5.19 2.66 8.43 9.86 12.35 2.71 1.48 3.61 2.28 3.61 3.87 0 1.8-1.01 2.81-2.76 2.81-1.75 0-3.66-.59-5.3-1.49-2.54-1.43-3.6-1.27-4.98.75l-.74 1.06c-1.59 2.33-1.33 4.02.9 5.19 2.91 1.59 6.57 2.33 9.59 2.33zM46 .42c11.08 0 18.45-7.36 18.45-18.44S57.08-36.46 46-36.46C34.93-36.46 27.56-29.1 27.56-18.02 27.56-6.94 34.93.42 46 .42zm0-8.69c-5.24 0-8.69-3.87-8.69-9.8 0-5.83 3.45-9.7 8.69-9.7s8.7 3.87 8.7 9.7c0 5.93-3.46 9.8-8.7 9.8zm46.54 8.27h3.87c2.59 0 3.07-.79 1.59-2.97L86.87-18.92l10.01-14.15c1.54-2.12 1.06-2.97-1.53-2.97h-3.13c-2.6 0-4.19.9-5.62 3.07l-8.43 12.94V-32.38c0-2.65-1-3.66-3.65-3.66h-2.33c-2.65 0-3.66 1.01-3.66 3.66V-3.66c0 2.65 1.01 3.66 3.66 3.66h2.33c2.65 0 3.65-1.01 3.65-3.66v-10.01l.43-.64 8.16 11.34c1.54 2.12 3.18 2.97 5.78 2.97zm24.43.42c11.08 0 18.44-7.36 18.44-18.44S128.05-36.46 116.97-36.46C105.89-36.46 98.53-29.1 98.53-18.02 98.53-6.94 105.89.42 116.97.42zm0-8.69c-5.25 0-8.69-3.87-8.69-9.8 0-5.83 3.44-9.7 8.69-9.7s8.69 3.87 8.69 9.7c0 5.93-3.44 9.8-8.69 9.8zm26.18 8.27h12.03c9.86 0 16.43-7.15 16.43-18.02 0-10.86-6.67-18.02-16.64-18.02h-11.82c-2.65 0-3.65 1.01-3.65 3.66V-3.66c0 2.65 1 3.66 3.65 3.66zm5.99-8.59V-27.45h5.14c4.56 0 7.58 3.65 7.58 9.43 0 5.78-3.07 9.43-7.74 9.43zm30.21 8.59h2.33c2.65 0 3.66-1.01 3.66-3.66V-32.38c0-2.65-1.01-3.66-3.66-3.66h-2.33c-2.65 0-3.66 1.01-3.66 3.66V-3.66c0 2.65 1.01 3.66 3.66 3.66zm28.73.42c5.56 0 10.17-1.9 13.35-5.24 1.59-1.65 2.18-3.5 2.18-6.57v-5.52c0-2.59-1.06-3.65-3.66-3.65h-10.49c-2.6 0-3.66 1.06-3.66 3.65v.75c0 2.59 1.06 3.65 3.66 3.65h4.98v1.86c-1.59 1.53-3.92 2.38-6.68 2.38-5.19 0-8.59-3.87-8.59-9.8 0-5.83 3.45-9.7 8.7-9.7 2.59 0 4.66 1.11 6.36 2.65 2.06 1.91 3.28 1.96 5.14.37l1.48-1.22c2.12-1.8 2.28-3.44.53-5.25-3.23-3.34-7.9-5.24-13.51-5.24-11.08 0-18.45 7.36-18.45 18.44 0 11.08 7.42 18.44 18.66 18.44z"
        />
      </g>
    </svg>
  );
}
