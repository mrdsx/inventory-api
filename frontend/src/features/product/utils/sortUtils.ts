import { Product } from "../types";

export function getSortedGroupedProducts(products: Record<string, Product[]>) {
  return Object.fromEntries(
    Object.entries(products).sort((a, b) => a[0].localeCompare(b[0])),
  );
}

export function getSortedProducts(products: Product[]): Product[] {
  return products.sort((a, b) => a.name.localeCompare(b.name));
}
