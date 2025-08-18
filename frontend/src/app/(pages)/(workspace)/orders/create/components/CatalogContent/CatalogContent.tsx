"use client";

import { AccordionContent, AccordionItem } from "@/components/ui";
import {
  getIsProductInSearchQuery,
  Product,
  useProductGroupByStore,
  useProductSearchStore,
} from "@/features/product";
import { products } from "../../mock-data";
import { CategoryAccordionTrigger } from "./CategoryAccordionTrigger";
import { ProductsView } from "./ProductsView";

export function CatalogContent() {
  const groupBy = useProductGroupByStore((state) => state.groupBy);
  const searchQuery = useProductSearchStore((state) => state.searchQuery);

  const filteredProducts = searchQuery.trim()
    ? products.filter((product) =>
        getIsProductInSearchQuery(product, searchQuery),
      )
    : products;

  const groupedData = Object.groupBy(
    filteredProducts,
    (product) => product[groupBy],
  ) as Record<string, Product[]>;

  const sortedGroupedData = Object.fromEntries(
    Object.entries(groupedData).map(([groupName, items]) => [
      groupName,
      items.slice().sort((a, b) => a.name.localeCompare(b.name)),
    ]),
  );

  return (
    <>
      {Object.entries(sortedGroupedData).map(([groupName, items]) => {
        return (
          <AccordionItem value={groupName} key={groupName}>
            <CategoryAccordionTrigger title={groupName} items={items} />
            <AccordionContent>
              <ProductsView products={items} />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </>
  );
}
