"use client";

import { DataTable } from "@/components/ui";
import { useGetOrdersQuery } from "@/features/order";
import { WorkspacePageContentLoader } from "@/features/workspace";
import { ordersTableColumns } from "./orders-table-columns";

export function OrdersSection() {
  const { data: paginatedOrders, isPending } = useGetOrdersQuery();

  if (isPending || paginatedOrders === undefined) {
    return <WorkspacePageContentLoader />;
  }

  return (
    <DataTable
      className="h-80"
      columns={ordersTableColumns}
      data={paginatedOrders.items}
      paginationData={paginatedOrders}
    />
  );
}
