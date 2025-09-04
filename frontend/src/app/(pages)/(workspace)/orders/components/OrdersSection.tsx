"use client";

import { QUERY_KEYS, usePaginatedQueryParams } from "@/app/lib";
import { DataTable } from "@/components/ui";
import { fetchOrders } from "@/features/order";
import { useQuery } from "@tanstack/react-query";
import { ordersTableColumns } from "./orders-table-columns";

const { ORDERS } = QUERY_KEYS;

export function OrdersSection() {
  const { itemsPerPage, page } = usePaginatedQueryParams();
  const { data: paginatedOrders, isPending } = useQuery({
    queryKey: [ORDERS, page, itemsPerPage],
    queryFn: () => fetchOrders(page, itemsPerPage),
    throwOnError: true,
    retry: false,
  });

  return (
    <DataTable
      className="h-[60vh]"
      columns={ordersTableColumns}
      isLoading={isPending}
      paginationData={paginatedOrders}
    />
  );
}
