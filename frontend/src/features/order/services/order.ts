import { apiClient, DEFAULT_PAGE_SIZE, ENDPOINTS } from "@/app/lib";
import { PaginatedOrdersResponse } from "../types";

const { orders } = ENDPOINTS;

export async function fetchOrders(
  page: number,
  itemsPerPage: number,
): Promise<PaginatedOrdersResponse> {
  return await apiClient<PaginatedOrdersResponse>(
    `${orders}?page=${page}&size=${itemsPerPage}`,
    { errorMessage: "Failed to fetch orders" },
  );
}

export async function fetchRecentOrders(): Promise<PaginatedOrdersResponse> {
  return await apiClient<PaginatedOrdersResponse>(
    `${orders}?order_by_recent=true&limit=${DEFAULT_PAGE_SIZE}&size=${DEFAULT_PAGE_SIZE}`,
    { errorMessage: "Failed to fetch recent orders" },
  );
}
