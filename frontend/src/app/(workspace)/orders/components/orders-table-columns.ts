"use client";
import { OrderResponse } from "@/features/order";
import { ColumnDef } from "@tanstack/react-table";

export const ordersTableColumns: ColumnDef<OrderResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "supplier_name",
    header: "Supplier Name",
  },
  {
    accessorKey: "date",
    header: "Created At",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "total_cost",
    header: "Total Cost",
  },
];
