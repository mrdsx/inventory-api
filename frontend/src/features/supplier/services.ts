import { apiClient, BaseAPIResponse, ENDPOINTS } from "@/app/lib";
import { PaginatedSuppliersResponse, Supplier } from "./types";

export async function fetchSuppliers(
  page: number = 1,
  itemsPerPage: number = 10,
): Promise<PaginatedSuppliersResponse> {
  return await apiClient<PaginatedSuppliersResponse>(
    `${ENDPOINTS.suppliers}?page=${page}&size=${itemsPerPage}`,
    { errorMessage: "Failed to fetch suppliers" },
  );
}

export async function postSupplier(supplier: Supplier) {
  return await apiClient<BaseAPIResponse>(ENDPOINTS.suppliers, {
    requestInit: {
      body: JSON.stringify(supplier),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    },
    errorMessage: "Failed to create supplier",
  });
}
