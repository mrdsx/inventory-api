import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  QUERY_KEYS,
  SEARCH_PARAMS_KEYS,
  useParams,
  useValidateParams,
} from "@/app/lib";
import { useQuery } from "@tanstack/react-query";
import { getSuppliers } from "../services/supplier";

export function useGetSuppliersQuery() {
  const { params } = useParams();
  const validateParams = useValidateParams();

  const { ITEMS_PER_PAGE, PAGE } = SEARCH_PARAMS_KEYS;

  const page = Number(params.get(PAGE) ?? DEFAULT_PAGE);
  const itemsPerPage = Number(params.get(ITEMS_PER_PAGE) ?? DEFAULT_PAGE_SIZE);
  validateParams(page, itemsPerPage);

  const query = useQuery({
    queryKey: [QUERY_KEYS.SUPPLIERS, page, itemsPerPage],
    queryFn: () => getSuppliers(page, itemsPerPage),
  });

  return { ...query };
}
