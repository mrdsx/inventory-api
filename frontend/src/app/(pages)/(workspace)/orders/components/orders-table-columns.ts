"use client";

import { OrderResponse, TABLE_COLUMNS } from "@/features/order";
import { ColumnDef } from "@tanstack/react-table";

export const ordersTableColumns: ColumnDef<OrderResponse>[] = [
  {
    accessorKey: "id",
    header: TABLE_COLUMNS[0],
  },
  {
    accessorKey: "supplier_name",
    header: TABLE_COLUMNS[1],
  },
  {
    accessorKey: "date",
    header: TABLE_COLUMNS[2],
  },
  {
    accessorKey: "status",
    header: TABLE_COLUMNS[3],
  },
  {
    accessorKey: "total_cost",
    header: TABLE_COLUMNS[4],
  },
];
