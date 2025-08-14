import { apiClient, ENDPOINTS } from "@/app/lib";
import { PaginatedOrdersResponse } from "../types";

export async function getPaginatedOrders(
  page: number = 1,
  itemsPerPage: number = 10,
) {
  return await apiClient<PaginatedOrdersResponse>(
    `${ENDPOINTS.orders}?page=${page}&size=${itemsPerPage}`,
  );
}

export async function getRecentOrders() {
  return await apiClient<PaginatedOrdersResponse>(
    `${ENDPOINTS.orders}?order_by_recent=true&limit=10`,
  );
}
