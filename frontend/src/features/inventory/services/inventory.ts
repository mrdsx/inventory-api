import { apiClient, ENDPOINTS } from "@/app/lib";
import { PaginatedInventoryItemsResponse } from "../types";

export async function getInventoryItems(
  page: number,
  itemsPerPage: number,
): Promise<PaginatedInventoryItemsResponse> {
  return await apiClient<PaginatedInventoryItemsResponse>(
    `${ENDPOINTS.inventory_items}?page=${page}&size=${itemsPerPage}`,
    { errorMessage: "Failed to fetch orders" },
  );
}
