import { apiClient, ENDPOINTS } from "@/app/lib";
import { OrderResponse, PaginatedOrdersResponse } from "../types";

export async function getOrders() {
  return await apiClient<OrderResponse[]>("/orders");
}

export async function getPaginatedOrders() {
  return await apiClient<PaginatedOrdersResponse>("/paginated-orders");
}

export async function getRecentOrders() {
  return await apiClient<OrderResponse[]>(
    `${ENDPOINTS.orders}?order_by_recent=true`,
  );
}
