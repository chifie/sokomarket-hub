import { cn } from "@/lib/utils";
import logoSrc from "@/assets/logo_brand.png";
import logoWebp from "@/assets/logo_brand.webp";

interface LogoProps {
  className?: string;
}

/**
 * SokoDigital Logo — rendered from the brand PNG/WebP asset.
 *
 * Uses WebP with a PNG fallback for maximum browser compatibility.
 * The image uses object-contain to preserve the logo's aspect ratio
 * and eager loading since it's above the fold.
 */
export function Logo({ className }: LogoProps) {
  return (
    <picture>
      <source type="image/webp" srcSet={logoWebp} />
      <img
        src={logoSrc}
        alt="SokoDigital"
        className={cn("h-9 w-auto shrink-0 object-contain", className)}
        loading="eager"
      />
    </picture>
  );
}

