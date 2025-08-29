import { getOrdersStatistics } from "@/features/order";
import { Suspense } from "react";
import { StatisticsCard } from "./StatisticsCard";
import { StatisticsSectionSkeleton } from "./StatisticsSectionSkeleton";

export async function StatisticsSection() {
  const statisticsData = await getOrdersStatistics();

  return (
    <div className="grid grid-cols-4 gap-4">
      <Suspense
        fallback={
          <StatisticsSectionSkeleton childrenCount={statisticsData.length} />
        }
      >
        {statisticsData.map((stats, index) => (
          <StatisticsCard stats={stats} key={stats.title + index} />
        ))}
      </Suspense>
    </div>
  );
}
