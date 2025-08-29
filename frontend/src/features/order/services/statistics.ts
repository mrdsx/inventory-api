import { StatisticsItem } from "@/app/lib";
import { ORDER_STATUS } from "../constants";
import { fetchOrdersCount } from "./ordersCount";

export async function fetchOrdersStatistics(): Promise<StatisticsItem[]> {
  const [ordersCount, canceledOrdersCount, pendingOrdersCount] =
    await Promise.all([
      fetchOrdersCount(),
      fetchOrdersCount(ORDER_STATUS.CANCELED),
      fetchOrdersCount(ORDER_STATUS.IN_TRANSIT),
    ]);

  return [
    { title: "Total Order", value: ordersCount.orders_count },
    { title: "Total Sales", value: 0 },
    { title: "Total Canceled", value: canceledOrdersCount.orders_count },
    { title: "Total In Transit", value: pendingOrdersCount.orders_count },
  ];
}
