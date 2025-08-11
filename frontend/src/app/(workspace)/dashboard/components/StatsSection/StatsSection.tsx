import { apiClient, ENDPOINTS } from "@/app/lib";
import { OrdersCountResponse } from "@/features/order";
import { Suspense } from "react";
import { StatsCard } from "./StatsCard";
import { StatsSectionSkeleton } from "./StatsSectionSkeleton";

const statsData = [
  { title: "Total Order", value: 1000 },
  { title: "Total Sales", value: 0 },
  { title: "Total Canceled", value: 0 },
  { title: "Total In Transit", value: 0 },
];

export async function StatsSection() {
  const ordersCount: OrdersCountResponse = await apiClient(
    `${ENDPOINTS.orders}?count=true`,
  );
  const canceledOrdersCount: OrdersCountResponse = await apiClient(
    `${ENDPOINTS.orders}?count=true&status=Canceled`,
  );
  const pendingOrdersCount: OrdersCountResponse = await apiClient(
    `${ENDPOINTS.orders}?count=true&status=Canceled`,
  );

  statsData[0].value = ordersCount.orders_count;
  statsData[2].value = canceledOrdersCount.orders_count;
  statsData[3].value = pendingOrdersCount.orders_count;

  return (
    <div className="grid grid-cols-4 gap-4">
      <Suspense
        fallback={<StatsSectionSkeleton childrenCount={statsData.length} />}
      >
        {statsData.map((stats, index) => (
          <StatsCard stats={stats} key={stats.title + index} />
        ))}
      </Suspense>
    </div>
  );
}
