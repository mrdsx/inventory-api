import { StatisticsItem } from "@/app/lib";
import { ORDER_STATUS } from "../constants";
import { getOrdersCount } from "./ordersCount";

export async function getOrdersStatistics(): Promise<StatisticsItem[]> {
  const [ordersCount, canceledOrdersCount, pendingOrdersCount] =
    await Promise.all([
      getOrdersCount(),
      getOrdersCount(ORDER_STATUS.CANCELED),
      getOrdersCount(ORDER_STATUS.IN_TRANSIT),
    ]);

  return [
    { title: "Total Order", value: ordersCount.orders_count },
    { title: "Total Sales", value: 0 },
    { title: "Total Canceled", value: canceledOrdersCount.orders_count },
    { title: "Total In Transit", value: pendingOrdersCount.orders_count },
  ];
}
