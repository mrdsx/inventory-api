"use client";

import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZES,
  QUERY_KEYS,
  SEARCH_PARAMS_KEYS,
  useEditSearchParams,
} from "@/app/lib";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getOrders } from "../services";

const { ITEMS_PER_PAGE, PAGE } = SEARCH_PARAMS_KEYS;

export function useGetOrdersQuery() {
  const params = useSearchParams();
  const editSearchParams = useEditSearchParams();

  const page = Number(params.get(PAGE) ?? DEFAULT_PAGE);
  const itemsPerPage = Number(params.get(ITEMS_PER_PAGE) ?? DEFAULT_PAGE_SIZE);

  const isPageNumberPositive = page > 0;
  if (!isPageNumberPositive || !PAGE_SIZES.includes(itemsPerPage)) {
    editSearchParams(PAGE, DEFAULT_PAGE);
    editSearchParams(ITEMS_PER_PAGE, DEFAULT_PAGE_SIZE);
  }

  const query = useQuery({
    queryKey: [QUERY_KEYS.ORDERS, page, itemsPerPage],
    queryFn: () => getOrders(page, itemsPerPage),
  });

  return { ...query };
}
