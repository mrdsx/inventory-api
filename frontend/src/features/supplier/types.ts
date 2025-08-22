import { PaginatedResponse } from "@/app/lib";

export type SupplierResponse = {
  id: number;
  name: string;
  contact_email: string;
};

export type PaginatedSuppliersResponse = PaginatedResponse<SupplierResponse[]>;
