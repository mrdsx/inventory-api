import { QUERY_KEYS, usePaginatedQueryParams } from "@/app/lib";
import { useQuery } from "@tanstack/react-query";
import { getSuppliers } from "../services/supplier";

export function useGetSuppliersQuery() {
  const { itemsPerPage, page } = usePaginatedQueryParams();

  return useQuery({
    queryKey: [QUERY_KEYS.SUPPLIERS, page, itemsPerPage],
    queryFn: () => getSuppliers(page, itemsPerPage),
    throwOnError: true,
    retry: false,
  });
}
