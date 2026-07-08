import { Link } from "react-router";
import { Package } from "lucide-react";

export function LogoDropdown() {
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0 group">
      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200">
        <Package className="h-4 w-4 text-white" />
      </div>
      <span className="text-lg font-bold tracking-tight">
        Soko<span className="text-primary font-light">Digital</span>
      </span>
    </Link>
  );
}
