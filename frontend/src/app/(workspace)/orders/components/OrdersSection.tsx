"use client";

import { DataTable } from "@/components/ui";
import { getPaginatedOrders } from "@/features/order";
import { WorkspacePageContentLoader } from "@/features/workspace";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ordersTableColumns } from "./orders-table-columns";

export function OrdersSection() {
  const params = useSearchParams();
  const page = Number(params.get("page") ?? "1");
  const itemsPerPage = Number(params.get("items-per-page") ?? "10");

  const { data: paginatedOrders, isPending } = useQuery({
    queryKey: ["orders", page],
    queryFn: () => getPaginatedOrders(page, itemsPerPage),
  });

  if (isPending || paginatedOrders === undefined) {
    return <WorkspacePageContentLoader />;
  }

  return (
    <DataTable
      className="h-80"
      columns={ordersTableColumns}
      data={paginatedOrders.items}
      paginatedData={paginatedOrders}
    />
  );
}
