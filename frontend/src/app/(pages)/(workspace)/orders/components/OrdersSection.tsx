"use client";

import { DataTable } from "@/components/ui";
import { useGetOrdersQuery } from "@/features/order";
import { ordersTableColumns } from "./orders-table-columns";

export function OrdersSection() {
  const { data: paginatedOrders, isPending } = useGetOrdersQuery();

  return (
    <DataTable
      className="h-[60vh]"
      columns={ordersTableColumns}
      isLoading={isPending}
      paginationData={paginatedOrders}
    />
  );
}
