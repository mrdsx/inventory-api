"use client";

import { OrderResponse, ORDERS_TABLE_COLUMNS } from "@/features/order";
import { ColumnDef } from "@tanstack/react-table";

export const ordersTableColumns: ColumnDef<OrderResponse>[] =
  ORDERS_TABLE_COLUMNS.map(({ header, accessorKey }) => ({
    header,
    accessorKey,
  }));
