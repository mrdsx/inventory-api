import { Skeleton } from "@/components/ui";

export function StatsSectionSkeleton({
  childrenCount,
}: {
  childrenCount: number;
}) {
  return (
    <>
      {new Array(childrenCount).fill(null).map((_) => (
        <div className="card grid gap-4 p-4">
          <Skeleton className="h-4 w-30" />
          <Skeleton className="h-4 w-30" />
        </div>
      ))}
    </>
  );
}
