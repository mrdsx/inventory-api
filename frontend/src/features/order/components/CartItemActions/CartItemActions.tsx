import { Product } from "@/features/product";
import { useOrderCartStore } from "../../stores/orderCartStore";
import { AddItemToCartBtn } from "./AddItemToCartBtn";
import { DecrementItemCountBtn } from "./DecrementItemCountBtn";
import { IncrementItemCountBtn } from "./IncrementItemCountBtn";

const MIN_COUNT_OF_CART_ITEM = 1;

export function CartItemActions({ item }: { item: Product }) {
  const getItemCount = useOrderCartStore((state) => state.getItemCount);
  const count = getItemCount(item.id);

  if (count < MIN_COUNT_OF_CART_ITEM) {
    return <AddItemToCartBtn item={item} />;
  }

  return (
    <div className="mt-2 flex items-center gap-1">
      <DecrementItemCountBtn item={item} />
      <span className="min-w-[20px] text-center">{count}</span>
      <IncrementItemCountBtn item={item} />
    </div>
  );
}
