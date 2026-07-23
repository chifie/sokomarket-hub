import { cn } from "@/lib/utils";
import logoSrc from "@/assets/logo_brand.png";

interface LogoProps {
  className?: string;
}

/**
 * SokoDigital Logo — rendered from the brand PNG asset.
 *
 * The image uses object-contain to preserve the logo's aspect ratio
 * and eager loading since it's above the fold.
 */
export function Logo({ className }: LogoProps) {
  return (
    <img
      src={logoSrc}
      alt="SokoDigital"
      className={cn("h-9 w-auto shrink-0 object-contain", className)}
      loading="eager"
    />
  );
}

