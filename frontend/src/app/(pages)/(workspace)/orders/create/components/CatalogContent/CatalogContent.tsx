"use client";

import { AccordionContent, AccordionItem } from "@/components/ui";
import {
  getIsProductInSearchQuery,
  Product,
  useProductGroupByStore,
  useProductSearchStore,
  useProductViewStore,
} from "@/features/product";
import { products } from "../../mock-data";
import { CategoryAccordionTrigger } from "./CategoryAccordionTrigger";
import { ProductGridView } from "./ProductGridView";
import { ProductRowsView } from "./ProductRowsView";

export function CatalogContent() {
  const groupBy = useProductGroupByStore((state) => state.groupBy);
  const searchQuery = useProductSearchStore((state) => state.searchQuery);
  const productView = useProductViewStore((state) => state.productView);

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
              {productView === "grid" ? (
                <ProductGridView items={items} />
              ) : (
                <ProductRowsView items={items} />
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </>
  );
}
