import { Link } from "react-router";
import { Logo } from "@/components/Logo";

export function LogoDropdown() {
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0 group">
      <Logo className="h-8 w-auto text-primary" />
      <span className="text-lg font-bold tracking-tight">
        Soko<span className="text-primary font-light">Digital</span>
      </span>
    </Link>
  );
}
