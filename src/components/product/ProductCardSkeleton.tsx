import { cn } from "@/lib/utils";

interface Props {
  featured?: boolean;
}

export function ProductCardSkeleton({ featured = false }: Props) {
  return (
    <div className={cn(
      "overflow-hidden rounded-2xl border border-border/50 bg-card",
      featured && "lg:col-span-2 lg:row-span-2"
    )}>
      <div className={cn("bg-muted animate-pulse", featured ? "aspect-[4/3]" : "aspect-square")} />
      <div className="p-4 space-y-3">
        <div className="h-3 w-24 bg-muted rounded animate-pulse" />
        <div className="h-4 w-full bg-muted rounded animate-pulse" />
        <div className="h-3 w-32 bg-muted rounded animate-pulse" />
        <div className="h-5 w-20 bg-muted rounded animate-pulse" />
        <div className="h-3 w-28 bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
}
