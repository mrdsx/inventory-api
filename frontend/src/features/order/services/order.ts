import {
  apiClient,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  ENDPOINTS,
} from "@/app/lib";
import { PaginatedOrdersResponse } from "../types";

export async function getOrders(
  page: number = DEFAULT_PAGE,
  itemsPerPage: number = DEFAULT_PAGE_SIZE,
) {
  return await apiClient<PaginatedOrdersResponse>(
    `${ENDPOINTS.orders}?page=${page}&size=${itemsPerPage}`,
  );
}

export async function getRecentOrders() {
  return await apiClient<PaginatedOrdersResponse>(
    `${ENDPOINTS.orders}?order_by_recent=true&limit=${DEFAULT_PAGE_SIZE}&size=${DEFAULT_PAGE_SIZE}`,
  );
}
