"use client";

import { DataTable } from "@/components/ui";
import { useGetOrdersQuery } from "@/features/order";
import { ordersTableColumns } from "./orders-table-columns";

export function OrdersSection() {
  const { data: paginatedOrders, isPending } = useGetOrdersQuery();

  return (
    <DataTable
      className="h-80"
      columns={ordersTableColumns}
      isLoading={isPending}
      paginationData={paginatedOrders}
    />
  );
}
