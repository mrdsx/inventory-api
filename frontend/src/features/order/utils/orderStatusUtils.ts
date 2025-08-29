import { ORDER_STATUS } from "../constants";

const OrderStatusClassNames: Record<string, string> = {
  [ORDER_STATUS.CANCELED]: "text-red-800 bg-red-300/50 dark:bg-red-300/80",
  [ORDER_STATUS.DELIVERED]:
    "text-green-800 bg-green-300/50 dark:bg-green-300/80",
  [ORDER_STATUS.IN_TRANSIT]: "text-blue-800 bg-blue-300/50 dark:bg-blue-300/80",
};

export function getOrderStatusClassName(status: ORDER_STATUS): string {
  return OrderStatusClassNames[status] || "";
}
