"use client";

import { ContentLoader } from "@/components";
import { DataTable } from "@/components/ui";
import { useGetOrdersQuery } from "@/features/order";
import { ordersTableColumns } from "./orders-table-columns";

export function OrdersSection() {
  const { data: paginatedOrders, isPending } = useGetOrdersQuery();

  if (isPending || paginatedOrders === undefined) {
    return <ContentLoader />;
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
