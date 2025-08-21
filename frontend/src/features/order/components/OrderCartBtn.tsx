"use client";

import { ROUTES } from "@/app/lib";
import { NavigationBtn } from "@/components";
import { ShoppingCart } from "lucide-react";
import { useOrderCartStore } from "../stores/orderCartStore";

export function OrderCartBtn() {
  const cart = useOrderCartStore((state) => state.cart);

  return (
    <NavigationBtn
      className="relative"
      href={ROUTES.workspace.orders.cart}
      variant="outline"
    >
      <ShoppingCart />
      {cart.length > 0 && (
        <div className="bg-primary absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full text-xs text-white">
          {cart.length}
        </div>
      )}
    </NavigationBtn>
  );
}
