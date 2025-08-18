"use client";

import { ROUTES } from "@/app/lib";
import { NavigationBtn } from "@/components";
import { Button, Card, ScrollArea } from "@/components/ui";
import { useOrderCartStore } from "@/features/order";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Catalog } from "./components/Catalog";

export default function CreateOrderPage() {
  const {
    cart,
    addToCart,
    getCartTotalCost,
    removeItemFromCart,
    removeOneFromCart,
  } = useOrderCartStore();

  const totalCost = getCartTotalCost();

  return (
    <div>
      <NavigationBtn className="mb-2" href={ROUTES.workspace.orders.root}>
        Go back
      </NavigationBtn>
      <div className="flex h-100 gap-4 transition-colors">
        <Catalog />
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
