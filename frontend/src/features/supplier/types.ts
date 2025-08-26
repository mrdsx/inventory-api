import { PaginatedResponse } from "@/app/lib";

export type Supplier = {
  name: string;
  contact_email: string;
};

export type SupplierResponse = {
  id: number;
} & Supplier;

export type PaginatedSuppliersResponse = PaginatedResponse<SupplierResponse[]>;
