import { PaginatedResponse } from "@/app/lib";

export type InventoryItemResponse = {
  id: number;
  sku: string;
  order_id: string;
  supplier_id: number;
  name: string;
  description: string;
  category: string;
  cost: number;
  price: number;
};

export type PaginatedInventoryItemsResponse = PaginatedResponse<
  InventoryItemResponse[]
>;
