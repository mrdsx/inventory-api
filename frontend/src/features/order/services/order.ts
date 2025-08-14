import { apiClient, ENDPOINTS, PAGE_SIZE } from "@/app/lib";
import { PaginatedOrdersResponse } from "../types";

export async function getOrders(
  page: number = 1,
  itemsPerPage: number = PAGE_SIZE,
) {
  return await apiClient<PaginatedOrdersResponse>(
    `${ENDPOINTS.orders}?page=${page}&size=${itemsPerPage}`,
  );
}

export async function getRecentOrders() {
  return await apiClient<PaginatedOrdersResponse>(
    `${ENDPOINTS.orders}?order_by_recent=true&limit=${PAGE_SIZE}`,
  );
}
