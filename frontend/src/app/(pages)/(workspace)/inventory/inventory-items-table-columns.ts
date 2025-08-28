import { InventoryItemResponse } from "@/features/inventory";
import { ColumnDef } from "@tanstack/react-table";

export const INVENTORY_ITEMS_TABLE_COLUMNS: ColumnDef<InventoryItemResponse>[] =
  [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "sku", header: "SKU" },
    { accessorKey: "order_id", header: "Order ID" },
    { accessorKey: "supplier_id", header: "Supplier ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "description", header: "Description" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "cost", header: "Cost" },
    { accessorKey: "price", header: "Price" },
  ] as const;
