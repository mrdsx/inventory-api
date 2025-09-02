"use client";

import { Button } from "@/components/ui";
import { useOrderCartStore } from "@/features/order";

export function CartActions() {
  const cart = useOrderCartStore((state) => state.cart);
  if (cart.length === 0) return;

  const totalCost = cart.reduce(
    (total, item) => total + item.cost * item.count,
    0,
  );

  function handleClick() {
    // TODO: add creating order
    console.table(cart);
  }

  return (
    <div className="flex items-center justify-between px-4">
      <Button className="text-md font-semibold" onClick={handleClick}>
        Check Out
      </Button>
      <span className="text-base font-semibold">
        Total: ${totalCost.toFixed(2)}
      </span>
    </div>
  );
}
