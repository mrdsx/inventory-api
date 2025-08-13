"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getPaginatedOrders } from "../services";
import { PaginatedOrdersResponse } from "../types";

export function useGetPaginatedOrdersQuery() {
  const params = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const page = Number(params.get("page") ?? "1");
  const itemsPerPage = Number(params.get("items-per-page") ?? "10");

  if (page < 1) replace(`${pathname}?page=1`);

  const query = useQuery<unknown, unknown, PaginatedOrdersResponse>({
    queryKey: ["orders", page],
    queryFn: () => getPaginatedOrders(page, itemsPerPage),
  });

  return { ...query };
}
