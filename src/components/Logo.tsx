import { useRef } from "react";
import { cn } from "@/lib/utils";
import logoSrc from "@/assets/logo_brand.png";

interface LogoProps {
  className?: string;
}

/**
 * SokoDigital Logo — rendered from the brand PNG asset.
 *
 * The image is wrapped in a responsive container and uses
 * object-contain to preserve the logo's aspect ratio.
 */
export function Logo({ className }: LogoProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <img
      ref={imgRef}
      src={logoSrc}
      alt="SokoDigital"
      className={cn("h-9 w-auto shrink-0 object-contain", className)}
      loading="eager"
    />
  );
}

