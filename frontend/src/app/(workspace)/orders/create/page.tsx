"use client";

import { ROUTES } from "@/app/lib";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Card,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Flat list of products
const catalogData = [
  { id: 1, name: "Coca Cola", supplier: "Supplier A", category: "Beverages" },
  { id: 2, name: "Pepsi", supplier: "Supplier B", category: "Beverages" },
  { id: 3, name: "Chips", supplier: "Supplier A", category: "Snacks" },
  { id: 4, name: "Nuts", supplier: "Supplier B", category: "Snacks" },
];

type Product = {
  id: number;
  name: string;
  supplier: string;
  category: string;
};

export default function CreateOrderPage() {
  const [groupBy, setGroupBy] = useState<"category" | "supplier">("category");
  const [cart, setCart] = useState<Product[]>([]);

  // Group products by selected attribute using groupBy value
  const groupedData: Record<string, Product[]> = catalogData.reduce(
    (acc, product) => {
      const key = product[groupBy];
      if (!acc[key]) acc[key] = [];
      acc[key].push(product);
      return acc;
    },
    {} as Record<string, Product[]>,
  );

  const handleAddToCart = (item: Product) => {
    if (!cart.find((i) => i.id === item.id)) {
      setCart([...cart, item]);
    }
  };

  const handleRemoveFromCart = (item: Product) => {
    setCart(cart.filter((i) => i.id !== item.id));
  };

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
          <div className="flex-1 overflow-y-auto">
            <Accordion type="multiple" className="w-full">
              {Object.entries(groupedData).map(([groupName, items]) => (
                <AccordionItem value={groupName} key={groupName}>
                  <AccordionTrigger className="font-semibold">
                    {groupName}
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card className="p-4">
                      <ul>
                        {items.map((item) => (
                          <li
                            key={item.id}
                            className="flex items-center justify-between py-1"
                          >
                            <span className="text-foreground">{item.name}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleAddToCart(item)}
                              disabled={!!cart.find((i) => i.id === item.id)}
                              className="dark:border-gray-700"
                            >
                              {cart.find((i) => i.id === item.id)
                                ? "Added"
                                : "Add"}
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        {/* Right side: Cart */}
        <div className="flex w-[30%] flex-col p-2 transition-colors">
          <Card className="flex-1 p-4">
            <h2 className="mb-4 text-lg font-bold">Cart</h2>
            {cart.length === 0 ? (
              <p className="text-gray-400 dark:text-gray-500">
                No items in cart.
              </p>
            ) : (
              <ul>
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between py-2"
                  >
                    <span>{item.name}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveFromCart(item)}
                      className="dark:text-red-400"
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
