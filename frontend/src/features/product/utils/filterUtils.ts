import { Product } from "../types";
import { getIsProductInSearchQuery } from "./searchUtils";

export function getFilteredProducts(
  products: Product[],
  searchQuery: string,
): Product[] {
  if (searchQuery.trim().length === 0) return products;
  return products.filter((product) =>
    getIsProductInSearchQuery(product, searchQuery),
  );
}

export function getFilteredProductsCount(
  products: Product[],
  searchQuery: string,
): number {
  return getFilteredProducts(products, searchQuery).length;
}
