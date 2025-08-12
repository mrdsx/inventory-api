import { apiClient, ENDPOINTS } from "@/app/lib";
import { OrderResponse } from "../types";

export async function getRecentOrders() {
  return await apiClient<OrderResponse[]>(
    `${ENDPOINTS.orders}?order_by_recent=true`,
  );
}
