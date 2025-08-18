import { AccordionTrigger } from "@/components/ui";
import {
  getIsProductInSearchQuery,
  Product,
  useProductSearchStore,
} from "@/features/product";

type CategoryAccordionTriggerProps = {
  title: string;
  items: Product[];
};

export function CategoryAccordionTrigger({
  title,
  items,
}: CategoryAccordionTriggerProps) {
  const searchQuery = useProductSearchStore((state) => state.searchQuery);

  function getGroupSearchCount(items: Product[]): number {
    return items.filter((product) =>
      getIsProductInSearchQuery(product, searchQuery),
    ).length;
  }

  const foundCount = getGroupSearchCount(items);
  const resultsCountMessage = `${foundCount} result${foundCount > 1 && "s"} found`;

  return (
    <AccordionTrigger className="mx-3 flex items-center gap-2 py-2 text-sm font-semibold">
      <span>{title}</span>
      <span className="ml-auto text-xs font-normal text-gray-500">
        {searchQuery.trim().length > 0 && resultsCountMessage}
      </span>
    </AccordionTrigger>
  );
}
