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
