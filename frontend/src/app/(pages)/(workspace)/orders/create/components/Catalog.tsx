import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Card,
  ScrollArea,
} from "@/components/ui";
import { useOrderCartStore } from "@/features/order";
import {
  Product,
  useProductGroupByStore,
  useProductSearchStore,
  useProductViewStore,
} from "@/features/product";
import { Minus, Plus } from "lucide-react";
import { products } from "../mock-data";
import { CatalogActions } from "./CatalogActions/CatalogActions";

export function Catalog() {
  const { addToCart, getCartItemCount, removeOneFromCart } =
    useOrderCartStore();
  const groupBy = useProductGroupByStore((state) => state.groupBy);
  const searchQuery = useProductSearchStore((state) => state.searchQuery);
  const productView = useProductViewStore((state) => state.productView);

  // Filter products by search query in name OR category
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
    <div className="flex w-[70%] flex-col gap-4">
      <CatalogActions />
      <div className="flex-1">
        <ScrollArea className="h-95">
          <Accordion type="multiple" className="w-full">
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
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                        {items.map((item) => {
                          const count = getCartItemCount(item.id);
                          return (
                            <Card
                              key={item.id}
                              className="flex flex-col justify-between p-3 text-[13px]"
                            >
                              <div>
                                <div className="text-base font-bold">
                                  {item.name}
                                </div>
                                {groupBy === "category" ? (
                                  <div className="mt-1 text-gray-600 dark:text-gray-300">
                                    <span className="font-medium">
                                      Supplier:
                                    </span>{" "}
                                    {item.supplier}
                                  </div>
                                ) : (
                                  <div className="mt-1 text-gray-600 dark:text-gray-300">
                                    <span className="font-medium">
                                      Category:
                                    </span>{" "}
                                    {item.category}
                                  </div>
                                )}
                                <div className="mt-1 text-gray-600 dark:text-gray-300">
                                  <span className="font-medium">Cost:</span>{" "}
                                  {item.cost.toFixed(2)}
                                </div>
                              </div>
                              {count <= 0 ? (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => addToCart(item)}
                                  className="mt-2 h-7.5 px-2 text-xs"
                                >
                                  Add to Cart
                                </Button>
                              ) : (
                                <div className="mt-2 flex items-center gap-1">
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={() => removeOneFromCart(item.id)}
                                    className="h-7.5 w-7.5"
                                  >
                                    <Minus size={14} />
                                  </Button>
                                  <span className="min-w-[20px] text-center">
                                    {count}
                                  </span>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={() => addToCart(item)}
                                    className="h-7.5 w-7.5"
                                  >
                                    <Plus size={14} />
                                  </Button>
                                </div>
                              )}
                            </Card>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        {items.map((item) => {
                          const count = getCartItemCount(item.id);
                          return (
                            <Card
                              key={item.id}
                              className="flex flex-row items-center justify-between p-3 text-[13px]"
                            >
                              <div>
                                <div className="text-base font-bold">
                                  {item.name}
                                </div>
                                {groupBy === "category" ? (
                                  <div className="mt-1 text-gray-600 dark:text-gray-300">
                                    <span className="font-medium">
                                      Supplier:
                                    </span>{" "}
                                    {item.supplier}
                                  </div>
                                ) : (
                                  <div className="mt-1 text-gray-600 dark:text-gray-300">
                                    <span className="font-medium">
                                      Category:
                                    </span>{" "}
                                    {item.category}
                                  </div>
                                )}
                                <div className="mt-1 text-gray-600 dark:text-gray-300">
                                  <span className="font-medium">Cost:</span>{" "}
                                  {item.cost.toFixed(2)}
                                </div>
                              </div>
                              <div>
                                {count <= 0 ? (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => addToCart(item)}
                                    className="h-7.5 px-2 text-xs"
                                  >
                                    Add to Cart
                                  </Button>
                                ) : (
                                  <div className="flex items-center gap-1">
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      onClick={() => removeOneFromCart(item.id)}
                                      className="h-7.5 w-7.5"
                                    >
                                      <Minus size={14} />
                                    </Button>
                                    <span className="min-w-[20px] text-center">
                                      {count}
                                    </span>
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      onClick={() => addToCart(item)}
                                      className="h-7.5 w-7.5"
                                    >
                                      <Plus size={14} />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </ScrollArea>
      </div>
    </div>
  );
}
