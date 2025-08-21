"use client";

import { ROUTES } from "@/app/lib";
import { GoBackBtn, NavigationBtn } from "@/components";
import { useOrderCartStore } from "@/features/order";
import { FavoriteProductsBtn } from "@/features/product";
import { ShoppingCart } from "lucide-react";

export function CreateOrderPageActions() {
  const cart = useOrderCartStore((state) => state.cart);

  return (
    <div className="mb-1 flex justify-between">
      <GoBackBtn href={ROUTES.workspace.orders.root} />
      <div className="mr-4 flex gap-2">
        <FavoriteProductsBtn />
        <NavigationBtn
          className="relative"
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
