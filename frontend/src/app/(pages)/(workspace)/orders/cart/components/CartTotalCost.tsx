"use client";

import { useOrderCartStore } from "@/features/order";

export function CartTotalCost() {
  const cart = useOrderCartStore((state) => state.cart);

  const totalCost = cart.reduce(
    (total, item) => total + item.cost * item.count,
    0,
  );

  return (
    <span className="text-base font-semibold">
      Total: ${totalCost.toFixed(2)}
    </span>
  );
}
