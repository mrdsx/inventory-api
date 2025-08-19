"use client";

import { AccordionContent, AccordionItem } from "@/components/ui";
import { CategoryAccordionTrigger } from "./CategoryAccordionTrigger";
import { ProductsView } from "./ProductsView";
import { useCatalogProducts } from "./useCatalogProducts";

export function CatalogContent() {
  const catalogProducts = useCatalogProducts();

  return (
    <>
      {Object.entries(catalogProducts).map(([groupName, items]) => {
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
