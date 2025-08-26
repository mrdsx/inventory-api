import { apiClient, ENDPOINTS } from "@/app/lib";
import { ORDER_STATUS } from "../constants";
import { OrdersCountResponse } from "../types";

export async function getOrdersCount(
  status?: ORDER_STATUS,
): Promise<OrdersCountResponse> {
  if (status !== undefined) {
    return await apiClient<OrdersCountResponse>(
      `${ENDPOINTS.orders}?count=true&status=${status}`,
      { errorMessage: "Failed to fetch orders count" },
    );
  }
  return await apiClient<OrdersCountResponse>(
    `${ENDPOINTS.orders}?count=true`,
    { errorMessage: "Failed to fetch orders count" },
  );
}
