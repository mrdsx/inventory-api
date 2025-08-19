import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZES,
  SEARCH_PARAMS_KEYS,
  useParams,
} from "@/app/lib";

const { ITEMS_PER_PAGE, PAGE } = SEARCH_PARAMS_KEYS;

type ValidateParamsActions = (page: number, itemsPerPage: number) => void;

export function useValidateParams(): ValidateParamsActions {
  const { setParams, updatePathname } = useParams();

  function validateParams(page: number, itemsPerPage: number): void {
    const isPageNumberPositive = page > 0;
    if (!isPageNumberPositive || !PAGE_SIZES.includes(itemsPerPage)) {
      setParams(PAGE, DEFAULT_PAGE);
      setParams(ITEMS_PER_PAGE, DEFAULT_PAGE_SIZE);
      updatePathname();
    }
  }

  return validateParams;
}
