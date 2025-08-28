import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  SEARCH_PARAMS_KEYS,
  useParams,
  useValidateParams,
} from "@/app/lib";

const { ITEMS_PER_PAGE, PAGE } = SEARCH_PARAMS_KEYS;

type PaginatedQueryParamsState = {
  itemsPerPage: number;
  page: number;
};

export function usePaginatedQueryParams(): PaginatedQueryParamsState {
  const { params } = useParams();
  const validateParams = useValidateParams();

  const page = Number(params.get(PAGE) ?? DEFAULT_PAGE);
  const itemsPerPage = Number(params.get(ITEMS_PER_PAGE) ?? DEFAULT_PAGE_SIZE);
  validateParams(page, itemsPerPage);

  return { itemsPerPage, page };
}
