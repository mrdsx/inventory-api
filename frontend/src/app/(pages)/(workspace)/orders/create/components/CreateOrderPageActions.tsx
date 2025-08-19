"use client";

import { ROUTES } from "@/app/lib";
import { GoBackBtn, NavigationBtn } from "@/components";
import { useOrderCartStore } from "@/features/order";
import { ShoppingCart } from "lucide-react";

export function CreateOrderPageActions() {
  const cart = useOrderCartStore((state) => state.cart);

  return (
    <div className="flex justify-between">
      <GoBackBtn href={ROUTES.workspace.orders.root} />
      <NavigationBtn
        className="size relative mr-4"
        href={ROUTES.workspace.orders.cart}
        variant="ghost"
      >
        <ShoppingCart className="size-6" />
        <div className="bg-primary absolute top-0.5 right-0.5 flex size-4 items-center justify-center rounded-full text-xs">
          {cart.length}
        </div>
      </NavigationBtn>
    </div>
  );
}
