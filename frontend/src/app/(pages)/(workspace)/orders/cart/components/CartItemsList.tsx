import { useOrderCartStore } from "@/features/order";
import { CartItemRow } from "./CartItemRow";

export function CartItemsList() {
  const cart = useOrderCartStore((state) => state.cart);

  return (
    <ul className="divide-y-1">
      {cart.map((item) => (
        <li key={item.id}>
          <CartItemRow item={item} />
        </li>
      ))}
    </ul>
  );
}
