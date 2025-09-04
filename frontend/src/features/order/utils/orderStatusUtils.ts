import { ORDER_STATUS } from "../constants";

const { CANCELED, DELIVERED, IN_TRANSIT } = ORDER_STATUS;

const OrderStatusClassNames: Record<ORDER_STATUS, string> = {
  [CANCELED]: "text-red-800 bg-red-300/50 dark:bg-red-300/80",
  [DELIVERED]: "text-green-800 bg-green-300/50 dark:bg-green-300/80",
  [IN_TRANSIT]: "text-blue-800 bg-blue-300/50 dark:bg-blue-300/80",
};

export function getOrderStatusClassName(status: ORDER_STATUS): string {
  return OrderStatusClassNames[status] || "";
}
