"use client";

import { ROUTES } from "@/app/lib";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Card,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Flat list of products (updated shape)
const catalogData = [
  {
    id: 1,
    name: "Coca Cola",
    supplier: "Supplier A",
    description: "Refreshing soft drink.",
    category: "Beverages",
    cost: 1.99,
  },
  {
    id: 2,
    name: "Pepsi",
    supplier: "Supplier B",
    description: "Popular cola beverage.",
    category: "Beverages",
    cost: 1.89,
  },
  {
    id: 3,
    name: "Chips",
    supplier: "Supplier A",
    description: "Crispy potato chips.",
    category: "Snacks",
    cost: 2.49,
  },
  {
    id: 4,
    name: "Nuts",
    supplier: "Supplier B",
    description: "Roasted mixed nuts.",
    category: "Snacks",
    cost: 3.79,
  },
];

type Product = {
  id: number;
  name: string;
  supplier: string;
  description: string;
  category: string;
  cost: number;
};

type CartItem = Product & { count: number };

export default function CreateOrderPage() {
  const [groupBy, setGroupBy] = useState<"category" | "supplier">("category");
  const [cart, setCart] = useState<CartItem[]>([]);

  // Group products by selected attribute using groupBy value
  const groupedData = Object.groupBy(
    catalogData,
    (product) => product[groupBy],
  ) as Record<string, Product[]>;

  const handleAddToCart = (item: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, count: i.count + 1 } : i,
        );
      } else {
        return [...prevCart, { ...item, count: 1 }];
      }
    });
  };

  const handleRemoveOneFromCart = (item: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (!existing) return prevCart;
      if (existing.count === 1) {
        return prevCart.filter((i) => i.id !== item.id);
      } else {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, count: i.count - 1 } : i,
        );
      }
    });
  };

  const handleRemoveFromCart = (item: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (!existing) return prevCart;
      return prevCart.filter((i) => i.id !== item.id);
    });
  };

  const getCartCount = (itemId: number) => {
    const cartItem = cart.find((i) => i.id === itemId);
    return cartItem?.count ?? 0;
  };

  // Calculate total cost
  const totalCost = cart.reduce((sum, item) => sum + item.cost * item.count, 0);

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
          <div className="mb-4 flex items-center gap-4">
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
          </div>
          <div className="flex-1">
            <ScrollArea className="h-100">
              <Accordion type="multiple" className="w-full">
                {Object.entries(groupedData).map(([groupName, items]) => (
                  <AccordionItem value={groupName} key={groupName}>
                    <AccordionTrigger className="mx-3 py-2 text-sm font-semibold">
                      {groupName}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                        {items.map((item) => {
                          const count = getCartCount(item.id);
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
                                  onClick={() => handleAddToCart(item)}
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
                                      handleRemoveOneFromCart(item)
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
                                    onClick={() => handleAddToCart(item)}
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
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          </div>
        </div>
        {/* Right side: Cart */}
        <div className="flex w-[30%] flex-col p-2 transition-colors">
          <Card className="flex-1 rounded-md shadow-sm">
            <h2 className="px-4 text-lg font-bold">Cart</h2>
            {cart.length === 0 ? (
              <p className="text-md text-center text-gray-400 dark:text-gray-500">
                No items in cart.
              </p>
            ) : (
              <>
                <ScrollArea className="h-70 px-4">
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
                            onClick={() => handleRemoveOneFromCart(item)}
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
                            onClick={() => handleAddToCart(item)}
                            className="h-7 w-7"
                          >
                            <Plus size={14} />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleRemoveFromCart(item)}
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
