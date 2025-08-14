import { Skeleton } from "@/components/ui";

export function StatsSectionSkeleton({
  childrenCount,
}: {
  childrenCount: number;
}) {
  return (
    <>
      {new Array(childrenCount).fill(null).map((_) => (
        <div className="card flex h-25 flex-col justify-evenly gap-2">
          <Skeleton className="h-4 w-30" />
          <Skeleton className="h-4 w-30" />
        </div>
      ))}
    </>
  );
}
