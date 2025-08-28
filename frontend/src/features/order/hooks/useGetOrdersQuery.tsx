"use client";

import { QUERY_KEYS, usePaginatedQueryParams } from "@/app/lib";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../services";

export function useGetOrdersQuery() {
  const { itemsPerPage, page } = usePaginatedQueryParams();

  return useQuery({
    queryKey: [QUERY_KEYS.ORDERS, page, itemsPerPage],
    queryFn: () => getOrders(page, itemsPerPage),
    throwOnError: true,
    retry: false,
  });
}
