"use client";

import { QUERY_KEYS, SEARCH_PARAMS_KEYS } from "@/app/lib";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getOrders } from "../services";
import { PaginatedOrdersResponse } from "../types";

const { ITEMS_PER_PAGE, PAGE } = SEARCH_PARAMS_KEYS;

export function useGetPaginatedOrdersQuery() {
  const params = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const page = Number(params.get(PAGE) ?? "1");
  const itemsPerPage = Number(params.get(ITEMS_PER_PAGE) ?? "10");

  if (page < 1) replace(`${pathname}?${PAGE}=1`);

  const query = useQuery<unknown, unknown, PaginatedOrdersResponse>({
    queryKey: [QUERY_KEYS.ORDERS, page],
    queryFn: () => getOrders(page, itemsPerPage),
  });

  return { ...query };
}
