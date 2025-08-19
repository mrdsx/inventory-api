"use client";

import { ROUTES } from "@/app/lib";
import { GoBackBtn } from "@/components";
import { Button } from "@/components/ui";
import { useOrderCartStore } from "@/features/order";
import { CartItemsList } from "./components/CartItemsList";
import { EmptyCartTitle } from "./components/EmptyCartTitle";

export default function CartPage() {
  const cart = useOrderCartStore((state) => state.cart);

  const totalCost = cart.reduce(
    (total, item) => total + item.cost * item.count,
    0,
  );

  return (
    <div className="flex h-120 flex-col transition-colors">
      <div className="flex h-full flex-1 flex-col rounded-md">
        <GoBackBtn href={ROUTES.workspace.orders.create} />
        <h2 className="px-4 text-lg font-bold">Cart</h2>
        {cart.length === 0 ? (
          <EmptyCartTitle />
        ) : (
          <>
            <CartItemsList />
            <div className="flex items-center justify-between px-4">
              <Button className="text-md font-semibold">Checkout</Button>
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
