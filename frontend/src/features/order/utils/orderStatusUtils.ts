import { ORDER_STATUS } from "../constants";

export function getOrderStatusTableCellStyles(status: ORDER_STATUS): string {
  switch (status) {
    case ORDER_STATUS.CANCELED:
      return "text-red-800 bg-red-300/50 dark:bg-red-300/80";
    case ORDER_STATUS.DELIVERED:
      return "text-green-800 bg-green-300/50 dark:bg-green-300/80";
    case ORDER_STATUS.IN_TRANSIT:
      return "text-blue-800 bg-blue-300/50 dark:bg-blue-300/80";
    default:
      return "";
  }
}
