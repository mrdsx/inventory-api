import { CartItemActions, useOrderCartStore } from "@/features/order";
import { CartItemDropdownMenu } from "./CartItemDropdownMenu";
import { CartItemRow } from "./CartItemRow";

export function CartItemsList() {
  const cart = useOrderCartStore((state) => state.cart);

  return (
    <ul className="divide-y-1">
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
