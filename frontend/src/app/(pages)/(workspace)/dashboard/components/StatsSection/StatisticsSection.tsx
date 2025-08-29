import { fetchOrdersStatistics } from "@/features/order";
import { Suspense } from "react";
import { StatisticCard } from "./StatisticCard";
import { StatisticsSectionSkeleton } from "./StatisticsSectionSkeleton";

export async function StatisticsSection() {
  const ordersStatistics = await fetchOrdersStatistics();

  return (
    <div className="grid grid-cols-4 gap-4">
      <Suspense
        fallback={
          <StatisticsSectionSkeleton childrenCount={ordersStatistics.length} />
        }
      >
        {ordersStatistics.map((statistic, index) => (
          <StatisticCard statistic={statistic} key={statistic.title + index} />
        ))}
      </Suspense>
    </div>
  );
}
