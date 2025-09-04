import { StatisticsItem } from "@/app/lib";
import { ORDER_STATUS } from "../constants";
import { fetchOrdersCount } from "./ordersCount";

const { CANCELED, IN_TRANSIT } = ORDER_STATUS;

export async function fetchOrdersStatistics(): Promise<StatisticsItem[]> {
  const [ordersCount, canceledOrdersCount, pendingOrdersCount] =
    await Promise.all([
      fetchOrdersCount(),
      fetchOrdersCount(CANCELED),
      fetchOrdersCount(IN_TRANSIT),
    ]);

  return [
    { title: "Total Order", value: ordersCount.orders_count },
    { title: "Total Sales", value: 0 },
    { title: "Total Canceled", value: canceledOrdersCount.orders_count },
    { title: "Total In Transit", value: pendingOrdersCount.orders_count },
  ];
}
