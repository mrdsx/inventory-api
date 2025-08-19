import { CartItem, CartItemActions } from "@/features/order";
import { CartItemDropdownMenu } from "./CartItemDropdownMenu";

export function CartItemRow({ item }: { item: CartItem }) {
  return (
    <div className="flex items-center px-2 py-4">
      <span className="mr-4 w-[30%]">{item.name}</span>
      <CartItemActions item={item} />
      <span className="ml-auto font-semibold text-gray-600 dark:text-gray-300">
        ${(item.cost * item.count).toFixed(2)}
      </span>
      <CartItemDropdownMenu item={item} />
    </div>
  );
}
