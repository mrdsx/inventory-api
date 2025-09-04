import { Skeleton } from "@/components/ui";

export function SupplierInfoSkeleton() {
  return (
    <div className="card grid gap-2">
      <Skeleton className="h-4 w-50" />
      <Skeleton className="h-4 w-50" />
      <Skeleton className="h-4 w-50" />
    </div>
  );
}
