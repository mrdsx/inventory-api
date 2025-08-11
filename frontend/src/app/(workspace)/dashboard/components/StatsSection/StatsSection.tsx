import { apiClient, ENDPOINTS } from "@/app/lib";
import { OrdersCountResponse } from "@/features/order";
import { StatsCard } from "./StatsCard";

const statsData = [
  { title: "Total Order", value: 1000 },
  { title: "Total Sales", value: 0 },
  { title: "Total Canceled", value: "50" },
  { title: "Total Pending", value: "500" },
];

export async function StatsSection() {
  const ordersCount: OrdersCountResponse = await apiClient(
    `${ENDPOINTS.orders}?count=true`,
  );

  statsData[0].value = ordersCount.orders_count;

  return (
    <div className="grid grid-cols-4 gap-4">
      {statsData.map((stats, index) => (
        <StatsCard stats={stats} key={stats.title + index} />
      ))}
    </div>
  );
}
