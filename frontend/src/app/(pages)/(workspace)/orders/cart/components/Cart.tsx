"use client";

import { Button } from "@/components/ui";
import { useOrderCartStore } from "@/features/order";
import { CartItemsList } from "./CartItemsList";
import { EmptyCartTitle } from "./EmptyCartTitle";

export function Cart() {
  const cart = useOrderCartStore((state) => state.cart);

  const totalCost = cart.reduce(
    (total, item) => total + item.cost * item.count,
    0,
  );

  if (cart.length === 0) return <EmptyCartTitle />;

  return (
    <>
      <CartItemsList />
      <div className="flex items-center justify-between px-4">
        <Button className="text-md font-semibold">Checkout</Button>
        <span className="text-base font-semibold">
          Total: ${totalCost.toFixed(2)}
        </span>
      </div>
    </>
  );
}
