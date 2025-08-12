import { apiClient, ENDPOINTS, StatisticsItem } from "@/app/lib";
import { OrdersCountResponse } from "../types";

export async function getOrdersStatistics(): Promise<StatisticsItem[]> {
  const ordersCount = await apiClient<OrdersCountResponse>(
    `${ENDPOINTS.orders}?count=true`,
  );
  const canceledOrdersCount = await apiClient<OrdersCountResponse>(
    `${ENDPOINTS.orders}?count=true&status=Canceled`,
  );
  const pendingOrdersCount = await apiClient<OrdersCountResponse>(
    `${ENDPOINTS.orders}?count=true&status=In Transit`,
  );

  const statisticsData = [
    { title: "Total Order", value: ordersCount.orders_count },
    { title: "Total Sales", value: 0 },
    { title: "Total Canceled", value: canceledOrdersCount.orders_count },
    { title: "Total In Transit", value: pendingOrdersCount.orders_count },
  ];

  return statisticsData;
}
