import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

/**
 * SokoDigital Logo — Premium React SVG component.
 *
 * The icon uses an orange gradient (primary → secondary) for a premium brand look,
 * while the wordmark adapts to its background via currentColor.
 */
export function Logo({ className }: LogoProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        svgRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
      // Staggered draw-in for icon circles
      const dots = svgRef.current?.querySelectorAll(".logo-dot");
      if (dots?.length) {
        gsap.fromTo(
          dots,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)", stagger: 0.1, delay: 0.2 }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1280 1024"
      className={cn("h-9 w-auto shrink-0", className)}
      fill="currentColor"
      aria-label="SokoDigital"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.80 0.17 68)" />
          <stop offset="100%" stopColor="oklch(0.70 0.20 65)" />
        </linearGradient>
      </defs>

      {/* Icon mark */}
      <g transform="matrix(1.921 0 0 1.921 611.87 400.29)">
        <g>
          <g transform="matrix(0.2153 0 0 -0.2153 0 -25.97)">
            <path fill="url(#logoGrad)" d="M404.2 895.1c2.08 12.79 14.09 21.64 27.04 21.64h686.82c20.17 0 38.73 11 48.41 28.68 20.15 36.79-6.47 81.72-48.41 81.72H367.94c-14.57 0-27.63 9-32.82 22.62l-59.88 157.17c-9.86 25.9-34.7 43.01-62.4 43.01H65.02c-40.72 0-71.3-33.3-63.92-73.34 5.56-30.13 31.6-51.17 61.27-51.17h76.27c14.53 0 27.55-8.94 32.78-22.49l187.99-487.99c5.22-13.55 18.25-22.5 32.77-22.5h548.34c20.12 0 38.63 10.97 48.3 28.61 20.09 36.7-6.46 81.52-48.3 81.52H496.78c-12.96 0-24.97 8.85-27.05 21.64-2.65 16.29 9.86 30.37 25.66 30.37h533.93c20.12 0 38.63 10.97 48.3 28.61 20.09 36.7-6.46 81.52-48.3 81.52H429.86c-15.8 0-28.3 14.08-25.65 30.38z" />
          </g>
          <g transform="matrix(0.2153 0 0 -0.2153 -22.61 78.88)">
            <path className="logo-dot" fill="url(#logoGrad)" d="M481.66 166.01c-45.84 0-83-37.17-83-83.01 0-45.84 37.16-83 83-83 45.85 0 83.01 37.16 83.01 83 0 45.84-37.16 83.01-83.01 83.01z" />
          </g>
          <g transform="matrix(0.2153 0 0 -0.2153 64.87 78.88)">
            <path className="logo-dot" fill="url(#logoGrad)" d="M887.95 166.01c-45.84 0-83-37.17-83-83.01 0-45.84 37.16-83 83-83 45.84 0 83.01 37.16 83.01 83 0 45.84-37.17 83.01-83.01 83.01z" />
          </g>
        </g>
      </g>

      {/* SokoDigital wordmark */}
      <g transform="matrix(1.921 0 0 1.921 640.46 683.73)">
        <path d="M12.56.37c7.16 0 12.19-3.66 12.19-11.13 0-5.14-2.54-7.95-10.55-12.45-1.85-1.06-2.91-2.28-2.91-3.45.05-1.22 1.01-1.96 2.6-1.96 1.27 0 2.33.58 3.28 1.43 2.17 1.91 3.29 1.91 5.04.21l.9-.9c2.01-1.96 2.07-3.71.16-5.3-2.71-2.22-6.1-3.28-9.81-3.28-6.46 0-11.08 3.12-11.08 9.96 0 5.19 2.66 8.43 9.86 12.35 2.71 1.48 3.61 2.28 3.61 3.87 0 1.8-1.01 2.81-2.76 2.81-1.75 0-3.66-.59-5.3-1.49-2.54-1.43-3.6-1.27-4.98.75l-.74 1.06c-1.59 2.33-1.33 4.02.9 5.19 2.91 1.59 6.57 2.33 9.59 2.33zM46 .42c11.08 0 18.45-7.36 18.45-18.44S57.08-36.46 46-36.46C34.93-36.46 27.56-29.1 27.56-18.02 27.56-6.94 34.93.42 46 .42zm0-8.69c-5.24 0-8.69-3.87-8.69-9.8 0-5.83 3.45-9.7 8.69-9.7s8.7 3.87 8.7 9.7c0 5.93-3.46 9.8-8.7 9.8z" />
      </g>
    </svg>
  );
}
