import { cn } from "@/lib/utils";

interface Props {
  featured?: boolean;
}

export function ProductCardSkeleton({ featured = false }: Props) {
  return (
    <div className={cn(
      "overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm",
      featured && "lg:col-span-2 lg:row-span-2"
    )}>
      {/* Image shimmer */}
      <div className={cn(
        "relative overflow-hidden bg-muted",
        featured ? "aspect-[4/3]" : "aspect-square"
      )}>
        <div className="absolute inset-0 shimmer" />
      </div>
      {/* Content skeleton */}
      <div className="p-3 space-y-2.5">
        <div className="h-3 w-2/3 rounded-full shimmer" />
        <div className="h-3.5 w-full rounded-full shimmer" />
        <div className="h-3 w-1/2 rounded-full shimmer" />
        <div className="h-5 w-1/3 rounded-md shimmer" />
        <div className="flex gap-2 mt-3">
          <div className="flex-1 h-8 rounded-md shimmer" />
          <div className="flex-1 h-8 rounded-md shimmer" />
        </div>
      </div>
    </div>
  );
}
