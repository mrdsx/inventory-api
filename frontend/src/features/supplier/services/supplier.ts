import { apiClient, ENDPOINTS } from "@/app/lib";
import { PaginatedSuppliersResponse } from "../types";

export async function getSuppliers(
  page: number = 1,
  itemsPerPage: number = 10,
): Promise<PaginatedSuppliersResponse> {
  return await apiClient<PaginatedSuppliersResponse>(
    `${ENDPOINTS.suppliers}?page=${page}&size=${itemsPerPage}`,
  );
}
