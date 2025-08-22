"use client";

import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  QUERY_KEYS,
  SEARCH_PARAMS_KEYS,
  useParams,
  useValidateParams,
} from "@/app/lib";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../services";

const { ITEMS_PER_PAGE, PAGE } = SEARCH_PARAMS_KEYS;

export function useGetOrdersQuery() {
  const { params } = useParams();
  const validateParams = useValidateParams();

  const page = Number(params.get(PAGE) ?? DEFAULT_PAGE);
  const itemsPerPage = Number(params.get(ITEMS_PER_PAGE) ?? DEFAULT_PAGE_SIZE);
  validateParams(page, itemsPerPage);

  const query = useQuery({
    queryKey: [QUERY_KEYS.ORDERS, page, itemsPerPage],
    queryFn: () => getOrders(page, itemsPerPage),
  });

  return { ...query };
}
