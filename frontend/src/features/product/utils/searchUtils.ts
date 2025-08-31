import { Product } from "../types";

export function getIsProductInSearchQuery(
  product: Product,
  searchQuery: string,
): boolean {
  const query = searchQuery.toLowerCase().trim();

  const { name, category, supplier } = product;
  return (
    name.toLowerCase().includes(query) ||
    category.toLowerCase().includes(query) ||
    supplier.toLowerCase().includes(query)
  );
}
