import { Product } from "../types";

export function getGroupedProducts<T extends keyof Product>(
  products: Product[],
  groupBy: T,
): Record<string, Product[]> {
  return Object.groupBy(products, (product) => product[groupBy]) as Record<
    string,
    Product[]
  >;
}
