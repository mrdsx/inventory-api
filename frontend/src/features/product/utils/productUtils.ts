import { Product } from "../types";

export function getIsProductInSearchQuery(
  product: Product,
  searchQuery: string,
): boolean {
  const formattedSearchQuery = searchQuery.toLowerCase().trim();

  return (
    product.name.toLowerCase().includes(formattedSearchQuery) ||
    product.category.toLowerCase().includes(formattedSearchQuery) ||
    product.supplier.toLowerCase().includes(formattedSearchQuery)
  );
}

export function getProductGroupSearchCount(
  items: Product[],
  searchQuery: string,
): number {
  return items.filter((product) =>
    getIsProductInSearchQuery(product, searchQuery),
  ).length;
}
