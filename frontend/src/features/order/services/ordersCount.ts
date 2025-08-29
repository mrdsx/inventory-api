import { apiClient, ENDPOINTS } from "@/app/lib";
import { ORDER_STATUS } from "../constants";
import { OrdersCountResponse } from "../types";

const { orders } = ENDPOINTS;

export async function fetchOrdersCount(
  status?: ORDER_STATUS,
): Promise<OrdersCountResponse> {
  const fetchParams = status ? `count=true&status=${status}` : "count=true";

  return await apiClient<OrdersCountResponse>(`${orders}?${fetchParams}`, {
    errorMessage: "Failed to fetch orders count",
  });
}
