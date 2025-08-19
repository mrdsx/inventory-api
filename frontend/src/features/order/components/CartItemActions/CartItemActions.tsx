import { useOrderCartStore } from "@/features/order";
import { Product } from "@/features/product";
import { AddItemToCartBtn } from "./AddItemToCartBtn";
import { DecrementItemCountBtn } from "./DecrementItemCountBtn";
import { IncrementItemCountBtn } from "./IncrementItemCountBtn";

const MIN_COUNT_OF_CART_ITEM = 1;

export function CartItemActions({ item }: { item: Product }) {
  const count = useOrderCartStore((state) => state.getItemCount(item.id));

  if (count < MIN_COUNT_OF_CART_ITEM) {
    return <AddItemToCartBtn item={item} />;
  }

  return (
    <div className="flex items-center gap-1">
      <DecrementItemCountBtn item={item} />
      <span className="min-w-[20px] text-center">{count}</span>
      <IncrementItemCountBtn item={item} />
    </div>
  );
}
