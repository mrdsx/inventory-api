import { Product } from "../types";

export function getFilteredProducts(
  products: Product[],
  searchQuery: string,
): Product[] {
  if (searchQuery.trim().length === 0) return products;
  return products.filter((product) =>
    getIsProductInSearchQuery(product, searchQuery),
  );
}

export function getGroupedProducts<T extends keyof Product>(
  products: Product[],
  groupBy: T,
): Record<string, Product[]> {
  return Object.groupBy(products, (product) => product[groupBy]) as Record<
    string,
    Product[]
  >;
}

export function getFilteredProductsCount(
  products: Product[],
  searchQuery: string,
): number {
  return getFilteredProducts(products, searchQuery).length;
}

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

export function getSortedProducts(products: Product[]): Product[] {
  return products.sort((a, b) => a.name.localeCompare(b.name));
}
