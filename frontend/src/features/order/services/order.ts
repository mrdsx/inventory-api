import { apiClient, DEFAULT_PAGE_SIZE, ENDPOINTS } from "@/app/lib";
import { PaginatedOrdersResponse } from "../types";

export async function getOrders(
  page: number,
  itemsPerPage: number,
): Promise<PaginatedOrdersResponse> {
  return await apiClient<PaginatedOrdersResponse>(
    `${ENDPOINTS.orders}?page=${page}&size=${itemsPerPage}`,
    { errorMessage: "Failed to fetch orders" },
  );
}

export async function getRecentOrders(): Promise<PaginatedOrdersResponse> {
  return await apiClient<PaginatedOrdersResponse>(
    `${ENDPOINTS.orders}?order_by_recent=true&limit=${DEFAULT_PAGE_SIZE}&size=${DEFAULT_PAGE_SIZE}`,
    { errorMessage: "Failed to fetch recent orders" },
  );
}
