"use client";

import { DataTable } from "@/components/ui";
import { getPaginatedOrders } from "@/features/order";
import { PaginatedOrdersResponse } from "@/features/order/types";
import { WorkspacePageContentLoader } from "@/features/workspace";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ordersTableColumns } from "./orders-table-columns";

export function OrdersSection() {
  const params = useSearchParams();
  const page = Number(params.get("page") ?? "1");
  const itemsPerPage = Number(params.get("items-per-page") ?? "10");

  const [paginatedOrders, setPaginatedOrders] =
    useState<PaginatedOrdersResponse>({
      items: [],
      total: 0,
      page: 0,
      size: 0,
      pages: 0,
    });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);

    getPaginatedOrders(page, itemsPerPage)
      .then((paginatedOrders) => {
        setPaginatedOrders(paginatedOrders);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);

    getPaginatedOrders(page, itemsPerPage)
      .then((paginatedOrders) => {
        setPaginatedOrders(paginatedOrders);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, itemsPerPage]);

  if (isLoading) return <WorkspacePageContentLoader />;

  return (
    <DataTable
      className="h-80"
      columns={ordersTableColumns}
      data={paginatedOrders.items}
      paginatedData={paginatedOrders}
    />
  );
}
