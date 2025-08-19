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

export function getFilteredProductsCount(
  products: Product[],
  searchQuery: string,
): number {
  return products.filter((product) =>
    getIsProductInSearchQuery(product, searchQuery),
  ).length;
}
