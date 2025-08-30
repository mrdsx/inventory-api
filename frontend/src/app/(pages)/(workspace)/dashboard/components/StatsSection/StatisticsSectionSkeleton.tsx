import { Skeleton } from "@/components/ui";
import "./statistic-card.css";

export function StatisticsSectionSkeleton({
  childrenCount,
}: {
  childrenCount: number;
}) {
  return (
    <>
      {new Array(childrenCount).fill(null).map((_) => (
        <div className="card stats-card">
          <Skeleton className="h-4 w-30" />
          <Skeleton className="h-4 w-30" />
        </div>
      ))}
    </>
  );
}
