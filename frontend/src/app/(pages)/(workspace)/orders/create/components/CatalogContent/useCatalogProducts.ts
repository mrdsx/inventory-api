import {
  getFilteredProducts,
  getGroupedProducts,
  getSortedGroupedProducts,
  getSortedProducts,
  Product,
  useProductGroupByStore,
  useProductSearchStore,
} from "@/features/product";
import { products } from "../../mock-data";

type CatalogProducts = Record<string, Product[]>;

export function useCatalogProducts(): CatalogProducts {
  const groupBy = useProductGroupByStore((state) => state.groupBy);
  const searchQuery = useProductSearchStore((state) => state.searchQuery);

  const filteredProducts = getFilteredProducts(products, searchQuery);
  const sortedProducts = getSortedProducts(filteredProducts);
  const groupedProducts = getGroupedProducts(sortedProducts, groupBy);
  const sortedGroupedProducts = getSortedGroupedProducts(groupedProducts);

  return sortedGroupedProducts;
}
