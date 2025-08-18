import { Product } from "../types";

export function getIsProductInSearchQuery(
  product: Product,
  searchQuery: string,
): boolean {
  return (
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );
}
