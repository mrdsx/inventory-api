import { AccordionTrigger } from "@/components/ui";
import {
  getProductGroupSearchCount,
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

  const foundCount = getProductGroupSearchCount(items, searchQuery);
  const resultsCountMessage = `${foundCount} result${foundCount > 1 ? "s" : ""} found`;

  return (
    <AccordionTrigger className="mx-3.5 flex items-center gap-2 py-2.25 font-semibold">
      <span>{title}</span>
      <span className="ml-auto font-normal text-gray-500">
        {searchQuery.trim().length > 0 && resultsCountMessage}
      </span>
    </AccordionTrigger>
  );
}
