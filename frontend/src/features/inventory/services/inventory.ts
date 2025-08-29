import { apiClient, ENDPOINTS } from "@/app/lib";
import { PaginatedInventoryItemsResponse } from "../types";

const { inventory_items } = ENDPOINTS;

export async function fetchInventoryItems(
  page: number,
  itemsPerPage: number,
): Promise<PaginatedInventoryItemsResponse> {
  return await apiClient<PaginatedInventoryItemsResponse>(
    `${inventory_items}?page=${page}&size=${itemsPerPage}`,
    { errorMessage: "Failed to fetch orders" },
  );
}
