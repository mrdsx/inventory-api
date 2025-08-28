"use client";

import { QUERY_KEYS, usePaginatedQueryParams } from "@/app/lib";
import { DataTable } from "@/components/ui";
import { getOrders } from "@/features/order";
import { useQuery } from "@tanstack/react-query";
import { ordersTableColumns } from "./orders-table-columns";

export function OrdersSection() {
  const { itemsPerPage, page } = usePaginatedQueryParams();
  const { data: paginatedOrders, isPending } = useQuery({
    queryKey: [QUERY_KEYS.ORDERS, page, itemsPerPage],
    queryFn: () => getOrders(page, itemsPerPage),
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
