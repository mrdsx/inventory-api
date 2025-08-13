import { apiClient, ENDPOINTS } from "@/app/lib";
import { OrderResponse, PaginatedOrdersResponse } from "../types";

export async function getOrders() {
  return await apiClient<OrderResponse[]>("/orders");
}

export async function getPaginatedOrders(
  page: number = 1,
  itemsPerPage: number = 10,
) {
  return await apiClient<PaginatedOrdersResponse>(
    `/paginated-orders?page=${page}&limit=${itemsPerPage}`,
  );
}

export async function getRecentOrders() {
  return await apiClient<PaginatedOrdersResponse>(
    `${ENDPOINTS.orders}?order_by_recent=true`,
  );
}
