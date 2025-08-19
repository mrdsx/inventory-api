"use client";

import { AccordionContent, AccordionItem } from "@/components/ui";
import {
  getFilteredProducts,
  getGroupedProducts,
  getSortedGroupedProducts,
  getSortedProducts,
  useProductGroupByStore,
  useProductSearchStore,
} from "@/features/product";
import { products } from "../../mock-data";
import { CategoryAccordionTrigger } from "./CategoryAccordionTrigger";
import { ProductsView } from "./ProductsView";

export function CatalogContent() {
  const groupBy = useProductGroupByStore((state) => state.groupBy);
  const searchQuery = useProductSearchStore((state) => state.searchQuery);

  const filteredProducts = getFilteredProducts(products, searchQuery);
  const sortedProducts = getSortedProducts(filteredProducts);
  const groupedData = getGroupedProducts(sortedProducts, groupBy);
  const sortedGroupedData = getSortedGroupedProducts(groupedData);

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
