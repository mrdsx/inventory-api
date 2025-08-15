import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZES,
  SEARCH_PARAMS_KEYS,
  useParams,
} from "@/app/lib";

const { ITEMS_PER_PAGE, PAGE } = SEARCH_PARAMS_KEYS;

export function validateParams(page: number, itemsPerPage: number) {
  const { setParams, updatePathname } = useParams();

  const isPageNumberPositive = page > 0;
  if (!isPageNumberPositive || !PAGE_SIZES.includes(itemsPerPage)) {
    setParams(PAGE, DEFAULT_PAGE);
    setParams(ITEMS_PER_PAGE, DEFAULT_PAGE_SIZE);
    updatePathname();
  }
}
