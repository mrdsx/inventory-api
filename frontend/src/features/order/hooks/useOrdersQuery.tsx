"use client";

import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZES,
  QUERY_KEYS,
  SEARCH_PARAMS_KEYS,
  useParams,
} from "@/app/lib";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../services";

const { ITEMS_PER_PAGE, PAGE } = SEARCH_PARAMS_KEYS;

export function useGetOrdersQuery() {
  const { params, setParams, updatePathname } = useParams();

  const page = Number(params.get(PAGE) ?? DEFAULT_PAGE);
  const itemsPerPage = Number(params.get(ITEMS_PER_PAGE) ?? DEFAULT_PAGE_SIZE);

  const isPageNumberPositive = page > 0;
  if (!isPageNumberPositive || !PAGE_SIZES.includes(itemsPerPage)) {
    setParams(PAGE, DEFAULT_PAGE);
    setParams(ITEMS_PER_PAGE, DEFAULT_PAGE_SIZE);
    updatePathname();
  }

  const query = useQuery({
    queryKey: [QUERY_KEYS.ORDERS, page, itemsPerPage],
    queryFn: () => getOrders(page, itemsPerPage),
  });

  return { ...query };
}
