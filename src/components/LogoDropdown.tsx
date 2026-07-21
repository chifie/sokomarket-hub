import { Link } from "react-router";
import { Logo } from "@/components/Logo";

export function LogoDropdown() {
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0 group">
      <Logo className="h-8 w-auto text-primary" />
    </Link>
  );
}
