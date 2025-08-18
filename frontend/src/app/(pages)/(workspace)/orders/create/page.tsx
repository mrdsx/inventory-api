"use client";

import { ROUTES } from "@/app/lib";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Card,
  Input,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { CatalogItem } from "@/features/catalog";
import { useOrderCartStore } from "@/features/order";
import { ArrowLeft, Minus, Plus, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { products } from "./mock-data";

export default function CreateOrderPage() {
  const [groupBy, setGroupBy] = useState<"category" | "supplier">("category");
  const [productView, setProductView] = useState<"grid" | "rows">("grid");
  const [search, setSearch] = useState("");

  const {
    cart,
    addToCart,
    getCartItemCount,
    getCartTotalCost,
    removeItemFromCart,
    removeOneFromCart,
  } = useOrderCartStore();

  // Filter products by search query in name OR category
  const filteredProducts = search.trim()
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase()),
      )
    : products;

  // Group filtered products by selected attribute
  const groupedData = Object.groupBy(
    filteredProducts,
    (product) => product[groupBy],
  ) as Record<string, CatalogItem[]>;

  // Sort each group alphabetically by product name
  const sortedGroupedData = Object.fromEntries(
    Object.entries(groupedData).map(([groupName, items]) => [
      groupName,
      items.slice().sort((a, b) => a.name.localeCompare(b.name)),
    ]),
  );

  // For each group, count results matching search (by name or category)
  const getGroupSearchCount = (items: CatalogItem[]) =>
    items.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase()),
    ).length;

  const totalCost = getCartTotalCost();

  return (
    <div>
      <Link href={ROUTES.workspace.orders.root}>
        <Button className="mb-2" variant="link">
          <ArrowLeft />
          Go back
        </Button>
      </Link>
      <div className="flex h-110 gap-4 transition-colors">
        {/* Left side: Catalog */}
        <div className="flex w-[70%] flex-col">
          <div className="mb-4 flex flex-col gap-2">
            {/* Search bar */}
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
              <Search className="absolute top-2.5 left-2 h-4 w-4 text-gray-400" />
            </div>
            {/* Select menus */}
            <div className="flex items-center gap-2">
              <Select
                value={groupBy}
                onValueChange={(val) =>
                  setGroupBy(val as "category" | "supplier")
                }
              >
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Group by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="category">Group by Categories</SelectItem>
                  <SelectItem value="supplier">Group by Suppliers</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={productView}
                onValueChange={(val) => setProductView(val as "grid" | "rows")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="View..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">Grid view</SelectItem>
                  <SelectItem value="rows">Rows view</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex-1">
            <ScrollArea className="h-105">
              <Accordion type="multiple" className="w-full">
                {Object.entries(sortedGroupedData).map(([groupName, items]) => {
                  const foundCount = getGroupSearchCount(items);
                  return (
                    <AccordionItem value={groupName} key={groupName}>
                      <AccordionTrigger className="mx-3 flex items-center gap-2 py-2 text-sm font-semibold">
                        <span>{groupName}</span>
                        <span className="ml-auto text-xs font-normal text-gray-500">
                          {search.trim() &&
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
                                        onClick={() =>
                                          removeOneFromCart(item.id)
                                        }
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
                                          onClick={() =>
                                            removeOneFromCart(item.id)
                                          }
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
        {/* Right side: Cart */}
        <div className="flex h-120 w-[30%] flex-col p-2 transition-colors">
          <Card className="flex h-full flex-1 flex-col rounded-md shadow-sm">
            <h2 className="px-4 text-lg font-bold">Cart</h2>
            {cart.length === 0 ? (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-md text-center text-gray-400 dark:text-gray-500">
                  No items in cart.
                </p>
              </div>
            ) : (
              <>
                <ScrollArea className="h-60 flex-1 px-4">
                  <ul>
                    {cart.map((item) => (
                      <li
                        key={item.id}
                        className="mb-2 flex flex-col justify-between border-b py-2 last:mb-0 last:border-b-0"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <span>
                            {item.name}{" "}
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              ×{item.count}
                            </span>
                          </span>
                          <span className="ml-2 text-[12px] font-semibold text-gray-600 dark:text-gray-300">
                            ${(item.cost * item.count).toFixed(2)}
                          </span>
                        </div>
                        <div className="mb-3 flex items-center gap-1">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => removeOneFromCart(item.id)}
                            disabled={item.count === 0}
                            className="h-7 w-7"
                          >
                            <Minus size={14} />
                          </Button>
                          <span className="min-w-[24px] text-center font-semibold">
                            {item.count}
                          </span>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => addToCart(item)}
                            className="h-7 w-7"
                          >
                            <Plus size={14} />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeItemFromCart(item.id)}
                            className="ml-auto h-7 w-7 dark:text-red-400"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
                <div className="mt-6 flex justify-end px-4">
                  <span className="text-base font-semibold">
                    Total: ${totalCost.toFixed(2)}
                  </span>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
