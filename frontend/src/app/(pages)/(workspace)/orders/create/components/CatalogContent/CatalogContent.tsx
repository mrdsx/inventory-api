import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import { useOrderCartStore } from "@/features/order";
import {
  Product,
  useProductGroupByStore,
  useProductSearchStore,
  useProductViewStore,
} from "@/features/product";
import { products } from "../../mock-data";
import { ProductGridView } from "./ProductGridView";
import { ProductRowsView } from "./ProductRowsView";

export function CatalogContent() {
  const { addToCart, getCartItemCount, removeOneFromCart } =
    useOrderCartStore();
  const groupBy = useProductGroupByStore((state) => state.groupBy);
  const searchQuery = useProductSearchStore((state) => state.searchQuery);
  const productView = useProductViewStore((state) => state.productView);

  const filteredProducts = searchQuery.trim()
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.supplier.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : products;

  // Group filtered products by selected attribute
  const groupedData = Object.groupBy(
    filteredProducts,
    (product) => product[groupBy],
  ) as Record<string, Product[]>;

  // Sort each group alphabetically by product name
  const sortedGroupedData = Object.fromEntries(
    Object.entries(groupedData).map(([groupName, items]) => [
      groupName,
      items.slice().sort((a, b) => a.name.localeCompare(b.name)),
    ]),
  );

  // For each group, count results matching search (by name or category)
  const getGroupSearchCount = (items: Product[]) =>
    items.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.supplier.toLowerCase().includes(searchQuery.toLowerCase()),
    ).length;

  return (
    <>
      {Object.entries(sortedGroupedData).map(([groupName, items]) => {
        const foundCount = getGroupSearchCount(items);
        return (
          <AccordionItem value={groupName} key={groupName}>
            <AccordionTrigger className="mx-3 flex items-center gap-2 py-2 text-sm font-semibold">
              <span>{groupName}</span>
              <span className="ml-auto text-xs font-normal text-gray-500">
                {searchQuery.trim() &&
                  `${foundCount} result${foundCount === 1 ? "" : "s"} found`}
              </span>
            </AccordionTrigger>
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
