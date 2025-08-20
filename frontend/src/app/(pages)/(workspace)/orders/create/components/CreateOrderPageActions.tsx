"use client";

import { ROUTES } from "@/app/lib";
import { GoBackBtn, NavigationBtn } from "@/components";
import { useOrderCartStore } from "@/features/order";
import { Heart, ShoppingCart } from "lucide-react";

export function CreateOrderPageActions() {
  const cart = useOrderCartStore((state) => state.cart);

  return (
    <div className="mb-1 flex justify-between">
      <GoBackBtn href={ROUTES.workspace.orders.root} />
      <div className="flex gap-2">
        <NavigationBtn href={"/products/favorite"} variant="outline">
          <Heart />
        </NavigationBtn>
        <NavigationBtn
          className="relative mr-4"
          href={ROUTES.workspace.orders.cart}
          variant="outline"
        >
          <ShoppingCart />
          {cart.length > 0 && (
            <div className="bg-primary absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full text-xs">
              {cart.length}
            </div>
          )}
        </NavigationBtn>
      </div>
    </div>
  );
}
