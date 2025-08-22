import { apiClient, ENDPOINTS } from "@/app/lib";
import { ORDER_STATUS } from "../constants";
import { OrdersCountResponse } from "../types";

export async function getOrdersCount(
  status?: ORDER_STATUS,
): Promise<OrdersCountResponse> {
  if (status !== undefined) {
    return await apiClient<OrdersCountResponse>(
      `${ENDPOINTS.orders}?count=true&status=${status}`,
    );
  }
  return await apiClient<OrdersCountResponse>(`${ENDPOINTS.orders}?count=true`);
}
