"use client";

import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  QUERY_KEYS,
  SEARCH_PARAMS_KEYS,
} from "@/app/lib";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getOrders } from "../services";

const { ITEMS_PER_PAGE, PAGE } = SEARCH_PARAMS_KEYS;

export function useGetOrdersQuery() {
  const params = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const page = Number(params.get(PAGE) ?? DEFAULT_PAGE);
  const itemsPerPage = Number(params.get(ITEMS_PER_PAGE) ?? DEFAULT_PAGE_SIZE);

  if (page < 1) replace(`${pathname}?${PAGE}=${DEFAULT_PAGE}`);

  const query = useQuery({
    queryKey: [QUERY_KEYS.ORDERS, page],
    queryFn: () => getOrders(page, itemsPerPage),
  });

  return { ...query };
}
