"use client";

import { ROUTES } from "@/app/lib";
import { NavigationBtn } from "@/components";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ScrollArea,
} from "@/components/ui";
import { CartItemActions, useOrderCartStore } from "@/features/order";
import { ArrowLeft, Ellipsis } from "lucide-react";

export default function CartPage() {
  const cart = useOrderCartStore((state) => state.cart);
  const removeItem = useOrderCartStore((state) => state.removeItem);

  const totalCost = cart.reduce(
    (total, item) => total + item.cost * item.count,
    0,
  );

  return (
    <div className="flex h-120 flex-col transition-colors">
      <div className="flex h-full flex-1 flex-col rounded-md">
        <NavigationBtn
          className="mb-2"
          href={ROUTES.workspace.orders.create}
          variant="link"
        >
          <ArrowLeft />
          Go back
        </NavigationBtn>
        <h2 className="px-4 text-lg font-bold">Cart</h2>
        {cart.length === 0 ? (
          <div className="flex justify-center">
            <p className="mt-30 text-gray-400 dark:text-gray-500">
              No items in cart.
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="my-4 h-80 flex-1 px-4">
              <ul className="divide-y-1">
                {cart.map((item) => (
                  <li key={item.id}>
                    <div className="flex items-center px-2 py-4">
                      <span className="mr-4 w-[30%]">{item.name}</span>
                      <CartItemActions item={item} />
                      <span className="ml-auto font-semibold text-gray-600 dark:text-gray-300">
                        ${(item.cost * item.count).toFixed(2)}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="hover:bg-accent mx-3 rounded-sm p-1.5">
                          <Ellipsis size={14} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Cart item</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
            <div className="flex items-center justify-between px-4">
              <Button>Checkout</Button>
              <span className="text-base font-semibold">
                Total: ${totalCost.toFixed(2)}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
