import { apiClient, BaseAPIResponse, ENDPOINTS } from "@/app/lib";
import {
  PaginatedSuppliersResponse,
  Supplier,
  SupplierResponse,
} from "./types";

const { suppliers } = ENDPOINTS;

export async function fetchSupplierById(id: number): Promise<SupplierResponse> {
  return await apiClient<SupplierResponse>(`${suppliers}/${id}`, {
    errorMessage: "Failed to fetch supplier",
  });
}

export async function fetchSuppliers(
  page: number = 1,
  itemsPerPage: number = 10,
): Promise<PaginatedSuppliersResponse> {
  return await apiClient<PaginatedSuppliersResponse>(
    `${suppliers}?page=${page}&size=${itemsPerPage}`,
    { errorMessage: "Failed to fetch suppliers" },
  );
}

export async function postSupplier(
  supplier: Supplier,
): Promise<BaseAPIResponse> {
  return await apiClient<BaseAPIResponse>(suppliers, {
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
