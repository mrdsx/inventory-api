import {
  apiClient,
  BaseAPIResponse,
  DEFAULT_PAGE_SIZE,
  ENDPOINTS,
} from "@/app/lib";
import { Order, OrderResponse, PaginatedOrdersResponse } from "../types";

const { orders } = ENDPOINTS;

export async function postOrder(order: Order): Promise<BaseAPIResponse> {
  return await apiClient<BaseAPIResponse>(orders, {
    requestInit: {
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    },
    errorMessage: "Failed to create order",
  });
}

export async function fetchOrderById(id: number): Promise<OrderResponse> {
  return await apiClient<OrderResponse>(`${orders}/${id}`, {
    errorMessage: `Failed to fetch order #${id}`,
  });
}

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
