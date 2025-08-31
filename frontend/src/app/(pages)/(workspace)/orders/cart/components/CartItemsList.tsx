"use client";

import { CartItemActions, useOrderCartStore } from "@/features/order";
import { CartItemDropdownMenu } from "./CartItemDropdownMenu";
import { CartItemRow } from "./CartItemRow";
import { EmptyCartTitle } from "./EmptyCartTitle";

export function CartItemsList() {
  const cart = useOrderCartStore((state) => state.cart);

  if (cart.length === 0) return <EmptyCartTitle />;

  return (
    <ul className="grid gap-2">
      {cart.map((item) => (
        <CartItemRow key={item.id}>
          <span className="mr-4 w-[30%]">{item.name}</span>
          <CartItemActions item={item} />
          <span className="ml-auto font-semibold text-gray-600 dark:text-gray-300">
            ${(item.cost * item.count).toFixed(2)}
          </span>
          <CartItemDropdownMenu item={item} />
        </CartItemRow>
      ))}
    </ul>
  );
}
